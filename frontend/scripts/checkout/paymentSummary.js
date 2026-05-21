// Chỉ thay đổi phần click handler, giữ nguyên phần render HTML

document.querySelector('.js-place-order')
  .addEventListener('click', async () => {

    // Hỏi email để gửi receipt
    const customerEmail = prompt('Enter your email to receive receipt (optional):');

    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart: cart,           // cart từ data/cart.js (giữ nguyên)
          customerEmail: customerEmail || null
        })
      });

      const order = await res.json();
      if (!res.ok) throw new Error(order.error);

      addOrder(order);          // vẫn lưu local để hiện orders.html

      resetCart();
      window.location.href = 'orders.html';
    } catch (err) {
      console.log('Order failed:', err.message);
      alert('Something went wrong. Please try again.');
    }
  });