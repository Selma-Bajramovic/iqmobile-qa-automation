import { Browser, Builder, By, Key, until } from "selenium-webdriver";
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
  it("Test filtriranja", async function () {
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

    let searchField = await driver.wait(
      until.elementLocated(By.id('woocommerce-product-search-field-0')),
      15000 
    );

    await driver.wait(until.elementIsVisible(searchField), 15000); 
    await searchField.sendKeys("iphone"); 
    await driver.sleep(1000);
    await searchField.sendKeys(Key.RETURN);
    
    const link = await driver.findElement(By.linkText("Pametni telefoni"));
    await link.click();

    const spanElement = await driver.findElement(By.xpath("//span[text()='Apple']"));
    await driver.executeScript("arguments[0].click();", spanElement);

    const dropdown = await driver.findElement(By.xpath("//select[@name='orderby']"));
    await dropdown.sendKeys("Razvrstaj po cijeni: veće do manje");

    const page2Link = await driver.findElement(By.xpath("//a[@aria-label='Page 2' and contains(@class, 'page-numbers')]"));
    await page2Link.click();
    
  });

  afterEach(async function () {
    await driver.quit();
  });
});
