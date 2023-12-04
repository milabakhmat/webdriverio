const Page = require("./page");

class InventoryPage extends Page {
  get productTitle() {
    return $(".header_secondary_container>span");
  }

  get itemsDisplayed() {
    return $$(".inventory_item");
  }

  get removeBackpackBtn() {
    return $("#remove-sauce-labs-backpack");
  }

  get shoppingCart() {
    return $("a.shopping_cart_link");
  }

  get shoppingCartBadge() {
    return $("//span[@class='shopping_cart_badge'][text()=1]");
  }

  async openInventory() {
    await browser.url("https://www.saucedemo.com/inventory.html");
  }

  async selectBackpack() {
    await $("#add-to-cart-sauce-labs-backpack").click();
  }

  async openCart() {
    await $(".shopping_cart_link").click();
  }
}

module.exports = new InventoryPage();
