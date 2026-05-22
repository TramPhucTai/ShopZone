import { getProduct, loadProductsFetch } from '../data/products.js';
import { orders } from '../data/orders.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import formatCurrency from './utils/money.js';
import { addToCart } from '../data/cart.js';

async function loadPage() {
  await loadProductsFetch();

  let ordersHTML = '';

  if (orders.length === 0) {
    ordersHTML = '<p>No orders yet.</p>';
  }

  orders.forEach((order) => {
    const orderTimeString = dayjs(order.created_at || order.createdAt).format('MMMM D');
    const items = order.items || order.products || [];

    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTimeString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.total_amount || order.totalCostCents || 0)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.order_code || order.id}</div>
          </div>
        </div>
        <div class="order-details-grid">
          ${productsListHTML(items)}
        </div>
      </div>
    `;
  });

  function productsListHTML(items) {
    let html = '';
    items.forEach((item) => {
      const productName = item.product_name || item.name || '';
      const productImage = item.image || 'images/products/athletic-cotton-socks-6-pairs.jpg';
      const quantity = item.quantity || 1;
      const productId = item.product_id || item.productId || '';

      html += `
        <div class="product-image-container">
          <img src="${productImage}">
        </div>
        <div class="product-details">
          <div class="product-name">${productName}</div>
          <div class="product-quantity">Quantity: ${quantity}</div>
          <button class="buy-again-button button-primary js-buy-again" data-product-id="${productId}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
        <div class="product-actions">
          <a href="tracking.html?orderId=${productId}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });
    return html;
  }

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

  document.querySelectorAll('.js-buy-again').forEach((button) => {
    button.addEventListener('click', () => {
      addToCart(button.dataset.productId);
      button.innerHTML = 'Added';
      setTimeout(() => {
        button.innerHTML = `
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        `;
      }, 1000);
    });
  });
}

loadPage();
