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
    
  });

  it("Test korpe", async function () {
    await driver.sleep(2000);
    await driver.get("https://iqmobile.ba/shop/satovi/redmi-watch-4/");


    let increaseQuantityButton = await driver.wait(
      until.elementLocated(By.css('span.quantity-button.quantity-up.plus')),
      15000 
    );

    
    await increaseQuantityButton.click(); 
    
    
    let addToCartButton = await driver.wait(
      until.elementLocated(By.xpath('//button[@name="add-to-cart" and @value="43851"]')),
      15000 
    );

    await driver.sleep(5000);
    
    await driver.wait(until.elementIsVisible(addToCartButton), 15000);
    await driver.wait(until.elementIsEnabled(addToCartButton), 15000);
    await addToCartButton.click();

    let removeProductLink = await driver.wait(
      until.elementLocated(By.xpath('//a[@aria-label="Ukloni Redmi Watch 4 iz košarice"]')),
      15000 
    );
    
    await driver.wait(until.elementIsVisible(removeProductLink), 15000); 
    await driver.wait(until.elementIsEnabled(removeProductLink), 15000); 
    await removeProductLink.click(); 

    await driver.sleep(5000);

    let emptyBasketTextElement = await driver.wait(
      until.elementLocated(
        By.xpath("//p[@class='woocommerce-mini-cart__empty-message']"),
        15000
      )
    );
    await driver.wait(until.elementIsVisible(emptyBasketTextElement), 15000);

    let emptyBasketText = await emptyBasketTextElement.getText();
    expect(emptyBasketText).to.equal("Nema proizvoda u košarici.");

    await driver.sleep(2000);
  });

   after(async function () {
    await driver.quit();
  });
});
