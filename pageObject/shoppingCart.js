const Page = require("./page");

class ShoppingCart extends Page {
  get itemsInCart() {
    return $$("[id^='inventory_item_name']");
  }

  get removeBtns() {
    return $$("[id^='remove-sauce-labs']");
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
