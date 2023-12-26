const Page = require("./page");

class ShoppingCart extends Page {
  get itemsInCartTitles() {
    return $$(".inventory_item_name");
  }

  get arrayOfTitles() {
    return this.itemsInCartTitles.map((e) => e.getText());
  }

  get itemsInCartPrices() {
    return $$(".inventory_item_price");
  }

  get arrayOfPrices() {
    return this.itemsInCartPrices
      .map((e) => e.getText())
      .map((e) => e.slice(1))
      .map((e) => parseFloat(e));
  }

  get itemsInCartDesc() {
    return $$(".inventory_item_desc");
  }

  get arrayOfDescr() {
    return this.itemsInCartDesc.map((e) => e.getText());
  }

  get checkout() {
    return $("button[data-test='checkout']");
  }

  get removeBtns() {
    return $$("[id^='remove-']");
  }

  get removeBtn() {
    return $("[id^='remove-']");
  }

  get removedItem() {
    return $(".removed_cart_item");
  }

  get numberOfDivsInEmptyCart() {
    return $$(".cart_list>div");
  }

  open() {
    super.open("cart.html");
  }
}


module.exports = new ShoppingCart();
