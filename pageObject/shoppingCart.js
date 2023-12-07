const Page = require("./page");

class ShoppingCart extends Page {

    get removeBtns(){
        return $$("[id^='remove-sauce-labs']");
    }

     async opener() {
        await super.open("cart.html");
    }

}


module.exports = new ShoppingCart();
