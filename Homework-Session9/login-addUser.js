const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
const { bytes } = require("stream/consumers");

describe("Login", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();

    await driver.manage().window().maximize();
  });

  after(async function () {
    await driver.quit();
  });
  it("Login", async function () {
    await driver.get("https://belajar-bareng.onrender.com/users");

    let usernameInput = await driver.findElement(
      By.css('[data-testid="username-input"]'),
    );
    let passwordInput = await driver.findElement(
      By.css('[data-testid="password-input"]'),
    );

    await usernameInput.sendKeys("admin");
    await passwordInput.sendKeys("admin");

    let loginButton = await driver.findElement(
      By.css('[data-testid="login-button"]'),
    );

    await loginButton.click();

    let listUsers = await driver.wait(
      until.elementLocated(By.css("h2")),
      10000,
    );

    let listUsersText = await listUsers.getText();

    assert.strictEqual(listUsersText, "List Users");
  });

  it("Add User", async function () {
    let addButton = await driver.wait(
      until.elementLocated(By.css('[data-testid="add-button"]')),
      10000,
    );

    await addButton.click();

    let usernameInput = await driver.findElement(
      By.css('[data-testid="username-input"]'),
    );
    let ageInput = await driver.findElement(
      By.css('[data-testid="age-input"]'),
    );
    await usernameInput.sendKeys("Automation");
    await ageInput.sendKeys("90");

    let submitButton = await driver.findElement(
      By.css('[data-testid="submit-button"]'),
    );

    await submitButton.click();

    let successAdd = await driver.wait(
      until.elementLocated(By.xpath("//*[@id='top-right']")),
      10000,
    );

    await successAdd.isDisplayed();
  });
});
