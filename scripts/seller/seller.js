import {
  getCurrentSeller
} from '../../data/session.js';

const currentSeller =
  getCurrentSeller();

document.querySelector('.js-shop-name')
  .innerHTML =
  `Welcome back, ${currentSeller.shopName}`;