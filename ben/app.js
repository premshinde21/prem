window.onscroll = function() {
    var navbar = document.getElementById("navbar");
    if (window.pageYOffset > 0) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  };

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

  const filterButtons = document.querySelectorAll('.filter-btn');
const products = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from other buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const category = button.textContent.toLowerCase();

    products.forEach(product => {
      if (category === 'all') {
        product.style.display = 'block';
      } else if (product.querySelector('h4').textContent.toLowerCase().includes(category)) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  });
});

// Array to hold cart items
let cart = [];

// Selectors
const addToCartButtons = document.querySelectorAll('.btn-add-cart');
const cartModal = document.querySelector('.cart-modal');
const cartItemsList = document.getElementById('cart-items');
const totalAmountElement = document.getElementById('total-amount');

// Add to Cart button click event
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productItem = e.target.closest('.product-item');
        const name = productItem.getAttribute('data-name');
        const price = parseFloat(productItem.getAttribute('data-price'));

        addToCart(name, price);
    });
});

// Add product to cart function
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    updateCart();
}

// Update cart UI and total price
function updateCart() {
    cartItemsList.innerHTML = '';
    let totalAmount = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            <span>${item.name} - ₹${item.price}</span>
            <div>
                <button class="decrease-btn">-</button>
                <span>${item.quantity}</span>
                <button class="increase-btn">+</button>
                <button class="remove-btn">Remove</button>
            </div>
        `;
        cartItemsList.appendChild(cartItem);

        totalAmount += item.price * item.quantity;

        // Increase quantity
        cartItem.querySelector('.increase-btn').addEventListener('click', () => {
            item.quantity++;
            updateCart();
        });

        // Decrease quantity
        cartItem.querySelector('.decrease-btn').addEventListener('click', () => {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                cart = cart.filter(cartItem => cartItem !== item);
            }
            updateCart();
        });

        // Remove item
        cartItem.querySelector('.remove-btn').addEventListener('click', () => {
            cart = cart.filter(cartItem => cartItem !== item);
            updateCart();
        });
    });

    totalAmountElement.innerText = totalAmount.toFixed(2);
}

// Show and hide cart modal
document.querySelector('.checkout-btn').addEventListener('click', () => {
    alert('Proceeding to checkout...');
});

document.querySelector('.close-cart').addEventListener('click', () => {
    cartModal.classList.remove('show');
});

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartModal.classList.add('show');
    });
});


