document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        document.querySelectorAll('.product-item').forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Variables
let cart = [];
let cartOverlay = document.getElementById('cart-overlay');
let sideCart = document.getElementById('side-cart');
let cartItemsContainer = document.querySelector('.cart-items');
let cartTotalPrice = document.getElementById('cart-total-price');

// Open Cart
document.querySelector('.btn-cart').addEventListener('click', () => {
    sideCart.style.right = '0';
    cartOverlay.style.display = 'block';
});

// Close Cart
document.querySelector('.close-cart').addEventListener('click', () => {
    sideCart.style.right = '-100%';
    cartOverlay.style.display = 'none';
});

cartOverlay.addEventListener('click', () => {
    sideCart.style.right = '-100%';
    cartOverlay.style.display = 'none';
});

// Add to Cart Functionality
document.querySelectorAll('.product-item').forEach(product => {
    product.addEventListener('click', () => {
        let productName = product.querySelector('h4').textContent;
        let productPrice = parseFloat(product.querySelector('p').textContent.replace('₹', ''));

        addToCart(productName, productPrice);
    });
});

function addToCart(name, price) {
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        let cartItem = document.createElement('li');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h4>${item.name} x${item.quantity}</h4>
            <p>₹${itemTotal.toFixed(2)}</p>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    cartTotalPrice.textContent = totalPrice.toFixed(2);
}

// Checkout Functionality
document.querySelector('.checkout-btn').addEventListener('click', () => {
    alert('Checkout is not yet implemented.');
});

// Get buttons
const addCartButtons = document.querySelectorAll('.btn-add-cart');
const buyNowButtons = document.querySelectorAll('.btn-buy-now');

// Add to Cart Event
addCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        let productName = button.closest('.product-item').querySelector('h4').textContent;
        let productPrice = parseFloat(button.closest('.product-item').querySelector('p').textContent.replace('₹', ''));
        
        addToCart(productName, productPrice);
        
        // Pop-up animation for cart button
        sideCart.classList.add('active');
        cartOverlay.classList.add('active');
    });
});

// Buy Now Event
buyNowButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        let productName = button.closest('.product-item').querySelector('h4').textContent;
        let productPrice = parseFloat(button.closest('.product-item').querySelector('p').textContent.replace('₹', ''));
        
        addToCart(productName, productPrice);

        // Redirect to checkout
        window.scrollTo({ top: 0, behavior: 'smooth' });
        alert('Proceeding to checkout...');
    });
});

function addToCart(name, price) {
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        let cartItem = document.createElement('li');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h4>${item.name} x${item.quantity}</h4>
            <p>₹${itemTotal.toFixed(2)}</p>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    cartTotalPrice.textContent = totalPrice.toFixed(2);
    
    // Fade-in effect for cart items
    document.querySelectorAll('.cart-item').forEach(item => {
        item.style.opacity = '0';
        setTimeout(() => {
            item.style.opacity = '1';
        }, 100);
    });
}



