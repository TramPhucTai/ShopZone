const products = JSON.parse(localStorage.getItem('sellerProducts')) || [];

renderProducts();

document.querySelector('.js-add-product-button')
  .addEventListener('click', () => {

    const name = document.querySelector('.js-name-input').value;

    const price = document.querySelector('.js-price-input').value;

    const image = document.querySelector('.js-image-input').value;

    const newProduct = {
      id: crypto.randomUUID(),
      name,
      price,
      image
    };

    products.push(newProduct);

    saveProducts();

    renderProducts();
  });

function renderProducts() {

  let productsHTML = '';

  products.forEach((product) => {

    productsHTML += `
      <div class="product-row">

        <img src="${product.image}">

        <div>
          <div>${product.name}</div>
          <div>$${product.price}</div>
        </div>

        <button 
          class="delete-button js-delete-button"
          data-product-id="${product.id}">
          Delete
        </button>

      </div>
    `;
  });

  document.querySelector('.js-products-list').innerHTML =
    productsHTML;

  document.querySelectorAll('.js-delete-button')
    .forEach((button) => {

      button.addEventListener('click', () => {

        const productId = button.dataset.productId;

        const newProducts = products.filter((product) => {
          return product.id !== productId;
        });

        products.length = 0;

        newProducts.forEach((product) => {
          products.push(product);
        });

        saveProducts();

        renderProducts();
      });

    });

}

function saveProducts() {
  localStorage.setItem(
    'sellerProducts',
    JSON.stringify(products)
  );
}