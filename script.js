const products = [
    { id: 1, name: "Glow & Lovely Face Wash", price: 450, icon: "🧴", image: "https://via.placeholder.com/200?text=Face+Wash" },
    { id: 2, name: "Saeed Ghani Rose Water", price: 180, icon: "🌹", image: "https://via.placeholder.com/200?text=Rose+Water" },
    { id: 3, name: "Rivaj UK Sunblock SPF 60", price: 650, icon: "☀️", image: "https://via.placeholder.com/200?text=Sunblock" },
    { id: 4, name: "Medora Matte Lipstick", price: 300, icon: "💄", image: "https://via.placeholder.com/200?text=Lipstick" },
    { id: 5, name: "Hemani Castor Oil", price: 400, icon: "🌿", image: "https://via.placeholder.com/200?text=Castor+Oil" },
    { id: 6, name: "Musarrat Misbah Foundation", price: 2500, icon: "✨", image: "https://via.placeholder.com/200?text=Foundation" },
    { id: 7, name: "Eveline Whitening Cream", price: 950, icon: "🌸", image: "https://via.placeholder.com/200?text=Face+Cream" },
    { id: 8, name: "Miss Rose Eyeshadow Palette", price: 1200, icon: "🎨", image: "https://via.placeholder.com/200?text=Eyeshadow" }
];

let cart = [];

// DOM Elements
const productList = document.getElementById('product-list');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const totalPriceEl = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const closeCheckoutBtn = document.getElementById('close-checkout');
const checkoutForm = document.getElementById('checkout-form');

// Render Products
function renderProducts() {
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <div class="product-image">${product.icon}</div>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">Rs. ${product.price}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productCard);
    });
}

// Add to Cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
    
    // Add simple notification animation
    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartBtn.style.transform = 'scale(1)';
    }, 200);
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Update Cart Display
function updateCart() {
    cartCount.innerText = cart.length;
    cartItemsContainer.innerHTML = '';
    
    let total = 0;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; color:#757575;">Your cart is empty.</p>';
        checkoutBtn.disabled = true;
        checkoutBtn.style.opacity = '0.5';
    } else {
        checkoutBtn.disabled = false;
        checkoutBtn.style.opacity = '1';
        
        cart.forEach((item, index) => {
            total += item.price;
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">Rs. ${item.price}</div>
                <div class="remove-item" onclick="removeFromCart(${index})">&times;</div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }
    
    totalPriceEl.innerText = total.toLocaleString();
}

// Modal Listeners
cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'flex';
});

closeCartBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

checkoutBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
    checkoutModal.style.display = 'flex';
});

closeCheckoutBtn.addEventListener('click', () => {
    checkoutModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) cartModal.style.display = 'none';
    if (e.target === checkoutModal) checkoutModal.style.display = 'none';
});

// Handle Checkout Form
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    
    alert(`Thank you for your order, ${name}! Your products will be delivered soon.`);
    
    // Reset
    cart = [];
    updateCart();
    checkoutForm.reset();
    checkoutModal.style.display = 'none';
});

// Initialize
renderProducts();
updateCart();
