 // Product Detail Page JavaScript

// Global cart variable to match main page
let cart = [];

// Product Data (same as main page)
const products = [
    {
        id: '1',
        name: 'عطر مردانه دیور',
        brand: 'Dior',
        description: 'عطر مردانه دیور با رایحه گرم و جذاب، مناسب برای استفاده روزانه و مراسم خاص',
        price: 850000,
        originalPrice: 1200000,
        image: '🫙',
        category: 'men',
        rating: 4.8,
        reviews: 1247,
        inStock: true,
        discount: 29,
        volume: '100ml',
        features: ['ضد حساسیت', 'مقاوم در برابر تعریق', 'رایحه پایدار']
    },
    {
        id: '2',
        name: 'عطر زنانه شنل',
        brand: 'Chanel',
        description: 'عطر زنانه شنل با رایحه گل‌های بهاری و نت‌های گرم، مناسب برای بانوان شیک‌پوش',
        price: 1200000,
        originalPrice: 1500000,
        image: '🫙',
        category: 'women',
        rating: 4.9,
        reviews: 892,
        inStock: true,
        discount: 20,
        volume: '50ml',
        features: ['رایحه طبیعی', 'مقاوم 8 ساعته', 'بسته‌بندی لوکس']
    },
    {
        id: '3',
        name: 'عطر یونیسکس تام فورد',
        brand: 'Tom Ford',
        description: 'عطر یونیسکس تام فورد با رایحه منحصر به فرد و ترکیب خاص، مناسب برای افراد خاص‌پسند',
        price: 2100000,
        image: '🫙',
        category: 'unisex',
        rating: 4.7,
        reviews: 567,
        inStock: true,
        volume: '100ml',
        features: ['رایحه منحصر به فرد', 'مقاوم 12 ساعته', 'بسته‌بندی شیشه‌ای']
    },
    {
        id: '4',
        name: 'عطر مردانه آرمانی',
        brand: 'Armani',
        description: 'عطر مردانه آرمانی با رایحه تازه و ورزشی، مناسب برای استفاده روزانه',
        price: 650000,
        originalPrice: 950000,
        image: '🫙',
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
        image: '🫙',
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
        image: '🫙',
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
        image: '🫙',
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
        image: '🫙',
        category: 'women',
        rating: 4.7,
        reviews: 389,
        inStock: true,
        discount: 21,
        volume: '75ml',
        features: ['رایحه رمانتیک', 'مناسب مراسم خاص', 'بسته‌بندی شیشه‌ای']
    }
];

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

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired');
    
    // Load cart from localStorage if available
    loadCartFromStorage();
    console.log('Cart loaded from storage:', cart);
    
    // Load product data based on URL parameter
    loadProductData();
    
    // Initialize all product detail functionality
    console.log('Initializing product functionality...');
    initProductImages();
    initProductVariants();
    initQuantityControls();
    initProductActions();
    initProductTabs();
    initFAQ();
    initShareButtons();
    initRelatedProducts();
    
    // Initialize cart functionality
    console.log('Initializing cart functionality...');
    initCart();
    
    // Initialize mobile navigation and search accordion
    initMobileNav();
    initSearchAccordion();
    initLogoAccordion();
    initFabCart();
    
    // Update cart count on page load
    updateCartCount();
    
    console.log('All initialization complete');
});

// Load product data from URL parameter
function loadProductData() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            updateProductDisplay(product);
            return;
        }
    }
    // Fallback to first product if id is missing or not found
    if (products.length > 0) {
        updateProductDisplay(products[0]);
    }
}

// Update product display with loaded data
function updateProductDisplay(product) {
    // Update page title
    document.title = `${product.name} - عطرستان`;
    
    // Update product title
    const productTitle = document.querySelector('.product-title');
    if (productTitle) {
        productTitle.textContent = product.name;
    }
    
    // Update product brand
    const productBrand = document.querySelector('.product-brand span');
    if (productBrand) {
        productBrand.textContent = `برند: ${product.brand}`;
    }
    
    // Update product rating
    const ratingScore = document.querySelector('.rating-score');
    const ratingCount = document.querySelector('.rating-count');
    if (ratingScore) {
        ratingScore.textContent = product.rating.toFixed(1);
    }
    if (ratingCount) {
        ratingCount.textContent = `(${product.reviews} نظر)`;
    }
    
    // Update product price
    const currentPrice = document.querySelector('.current-price');
    const originalPrice = document.querySelector('.original-price');
    const discountPercent = document.querySelector('.discount-percent');
    
    if (currentPrice) {
        currentPrice.textContent = formatPrice(product.price);
    }
    
    if (product.originalPrice && originalPrice) {
        originalPrice.textContent = formatPrice(product.originalPrice);
        if (discountPercent) {
            discountPercent.textContent = `${product.discount}٪ تخفیف`;
        }
    } else {
        if (originalPrice) originalPrice.style.display = 'none';
        if (discountPercent) discountPercent.style.display = 'none';
    }
    
    // Update product images (using product ID to get different images)
    const imageUrls = [
        'img.png',
        'img.png',
        'img.png',
        'img.png'
    ];
    
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (mainImage) {
        const imageIndex = parseInt(product.id) % imageUrls.length;
        mainImage.src = imageUrls[imageIndex];
        mainImage.alt = product.name;
    }
    
    // Update thumbnails
    thumbnails.forEach((thumbnail, index) => {
        const img = thumbnail.querySelector('img');
        if (img) {
            const imageIndex = (parseInt(product.id) + index) % imageUrls.length;
            img.src = imageUrls[imageIndex];
            thumbnail.dataset.image = imageUrls[imageIndex];
        }
    });
    
    // Update breadcrumb
    const breadcrumbSpan = document.querySelector('.breadcrumb-nav span');
    if (breadcrumbSpan) {
        breadcrumbSpan.textContent = product.name;
    }
    
    // Update description tab
    const descriptionContent = document.querySelector('.description-content');
    if (descriptionContent) {
        const descriptionText = descriptionContent.querySelector('p');
        if (descriptionText) {
            descriptionText.textContent = product.description;
        }
    }
}

// Product Images Functionality
function initProductImages() {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const imageZoom = document.querySelector('.image-zoom');

    // Thumbnail click handler
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const newImageSrc = this.dataset.image;
            mainImage.src = newImageSrc;
            
            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Image zoom functionality
    if (imageZoom) {
        imageZoom.addEventListener('click', function() {
            // Create modal for image zoom
            createImageModal(mainImage.src);
        });
    }
}

// Create image modal for zoom
function createImageModal(imageSrc) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <img src="${imageSrc}" alt="تصویر بزرگ">
        </div>
    `;

    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .image-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        .modal-content img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        .modal-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    // Close modal functionality
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('modal-close')) {
            document.body.removeChild(modal);
        }
    });

    document.body.appendChild(modal);
}

// Product Variants Functionality
function initProductVariants() {
    const variantButtons = document.querySelectorAll('.variant-btn');
    const currentPrice = document.querySelector('.current-price');
    const originalPrice = document.querySelector('.original-price');
    const discountPercent = document.querySelector('.discount-percent');

    // Price mapping for different volumes
    const prices = {
        '50': { current: 2850000, original: 3200000 },
        '100': { current: 5200000, original: 5800000 },
        '200': { current: 9500000, original: 10500000 }
    };

    variantButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            variantButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Update prices
            const volume = this.dataset.volume;
            const priceData = prices[volume];
            
            if (priceData) {
                currentPrice.textContent = formatPrice(priceData.current);
                originalPrice.textContent = formatPrice(priceData.original);
                
                // Calculate and update discount
                const discount = Math.round(((priceData.original - priceData.current) / priceData.original) * 100);
                discountPercent.textContent = `${discount}٪ تخفیف`;
            }
        });
    });
}

// Quantity Controls
function initQuantityControls() {
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');

    if (decreaseBtn && increaseBtn && quantityInput) {
        decreaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });

        increaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue < 10) {
                quantityInput.value = currentValue + 1;
            }
        });

        // Prevent manual input of invalid values
        quantityInput.addEventListener('input', function() {
            let value = parseInt(this.value);
            if (value < 1) this.value = 1;
            if (value > 10) this.value = 10;
        });
    }
}

// Product Actions
function initProductActions() {
    const addToCartBtn = document.getElementById('addToCart');
    const addToCartLeftBtn = document.getElementById('addToCartLeft');
    const buyNowBtn = document.getElementById('buyNow');

    console.log('initProductActions called');
    console.log('addToCartBtn:', addToCartBtn);
    console.log('addToCartLeftBtn:', addToCartLeftBtn);
    console.log('buyNowBtn:', buyNowBtn);

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            console.log('Add to cart button clicked');
            addMainProductToCart();
        });
        console.log('Add to cart event listener added');
    } else {
        console.error('Add to cart button not found!');
    }

    if (addToCartLeftBtn) {
        addToCartLeftBtn.addEventListener('click', function() {
            console.log('Add to cart left button clicked');
            addMainProductToCart();
        });
        console.log('Add to cart left event listener added');
    } else {
        console.error('Add to cart left button not found!');
    }

    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function() {
            console.log('Buy now button clicked');
            buyNow();
        });
        console.log('Buy now event listener added');
    } else {
        console.error('Buy now button not found!');
    }
}

// Add to Cart Function
function addMainProductToCart() {
    console.log('addMainProductToCart called');
    
    const quantity = parseInt(document.getElementById('quantity').value);
    const activeVariant = document.querySelector('.variant-btn.active');
    const volume = activeVariant ? activeVariant.dataset.volume : '50';
    
    console.log('Quantity:', quantity, 'Volume:', volume);
    
    // Get current product from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const product = products.find(p => p.id === productId);
    
    console.log('Product ID from URL:', productId);
    console.log('Found product:', product);
    
    if (!product) {
        showNotification('خطا در بارگذاری اطلاعات محصول', 'error');
        return;
    }
    
    // Get current price from the display and convert to number
    const currentPriceElement = document.querySelector('.current-price');
    let currentPrice = product.price; // Default price
    
    if (currentPriceElement) {
        // Convert Persian numbers to English and remove commas
        const priceText = currentPriceElement.textContent;
        const englishPrice = priceText.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
                                   .replace(/,/g, '');
        currentPrice = parseInt(englishPrice) || product.price;
        console.log('Price from display:', priceText, 'Converted to:', currentPrice);
    }
    
    // Create product object matching main page structure
    const productToAdd = {
        id: product.id,
        name: product.name,
        brand: product.brand,
        volume: volume + ' میلی‌لیتر',
        price: currentPrice,
        image: document.getElementById('mainImage').src,
        category: product.category,
        rating: product.rating,
        reviews: product.reviews,
        inStock: product.inStock,
        discount: product.discount,
        features: product.features
    };

    console.log('Product to add:', productToAdd);

    // Check if product already exists in cart
    const existingIndex = cart.findIndex(item => item.product && item.product.id === productToAdd.id);
    
    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
        console.log('Updated existing item, new quantity:', cart[existingIndex].quantity);
    } else {
        cart.push({ product: productToAdd, quantity: quantity });
        console.log('Added new item to cart');
    }

    console.log('Current cart:', cart);
    saveCartToStorage();
    
    // Show success notification with quantity
    showNotification(`${quantity} عدد ${product.name} به سبد خرید اضافه شد`, 'success');
    
    // Update cart count
    updateCartCount();
    
    // Reset quantity to 1
    document.getElementById('quantity').value = '1';
}

// Buy Now Function
function buyNow() {
    addMainProductToCart();
    // Redirect to checkout page
    setTimeout(() => {
        window.location.href = 'checkout.html';
    }, 1000);
}

// Product Tabs - Fixed functionality
function initProductTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    console.log('Tab buttons found:', tabButtons.length);
    console.log('Tab contents found:', tabContents.length);

    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetTab = this.dataset.tab;
            console.log('Tab clicked:', targetTab);
            
            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update active content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                    console.log('Activated tab:', targetTab);
                }
            });
        });
    });
    
    // Add CSS for tab functionality
    const tabStyle = document.createElement('style');
    tabStyle.textContent = `
        .tab-content {
            display: none;
        }
        .tab-content.active {
            display: block;
        }
        .tab-btn {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .tab-btn.active {
            background-color: #3b82f6;
            color: white;
        }
    `;
    document.head.appendChild(tabStyle);
}

// FAQ Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Share Buttons
function initShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    const productTitle = document.querySelector('.product-title').textContent;
    const productUrl = window.location.href;

    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.classList[1]; // whatsapp, telegram, etc.
            let shareUrl = '';
            
            switch(platform) {
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${encodeURIComponent(productTitle + ' - ' + productUrl)}`;
                    break;
                case 'telegram':
                    shareUrl = `https://t.me/share/url?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(productTitle)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(productTitle)}&url=${encodeURIComponent(productUrl)}`;
                    break;
                case 'instagram':
                    // Instagram doesn't support direct sharing via URL
                    showNotification('برای اشتراک‌گذاری در اینستاگرام، لینک را کپی کنید', 'info');
                    return;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank');
            }
        });
    });
}

// Initialize Related Products with homepage style
function initRelatedProducts() {
    const relatedProductsGrid = document.querySelector('.related-products .products-grid');
    if (!relatedProductsGrid) return;

    // Get current product to exclude from related products
    const urlParams = new URLSearchParams(window.location.search);
    const currentProductId = urlParams.get('id');
    
    // Get related products (same category, excluding current product)
    const currentProduct = products.find(p => p.id === currentProductId);
    const relatedProducts = products
        .filter(p => p.id !== currentProductId && p.category === currentProduct?.category)
        .slice(0, 3);

    // Render related products with homepage style
    relatedProductsGrid.innerHTML = relatedProducts.map(product => createRelatedProductCard(product)).join('');
}

// Create related product card with homepage style
function createRelatedProductCard(product) {
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
                <div class="product-icon">${product.image}</div>
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
                    <button class="add-to-cart-btn" onclick="addRelatedToCart('${product.id}')" ${!product.inStock ? 'disabled' : ''}>
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

// Utility Functions
function formatPrice(price) {
    return new Intl.NumberFormat('fa-IR').format(price);
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

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Also update mobile cart count if it exists
        const cartCountMobile = document.getElementById('cartCountMobile');
        if (cartCountMobile) {
            cartCountMobile.textContent = totalItems;
        }
    }
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

// Related product functions
function changeQuantity(productId, change) {
    const quantityElement = document.getElementById(`quantity-${productId}`);
    if (quantityElement) {
        let currentQuantity = parseInt(quantityElement.textContent);
        currentQuantity = Math.max(1, Math.min(10, currentQuantity + change));
        quantityElement.textContent = currentQuantity;
    }
}

function addRelatedToCart(productId) {
    const quantityElement = document.getElementById(`quantity-${productId}`);
    const quantity = quantityElement ? parseInt(quantityElement.textContent) : 1;
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const productInfo = {
        id: product.id,
        name: product.name,
        brand: product.brand,
        volume: product.volume,
        price: product.price,
        image: product.image,
        category: product.category,
        rating: product.rating,
        reviews: product.reviews,
        inStock: product.inStock,
        discount: product.discount,
        features: product.features
    };

    const existingIndex = cart.findIndex(item => item.product && item.product.id === productInfo.id);
    
    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({ product: productInfo, quantity: quantity });
    }

    saveCartToStorage();
    showNotification('محصول به سبد خرید اضافه شد', 'success');
    updateCartCount();
}

function showMoreInfo(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

function toggleWishlist(productId) {
    const heartIcon = event.target.closest('.wishlist-btn').querySelector('.fa-heart');
    heartIcon.classList.toggle('fas');
    heartIcon.classList.toggle('far');
    
    if (heartIcon.classList.contains('fas')) {
        showNotification('به لیست علاقه‌مندی‌ها اضافه شد', 'success');
    } else {
        showNotification('از لیست علاقه‌مندی‌ها حذف شد', 'info');
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Mobile Navigation Functions
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navigation = document.querySelector('.navigation');
    
    if (navToggle && navigation) {
        navToggle.addEventListener('click', function() {
            navigation.classList.toggle('open');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navigation.contains(e.target) && !navToggle.contains(e.target)) {
                navigation.classList.remove('open');
            }
        });
    }
}

// Search Accordion Function
function initSearchAccordion() {
    const toggleSearchBtn = document.getElementById('toggleSearchAccordion');
    const searchAccordion = document.querySelector('.search-accordion');
    
    if (toggleSearchBtn && searchAccordion) {
        toggleSearchBtn.addEventListener('click', function() {
            searchAccordion.classList.toggle('open');
        });
        
        // Close search accordion when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchAccordion.contains(e.target) && !toggleSearchBtn.contains(e.target)) {
                searchAccordion.classList.remove('open');
            }
        });
    }
}

// Logo Accordion Function
function initLogoAccordion() {
    const logoToggle = document.querySelector('.logo h1.mobile-accordion-toggle');
    const navigation = document.querySelector('.navigation');
    
    if (logoToggle && navigation) {
        logoToggle.addEventListener('click', function() {
            navigation.classList.toggle('logo-open');
        });
        
        // Close logo accordion when clicking outside
        document.addEventListener('click', function(e) {
            if (!navigation.contains(e.target) && !logoToggle.contains(e.target)) {
                navigation.classList.remove('logo-open');
            }
        });
    }
}

// Floating Cart Button Function
function initFabCart() {
    const fabCartBtn = document.getElementById('fabCartBtn');
    
    if (fabCartBtn) {
        fabCartBtn.addEventListener('click', function() {
            openCart();
        });
    }
}