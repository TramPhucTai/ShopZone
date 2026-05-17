import {
  loginSeller
} from '../../data/sellers.js';

import {
  setCurrentSeller
} from '../../data/session.js';

document.querySelector('.js-login-button')
  .addEventListener('click', () => {

    const email =
      document.querySelector(
        '.js-email-input'
      ).value;

    const password =
      document.querySelector(
        '.js-password-input'
      ).value;

    const seller =
      loginSeller(email, password);

    if (!seller) {

      alert('Invalid credentials');

      return;
    }

    setCurrentSeller(seller);

    window.location.href = 'seller.html';
  });