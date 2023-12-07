const { describe, it } = require("mocha");

const loginPage = require("../../pageObject/loginPage");

const inventoryPage = require("../../pageObject/inventoryPage");

const loginData = require("../../data/login.json"); 

describe("saucedemo website test 1", () => {

  it("should log in and redirect the user to Products page", async () => {
    await loginPage.opener();
    await loginPage.signIn(loginData.valid.userName, loginData.valid.password);
    await expect(inventoryPage.productTitle).toBeDisplayed();
  });
  
  it("should have Shopping Cart icon displayed", () => {
    expect(inventoryPage.shoppingCart).toBeDisplayed();
  });

  it("should have more than 3 products displayed", async () => {
    await expect(inventoryPage.itemsDisplayed).toBeElementsArrayOfSize({ gte: 3 });
  });
});
