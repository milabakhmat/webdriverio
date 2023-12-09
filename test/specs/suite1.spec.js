const { describe, it } = require("mocha");

const loginData = require("../../data/login.json");

const loginPage = require("../../pageObject/loginPage");

const inventoryPage = require("../../pageObject/inventoryPage");

const shoppingCart = require("../../pageObject/shoppingCart");

describe("saucedemo website test 1", () => {
  beforeEach("login and redirection to the inv page", async () => {
    await loginPage.open();
    await loginPage.signIn(loginData.valid.userName, loginData.valid.password);
    await expect(inventoryPage.productTitle).toBeDisplayed();
  });

  it("inv page should have a Shopping Cart icon and more than 3 product displayed", async () => {
    expect(inventoryPage.shoppingCart).toBeDisplayed();
    await expect(inventoryPage.itemsDisplayed).toBeElementsArrayOfSize({
      gte: 3,
    });
  });

  it("should add the first item to the cart, display it in the cart and compare with the Inv page; then remove the backpack and check that the cart is empty", async () => {
    await inventoryPage.selectItem(0);
    inventoryPage.shoppingCartBadge.isEqual(1);

    //const to contain 0 item Name on the inv page -> to later assert with the item in the shopping cart
    const addedItem = inventoryPage.itemsDisplayed[0].getText();

    //display it in the cart and compare with the Inv page
    await inventoryPage.openCart();

    const itemInCart = shoppingCart.itemsInCart[0].getText();
    await expect(itemInCart).toEqual(addedItem);

    //remove the backpack and check that the cart is empty
    await shoppingCart.removeBtns[0].click();

    await shoppingCart.removedItem.isExisting();

    await shoppingCart.open();
    const numberOfDivsInEmptyCart = shoppingCart.numberOfDivsInEmptyCart;
    await expect(numberOfDivsInEmptyCart).toBeElementsArrayOfSize(2);

    //expect(actRes).expRes
  });
});
