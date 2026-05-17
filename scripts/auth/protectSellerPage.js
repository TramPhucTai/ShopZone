import {
  getCurrentSeller
} from '../../data/session.js';

const currentSeller =
  getCurrentSeller();

if (!currentSeller) {

  window.location.href = 'login.html';
}