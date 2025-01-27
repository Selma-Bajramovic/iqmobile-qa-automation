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

  it("Test placanja na rate", async function () {
    await driver.sleep(2000);
    await driver.get("https://iqmobile.ba/shop/satovi/redmi-watch-4/");

    const rateLink = await driver.findElement(By.xpath("//a[text()='Naruči na rate sada!']"));
    await rateLink.click();

    const nameField = await driver.findElement(By.name("Ime"));
    await nameField.sendKeys("Marko");

    const lastNameField = await driver.findElement(By.name("Prezime"));
    await lastNameField.sendKeys("Markovic");

    const fatsherNameField = await driver.findElement(By.name("ime-oca"));
    await fatsherNameField.sendKeys("Janko");

    const cityField = await driver.findElement(By.name("grad"));
    await cityField.sendKeys("Sarajevo");

    const zipField = await driver.findElement(By.name("postanski"));
    await zipField.sendKeys("71000");

    const streetField = await driver.findElement(By.name("adresa"));
    await streetField.sendKeys("BB");

    const phoneField = await driver.findElement(By.name("telefon"));
    await phoneField.sendKeys("065123123");

    const emailField = await driver.findElement(By.name("email"));
    await emailField.sendKeys("metodeformalne@gmail.com");

    const dropdown1 = await driver.findElement(By.xpath("//select[@name='radni-odnos']"));
    await dropdown1.sendKeys("Nezaposlen/a");

    const dropdown2 = await driver.findElement(By.xpath("//select[@name='redovna-primanja']"));
    await dropdown2.sendKeys("Ne");

    const dropdown3 = await driver.findElement(By.xpath("//select[@name='broj-rata']"));
    await dropdown3.sendKeys("Broj rata: 12");

    const exactNameField = await driver.findElement(By.name("tocan-naziv"));
    await exactNameField.sendKeys("redmi watch 4");

    const submitButton = await driver.findElement(By.css(".wpcf7-form-control.wpcf7-submit.has-spinner"));
    await driver.executeScript("arguments[0].click();", submitButton);

    //Namjerno nije unijet jmbg da ne bi slali testne zahtjeve te tako ometali IQ mobile

    let sendTextElement = await driver.wait(
      until.elementLocated(
        By.xpath("//div[@class='wpcf7-response-output']"),
        15000
      )
    );
    await driver.wait(until.elementIsVisible(sendTextElement), 15000);

    let sendText = await sendTextElement.getText();
    expect(sendText).to.equal("Jedno ili više polja sadrži greške. Provjerite i pokušajte ponovno.");
      await driver.sleep(3000);
  });

   after(async function () {
    await driver.quit();
  });
});
