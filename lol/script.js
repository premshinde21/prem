// Cart array to store products
let cart = [];

// Function to add products to cart
function addToCart(productName, price) {
    // Check if the product is already in the cart
    let existingProduct = cart.find(product => product.name === productName);
    
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }
    
    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    const cartSection = document.getElementById('cart-section');
    cartSection.innerHTML = ''; // Clear the previous cart display
    
    if (cart.length === 0) {
        cartSection.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let totalPrice = 0;
    cart.forEach(product => {
        totalPrice += product.price * product.quantity;
        cartSection.innerHTML += `
            <div class="cart-item">
                <p>${product.name} - ₹${product.price} x ${product.quantity}</p>
            </div>
        `;
    });

    cartSection.innerHTML += `
        <p>Total: ₹${totalPrice}</p>
        <button onclick="proceedToCheckout()">Proceed to Checkout</button>
    `;
}

// Function to simulate checkout process
function proceedToCheckout() {
    alert('Proceeding to checkout...');
    window.location.href = "checkout.html"; // Redirect to the checkout page
}

// Add event listeners to the "Add to Cart" buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.parentElement;
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = parseFloat(productCard.querySelector('p').textContent.replace('Price: ₹', ''));
        
        addToCart(productName, productPrice);
    });
});
