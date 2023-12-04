const Page = require("./page");

//import Page from "./page";

class LoginPage extends Page {
    get userNameTextField() { return $("#user-name");}
    get passwordTextField() { return $("#password");}
    get loginBtn() { return $("#login-button");}
    
    async signIn(userName, password) {
        await this.userNameTextField.setValue(userName);
        await this.passwordTextField.setValue(password);
        await this.loginBtn.click();
    }

    async openSite() {
        await browser.url(
          "https://www.saucedemo.com/"
        );
    }
}

module.exports = new LoginPage();
//export default new loginPage();