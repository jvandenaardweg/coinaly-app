require('dotenv').config()

import { Selector, ClientFunction } from 'testcafe'
import http from 'http'

const getWindowLocation = ClientFunction(() => window.location)

function deleteE2EUser () {
  return http.get('http://localhost:5000/users/delete/e2e')
}

fixture `Login forgot page`
  .page `http://localhost:8080/login/forgot`

test('Title contains "Reset your password"', async testController => {
  const titleSelector = await Selector('h1')
  await testController.expect(titleSelector.innerText).eql('Reset your password')
})

test('Should show error messages when required fields are empty', async testController => {
  const button = await Selector('#buttonReset')
  await testController
    .click(button)

  const errorMessages = await Selector('.invalid-feedback')
  await testController
    .expect(errorMessages.count).eql(1)
})

test('Should show an error message when email does not exist', async testController => {
  const emailInput = await Selector('#inputEmail')
  const button = await Selector('#buttonReset')
  await testController
    .typeText(emailInput, 'e2e-not-exist@coinaly.io')
    .click(button)

  const alert = await Selector('.alert-danger')
  await testController
    .expect(alert.count).eql(1)
})

test('Should submit the form when everything is filled in correctly', async testController => {
  const emailInput = await Selector('#inputEmail')
  const button = await Selector('#buttonReset')

  // Fill in the form
  await testController
    .typeText(emailInput, process.env.E2E_RESET_EMAIL_ACCOUNT)
    .click(button)

  const alert = await Selector('.alert-success')
  await testController
    .expect(alert.count).eql(1)
})

test('Should show success when reset succeeds', async testController => {
  await testController
    .navigateTo('https://transip.email/')

  const inputEmail = await Selector('#rcmloginuser_tip')
  const inputPassword = await Selector('#rcmloginpwd_tip')
  const button = await Selector('#btnId')

  // Fill in the form
  await testController
    .wait(5000) // Wait a little so we know for sure the email arrived
    .typeText(inputEmail, process.env.E2E_RESET_EMAIL_ACCOUNT)
    .typeText(inputPassword, process.env.E2E_RESET_PASSWORD_ACCOUNT)
    .click(button)

  // Find the new email
  const firstNewMessage = await Selector('.message.unread:first-child a', {visibilityCheck: true})

  await testController
    .doubleClick(firstNewMessage)
  
  const messageBody = await Selector('#messagebody', {visibilityCheck: true})
  const resetPasswordLink = await Selector('#resetPasswordLink', {visibilityCheck: true}).getAttribute('href')

  await testController
    .navigateTo(resetPasswordLink)

  const titleSelector = await Selector('h1')

  const passwordInput = await Selector('#inputPassword')
  const buttonSave = await Selector('#buttonSave')

  // Fill in the form
  await testController
    .typeText(passwordInput, process.env.E2E_PASSWORD)
    .click(buttonSave)

  const alert = await Selector('.alert-success')
  await testController
    .expect(alert.count).eql(1)

})

test('Should log in now with the new password', async testController => {
  await testController
    .navigateTo('http://localhost:8080/login')

  const emailInput = await Selector('#inputEmail')
  const passwordInput = await Selector('#inputPassword')
  const button = await Selector('#buttonLogin')
  await testController
    .typeText(emailInput, process.env.E2E_RESET_EMAIL_ACCOUNT)
    .typeText(passwordInput, process.env.E2E_PASSWORD)
    .click(button)

  const errorMessages = await Selector('.invalid-feedback')
  await testController
    .expect(errorMessages.count).eql(0)

  const location = await getWindowLocation()

  await testController
    .expect(location.pathname).eql('/')
})
  