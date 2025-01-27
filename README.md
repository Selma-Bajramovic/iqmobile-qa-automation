# Selenium Testing for IQ Mobile

This project contains Selenium WebDriver tests for the IQ Mobile website. The tests are implemented in JavaScript using the Selenium WebDriver library and Chai for assertions. These automated tests cover the following functionalities:

## Features

### Login Test (`Test prijave`)
- Verifies the login process using valid credentials.
- Asserts the welcome message upon successful login.

### Account Information Update (`Test promjene informacija`)
- Updates account details, such as the first name, last name, and display name.
- Verifies that the changes are successfully saved with a confirmation message.

### Shopping Cart Test (`Test korpe`)
- Adds a product to the cart.
- Removes the product from the cart.
- Asserts the empty cart message.

### Product Filtering (`Test filtriranja`)
- Searches for products (e.g., "iPhone").
- Applies filters such as brand ("Apple") and sorting by price (highest to lowest).
- Navigates to the second page of search results.

## Prerequisites

- [Node.js](https://nodejs.org/) installed.
- A supported browser (Microsoft Edge in this case).
- Selenium WebDriver library and Chai for assertions installed via npm:
  ```bash
  npm install selenium-webdriver chai
  ```

## Project Structure

- **Login Test**: Located in `test_login` function. Handles authentication scenarios.
- **Account Management Test**: Located in `test_account_changes` function. Handles user account details update.
- **Cart Management Test**: Tests shopping cart interactions like adding and removing items.
- **Filtering and Search Test**: Located in `test_filtering` function. Tests the search and filter features of the website.

## Getting Started

1. Clone this repository:
   ```bash
   git clone https://github.com/Selma-Bajramovic/iqmobile-qa-automation.git
   cd iqmobile-qa-automation.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the tests:
   ```bash
   npm test
   ```

## Implementation Details

### Example Test
Below is an example of a login test:

```javascript
it("Test prijave", async function () {
    let usernameInput = await driver.findElement(By.xpath('//input[@name="username"]'));
    await usernameInput.sendKeys("metodeformalne@gmail.com");

    let passwordInput = await driver.findElement(By.xpath('//input[@name="password"]'));
    await passwordInput.sendKeys("Markmarkez123!");

    let loginButton = await driver.findElement(By.xpath('//button[@value="Prijava"]'));
    await loginButton.click();

    let welcomeTextElement = await driver.findElement(By.xpath('//strong[text()="Testiramo444"]'));
    expect(await welcomeTextElement.getText()).to.equal("Testiramo444");
});
```

## Notes

- All credentials and sensitive information should be handled securely.
- These tests were written for the IQ Mobile website as part of a demonstration for Selenium testing.
- Ensure that all locators (e.g., XPaths) are updated if there are changes to the website's DOM structure.
