const Page = require("./page");

class ShoppingCart extends Page {

    get removeBackpackBtn(){
        return $("#remove-sauce-labs-backpack");
    }

    


}


module.exports = new ShoppingCart();
