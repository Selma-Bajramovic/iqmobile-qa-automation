import { Browser, Builder, By, until } from "selenium-webdriver";
import { expect } from "chai";

describe("Prijava", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser(Browser.EDGE).build();
  });
  beforeEach(async function () {
    this.timeout(15000);
    await driver.get("https://iqmobile.ba");

    await driver.manage().window().maximize();
   
    let myAccountLink = await driver.wait(
      until.elementLocated(By.xpath('//a[@href="https://iqmobile.ba/my-account/"]')),
      15000
    );
    await driver.wait(until.elementIsVisible(myAccountLink), 15000);
    await driver.wait(until.elementIsEnabled(myAccountLink), 15000);
    await myAccountLink.click();
    
    
  });
  it("Test promjene informacija", async function () {
    await driver.sleep(2000);
    let usernameInput = await driver.wait(
      until.elementLocated(By.xpath('//input[@name="username"]')),
      15000
    );

    await driver.wait(until.elementIsVisible(usernameInput), 15000);
    await driver.wait(until.elementIsEnabled(usernameInput), 15000);
    await usernameInput.click();
    await usernameInput.clear();
    await usernameInput.sendKeys("metodeformalne@gmail.com");

    let passwordInput = await driver.findElement(
      By.xpath('//input[@name="password"]'),
      15000
    );
    await passwordInput.click();
    await passwordInput.clear();
    await passwordInput.sendKeys("Markmarkez123!");

    let loginButton = await driver.wait(
      until.elementLocated(By.xpath('//button[@value="Prijava"]')),
      15000
    );
    await driver.wait(until.elementIsVisible(loginButton), 15000);
    await driver.wait(until.elementIsEnabled(loginButton), 15000);
    await loginButton.click();

    let accountDetailsLink = await driver.wait(
      until.elementLocated(By.xpath('//a[@href="https://iqmobile.ba/my-account/edit-account/"]')),
      15000
    );
    await driver.wait(until.elementIsVisible(accountDetailsLink), 15000);
    await driver.wait(until.elementIsEnabled(accountDetailsLink), 15000);
    await accountDetailsLink.click();

    let changeName = await driver.findElement(
      By.xpath('//input[@name="account_first_name"]'),
      15000
    );
    await changeName.click();
    await changeName.clear();
    await changeName.sendKeys("Testiramo4");   

    let changeLastName = await driver.findElement(
      By.xpath('//input[@name="account_last_name"]'),
      15000
    );
    await changeLastName.click();
    await changeLastName.clear();
    await changeLastName.sendKeys("Testiramo44"); 

    let changeDisplayName = await driver.findElement(
      By.xpath('//input[@name="account_display_name"]'),
      15000
    );
    await changeDisplayName.click();
    await changeDisplayName.clear();
    await changeDisplayName.sendKeys("Testiramo444"); 

    let saveChangesButton = await driver.wait(
      until.elementLocated(By.xpath('//button[@name="save_account_details" and @value="Spremi promjene"]')),
      15000
    );
    
    await driver.executeScript("arguments[0].click();", saveChangesButton); 
    await driver.sleep(10000);
    
    let correctTextElement =await driver.findElement(By.css(".woocommerce-message"));
    await driver.wait(until.elementIsVisible(correctTextElement), 15000);

    let correctText = await correctTextElement.getText();
    expect(correctText).to.equal("Detalji računa uspješno uređeni.");
  });

  after(async function () {
    await driver.quit();
  });
});
