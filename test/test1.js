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
  it("Test prijave", async function () {
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
    await driver.sleep(5000);

    let welcomeTextElement = await driver.wait(
      until.elementLocated(
        By.xpath('//strong[text()="Testiramo444"]'),
        15000
      )
    );
    await driver.wait(until.elementIsVisible(welcomeTextElement), 15000);

    let welcomeText = await welcomeTextElement.getText();
    expect(welcomeText).to.equal("Testiramo444");
  });

  afterEach(async function () {
    await driver.quit();
  });
});
