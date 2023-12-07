const Page = require("./page");

class InventoryPage extends Page {
  get productTitle() {
    return $(".header_secondary_container>span");
  }

  get itemsDisplayed() {
    return $$(".inventory_item");
  }

  get allBtns() {
    return $$("[id^='add-to-cart-sauce-labs']");
  }

  get removeBtns() {
    return $("[id^='remove-sauce-labs']");
  }

  get shoppingCart() {
    return $("a.shopping_cart_link");
  }

  get shoppingCartBadge() {
    return $(".shopping_cart_badge");
  }

  get cartBtn() {
    return $(".shopping_cart_link");
  }

  async opener() {
    await super.open("inventory.html");
  }

  async selectItem() {
    await this.allBtns[0].click();
  }
  async openCart() {
    await this.cartBtn.click();
  }
}

module.exports = new InventoryPage();
