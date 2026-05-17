import {
  logoutSeller
} from '../../data/session.js';

document.querySelector('.js-logout-button')
  .addEventListener('click', () => {

    logoutSeller();

    window.location.href = 'login.html';
  });