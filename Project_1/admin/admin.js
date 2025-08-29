// Auth guard
(function(){
  const authed = localStorage.getItem('admin_auth');
  if (!authed && !location.pathname.endsWith('index.html')) {
    window.location.href = 'index.html';
  }
})();

// Utils
function formatPrice(num){
  const n = Number(num||0);
  return new Intl.NumberFormat('fa-IR').format(n);
}
function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,8); }

// Seed demo products if not exists
const seedProducts = [
  { id:'1', name:'عطر مردانه دیور', brand:'Dior', description:'رایحه گرم و جذاب', price:850000, originalPrice:1200000, image:'img.png', category:'men', rating:4.8, reviews:1247, inStock:true, discount:29, volume:'100ml', features:['ضد حساسیت','پایدار'] },
  { id:'2', name:'عطر زنانه شنل', brand:'Chanel', description:'گل‌های بهاری', price:1200000, originalPrice:1500000, image:'img.png', category:'women', rating:4.9, reviews:892, inStock:true, discount:20, volume:'50ml', features:['طبیعی','لوکس'] },
  { id:'3', name:'عطر یونیسکس تام فورد', brand:'Tom Ford', description:'ترکیب خاص', price:2100000, image:'img.png', category:'unisex', rating:4.7, reviews:567, inStock:true, volume:'100ml', features:['خاص','۱۲ ساعته'] }
];

function getProducts(){
  const raw = localStorage.getItem('admin_products');
  if (!raw){ localStorage.setItem('admin_products', JSON.stringify(seedProducts)); return [...seedProducts]; }
  try{ return JSON.parse(raw) || []; } catch{ return []; }
}
function setProducts(list){ localStorage.setItem('admin_products', JSON.stringify(list)); }

// Activity tracking
function addActivity(type, title, details = '') {
  const activities = JSON.parse(localStorage.getItem('admin_activities') || '[]');
  const activity = {
    id: uid(),
    type,
    title,
    details,
    timestamp: new Date().toISOString(),
    time: new Date().toLocaleTimeString('fa-IR')
  };
  activities.unshift(activity);
  if (activities.length > 20) activities.pop(); // Keep only last 20
  localStorage.setItem('admin_activities', JSON.stringify(activities));
  renderActivities();
}

function renderActivities() {
  const activityList = document.getElementById('activityList');
  if (!activityList) return;
  
  const activities = JSON.parse(localStorage.getItem('admin_activities') || '[]');
  const recentActivities = activities.slice(0, 5);
  
  activityList.innerHTML = recentActivities.map(activity => `
    <div class="activity-item">
      <div class="activity-icon ${activity.type}">
        <i class="fa-solid fa-${activity.type === 'add' ? 'plus' : activity.type === 'edit' ? 'pen' : 'trash'}"></i>
      </div>
      <div class="activity-content">
        <div class="activity-title">${activity.title}</div>
        <div class="activity-time">${activity.time}</div>
      </div>
    </div>
  `).join('');
}

// Stats - Only show real product count, no fake data
function refreshStats(){
  const list = getProducts();
  const statProducts = document.getElementById('statProducts');
  const statOrders = document.getElementById('statOrders');
  const statSales = document.getElementById('statSales');
  const statUsers = document.getElementById('statUsers');
  
  // Show real product count only
  if (statProducts) {
    animateNumber(statProducts, list.length);
  }
  
  // Remove fake data - show dashes for demo
  if (statOrders) statOrders.textContent = '—';
  if (statSales) statSales.textContent = '—';
  if (statUsers) statUsers.textContent = '—';
  
  // Update charts if they exist
  if (statsChart) {
    const totalProducts = list.length;
    const inStock = list.filter(p => p.inStock).length;
    const outOfStock = list.filter(p => !p.inStock).length;
    
    statsChart.data.datasets[0].data = [totalProducts, inStock, outOfStock];
    statsChart.update();
  }
}

function animateNumber(element, target, isPrice = false) {
  if (!element) return;
  
  const start = 0;
  const duration = 1000;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const current = Math.floor(start + (target - start) * easeOutQuart(progress));
    element.textContent = isPrice ? formatPrice(current) + ' تومان' : current;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

// Charts - Simplified without fake data
let salesChart, productsChart, monthlyChart, categoryChart, statsChart;

function initCharts() {
  // Stats Chart - Line chart for overall statistics
  const statsCtx = document.getElementById('statsChart');
  if (statsCtx) {
    const products = getProducts();
    const totalProducts = products.length;
    const inStock = products.filter(p => p.inStock).length;
    const outOfStock = products.filter(p => !p.inStock).length;
    
    statsChart = new Chart(statsCtx, {
      type: 'line',
      data: {
        labels: ['کل محصولات', 'موجود', 'ناموجود'],
        datasets: [{
          label: 'تعداد',
          data: [totalProducts, inStock, outOfStock],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#3b82f6',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0,0,0,0.1)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  // Products Chart - Show real product distribution
  const productsCtx = document.getElementById('productsChart');
  if (productsCtx) {
    const products = getProducts();
    const categories = products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
    
    productsChart = new Chart(productsCtx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(categories).map(cat => {
          switch(cat) {
            case 'men': return 'مردانه';
            case 'women': return 'زنانه';
            case 'unisex': return 'یونیسکس';
            default: return cat;
          }
        }),
        datasets: [{
          data: Object.values(categories),
          backgroundColor: ['#3b82f6', '#8b5cf6', '#06b6d4'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true
            }
          }
        }
      }
    });
  }

  // Category Chart - Show real category distribution
  const categoryCtx = document.getElementById('categoryChart');
  if (categoryCtx) {
    const products = getProducts();
    const categories = products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
    
    categoryChart = new Chart(categoryCtx, {
      type: 'pie',
      data: {
        labels: Object.keys(categories).map(cat => {
          switch(cat) {
            case 'men': return 'مردانه';
            case 'women': return 'زنانه';
            case 'unisex': return 'یونیسکس';
            default: return cat;
          }
        }),
        datasets: [{
          data: Object.values(categories),
          backgroundColor: ['#3b82f6', '#ec4899', '#10b981'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }
}

// Navigation
(function(){
  const links = document.querySelectorAll('.menu-item');
  const sections = document.querySelectorAll('.section');
  links.forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      links.forEach(l=>l.classList.remove('active'));
      a.classList.add('active');
      const target = a.dataset.section;
      sections.forEach(s=> s.classList.toggle('active', s.id === `section-${target}`));
      
      // Initialize charts when analytics section is opened
      if (target === 'analytics') {
        setTimeout(() => {
          if (!categoryChart) initCharts();
        }, 100);
      }
    });
  });
  
  // Removed goAddProduct event listener since button was removed from dashboard
})();

// Logout
(function(){
  const btn = document.getElementById('logoutBtn');
  if(!btn) return;
  btn.addEventListener('click', ()=>{
    localStorage.removeItem('admin_auth');
    window.location.href = 'index.html';
  });
})();

// Products table with enhanced rendering
const tbody = document.getElementById('productsTbody');
const searchInput = document.getElementById('productSearch');
const categoryFilter = document.getElementById('productCategoryFilter');
const statusFilter = document.getElementById('productStatusFilter');

function renderProducts(){
  if(!tbody) return;
  const q = (searchInput?.value || '').toLowerCase();
  const cat = categoryFilter?.value || 'all';
  const status = statusFilter?.value || 'all';
  const list = getProducts().filter(p=>{
    const matchQ = [p.name, p.brand, p.description].join(' ').toLowerCase().includes(q);
    const matchC = cat==='all' || p.category===cat;
    const matchS = status==='all' || p.inStock.toString()===status;
    return matchQ && matchC && matchS;
  });
  
  tbody.innerHTML = list.map(p=>`
    <tr>
      <td><img src="${p.image}" alt="${p.name}" class="product-image" /></td>
      <td><strong>${p.name}</strong></td>
      <td>${p.brand}</td>
      <td>${formatPrice(p.price)} تومان</td>
      <td>${p.category === 'men' ? 'مردانه' : p.category === 'women' ? 'زنانه' : 'یونیسکس'}</td>
      <td><span class="status-badge ${p.inStock ? 'in-stock' : 'out-of-stock'}">${p.inStock ? 'موجود' : 'ناموجود'}</span></td>
      <td><div class="rating-stars">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5-Math.floor(p.rating))} ${p.rating}</div></td>
      <td>
        <div class="action-group">
          <button class="action-icon edit" title="ویرایش" onclick="openProductModal('${p.id}')"><i class="fa-solid fa-pen"></i></button>
          <button class="action-icon delete" title="حذف" onclick="deleteProduct('${p.id}')"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
  refreshStats();
}

if(searchInput) searchInput.addEventListener('input', renderProducts);
if(categoryFilter) categoryFilter.addEventListener('change', renderProducts);
if(statusFilter) statusFilter.addEventListener('change', renderProducts);

// Product modal - Single instance management
const modal = document.getElementById('productModalEl');
const closeModalBtn = document.getElementById('closeProductModal');
const cancelProduct = document.getElementById('cancelProduct');
const addProductBtn = document.getElementById('addProductBtn');
const modalTitle = document.getElementById('modalTitle');
const form = document.getElementById('productForm');

// Prevent multiple event listeners
let modalInitialized = false;

function initializeModal() {
  if (modalInitialized) return;
  modalInitialized = true;
  
  if(addProductBtn) addProductBtn.addEventListener('click', ()=> {
    window.location.href = 'product-form.html';
  });
}

function openProductModal(id){
  // Redirect to standalone form page
  if (id) {
    window.location.href = `product-form.html?id=${encodeURIComponent(id)}`;
  } else {
    window.location.href = 'product-form.html';
  }
}

function closeProductModal(){ 
  modal?.classList.remove('active'); 
}

// Save product with activity tracking
if(form){
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const id = document.getElementById('productId').value || uid();
    const isEdit = !!document.getElementById('productId').value;
    
    const product = {
      id,
      name: document.getElementById('name').value.trim(),
      brand: document.getElementById('brand').value.trim(),
      description: document.getElementById('description').value.trim(),
      price: Number(document.getElementById('price').value||0),
      originalPrice: Number(document.getElementById('originalPrice').value||0) || undefined,
      image: document.getElementById('image').value.trim() || 'img.png',
      images: (document.getElementById('images')?.value||'')
        .split(',')
        .map(s=>s.trim())
        .filter(Boolean),
      category: document.getElementById('category').value,
      rating: 4.8,
      reviews: 0,
      inStock: document.getElementById('inStock').value === 'true',
      discount: Number(document.getElementById('discount').value||0) || undefined,
      volume: document.getElementById('volume').value.trim() || undefined,
      features: (document.getElementById('features').value||'').split(',').map(s=>s.trim()).filter(Boolean)
    };
    
    const list = getProducts();
    const idx = list.findIndex(x=> x.id === id);
    if(idx>-1) {
      list[idx] = product;
      addActivity('edit', `محصول "${product.name}" ویرایش شد`);
    } else {
      list.unshift(product);
      addActivity('add', `محصول جدید "${product.name}" اضافه شد`);
    }
    
    setProducts(list);
    renderProducts();
    showSuccessMessage(isEdit ? 'محصول با موفقیت ویرایش شد' : 'محصول جدید با موفقیت اضافه شد');
    // After save, go back to dashboard
    if (location.pathname.endsWith('product-form.html')) {
      window.location.href = 'dashboard.html#products';
    }
  });
}

// Auto-populate form on standalone product form page
(function(){
  const standaloneForm = document.getElementById('productForm');
  if(!standaloneForm) return;
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if(id){
    const p = getProducts().find(x=> x.id === id);
    if(p){
      const titleEl = document.getElementById('modalTitle');
      if (titleEl) titleEl.textContent = 'ویرایش محصول';
      document.getElementById('productId').value = id;
      ['name','brand','price','originalPrice','category','volume','discount','inStock','description','image'].forEach(k=>{
        const el = document.getElementById(k);
        if(!el) return;
        if(k==='inStock') el.value = p.inStock? 'true' : 'false';
        else el.value = p[k] ?? '';
      });
      const features = document.getElementById('features');
      if(features) features.value = (p.features||[]).join(', ');
      const images = document.getElementById('images');
      if(images) images.value = (p.images||[]).join(', ');
    }
  } else {
    const titleEl = document.getElementById('modalTitle');
    if (titleEl) titleEl.textContent = 'افزودن محصول';
  }
})();

// Delete product with confirmation
function deleteProduct(id){
  const product = getProducts().find(p => p.id === id);
  if(!product) return;
  
  if(!confirm(`آیا از حذف محصول "${product.name}" اطمینان دارید؟`)) return;
  
  const list = getProducts().filter(x=> x.id !== id);
  setProducts(list);
  renderProducts();
  addActivity('delete', `محصول "${product.name}" حذف شد`);
  showSuccessMessage('محصول با موفقیت حذف شد');
}

// Export / Import with enhanced UI
const exportBtn = document.getElementById('exportProducts');
const importInput = document.getElementById('importProductsInput');
const generateReportBtn = document.getElementById('generateReport');

if(exportBtn){
  exportBtn.addEventListener('click', ()=>{
    const data = localStorage.getItem('admin_products') || '[]';
    const blob = new Blob([data], { type:'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `products-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    showSuccessMessage('فایل محصولات با موفقیت دانلود شد');
  });
}

if(importInput){
  importInput.addEventListener('change', (e)=>{
    const file = e.target.files?.[0];
    if(!file) return;
    
    const reader = new FileReader();
    reader.onload = ()=>{
      try{
        const data = JSON.parse(reader.result || '[]');
        if(Array.isArray(data)){
          setProducts(data);
          renderProducts();
          addActivity('add', `${data.length} محصول وارد شد`);
          showSuccessMessage('واردسازی با موفقیت انجام شد');
        } else {
          showErrorMessage('فرمت فایل نامعتبر است');
        }
      }catch{ 
        showErrorMessage('خطا در خواندن فایل');
      }
    };
    reader.readAsText(file);
  });
}

if(generateReportBtn) {
  generateReportBtn.addEventListener('click', () => {
    const products = getProducts();
    const report = {
      totalProducts: products.length,
      totalValue: products.reduce((sum, p) => sum + p.price, 0),
      categories: products.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
      }, {}),
      inStock: products.filter(p => p.inStock).length,
      outOfStock: products.filter(p => !p.inStock).length,
      generatedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type:'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    showSuccessMessage('گزارش فروش با موفقیت دانلود شد');
  });
}

// Simple message functions (without notifications)
function showSuccessMessage(message) {
  console.log('Success:', message);
}

function showErrorMessage(message) {
  console.log('Error:', message);
}

// Sidebar toggle functionality
function initSidebarToggle() {
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
    
    // Close sidebar when clicking on menu items (mobile)
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        if (window.innerWidth <= 720) {
          sidebar.classList.remove('open');
        }
      });
    });
  }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
  initializeModal();
  renderProducts();
  refreshStats();
  renderActivities();
  initCharts();
  initSidebarToggle();
  
  // Add some demo activities only if no activities exist
  if (!localStorage.getItem('admin_activities')) {
    addActivity('add', 'محصول جدید اضافه شد', 'عطر مردانه دیور');
    addActivity('edit', 'محصول ویرایش شد', 'عطر زنانه شنل');
    addActivity('add', 'محصول جدید اضافه شد', 'عطر یونیسکس تام فورد');
  }
});

// Add CSS for new elements
const additionalStyles = `
  .status-badge {
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
  }
  
  .status-badge.in-stock {
    background: rgba(34,197,94,0.1);
    color: #22c55e;
  }
  
  .status-badge.out-of-stock {
    background: rgba(239,68,68,0.1);
    color: #ef4444;
  }
  

  
  .chart-info {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
`;
const modalEl = document.getElementById('productModalEl');
const openBtn = document.getElementById('openProductModal'); // فرضا دکمه باز کردن
const closeBtn = document.getElementById('closeProductModal');
if (openBtn && modalEl) openBtn.addEventListener('click', () => {
  modalEl.classList.add('active');
});
if (closeBtn && modalEl) closeBtn.addEventListener('click', () => {
  modalEl.classList.remove('active');
});
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
