
const Products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 },
];

const productListContainer = document.getElementById('productListContainer');

function renderProductList(products) {
    const productList = document.createElement('div');
    productList.innerHTML = `
        <h2>Product List</h2>
        <ul id="productList">
            ${products.map(product => `
                <li key=${product.id}>
                    ${product.name} - ${product.price}
                    <button onclick="addToCart(${product.id})">+</button>
                    <span id="quantity${product.id}">0</span>
                    <button onclick="removeFromCart(${product.id})">-</button>
                </li>
            `).join('')}
        </ul>
    `;
    productListContainer.appendChild(productList);
}

renderProductList(Products);

const cartContainer = document.getElementById('cartContainer');

function renderCart(cart, removeFromCart) {
    const cartElement = document.createElement('div');
    cartElement.innerHTML = `
        <h2>Shopping Cart</h2>
        ${cart.length === 0 ? '<p>No Product added to the cart</p>' : `
        <ul id="cartList">
        ${cart.map(product => `
            <li key=${product.id}>
                ${product.name} - ${product.price}
                <button onclick="removeFromCart(${product.id})">Remove</button>
            </li>
        `).join('')}
    </ul>
            <p>Total: ${calculateTotal(cart)}</p>
        `}
    `;
    cartContainer.innerHTML = '';
    cartContainer.appendChild(cartElement);
}

function calculateTotal(cart) {
    return cart.reduce((total, product) => total + product.price, 0);
}
const cart = [];

function addToCart(productId) {
    const product = Products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
    updateProductQuantity(productId, 1);
}

function removeFromCart(productId) {
    const index = cart.findIndex(p => p.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCart();
        updateProductQuantity(productId, -1);
    }
}

function updateCart() {
    renderCart(cart, removeFromCart);
}

function updateProductQuantity(productId, quantityChange) {
    const quantityElement = document.getElementById(`quantity${productId}`);
    const currentQuantity = parseInt(quantityElement.textContent) || 0;
    quantityElement.textContent = currentQuantity + quantityChange;
}

  
  