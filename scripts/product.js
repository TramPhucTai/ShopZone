import { products, loadProducts } from '../data/products.js';
import { addToCart } from '../data/cart.js';

loadProducts(renderProductPage);

function renderProductPage() {

  const url = new URL(window.location.href);

  const productId = url.searchParams.get('id');

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  if (!matchingProduct) {
    document.querySelector('.js-product-page').innerHTML =
      '<h2>Product not found.</h2>';

    return;
  }

  document.querySelector('.js-product-page').innerHTML = `
  
    <div class="product-page-container">

      <div class="product-page-image-container">
        <img class="product-page-image"
          src="${matchingProduct.image}">
      </div>

      <div class="product-page-details">

        <div class="product-page-name">
          ${matchingProduct.name}
        </div>

        <div class="product-page-rating">
          Rating: ${matchingProduct.rating.stars} ⭐
          (${matchingProduct.rating.count} reviews)
        </div>

        <div class="product-page-price">
          ${matchingProduct.getPrice()}
        </div>

        <div class="product-page-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          This is a sample product description.
        </div>

        <button class="button-primary js-add-to-cart">
          Add to Cart
        </button>

      </div>

    </div>
  `;

  document.querySelector('.js-add-to-cart')
    .addEventListener('click', () => {
      addToCart(productId);

      alert('Added to cart!');
    });
}