// ============================================================
// APP.JS — OPEN TABLES Customer-facing Shared Logic
// ============================================================

/* ---- CART ---- */
let cart = JSON.parse(localStorage.getItem('opentables_cart') || '[]');

function saveCart() { localStorage.setItem('opentables_cart', JSON.stringify(cart)); }

function addToCart(id) {
  const products = getProducts();
  const product = products.find(p => p.id === id);
  if (!product || !product.available) return;
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  }
  saveCart();
  updateCartBadge();
  showToast(`${product.name} added to cart 🛒`);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartBadge();
}

function updateCartItem(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else saveCart();
  updateCartBadge();
  if (typeof renderCart === 'function') renderCart();
}

function getCartTotal() { return cart.reduce((s, i) => s + i.price * i.qty, 0); }
function getCartCount() { return cart.reduce((s, i) => s + i.qty, 0); }

/* ---- MOBILE & DESKTOP FLOATING CART BUTTON ---- */
function ensureCartFloatButton() {
  let btn = document.getElementById('cartFloatBtn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'cartFloatBtn';
    btn.className = 'cart-float';
    btn.innerHTML = `🛒 <span class="cart-float-text">Cart</span> <span class="cart-float-count">0</span> <span class="cart-float-total">Rs. 0</span>`;
    document.body.appendChild(btn);
  }
  btn.onclick = () => {
    if (window.location.pathname.endsWith('order.html')) {
      const target = document.getElementById('cartSection') || document.querySelector('.cart-panel') || document.getElementById('cartItems');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.href = 'order.html';
    }
  };
}

function updateCartBadge() {
  ensureCartFloatButton();
  const count = getCartCount();
  const total = getCartTotal();
  document.querySelectorAll('.cart-count-badge').forEach(el => { el.textContent = count; });
  const floatBtn = document.getElementById('cartFloatBtn');
  if (floatBtn) {
    floatBtn.style.display = count > 0 ? 'flex' : 'none';
    const fc = floatBtn.querySelector('.cart-float-count');
    if (fc) fc.textContent = count;
    const ft = floatBtn.querySelector('.cart-float-total');
    if (ft) ft.textContent = 'Rs. ' + total.toLocaleString();
  }
}

/* ---- TOAST NOTIFICATIONS ---- */
let toastTimer;
function showToast(msg, isError = false) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = 'toast' + (isError ? ' error' : '');
  clearTimeout(toastTimer);
  requestAnimationFrame(() => { toast.classList.add('show'); });
  toastTimer = setTimeout(() => { toast.classList.remove('show'); }, 3000);
}

/* ---- NAVBAR ---- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }
}

/* ---- HOME PAGE CARDS ---- */
function renderFeaturedDishes() {
  const el = document.getElementById('featuredDishes');
  if (!el) return;
  const featured = getProducts().filter(p => p.badge === 'popular' && p.available).slice(0, 6);
  el.innerHTML = featured.map(p => dishCard(p)).join('');
  el.querySelectorAll('.dish-add-btn').forEach(btn => {
    btn.addEventListener('click', () => addToCart(+btn.dataset.id));
  });
}

function renderHomeOffers() {
  const el = document.getElementById('homeOffersGrid');
  if (!el) return;
  const offers = getOffers().filter(o => o.active).slice(0, 3);
  el.innerHTML = offers.length ? offers.map(o => offerCard(o)).join('') : '<p style="color:var(--text-muted)">No active deals at the moment.</p>';
  el.querySelectorAll('.offer-code').forEach(el => {
    el.addEventListener('click', () => {
      navigator.clipboard.writeText(el.textContent).then(() => showToast('Deal code copied! 🎉'));
    });
  });
}

function dishCard(p) {
  const visual = p.image 
    ? `<div class="dish-img-wrap"><img src="${p.image}" alt="${p.name}" class="dish-img" onerror="this.onerror=null;this.parentElement.outerHTML='<span class=\\\'dish-emoji\\\'>${p.emoji || '🍽️'}</span>'" /></div>`
    : `<span class="dish-emoji">${p.emoji || '🍽️'}</span>`;

  return `<div class="dish-card">
    ${visual}
    <div class="dish-info">
      <div>
        <div class="dish-name">${p.name}</div>
        <div class="dish-desc">${p.desc || ''}</div>
      </div>
      <div class="dish-footer">
        <span class="dish-price">Rs. ${p.price.toLocaleString()}</span>
        ${p.badge ? `<span class="dish-badge badge-${p.badge}">${p.badge}</span>` : ''}
        <button class="dish-add-btn" data-id="${p.id}">+ Add</button>
      </div>
    </div>
  </div>`;
}

function offerCard(o) {
  return `<div class="offer-card">
    <span class="offer-discount">${o.discount}</span>
    <h3>${o.title}</h3>
    <p>${o.desc}</p>
    ${o.minOrder ? `<p style="font-size:.8rem;color:var(--text-muted)">Min. order: Rs. ${o.minOrder.toLocaleString()}</p>` : ''}
    <div>
      <div style="font-size:.82rem;color:var(--text-muted);margin-bottom:.3rem">Use Deal Code:</div>
      <span class="offer-code" title="Click to copy">${o.code}</span>
    </div>
    <div class="offer-validity">Valid until: ${o.validUntil}</div>
  </div>`;
}

/* ---- CONTACT FORM ---- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('formSuccess').style.display = 'block';
    form.reset();
    setTimeout(() => { document.getElementById('formSuccess').style.display = 'none'; }, 5000);
  });
}

/* ---- INIT ---- */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  renderFeaturedDishes();
  renderHomeOffers();
  initContactForm();
  updateCartBadge();
});
