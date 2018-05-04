import { Selector, ClientFunction } from 'testcafe'

const getWindowLocation = ClientFunction(() => window.location)

fixture `Login page`
  .page `http://localhost:8080/login`

test('Title contains "Log In"', async testController => {
  const titleSelector = await Selector('h1')
  await testController.expect(titleSelector.innerText).eql('Log In')
})

test('Should show error message when credentials are empty', async testController => {
  const button = await Selector('#buttonLogin')
  await testController
    .click(button)

  const errorMessages = await Selector('.invalid-feedback')
  await testController
    .expect(errorMessages.count).eql(2)
})

test('Should show an error message when email does not exist', async testController => {
  const emailInput = await Selector('#inputEmail')
  const passwordInput = await Selector('#inputPassword')
  const button = await Selector('#buttonLogin')
  await testController
    .typeText(emailInput, 'does-not-exist@coinaly.io')
    .typeText(passwordInput, 'testtest')
    .click(button)

  const alert = await Selector('.alert')
  await testController
    .expect(alert.count).eql(1)
})

test('Should log a user in', async testController => {
  const emailInput = await Selector('#inputEmail')
  const passwordInput = await Selector('#inputPassword')
  const button = await Selector('#buttonLogin')
  await testController
    .typeText(emailInput, 'test@coinaly.io')
    .typeText(passwordInput, 'testtest')
    .click(button)
    .expect(button.innerText).eql('Success! Welcome back!')

  const errorMessages = await Selector('.invalid-feedback')
  await testController
    .expect(errorMessages.count).eql(0)
})

test('Should redirect the user to the signup page', async testController => {
  const signupLink = await Selector('#signupLink')

  await testController
    .click(signupLink)
  
  const location = await getWindowLocation()

  await testController
    .expect(location.pathname).eql('/signup')
})

test('Should redirect the user to the password forgot page', async testController => {
  const passwordForgotLink = await Selector('#passwordForgotLink')
  
  await testController
    .click(passwordForgotLink)

  const location = await getWindowLocation()

  await testController
    .expect(location.pathname).eql('/login/forgot')
})
