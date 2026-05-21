import { apiRequest } from '../utils/api.js';

async function loadOrders() {
  try {
    const orders = await apiRequest('/orders');
    let html = '';

    if (orders.length === 0) {
      html = '<p>No orders yet.</p>';
    } else {
      orders.forEach((order) => {
        const itemsList = order.items.map(i =>
          `<li>${i.product_name} × ${i.quantity}</li>`
        ).join('');

        html += `
          <div class="order-card">
            <div class="order-header">
              <span><b>${order.order_code}</b></span>
              <span>${new Date(order.created_at).toLocaleDateString()}</span>
              <span class="order-status">${order.status}</span>
              <span><b>$${(order.total_amount / 100).toFixed(2)}</b></span>
            </div>
            <ul>${itemsList}</ul>
            ${order.customer_email
              ? `<div>📧 Receipt sent to: ${order.customer_email}</div>`
              : ''}
          </div>
        `;
      });
    }
    document.querySelector('.js-orders-container').innerHTML = html;
  } catch (err) {
    alert('Failed to load orders: ' + err.message);
  }
}

loadOrders();