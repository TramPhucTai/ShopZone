import { getOrder }
  from '../data/orders.js';

import {
  getProduct,
  loadProductsFetch
} from '../data/products.js';

import { formatCurrency }
  from './utils/money.js';

const url = new URL(window.location.href);

const orderId =
  url.searchParams.get('id');

async function loadPage() {

  // LOAD PRODUCTS FIRST
  await loadProductsFetch();

  const order = getOrder(orderId);

  if (!order) {

    document.querySelector('.js-receipt-container')
      .innerHTML =
      '<h2>Order not found.</h2>';

    return;
  }

  renderReceipt(order);
}

loadPage();

function renderReceipt(order) {

  let productsHTML = '';

  let totalCents = 0;

  order.products.forEach((productDetails) => {

    const product =
      getProduct(productDetails.productId);

    console.log(product);

    if (!product) {
      return;
    }

    const subtotal =
      product.priceCents *
      productDetails.quantity;

    totalCents += subtotal;

    productsHTML += `
    
      <div class="receipt-product">

        <img src="${product.image}">

        <div>

          <div>
            <strong>${product.name}</strong>
          </div>

          <div>
            Quantity:
            ${productDetails.quantity}
          </div>

          <div>
            Price:
            $${formatCurrency(product.priceCents)}
          </div>

          <div>
            Subtotal:
            $${formatCurrency(subtotal)}
          </div>

        </div>

      </div>
    `;
  });

  const taxCents = totalCents * 0.1;

  const finalTotal =
    totalCents + taxCents;

  document.querySelector('.js-receipt-container')
    .innerHTML =
    `
      <div class="receipt-card">

        <div class="receipt-title">
          Order Receipt
        </div>

        <div class="receipt-info">

          <div>
            <strong>Order ID:</strong>
            ${order.id}
          </div>

          <div>
            <strong>Transaction ID:</strong>
            ${order.transactionId}
          </div>

          <div>
            <strong>Customer:</strong>
            ${order.customerEmail}
          </div>

          <div>
            <strong>Status:</strong>
            ${order.status}
          </div>

          <div>
            <strong>Date:</strong>
            ${new Date(order.createdAt)
              .toLocaleString()}
          </div>

        </div>

        <div class="receipt-products">

          ${productsHTML}

        </div>

        <div class="receipt-total">

          Tax:
          $${formatCurrency(taxCents)}

          <br><br>

          Total:
          $${formatCurrency(finalTotal)}

        </div>

      </div>
    `;
}