const Page = require("./page");

class InventoryPage extends Page {
  open() {
    super.open("inventory.html");
  }
  get productTitle() {
    return $(".header_secondary_container>span");
  }

  get itemsDisplayed() {
    return $$(".inventory_item");
  }

  get itemTitles(){
    return $$(".inventory_item_name");
  }

  get arrayOfTitles(){
    return this.itemTitles.map((e) => e.getText()); 
  }

  get itemPrices(){
    return $$(".inventory_item_price");
  }

  get arrayOfPrices() {
    return this.itemPrices
      .map((e) => e.getText())
      .map((e) => e.slice(1))
      .map((e) => parseFloat(e));
  }


  get itemDescrs() {
    return $$(".inventory_item_desc");
  }

  get arrayOfDescr(){
    return this.itemDescrs.map((e) => e.getText());
  }

  get onesieTitle(){
    return $(".inventory_item_name");
  }

  get allBtns() {
    return $$("[id^='add-to-cart']");
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

  get sorter() {
    return $(".product_sort_container");
  }

  async sortedArray(cat) {

    const alphAscSorted = await this.itemTitles.map((e) => e.getText()).sort();
    const arrayOfPrices = await this.itemPrices
      .map((e) => e.getText())
      .map((e) => e.slice(1))
      .map((e) => parseFloat(e));
    
    if (cat === 'az') {
      await  alphAscSorted;
    } else if (cat === 'za') {
      await  alphAscSorted.reverse();
    } else if (cat === 'lohi') {
      await  arrayOfPrices.sort((a, b) => a - b);
    } else if (cat === 'hilo') {
      await  arrayOfPrices.sort((a, b) => b - a);
    }
  }
  
  sortByOption(cat){
    switch (cat) {
      case "az":
        return $("option[value='az']");
        break;
      case "za":
        return $("option[value='za']");
        break;
      case "lohi":
        return $("option[value='lohi']");
        break;
      case "hilo":
        return $("option[value='hilo']");
        break;
    }
  return `${this.sorter}>${cat}`
  }

  async selectItem(index) {
    await this.allBtns[index].click();
  }
  async openCart() {
    await this.cartBtn.click();
  }
}

module.exports = new InventoryPage();
