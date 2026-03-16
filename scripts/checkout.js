import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/backend-practice.js';
// import '../data/cart-class.js';
// import '../data/car.js'



// function loadPage() {
//   return new Promise((resolve) => {
//     console.log('load page');
//     resolve();

//   }).then(() => {
//     return loadProductsFetch();

//   }).then(() => {
//     return new Promise((resolve) => {
//       resolve('value2');
//     });
//   });
// }

// The async code below is the same as the one being commented above
async function loadPage() {
  try {
    // throw 'error1'; 

    await loadProductsFetch();

    const value = await new Promise((resolve, reject) => {
      // throw 'error2';

      loadCart(() => {
        // reject('error3');

        resolve('value3');
      });
    });

  } catch (error) {
    // Error handling
    console.log('Unexpected error. Please try again later.');
  }
  
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
}

loadPage();



// Promise.all([
//   loadProductsFetch(), /* This returns a promise */

//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve('value2');
//     });
//   })

// ]).then((values) => {
//   console.log(values);

//   renderOrderSummary();
//   renderPaymentSummary();
//   renderCheckoutHeader();
// });



// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve('value1');
//   });

// }).then((value) => {
//   console.log(value);

//   return new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     });
//   });

// }).then(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
//   renderCheckoutHeader();
// })



// loadProducts(() => {
//   loadCart(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//     renderCheckoutHeader();
//   });
// });
