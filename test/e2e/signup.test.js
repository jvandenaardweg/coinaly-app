import { Selector, ClientFunction } from 'testcafe'
import http from 'http'

const getWindowLocation = ClientFunction(() => window.location)

function deleteE2EUser () {
  return http.get('http://localhost:5000/users/delete/e2e')
}

fixture `Signup page`
  .page `http://localhost:8080/signup`

test('Title contains "Get started"', async testController => {
  const titleSelector = await Selector('h1')
  await testController.expect(titleSelector.innerText).eql('Get started')
})

test('Should show error messages when required fields are empty', async testController => {
  const button = await Selector('#buttonSignup')
  await testController
    .click(button)

  const errorMessages = await Selector('.invalid-feedback')
  await testController
    .expect(errorMessages.count).eql(3)
})

test('Should show an error message when email already exists', async testController => {
  const emailInput = await Selector('#inputEmail')
  const passwordInput = await Selector('#inputPassword')
  const privacyInputLabel = await Selector('#labelPrivacyDisclaimer')
  const button = await Selector('#buttonSignup')
  await testController
    .typeText(emailInput, 'test@coinaly.io')
    .typeText(passwordInput, 'testtest')
    .click(privacyInputLabel, {offsetX: 1, offsetY: 1})
    .click(button)

  const alert = await Selector('.alert')
  await testController
    .expect(alert.count).eql(1)
})

test('Should submit the form when everything is filled in correctly', async testController => {
  const emailInput = await Selector('#inputEmail')
  const passwordInput = await Selector('#inputPassword')
  const privacyInputLabel = await Selector('#labelPrivacyDisclaimer')
  const button = await Selector('#buttonSignup')

  // Fill in the form
  await testController
    .typeText(emailInput, 'e2e-test@coinaly.io')
    .typeText(passwordInput, 'testtest')
    .click(privacyInputLabel, {offsetX: 1, offsetY: 1})
    .click(button)

  // Check if creation is successful
  const location = await getWindowLocation()

  await testController
    .expect(location.pathname).eql('/signup/success')
})

test('Should show success when verification succeeds', async testController => {
  await testController
    .navigateTo('https://transip.email/')

  const inputEmail = await Selector('#rcmloginuser_tip')
  const inputPassword = await Selector('#rcmloginpwd_tip')
  const button = await Selector('#btnId')

  // Fill in the form
  await testController
    .typeText(inputEmail, 'e2e-test@coinaly.io')
    .typeText(inputPassword, '2LV[t2Pn?[3U9+Ym74L4j6Vj4PDe2^')
    .click(button)

  // Find the new email
  const firstNewMessage = await Selector('.message.unread:first-child a', {visibilityCheck: true})

  await testController
    .doubleClick(firstNewMessage)
  
  const messageBody = await Selector('#messagebody', {visibilityCheck: true})
  const verificationLink = await Selector('#verificationLink', {visibilityCheck: true}).getAttribute('href')

  await testController
    .navigateTo(verificationLink)

  const titleSelector = await Selector('h1')

  await testController
    .expect(titleSelector.innerText).contains(`Account verified`)
})
.after( async testController => {
  await deleteE2EUser()
})

test('Should show an error when verification failed', async testController => {
  await testController
    .navigateTo('/signup/verify/123456789ABCDEFG')

  const titleSelector = await Selector('h1')
  await testController
    .expect(titleSelector.innerText).contains(`Verification failed`)

  const alert = await Selector('.alert')
  await testController
    .expect(alert.count).eql(1)
})

test('Should navigate the user to the privacy page when clicking the privacy link', async testController => {
  const privacyLink = await Selector('#privacyLink')

  await testController
    .click(privacyLink)
  
  const location = await getWindowLocation()

  await testController
    .expect(location.pathname).eql('/privacy')
})

test('Should navigate the user to the disclaimer page when clicking the disclaimer link', async testController => {
  const disclaimerLink = await Selector('#disclaimerLink')
  
  await testController
    .click(disclaimerLink)

  const location = await getWindowLocation()

  await testController
    .expect(location.pathname).eql('/disclaimer')
})

test('Should navigate the user to the login page when clicking the login link', async testController => {
  const loginLink = await Selector('#loginLink')
  
  await testController
    .click(loginLink)

  const location = await getWindowLocation()

  await testController
    .expect(location.pathname).eql('/login')
})