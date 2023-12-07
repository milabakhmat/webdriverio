const { describe, it } = require("mocha");

const loginData = require("../../data/login.json");

const loginPage = require("../../pageObject/loginPage");

const shoppingCart = require("../../pageObject/shoppingCart");

const inventoryPage = require("../../pageObject/inventoryPage");

describe("saucedemo website test 2", () => {
  it("should log in and redirect the user to Products page", async () => {
    await loginPage.opener();
    await loginPage.signIn(loginData.valid.userName, loginData.valid.password);
    await expect(inventoryPage.productTitle).toBeDisplayed();
  });

  it("should add the first product to the cart by clicking Add to Cart button", async () => {
    await inventoryPage.selectItem();
    inventoryPage.shoppingCartBadge.isEqual(1);
  });

  it("should display the chosen item in the shopping cart and compare the added item with the Inv page", async () => {
    await inventoryPage.openCart();

    const itemInCart = shoppingCart.removeBtns[0].getText();
    await expect(itemInCart).toEqual(inventoryPage.removeBtns[0].getText());
  });

  it("should remove the backpack", async () => {
    await shoppingCart.removeBtns[0].click();
  });

  it("should check that the cart is empty", async () => {
    await $(".removed_cart_item").isExisting();
  });

  it("should be no items available in the Shopping Cart", async () => {
    await shoppingCart.opener();
    const numberOfDivsinEmptyCart = await $$(".cart_list>div");
    await expect(numberOfDivsinEmptyCart).toBeElementsArrayOfSize(2);
  });
});
