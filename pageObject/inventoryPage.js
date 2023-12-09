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

  //allBtns = $$("[id^='add-to-cart-sauce-labs']"); for Playwright

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

  open() {
    super.open("inventory.html");
  }

  async selectItem(index) {
    await this.allBtns[index].click();
  }
  async openCart() {
    await this.cartBtn.click();
  }
}

module.exports = new InventoryPage();
