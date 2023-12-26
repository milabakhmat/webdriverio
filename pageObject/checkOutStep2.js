const Page = require("./page");

class CheckoutStep2 extends Page {
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
}

module.exports = new CheckoutStep2();