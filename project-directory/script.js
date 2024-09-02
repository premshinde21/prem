// Cart functionality
let cart = [];

function addToCart(product, price) {
    cart.push({ product, price });
    displayCartItems();
}

function displayCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    cart.forEach(item => {
        cartItemsDiv.innerHTML += `<p>${item.product}: $${item.price}</p>`;
    });
    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
    document.getElementById('total-price').innerText = totalPrice;
}

// Toggle cart visibility
function toggleCart() {
    const cart = document.getElementById('side-cart');
    if (cart.style.right === '0px') {
        cart.style.right = '-300px';
    } else {
        cart.style.right = '0px';
    }
}
