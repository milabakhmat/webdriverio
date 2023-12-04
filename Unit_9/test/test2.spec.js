const { describe, it } = require("mocha");

const loginData = require("../../data/login.json");

const loginPage = require("../../pageObject/loginPage");

const shoppingCart = require("../../pageObject/shoppingCart");

const inventoryPage = require("../../pageObject/inventoryPage");

describe("saucedemo website test 2", () => {
  it("should log in and redirect the user to Products page", async () => {
    await loginPage.openSite();
    await loginPage.signIn(loginData.valid.userName, loginData.valid.password);
    await expect(inventoryPage.productTitle).toBeDisplayed();
  });

  it("should add the first product to the cart by clicking Add to Cart button", async () => {
    await inventoryPage.selectBackpack();
    inventoryPage.shoppingCartBadge.isEqual(1);
  });

  it("should display the chosen item in the shopping cart and compare the added item with the Inv page", async () => {
    await inventoryPage.openCart();

    const itemInCart = shoppingCart.removeBackpackBtn.getText();
    await expect(itemInCart).toEqual(inventoryPage.removeBackpackBtn.getText());
  });

  it("should remove the backpack", async () => {
    await shoppingCart.removeBackpackBtn.click();
  });

  it("should check that the cart is empty", async () => {
    await $(".removed_cart_item").isExisting();
  });

  it("should be no items available in the Shopping Cart", async () => {
    await browser.url("https://www.saucedemo.com/cart.html");
    const numberOfDivsinEmptyCart = await $$(".cart_list>div");
    await expect(numberOfDivsinEmptyCart).toBeElementsArrayOfSize(2);
  });
});
