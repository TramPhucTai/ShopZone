document.querySelector('.js-logout-button')
  .addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('shopName');
    window.location.href = 'login.html';
  });