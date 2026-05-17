export const orders =
  JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {

  const enhancedOrder = {
    ...order,

    createdAt: new Date().toISOString(),

    customerEmail: 'customer@gmail.com',

    status: 'Paid',

    transactionId: crypto.randomUUID()
  };

  orders.unshift(enhancedOrder);

  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem(
    'orders',
    JSON.stringify(orders)
  );
}

export function getOrder(orderId) {
  let matchingOrder;

  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });

  return matchingOrder;
}