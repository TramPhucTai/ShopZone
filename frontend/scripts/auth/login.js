import { API_BASE } from '../utils/api.js';

document.querySelector('.js-login-button')
  .addEventListener('click', async () => {
    const email    = document.querySelector('.js-email-input').value.trim();
    const password = document.querySelector('.js-password-input').value;

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      // Lưu token và shopName
      localStorage.setItem('token', data.token);
      localStorage.setItem('shopName', data.shopName);

      window.location.href = 'seller.html';
    } catch (err) {
      alert(err.message);
    }
  });