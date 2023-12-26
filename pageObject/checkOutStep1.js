const Page = require("./page");

class CheckoutStep1 extends Page {
  get firstNameTextField() {
    return $("input[id='first-name']");
  }

  get lastNameTextField() {
    return $("input[id='last-name']");
  }

  get zipTextField() {
    return $("input[id='postal-code']");
  }

  get continueBtn() {
    return $("input[id='continue']");
  }

  async senderData(firstName, lastName, zip) {
    await this.firstNameTextField.setValue(firstName);
    await this.lastNameTextField.setValue(lastName);
    await this.zipTextField.setValue(zip);
    await this.continueBtn.click();
  }

  open() {
    super.open("");
  }
}

module.exports = new CheckoutStep1();