// Hiển thị tên shop trên dashboard
const shopName = localStorage.getItem('shopName');
if (shopName) {
  document.querySelector('.js-shop-name').textContent = shopName + ' — Dashboard';
}