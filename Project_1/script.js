// Product Data
const products = [
    {
        id: '1',
        name: 'عطر مردانه دیور',
        brand: 'Dior',
        description: 'عطر مردانه دیور با رایحه گرم و جذاب، مناسب برای استفاده روزانه و مراسم خاص',
        price: 850000,
        originalPrice: 1200000,
        image: 'img.png',
        category: 'men',
        rating: 4.8,
        reviews: 1247,
        inStock: true,
        discount: 29,
        volume: '100ml',
        features: ['ضد حساسیت', 'مقاوم در برابر تعریق', 'رایحه پایدار'],
        nature: 'warm',
        taste: 'woody',
        density: 'edt',
        gender: 'man'
    },
    {
        id: '2',
        name: 'عطر زنانه شنل',
        brand: 'Chanel',
        description: 'عطر زنانه شنل با رایحه گل‌های بهاری و نت‌های گرم، مناسب برای بانوان شیک‌پوش',
        price: 1200000,
        originalPrice: 1500000,
        image: 'img.png',
        category: 'women',
        rating: 4.9,
        reviews: 892,
        inStock: true,
        discount: 20,
        volume: '50ml',
        features: ['رایحه طبیعی', 'مقاوم 8 ساعته', 'بسته‌بندی لوکس'],
        nature: 'mild',
        taste: 'flower',
        density: 'edp',
        gender: 'woman'
    },
    {
        id: '3',
        name: 'عطر یونیسکس تام فورد',
        brand: 'Tom Ford',
        description: 'عطر یونیسکس تام فورد با رایحه منحصر به فرد و ترکیب خاص، مناسب برای افراد خاص‌پسند',
        price: 2100000,
        image: 'img.png',
        category: 'unisex',
        rating: 4.7,
        reviews: 567,
        inStock: true,
        volume: '100ml',
        features: ['رایحه منحصر به فرد', 'مقاوم 12 ساعته', 'بسته‌بندی شیشه‌ای'],
        nature: 'warm',
        taste: 'leather',
        density: 'parfum',
        gender: 'uni'
    },
    {
        id: '4',
        name: 'عطر مردانه آرمانی',
        brand: 'Armani',
        description: 'عطر مردانه آرمانی با رایحه تازه و ورزشی، مناسب برای استفاده روزانه',
        price: 650000,
        originalPrice: 950000,
        image: 'img.png',
        category: 'men',
        rating: 4.6,
        reviews: 734,
        inStock: true,
        discount: 32,
        volume: '75ml',
        features: ['رایحه تازه', 'مناسب ورزش', 'مقاوم در برابر آب']
    },
    {
        id: '5',
        name: 'عطر زنانه ویکتوریا سیکرت',
        brand: 'Victoria\'s Secret',
        description: 'عطر زنانه ویکتوریا سیکرت با رایحه شیرین و جذاب، مناسب برای بانوان جوان',
        price: 450000,
        originalPrice: 680000,
        image: 'img.png',
        category: 'women',
        rating: 4.5,
        reviews: 445,
        inStock: true,
        discount: 34,
        volume: '50ml',
        features: ['رایحه شیرین', 'مناسب جوانان', 'قیمت مناسب']
    },
    {
        id: '6',
        name: 'عطر یونیسکس جو مالون',
        brand: 'Jo Malone',
        description: 'عطر یونیسکس جو مالون با رایحه طبیعی و ملایم، مناسب برای استفاده در تمام فصول',
        price: 890000,
        image: 'img.png',
        category: 'unisex',
        rating: 4.8,
        reviews: 623,
        inStock: true,
        volume: '100ml',
        features: ['رایحه طبیعی', 'مناسب تمام فصول', 'رایحه ملایم']
    },
    {
        id: '7',
        name: 'عطر مردانه هوگو باس',
        brand: 'Hugo Boss',
        description: 'عطر مردانه هوگو باس با رایحه کلاسیک و حرفه‌ای، مناسب برای محیط کار',
        price: 720000,
        originalPrice: 980000,
        image: 'img.png',
        category: 'men',
        rating: 4.4,
        reviews: 456,
        inStock: true,
        discount: 26,
        volume: '100ml',
        features: ['رایحه کلاسیک', 'مناسب محیط کار', 'مقاوم 6 ساعته']
    },
    {
        id: '8',
        name: 'عطر زنانه لنکوم',
        brand: 'Lancome',
        description: 'عطر زنانه لنکوم با رایحه رمانتیک و عاشقانه، مناسب برای مراسم خاص',
        price: 950000,
        originalPrice: 1200000,
        image: 'img.png',
        category: 'women',
        rating: 4.7,
        reviews: 389,
        inStock: true,
        discount: 21,
        volume: '75ml',
        features: ['رایحه رمانتیک', 'مناسب مراسم خاص', 'بسته‌بندی شیشه‌ای']
    }
];

// Cart State
let cart = [];
let filteredProducts = [...products];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');
const searchInput = document.getElementById('searchInput');
const brandFilter = document.getElementById('brandFilter');
const sortFilter = document.getElementById('sortFilter');
const categoryButtons = document.querySelectorAll('.category-btn');
const viewButtons = document.querySelectorAll('.view-btn');
const themeToggle = document.getElementById('themeToggle');

// Utility Functions
function formatPrice(price) {
    return new Intl.NumberFormat('fa-IR').format(price);
}

function showNotification(message) {
    notificationText.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function renderStars(rating) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push('<i class="fas fa-star star"></i>');
        } else {
            stars.push('<i class="fas fa-star star empty"></i>');
        }
    }
    return stars.join('');
}

function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <div class="product-actions">
                    <button class="action-btn-small wishlist-btn" onclick="toggleWishlist('${product.id}')">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                ${product.discount ? `<div class="discount-badge">${product.discount}%</div>` : ''}
                <div class="volume-badge">${product.volume}</div>
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">
                        ${renderStars(product.rating)}
                    </div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    ${product.originalPrice ? 
                        `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''
                    }
                    <span class="current-price">${formatPrice(product.price)} تومان</span>
                </div>
                <div class="product-features">
                    ${product.features.slice(0, 2).map(feature => 
                        `<span class="feature-tag">${feature}</span>`
                    ).join('')}
                </div>
                <div class="quantity-selector">
                    <span class="quantity-label">تعداد:</span>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="changeQuantity('${product.id}', -1)">-</button>
                        <span class="quantity-value" id="quantity-${product.id}">1</span>
                        <button class="quantity-btn" onclick="changeQuantity('${product.id}', 1)">+</button>
                    </div>
                </div>
                <div class="product-buttons">
                    <button class="add-to-cart-btn" onclick="addToCart('${product.id}')" ${!product.inStock ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart"></i>
                        ${product.inStock ? 'افزودن به سبد خرید' : 'ناموجود'}
                    </button>
                    <button class="more-info-btn" onclick="showMoreInfo('${product.id}')">
                        <i class="fas fa-info-circle"></i>
                        اطلاعات بیشتر
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderProducts() {
    console.log('Rendering products...', { productsGrid, filteredProducts });
    
    if (!productsGrid) {
        console.warn('Products grid not found');
        return;
    }
    
    if (!filteredProducts || filteredProducts.length === 0) {
        console.warn('No products to render');
        productsGrid.innerHTML = '<div style="text-align: center; padding: 2rem; color: #666;">هیچ محصولی یافت نشد</div>';
        return;
    }
    
    try {
        const productsHTML = filteredProducts.map(product => createProductCard(product)).join('');
        productsGrid.innerHTML = productsHTML;
        console.log(`Rendered ${filteredProducts.length} products successfully`);
    } catch (error) {
        console.error('Error rendering products:', error);
        productsGrid.innerHTML = '<div style="text-align: center; padding: 2rem; color: #666;">خطا در بارگذاری محصولات</div>';
    }
}

function filterProducts() {
    try {
        const selectedCategory = document.querySelector('.category-btn.active')?.dataset.category || 'all';
        const selectedBrand = brandFilter?.value || 'all';
        const categoryFilterValue = document.getElementById('categoryFilter')?.value || 'all';
        const minPrice = parseInt(document.getElementById('minPrice')?.value) || 0;
        const maxPrice = parseInt(document.getElementById('maxPrice')?.value) || 100000000;
        const searchTerm = searchInput?.value.toLowerCase() || '';

        console.log('Filtering products with:', {
            selectedCategory,
            selectedBrand,
            categoryFilterValue,
            minPrice,
            maxPrice,
            searchTerm
        });

        filteredProducts = products.filter(product => {
            const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
            const categoryFilterMatch = categoryFilterValue === 'all' || product.category === categoryFilterValue;
            const brandMatch = selectedBrand === 'all' || product.brand === selectedBrand;
            const priceMatch = product.price >= minPrice && product.price <= maxPrice;
            const searchMatch = product.name.toLowerCase().includes(searchTerm) || 
                              product.brand.toLowerCase().includes(searchTerm) ||
                              product.description.toLowerCase().includes(searchTerm);
            
            return categoryMatch && categoryFilterMatch && brandMatch && priceMatch && searchMatch;
        });

        console.log(`Filtered to ${filteredProducts.length} products`);

        sortProducts();
        renderProducts();
    } catch (error) {
        console.error('Error filtering products:', error);
        // Fallback to showing all products
        filteredProducts = products;
        renderProducts();
    }
}

function sortProducts() {
    const sortBy = sortFilter.value;
    
    filteredProducts.sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            case 'newest':
                return parseInt(b.id) - parseInt(a.id);
            default:
                return b.reviews - a.reviews;
        }
    });
}

function changeQuantity(productId, change) {
    const quantityElement = document.getElementById(`quantity-${productId}`);
    let quantity = parseInt(quantityElement.textContent);
    quantity = Math.max(1, quantity + change);
    quantityElement.textContent = quantity;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const quantity = parseInt(document.getElementById(`quantity-${productId}`).textContent);
    
    const existingItem = cart.find(item => item.product.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }
    
    updateCartDisplay();
    showNotification(`${quantity} عدد ${product.name} به سبد خرید اضافه شد!`);
    
    // Reset quantity
    document.getElementById(`quantity-${productId}`).textContent = '1';
}

function updateCartDisplay() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update mobile cart count
    const cartCountMobile = document.getElementById('cartCountMobile');
    if (cartCountMobile) {
        cartCountMobile.textContent = totalItems;
    }
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">سبد خرید خالی است</div>';
        cartTotal.textContent = '۰ تومان';
        return;
    }
    
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
                        <button onclick="updateCartQuantity('${item.product.id}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateCartQuantity('${item.product.id}', 1)">+</button>
                    </div>
                    <button class="remove-item" onclick="removeFromCart('${item.product.id}')">حذف</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    cartTotal.textContent = formatPrice(total) + ' تومان';
    
    // Dispatch cart updated event
    document.dispatchEvent(new CustomEvent('cartUpdated'));
}

function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.product.id === productId);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        updateCartDisplay();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    updateCartDisplay();
    showNotification('محصول از سبد خرید حذف شد!');
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cartCount');
    const cartCountMobile = document.getElementById('cartCountMobile');
    
    if (cartCount) cartCount.textContent = totalItems;
    if (cartCountMobile) cartCountMobile.textContent = totalItems;
}

function toggleWishlist(productId) {
    const wishlistBtn = document.querySelector(`[data-id="${productId}"] .wishlist-btn i`);
    wishlistBtn.classList.toggle('fas');
    wishlistBtn.classList.toggle('far');
    
    if (wishlistBtn.classList.contains('fas')) {
        wishlistBtn.style.color = '#ef4444';
        showNotification('به لیست علاقه‌مندی‌ها اضافه شد!');
    } else {
        wishlistBtn.style.color = '#6b7280';
        showNotification('از لیست علاقه‌مندی‌ها حذف شد!');
    }
}

function showMoreInfo(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Redirect to product detail page
        window.location.href = `product-detail.html?id=${productId}`;
    }
}

// Cart Sidebar Functions
function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartSidebar() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Initialize mobile search functionality
function initMobileSearch() {
    const mobileSearchInput = document.querySelector('.mobile-search input');
    const mobileSearchBtn = document.querySelector('.mobile-search button');
    
    if (mobileSearchInput && mobileSearchBtn) {
        // Search on button click
        mobileSearchBtn.addEventListener('click', function() {
            const searchTerm = mobileSearchInput.value.toLowerCase();
            performSearch(searchTerm);
        });
        
        // Search on Enter key
        mobileSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = mobileSearchInput.value.toLowerCase();
                performSearch(searchTerm);
            }
        });
    }
}

// Perform search function
function performSearch(searchTerm) {
    if (searchTerm.trim() === '') {
        // If search is empty, show all products
        filteredProducts = products;
    } else {
        // Filter products based on search term
        filteredProducts = products.filter(product => {
            return product.name.toLowerCase().includes(searchTerm) ||
                   product.brand.toLowerCase().includes(searchTerm) ||
                   product.description.toLowerCase().includes(searchTerm);
        });
    }
    
    // Update display
    renderProducts();
    
    // Show notification
    if (filteredProducts.length === 0) {
        showNotification('هیچ محصولی یافت نشد');
    } else {
        showNotification(`${filteredProducts.length} محصول یافت شد`);
    }
}

// Initialize theme toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        // Load saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            const icon = themeToggle.querySelector('i');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const icon = this.querySelector('i');
            const isDark = document.body.classList.contains('dark-mode');
            
            if (isDark) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

// Initialize cart functionality
function initCart() {
    const cartBtn = document.getElementById('cartBtn');
    const closeCart = document.getElementById('closeCart');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (closeCart) closeCart.addEventListener('click', closeCartSidebar);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCartSidebar);
}

// Initialize filters
function initFilters() {
    // Search
    if (searchInput) searchInput.addEventListener('input', filterProducts);
    
    // Filters
    if (brandFilter) brandFilter.addEventListener('change', filterProducts);
    if (sortFilter) sortFilter.addEventListener('change', filterProducts);
    
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);
    
    // Price filter events
    const priceRange = document.getElementById('priceRange');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const priceDisplay = document.getElementById('priceDisplay');
    
    if (priceRange && minPriceInput && maxPriceInput && priceDisplay) {
        priceRange.addEventListener('input', function() {
            maxPriceInput.value = this.value;
            updatePriceDisplay();
            filterProducts();
        });
        
        minPriceInput.addEventListener('input', function() {
            updatePriceDisplay();
            filterProducts();
        });
        
        maxPriceInput.addEventListener('input', function() {
            priceRange.value = this.value;
            updatePriceDisplay();
            filterProducts();
        });
    }
    
    // Category buttons
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                filterProducts();
            });
        });
    }
    
    // View mode buttons
    if (viewButtons.length > 0) {
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                viewButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const viewMode = this.dataset.view;
                if (viewMode === 'list' && productsGrid) {
                    productsGrid.style.gridTemplateColumns = '1fr';
                } else if (productsGrid) {
                    productsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
                }
            });
        });
    }
    
    function updatePriceDisplay() {
        const min = parseInt(minPriceInput.value) || 0;
        const max = parseInt(maxPriceInput.value) || 100000000;
        if (priceDisplay) {
            priceDisplay.textContent = `${formatPrice(min)} تا ${formatPrice(max)} تومان`;
        }
    }
    
    // Initialize sidebar filters
    initSidebarFilters();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Check if we're on the main page (has products)
    if (productsGrid) {
        console.log('Main page detected, rendering products...');
        renderProducts();
    }
    
    // Initialize all functionality
    initThemeToggle();
    initCart();
    initMobileSearch();
    initMobileNav();
    initLogoDropdown();
    initNavDropdowns();
    initMenuOverlay();
    initMobileToolbar();
    initHeaderScroll();
    initFooterBackToTop();
    initDropdownMenuItems();
    initFabCart();
    initSearchAccordion();
    
    // Initialize filters
    initFilters();
    
    // Initialize sidebar filters
    initSidebarFilters();
    
    // Update cart count
    updateCartCount();
    
    console.log('Initialization complete');
});

// Fallback initialization for window load
window.addEventListener('load', function() {
    console.log('Window loaded, checking initialization...');
    
    // If products haven't been rendered yet, render them
    if (productsGrid && productsGrid.children.length === 0) {
        console.log('Products not rendered, rendering now...');
        renderProducts();
    }
    
    // Ensure cart count is updated
    updateCartCount();
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCartSidebar();
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.product-card, .trust-feature, .offer-card, .review-card');
    animatedElements.forEach(el => observer.observe(el));
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s;
    }
`;
document.head.appendChild(style); 

// Mobile nav toggle
function initMobileNav() {
    const nav = document.querySelector('.navigation');
    const logo = document.querySelector('.logo');
    const toggle = document.getElementById('navToggle');
    if (!nav) return;
    // Logo-driven accordion on mobile
    if (logo) {
        logo.addEventListener('click', function() {
            nav.classList.toggle('logo-open');
        });
    }
    // Keep old toggle for desktop if present
    if (toggle) {
        toggle.addEventListener('click', function() {
            nav.classList.toggle('open');
        });
    }
    // Close on outside click
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target)) {
            nav.classList.remove('logo-open');
            nav.classList.remove('open');
        }
    });
}

// Initialize logo dropdown functionality
function initLogoDropdown() {
    const logoToggle = document.querySelector('.logo-dropdown-toggle');
    const logoDropdown = document.querySelector('.logo-dropdown');
    
    if (logoToggle && logoDropdown) {
        logoToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            logoDropdown.style.opacity = logoDropdown.style.opacity === '1' ? '0' : '1';
            logoDropdown.style.visibility = logoDropdown.style.visibility === 'visible' ? 'hidden' : 'visible';
            logoDropdown.style.transform = logoDropdown.style.transform === 'translateY(0px)' ? 'translateY(-10px)' : 'translateY(0px)';
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!logoDropdown.contains(e.target) && !logoToggle.contains(e.target)) {
                logoDropdown.style.opacity = '0';
                logoDropdown.style.visibility = 'hidden';
                logoDropdown.style.transform = 'translateY(-10px)';
            }
        });
    }
}

// Initialize navigation dropdowns
function initNavDropdowns() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        const dropdown = toggle.nextElementSibling;
        if (dropdown && dropdown.classList.contains('dropdown-menu')) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    if (menu !== dropdown) {
                        menu.style.opacity = '0';
                        menu.style.visibility = 'hidden';
                        menu.style.transform = 'translateY(-10px)';
                    }
                });
                
                // Toggle current dropdown
                const isOpen = dropdown.style.opacity === '1';
                dropdown.style.opacity = isOpen ? '0' : '1';
                dropdown.style.visibility = isOpen ? 'hidden' : 'visible';
                dropdown.style.transform = isOpen ? 'translateY(-10px)' : 'translateY(0px)';
            });
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(-10px)';
            });
        }
    });
}

// Initialize half-page menu overlay
function initMenuOverlay() {
    const menuToggle = document.getElementById('menuToggle');
    const menuToggleMobile = document.getElementById('menuToggleMobile');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuClose = document.getElementById('menuClose');
    
    // Desktop menu toggle
    if (menuToggle && menuOverlay) {
        menuToggle.addEventListener('click', function() {
            menuOverlay.classList.add('open');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }
    
    // Mobile menu toggle
    if (menuToggleMobile && menuOverlay) {
        menuToggleMobile.addEventListener('click', function() {
            menuOverlay.classList.add('open');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }
    
    if (menuClose) {
        menuClose.addEventListener('click', function() {
            menuOverlay.classList.remove('open');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }
    
    // Close menu when clicking outside the menu content
    menuOverlay.addEventListener('click', function(e) {
        if (e.target === menuOverlay) {
            menuOverlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuOverlay.classList.contains('open')) {
            menuOverlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

// Initialize mobile toolbar
function initMobileToolbar() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const homeBtn = document.querySelector('.home-btn');
    const cartBtnMobile = document.getElementById('cartBtnMobile');
    const cartBtn = document.getElementById('cartBtn');
    
    // Scroll to top functionality
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Show/hide scroll to top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.visibility = 'visible';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.visibility = 'hidden';
            }
        });
    }
    
    // Home button functionality
    if (homeBtn) {
        homeBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
    
    // Mobile cart button functionality
    if (cartBtnMobile && cartBtn) {
        cartBtnMobile.addEventListener('click', function() {
            // Trigger the same cart functionality as desktop
            cartBtn.click();
        });
    }
    
    // Update mobile cart count
    function updateMobileCartCount() {
        const cartCountMobile = document.getElementById('cartCountMobile');
        const cartCount = document.getElementById('cartCount');
        if (cartCountMobile && cartCount) {
            cartCountMobile.textContent = cartCount.textContent;
        }
    }
    
    // Call update function initially and whenever cart changes
    updateMobileCartCount();
    
    // Listen for cart updates
    document.addEventListener('cartUpdated', updateMobileCartCount);
}

// Initialize header scroll behavior
function initHeaderScroll() {
    const header = document.querySelector('.header');
    const trustSection = document.querySelector('.trust-section');
    
    if (header && trustSection) {
        window.addEventListener('scroll', function() {
            const trustSectionTop = trustSection.offsetTop;
            const scrollTop = window.pageYOffset;
            
            if (scrollTop >= trustSectionTop) {
                header.classList.add('fixed');
            } else {
                header.classList.remove('fixed');
            }
        });
    }
}

// Initialize footer back to top functionality
function initFooterBackToTop() {
    const footerBackToTop = document.querySelector('.footer_back2top');
    
    if (footerBackToTop) {
        footerBackToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Handle dropdown menu item clicks
function initDropdownMenuItems() {
    const dropdownItems = document.querySelectorAll('.dropdown-menu a, .menu-section a');
    
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const category = this.getAttribute('data-category');
            const brand = this.getAttribute('data-brand');
            
            if (category) {
                // Filter by category
                filterProductsByCategory(category);
            } else if (brand) {
                // Filter by brand
                filterProductsByBrand(brand);
            }
            
            // Close any open dropdowns or menus
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(-10px)';
            });
            
            const menuOverlay = document.getElementById('menuOverlay');
            if (menuOverlay) {
                menuOverlay.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });
}

// Filter products by category
function filterProductsByCategory(category) {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const categoryFilter = document.getElementById('categoryFilter');
    
    // Update category buttons
    categoryButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        }
    });
    
    // Update filter dropdown
    if (categoryFilter) {
        categoryFilter.value = category;
    }
    
    // Apply filter
    applyFilters();
    
    // Show notification
    showNotification(`نمایش محصولات ${category === 'all' ? 'همه' : category === 'men' ? 'مردانه' : category === 'women' ? 'زنانه' : 'یونیسکس'}`);
}

// Filter products by brand
function filterProductsByBrand(brand) {
    const brandFilter = document.getElementById('brandFilter');
    
    // Update filter dropdown
    if (brandFilter) {
        brandFilter.value = brand;
    }
    
    // Apply filter
    applyFilters();
    
    // Show notification
    showNotification(`نمایش محصولات برند ${brand}`);
}

// Floating cart (mobile)
function initFabCart() {
    const fab = document.getElementById('fabCartBtn');
    if (!fab) return;
    fab.addEventListener('click', openCart);
}

// Search Accordion
function initSearchAccordion() {
    const toggleBtn = document.getElementById('toggleSearchAccordion');
    const accordion = document.querySelector('.search-accordion');
    const input = document.getElementById('searchAccordionInput');
    const submit = document.getElementById('searchAccordionSubmit');
    if (!toggleBtn || !accordion || !input || !submit) return;

    toggleBtn.addEventListener('click', function() {
        accordion.classList.toggle('open');
        setTimeout(() => input.focus(), 0);
    });

    submit.addEventListener('click', () => {
        const term = input.value.toLowerCase();
        performSearch(term);
    });
    input.addEventListener('keypress', function(e){
        if (e.key === 'Enter') {
            const term = input.value.toLowerCase();
            performSearch(term);
        }
    });
}

// Sidebar Filter Functionality
let activeFilters = {
    price: { min: 0, max: 649526130 },
    nature: [],
    taste: [],
    density: [],
    gender: []
};

// Initialize sidebar filters
function initSidebarFilters() {
    // Price slider
    initPriceSlider();
    
    // Filter list items
    initFilterLists();
    
    // Apply filters button
    const applyButton = document.querySelector('.price_slider_amount .button');
    if (applyButton) {
        applyButton.addEventListener('click', function(e) {
            e.preventDefault();
            applySidebarFilters();
        });
    }
}

// Initialize price slider
function initPriceSlider() {
    const slider = document.getElementById('priceSlider');
    const minHandle = document.querySelector('.min-handle');
    const maxHandle = document.querySelector('.max-handle');
    const range = document.querySelector('.price_slider_range');
    const fromSpan = document.querySelector('.price_label .from');
    const toSpan = document.querySelector('.price_label .to');
    const minInput = document.getElementById('min_price');
    const maxInput = document.getElementById('max_price');
    
    if (!slider || !minHandle || !maxHandle) return;
    
    let isDragging = false;
    let currentHandle = null;
    
    const minPrice = 0;
    const maxPrice = 649526130;
    
    function updateSlider() {
        const minPercent = ((activeFilters.price.min - minPrice) / (maxPrice - minPrice)) * 100;
        const maxPercent = ((activeFilters.price.max - minPrice) / (maxPrice - minPrice)) * 100;
        
        minHandle.style.left = minPercent + '%';
        maxHandle.style.left = maxPercent + '%';
        range.style.left = minPercent + '%';
        range.style.width = (maxPercent - minPercent) + '%';
        
        // Update labels
        fromSpan.textContent = formatPrice(activeFilters.price.min) + ' تومان';
        toSpan.textContent = formatPrice(activeFilters.price.max) + ' تومان';
        
        // Update hidden inputs
        minInput.value = activeFilters.price.min;
        maxInput.value = activeFilters.price.max;
    }
    
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    function getPriceFromPercent(percent) {
        return Math.round(minPrice + (percent / 100) * (maxPrice - minPrice));
    }
    
    function handleMouseDown(e) {
        isDragging = true;
        currentHandle = e.target;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }
    
    function handleMouseMove(e) {
        if (!isDragging) return;
        
        const rect = slider.getBoundingClientRect();
        let percent = ((e.clientX - rect.left) / rect.width) * 100;
        percent = Math.max(0, Math.min(100, percent));
        
        if (currentHandle === minHandle) {
            const maxPercent = parseFloat(maxHandle.style.left);
            percent = Math.min(percent, maxPercent - 5);
            activeFilters.price.min = getPriceFromPercent(percent);
        } else if (currentHandle === maxHandle) {
            const minPercent = parseFloat(minHandle.style.left);
            percent = Math.max(percent, minPercent + 5);
            activeFilters.price.max = getPriceFromPercent(percent);
        }
        
        updateSlider();
    }
    
    function handleMouseUp() {
        isDragging = false;
        currentHandle = null;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }
    
    // Add event listeners
    minHandle.addEventListener('mousedown', handleMouseDown);
    maxHandle.addEventListener('mousedown', handleMouseDown);
    
    // Initialize slider
    updateSlider();
}

// Initialize filter lists
function initFilterLists() {
    const filterLinks = document.querySelectorAll('.filter-list a');
    
    filterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const filterType = this.getAttribute('data-filter');
            const filterValue = this.getAttribute('data-value');
            
            // Toggle active state
            this.classList.toggle('active');
            
            // Update active filters
            if (this.classList.contains('active')) {
                if (!activeFilters[filterType].includes(filterValue)) {
                    activeFilters[filterType].push(filterValue);
                }
            } else {
                activeFilters[filterType] = activeFilters[filterType].filter(value => value !== filterValue);
            }
            
            // Apply filters
            applySidebarFilters();
        });
    });
}

// Apply sidebar filters
function applySidebarFilters() {
    console.log('Applying sidebar filters:', activeFilters);
    
    filteredProducts = products.filter(product => {
        // Price filter
        const priceMatch = product.price >= activeFilters.price.min && product.price <= activeFilters.price.max;
        
        // Nature filter (if product has nature property)
        const natureMatch = activeFilters.nature.length === 0 || 
            (product.nature && activeFilters.nature.includes(product.nature));
        
        // Taste filter (if product has taste property)
        const tasteMatch = activeFilters.taste.length === 0 || 
            (product.taste && activeFilters.taste.includes(product.taste));
        
        // Density filter (if product has density property)
        const densityMatch = activeFilters.density.length === 0 || 
            (product.density && activeFilters.density.includes(product.density));
        
        // Gender filter (if product has gender property)
        const genderMatch = activeFilters.gender.length === 0 || 
            (product.gender && activeFilters.gender.includes(product.gender));
        
        return priceMatch && natureMatch && tasteMatch && densityMatch && genderMatch;
    });
    
    console.log(`Filtered to ${filteredProducts.length} products`);
    renderProducts();
    updateProductsCount();
}

// Update products count
function updateProductsCount() {
    const productsCount = document.querySelector('.products-count');
    if (productsCount) {
        productsCount.textContent = `نمایش ۱-${Math.min(filteredProducts.length, 8)} از ${filteredProducts.length} محصول`;
    }
}

// Enhanced filter function to work with sidebar
function filterProducts() {
    try {
        console.log('Filtering products...');
        
        const searchTerm = searchInput?.value?.toLowerCase() || '';
        const selectedBrand = brandFilter?.value || 'all';
        const categoryFilterValue = document.getElementById('categoryFilter')?.value || 'all';
        const minPrice = document.getElementById('minPrice')?.value || 0;
        const maxPrice = document.getElementById('maxPrice')?.value || 100000000;
        
        console.log('Filtering products with:', {
            searchTerm,
            selectedBrand,
            categoryFilterValue,
            minPrice,
            maxPrice
        });
        
        filteredProducts = products.filter(product => {
            const searchMatch = !searchTerm || 
                product.name.toLowerCase().includes(searchTerm) ||
                product.brand.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm);
            
            const brandMatch = selectedBrand === 'all' || product.brand === selectedBrand;
            const categoryFilterMatch = categoryFilterValue === 'all' || product.category === categoryFilterValue;
            const priceMatch = product.price >= minPrice && product.price <= maxPrice;
            
            // Combine with sidebar filters
            const sidebarPriceMatch = product.price >= activeFilters.price.min && product.price <= activeFilters.price.max;
            const natureMatch = activeFilters.nature.length === 0 || 
                (product.nature && activeFilters.nature.includes(product.nature));
            const tasteMatch = activeFilters.taste.length === 0 || 
                (product.taste && activeFilters.taste.includes(product.taste));
            const densityMatch = activeFilters.density.length === 0 || 
                (product.density && activeFilters.density.includes(product.density));
            const genderMatch = activeFilters.gender.length === 0 || 
                (product.gender && activeFilters.gender.includes(product.gender));
            
            return categoryMatch && categoryFilterMatch && brandMatch && priceMatch && searchMatch && 
                   sidebarPriceMatch && natureMatch && tasteMatch && densityMatch && genderMatch;
        });
        
        console.log(`Filtered to ${filteredProducts.length} products`);
        
        // Sort products
        sortProducts();
        
        // Render products
        renderProducts();
        updateProductsCount();
        
    } catch (error) {
        console.error('Error filtering products:', error);
        filteredProducts = products;
        renderProducts();
    }
}

// Initialize accordion functionality
function initAccordions() {
    // Sidebar accordion filters
    const accordionToggles = document.querySelectorAll('.widget-title.accordion-toggle');
    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle active state
            this.classList.toggle('active');
            content.classList.toggle('active');
            
            // Rotate icon
            if (this.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // Mobile menu accordion
    const menuAccordionToggle = document.querySelector('.menu-accordion-toggle');
    const menuAccordionContent = document.querySelector('.menu-accordion-content');
    
    if (menuAccordionToggle && menuAccordionContent) {
        menuAccordionToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            menuAccordionContent.classList.toggle('active');
        });
        
        // Sub-accordion items
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const body = this.nextElementSibling;
                const icon = this.querySelector('i');
                const isActive = this.classList.contains('active');
                
                // Close all other accordion items
                accordionHeaders.forEach(otherHeader => {
                    if (otherHeader !== this) {
                        otherHeader.classList.remove('active');
                        otherHeader.nextElementSibling.classList.remove('active');
                        otherHeader.querySelector('i').style.transform = 'rotate(0deg)';
                    }
                });
                
                // Toggle current item
                this.classList.toggle('active');
                body.classList.toggle('active');
                
                if (!isActive) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        });
    }
}