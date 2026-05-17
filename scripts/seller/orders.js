import { orders } from '../../data/orders.js';

let ordersHTML = '';

orders.forEach((order) => {

  let totalItems = 0;

  order.products.forEach((product) => {
    totalItems += product.quantity;
  });

  ordersHTML += `
  
    <a 
      class="order-card"
      href="receipt.html?id=${order.id}">

      <div class="order-info">

        <div>
          <strong>Order ID:</strong>
          ${order.id}
        </div>

        <div>
          <strong>Customer:</strong>
          ${order.customerEmail}
        </div>

        <div>
          <strong>Items:</strong>
          ${totalItems}
        </div>

        <div>
          <strong>Date:</strong>
          ${new Date(order.createdAt).toLocaleString()}
        </div>

      </div>

      <div class="order-status">
        ${order.status}
      </div>

    </a>
  `;
});

document.querySelector('.js-orders-container').innerHTML =
  ordersHTML;