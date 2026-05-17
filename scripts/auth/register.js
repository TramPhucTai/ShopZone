import {
  registerSeller
} from '../../data/sellers.js';

import {
  setCurrentSeller
} from '../../data/session.js';

document.querySelector('.js-register-button')
  .addEventListener('click', () => {

    const shopName =
      document.querySelector(
        '.js-shop-name-input'
      ).value;

    const email =
      document.querySelector(
        '.js-email-input'
      ).value;

    const password =
      document.querySelector(
        '.js-password-input'
      ).value;

    const seller = registerSeller({
      shopName,
      email,
      password
    });

    setCurrentSeller(seller);

    window.location.href = 'seller.html';
  });