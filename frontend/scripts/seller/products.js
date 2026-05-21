import { apiRequest } from '../utils/api.js';

let products = [];

loadProducts();

async function loadProducts() {
  try {
    products = await apiRequest('/products');
    renderProducts();
  } catch (err) {
    alert('Failed to load products: ' + err.message);
  }
}

document.querySelector('.js-add-product-button')
  .addEventListener('click', async () => {
    const name  = document.querySelector('.js-name-input').value.trim();
    const price = parseInt(document.querySelector('.js-price-input').value) * 100; // convert to cents
    const image = document.querySelector('.js-image-input').value.trim();

    if (!name || !price) {
      alert('Please enter name and price.');
      return;
    }

    try {
      const newProduct = await apiRequest('/products', {
        method: 'POST',
        body: JSON.stringify({ name, price, image })
      });
      products.unshift(newProduct);
      renderProducts();

      // Clear inputs
      document.querySelector('.js-name-input').value = '';
      document.querySelector('.js-price-input').value = '';
      document.querySelector('.js-image-input').value = '';
    } catch (err) {
      alert('Failed to add product: ' + err.message);
    }
  });

function renderProducts() {
  let html = '';
  products.forEach((product) => {
    html += `
      <div class="product-row">
        <img src="${product.image || 'images/icons/cart-icon.png'}" 
             style="width:60px;height:60px;object-fit:cover">
        <div>
          <div>${product.name}</div>
          <div>$${(product.price / 100).toFixed(2)}</div>
        </div>
        <button class="delete-button js-delete-button" data-product-id="${product.id}">
          Delete
        </button>
      </div>
    `;
  });
  document.querySelector('.js-products-list').innerHTML = html;

  document.querySelectorAll('.js-delete-button').forEach((button) => {
    button.addEventListener('click', async () => {
      const id = button.dataset.productId;
      try {
        await apiRequest(`/products/${id}`, { method: 'DELETE' });
        products = products.filter(p => p.id !== id);
        renderProducts();
      } catch (err) {
        alert('Failed to delete: ' + err.message);
      }
    });
  });
}