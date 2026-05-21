import { API_BASE } from '../utils/api.js';

document.querySelector('.js-register-button')
  .addEventListener('click', async () => {
    const shopName = document.querySelector('.js-shop-name-input').value.trim();
    const email    = document.querySelector('.js-email-input').value.trim();
    const password = document.querySelector('.js-password-input').value;

    if (!shopName || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shopName, email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      alert('Account created! Please login.');
      window.location.href = 'login.html';
    } catch (err) {
      alert(err.message);
    }
  });