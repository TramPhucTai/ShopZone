import { orders } from './orders.js';

export function addTransaction() {

  return orders.map((order) => {

    return {
      id: order.transactionId,

      orderId: order.id,

      customerEmail: order.customerEmail,

      amountCents: calculateOrderTotal(order),

      status: order.status,

      createdAt: order.createdAt,

      paymentMethod: 'Visa'
    };
  });

}

function calculateOrderTotal(order) {

  let totalCents = 0;

  order.products.forEach((product) => {
    totalCents += product.quantity * product.priceCents;
  });

  return totalCents;
}