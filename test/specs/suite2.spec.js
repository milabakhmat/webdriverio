const { describe, it } = require("mocha");

const loginData = require("../../data/login.json");

const loginPage = require("../../pageObject/loginPage");

const inventoryPage = require("../../pageObject/inventoryPage");

const shoppingCart = require("../../pageObject/shoppingCart");
const checkOutStep1 = require("../../pageObject/checkOutStep1");
const checkOutStep2 = require("../../pageObject/checkOutStep2");

describe("WDIO-Home-Task-2-06-18", () => {
  beforeEach("login and redirection to the inv page", async () => {
    await loginPage.open();
    await loginPage.signIn(loginData.valid.userName, loginData.valid.password);
    await expect(inventoryPage.productTitle).toBeDisplayed();
  });

  it("should perform and verify high-low sorting on the Inventory page", async () => {
    const arrayOfTitlesInv = await inventoryPage.arrayOfTitles.sort();
    
    const arrayOfPricesInv = await inventoryPage.arrayOfPrices
    const az = await arrayOfTitlesInv;
    const za = await arrayOfTitlesInv.reverse();
    const lohi = await arrayOfPricesInv.sort((a, b) => a - b);
    const hilo = await arrayOfPricesInv.sort((a, b) => b - a);

    await inventoryPage.sortByOption("hilo").click();

    const itemTitles = await inventoryPage.arrayOfTitles;
    const itemPrices = await inventoryPage.arrayOfPrices;

    await expect(itemPrices).toEqual(hilo);
  });

  it("should verify that products added to the shopping cart are displayed correctly", async() => {
    let randomIndex1 = Math.floor(Math.random() * 6);
    let randomIndex2 = Math.floor(Math.random() * 5);
    let randomIndex3 = Math.floor(Math.random() * 4);

    let arrayOfAdded = [];
    let obj1 = {
      title: await inventoryPage.arrayOfTitles[randomIndex1],
      price: await inventoryPage.arrayOfPrices[randomIndex1],
      descr: await inventoryPage.arrayOfDescr[randomIndex1],
    };
    let obj2 = {
      title: await inventoryPage.arrayOfTitles[randomIndex2],
      price: await inventoryPage.arrayOfPrices[randomIndex2],
      descr: await inventoryPage.arrayOfDescr[randomIndex2],
    };
    let obj3 = {
      title: await inventoryPage.arrayOfTitles[randomIndex3],
      price: await inventoryPage.arrayOfPrices[randomIndex3],
      descr: await inventoryPage.arrayOfDescr[randomIndex3],
    };

    arrayOfAdded.push(obj1);

    await inventoryPage.selectItem(randomIndex1);

    if (randomIndex1 != randomIndex2) {
      arrayOfAdded.push(obj2);
      await inventoryPage.selectItem(randomIndex2);
    } else if (randomIndex1 != randomIndex3) {
      arrayOfAdded.push(obj3);
      await inventoryPage.selectItem(randomIndex3);
    }

    let invArrayLength = arrayOfAdded.length;

    await inventoryPage.cartBtn.click();
    
    let arrayOfAddedInCart = [];

    for (let i = 0; i < invArrayLength; i++) {
      let objCart = {
        title: await shoppingCart.arrayOfTitles[i],

        price: await shoppingCart.arrayOfPrices[i],

        descr: await shoppingCart.arrayOfDescr[i],
      };

      arrayOfAddedInCart.push(objCart);
    }

    await expect(arrayOfAdded).toMatchObject(arrayOfAddedInCart);

    for (let i = 0; i < invArrayLength; i++) {
      await shoppingCart.removeBtn.click();
    }
  });
  it("should verify calculated price", async () => {
    let randomIndex1 = Math.floor(Math.random() * 6);
    let randomIndex2 = Math.floor(Math.random() * 5);
    let randomIndex3 = Math.floor(Math.random() * 4);
    let arrayOfAdded = [];
    let obj1 = {
      title: await inventoryPage.arrayOfTitles[randomIndex1],
      price: await inventoryPage.arrayOfPrices[randomIndex1],
      descr: await inventoryPage.arrayOfDescr[randomIndex1],
    };
    let obj2 = {
      title: await inventoryPage.arrayOfTitles[randomIndex2],
      price: await inventoryPage.arrayOfPrices[randomIndex2],
      descr: await inventoryPage.arrayOfDescr[randomIndex2],
    };
    let obj3 = {
      title: await inventoryPage.arrayOfTitles[randomIndex3],
      price: await inventoryPage.arrayOfPrices[randomIndex3],
      descr: await inventoryPage.arrayOfDescr[randomIndex3],
    };

    arrayOfAdded.push(obj1);

    await inventoryPage.selectItem(randomIndex1);
    
    if (randomIndex1 != randomIndex2) {
      arrayOfAdded.push(obj2);
      await inventoryPage.selectItem(randomIndex2);
      
    } else if (randomIndex1 != randomIndex3) {
      arrayOfAdded.push(obj3);
      await inventoryPage.selectItem(randomIndex3);
    }

    let totalAddedInvPage = arrayOfAdded.reduce(
      (acc, item) => acc + item.price,
      0
    );

    let invArrayLength = arrayOfAdded.length;
    await inventoryPage.cartBtn.click();

    await shoppingCart.checkout.click();

    await checkOutStep1.senderData(
      loginData.senderData.firstName,
      loginData.senderData.lastName,
      loginData.senderData.zip
    );

     let arrayOfAddedChOutStep2 = [];

    for (let i = 0; i < invArrayLength; i++) {
      let objCart = {
        title: await checkOutStep2.arrayOfTitles[i],

        price: await checkOutStep2.arrayOfPrices[i],

        descr: await checkOutStep2.arrayOfDescr[i],
      };

      arrayOfAddedChOutStep2.push(objCart);
    }

    await expect(arrayOfAdded).toMatchObject(arrayOfAddedChOutStep2);

     let totalAddedChOutStep2 = arrayOfAddedChOutStep2.reduce(
       (acc, item) => acc + item.price,
       0
     );

     await expect(totalAddedInvPage).toEqual(totalAddedChOutStep2);
    })
});
