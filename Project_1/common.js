// Common JavaScript for all pages
// This file contains shared functionality for toolbar, header, and cart

// Global cart variable
let cart = [];

// Inject header/footer partials
async function injectPartials() {
    const headerPlaceholder = document.getElementById('site-header');
    const footerPlaceholder = document.getElementById('site-footer');
    try {
        if (headerPlaceholder) {
            const res = await fetch('header.html');
            headerPlaceholder.innerHTML = await res.text();
        }
        if (footerPlaceholder) {
            const res = await fetch('footer.html');
            footerPlaceholder.innerHTML = await res.text();
        }
    } catch (e) {
        console.error('Failed to inject partials', e);
    }
}

// Load cart from localStorage
function loadCartFromStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        try {
            cart = JSON.parse(storedCart);
        } catch (e) {
            console.error('Error loading cart from storage:', e);
            cart = [];
        }
    }
}

// Save cart to localStorage
function saveCartToStorage() {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Cart saved to storage:', cart);
    } catch (e) {
        console.error('Error saving cart to storage:', e);
    }
}

// Update cart count display
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const cartCountMobile = document.getElementById('cartCountMobile');
    
    if (cart.length === 0) {
        if (cartCount) cartCount.textContent = '0';
        if (cartCountMobile) cartCountMobile.textContent = '0';
        return;
    }
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cartCount) cartCount.textContent = totalItems;
    if (cartCountMobile) cartCountMobile.textContent = totalItems;
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    if (notification && notificationText) {
        notificationText.textContent = message;
        notification.className = `notification ${type}`;
        notification.style.display = 'block';
        
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
}

// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('fa-IR').format(price);
}

// Initialize cart functionality
function initCart() {
    const cartBtn = document.getElementById('cartBtn');
    const closeCart = document.getElementById('closeCart');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (closeCart) closeCart.addEventListener('click', closeCartSidebar);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCartSidebar);
    
    // Initialize cart display
    updateCartDisplay();
}

// Cart functions
function openCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update cart display
        updateCartDisplay();
    }
}

function closeCartSidebar() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems || !cartTotal) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">سبد خرید خالی است</div>';
        cartTotal.textContent = '۰ تومان';
        return;
    }
    
    // Render cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.product.image}" alt="${item.product.name}">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.product.name}</div>
                <div class="cart-item-volume">${item.product.volume}</div>
                <div class="cart-item-price">${formatPrice(item.product.price)} تومان</div>
                <div class="cart-item-quantity">
                    <div class="quantity-control">
                        <button onclick="updateCartItemQuantity('${item.product.id}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateCartItemQuantity('${item.product.id}', 1)">+</button>
                    </div>
                    <button class="remove-item" onclick="removeCartItem('${item.product.id}')">حذف</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Calculate and display total
    const total = cart.reduce((sum, item) => {
        return sum + (item.product.price * item.quantity);
    }, 0);
    
    cartTotal.textContent = formatPrice(total) + ' تومان';
}

// Update cart item quantity
function updateCartItemQuantity(itemId, change) {
    const itemIndex = cart.findIndex(item => item.product && item.product.id === itemId);
    
    if (itemIndex > -1) {
        cart[itemIndex].quantity = Math.max(1, cart[itemIndex].quantity + change);
        saveCartToStorage();
        updateCartDisplay();
        updateCartCount();
    }
}

// Remove cart item
function removeCartItem(itemId) {
    const filteredCart = cart.filter(item => item.product && item.product.id !== itemId);
    cart = filteredCart;
    saveCartToStorage();
    
    updateCartDisplay();
    updateCartCount();
    showNotification('محصول از سبد خرید حذف شد', 'info');
}

// Add product to cart (common function)
function addToCart(product, quantity = 1) {
    // Check if product already exists in cart
    const existingIndex = cart.findIndex(item => item.product && item.product.id === product.id);
    
    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }
    saveCartToStorage();
    updateCartDisplay();
    updateCartCount();
}

function changeQuantity(productId, change) {
    const quantityElement = document.getElementById(`quantity-${productId}`);
    if (quantityElement) {
        let currentQuantity = parseInt(quantityElement.textContent);
        currentQuantity = Math.max(1, Math.min(10, currentQuantity + change));
        quantityElement.textContent = currentQuantity;
    }
}

// Initialize shared layout and cart after DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    await injectPartials();
    loadCartFromStorage();
    updateCartCount();
    initCart();
});
