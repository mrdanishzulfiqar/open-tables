import { MENU_DATA } from './menu-data.js';

class RestaurantPhotoApp {
  constructor() {
    this.sectionStates = {};
    this.cart = [];
    this.audioCtx = null;
    this.soundEnabled = true;

    this.init();
  }

  init() {
    this.initAudio();
    this.setupCategories();
    this.setupCartEvents();
    this.setupScrollSpy();
    this.setupGlobalShortcuts();
  }

  initAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    } catch (e) {
      console.warn("Web Audio not supported", e);
    }
  }

  playBeep(type = 'click') {
    if (!this.soundEnabled || !this.audioCtx) return;
    try {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      if (type === 'click') {
        osc.frequency.setValueAtTime(440, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, this.audioCtx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.05);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.05);
      } else if (type === 'cart') {
        osc.frequency.setValueAtTime(523.25, this.audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, this.audioCtx.currentTime + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, this.audioCtx.currentTime + 0.16); // G5
        gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.3);
      } else if (type === 'swoosh') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(160, this.audioCtx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.06, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.12);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.12);
      }
    } catch (e) {
      // Audio context policy
    }
  }

  setupCategories() {
    const categories = ['pizzas', 'burgers', 'wraps', 'broast', 'steaks', 'drinks', 'deals'];

    categories.forEach(catKey => {
      const data = MENU_DATA[catKey];
      if (!data) return;

      const firstItem = data.items[0];
      const initialSize = firstItem.availableSizes ? firstItem.availableSizes[0] : Object.keys(firstItem.prices)[0];

      this.sectionStates[catKey] = {
        currentIndex: 0,
        selectedSize: initialSize,
        quantity: 1,
        isMealUpgrade: false,
        extraToppings: false
      };

      // Set initial Photo
      this.updateSectionPhoto(catKey, firstItem);

      // Populate Carousel Strip with Photo Thumbnails
      this.populateCarouselStrip(catKey);

      // Render Item Details Card
      this.renderItemDetails(catKey);

      // Setup Prev/Next Navigation Buttons
      this.setupSectionNav(catKey);
    });
  }

  updateSectionPhoto(catKey, item) {
    const photoEl = document.getElementById(`photo-img-${catKey}`);
    const badgeEl = document.getElementById(`photo-badge-${catKey}`);
    if (!photoEl) return;

    // Smooth subtle crossfade
    photoEl.style.opacity = '0.3';
    photoEl.style.transform = 'scale(0.96)';

    setTimeout(() => {
      photoEl.src = item.image;
      photoEl.alt = item.name;
      photoEl.style.opacity = '1';
      photoEl.style.transform = 'scale(1)';
    }, 120);

    if (badgeEl) {
      badgeEl.innerHTML = `<i class="fas fa-tag"></i> ${item.tag || item.category}`;
    }
  }

  populateCarouselStrip(catKey) {
    const stripEl = document.getElementById(`carousel-strip-${catKey}`);
    if (!stripEl) return;
    const catData = MENU_DATA[catKey];

    stripEl.innerHTML = '';
    catData.items.forEach((item, index) => {
      const thumb = document.createElement('div');
      thumb.className = `carousel-thumb-card ${index === 0 ? 'active' : ''}`;
      thumb.id = `thumb-${catKey}-${index}`;

      const firstPrice = Object.values(item.prices)[0];

      thumb.innerHTML = `
        <div class="thumb-image-wrapper">
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
        </div>
        <div class="thumb-card-body">
          <div>
            <h4 class="thumb-title">${item.name}</h4>
            <p class="thumb-category">${item.category}</p>
          </div>
          <div class="thumb-price">From Rs. ${firstPrice.toLocaleString()}</div>
        </div>
      `;

      thumb.addEventListener('click', () => {
        this.selectItemByIndex(catKey, index);
      });

      stripEl.appendChild(thumb);
    });

    // Horizontal wheel scroll listener for effortless trackpad / mousewheel scrolling right
    stripEl.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        stripEl.scrollLeft += e.deltaY;
      }
    }, { passive: true });
  }

  setupSectionNav(catKey) {
    const prevBtn = document.getElementById(`prev-btn-${catKey}`);
    const nextBtn = document.getElementById(`next-btn-${catKey}`);
    const catData = MENU_DATA[catKey];

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const state = this.sectionStates[catKey];
        const newIndex = (state.currentIndex - 1 + catData.items.length) % catData.items.length;
        this.selectItemByIndex(catKey, newIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const state = this.sectionStates[catKey];
        const newIndex = (state.currentIndex + 1) % catData.items.length;
        this.selectItemByIndex(catKey, newIndex);
      });
    }
  }

  selectItemByIndex(catKey, newIndex) {
    const state = this.sectionStates[catKey];
    if (state.currentIndex === newIndex) return;

    state.currentIndex = newIndex;
    const catData = MENU_DATA[catKey];
    const item = catData.items[newIndex];

    state.selectedSize = item.availableSizes ? item.availableSizes[0] : Object.keys(item.prices)[0];
    state.isMealUpgrade = false;
    state.extraToppings = false;
    state.quantity = 1;

    this.playBeep('swoosh');

    // Update Photo with instant zero-lag transition
    this.updateSectionPhoto(catKey, item);

    // Update Carousel Highlight and auto-scroll into view
    const allThumbs = document.querySelectorAll(`#carousel-strip-${catKey} .carousel-thumb-card`);
    allThumbs.forEach((t, idx) => {
      t.classList.toggle('active', idx === newIndex);
    });
    const activeThumb = document.getElementById(`thumb-${catKey}-${newIndex}`);
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    // Re-render Details Card
    this.renderItemDetails(catKey);
  }

  calculateItemPrice(catKey) {
    const state = this.sectionStates[catKey];
    const catData = MENU_DATA[catKey];
    const item = catData.items[state.currentIndex];

    let basePrice = item.prices[state.selectedSize] || Object.values(item.prices)[0];

    // Burger meal upgrade (+250)
    if (state.isMealUpgrade && item.mealPrice) {
      basePrice += item.mealPrice;
    }

    // Extra pizza toppings
    if (state.extraToppings && item.extraToppingRates) {
      const topRate = item.extraToppingRates[state.selectedSize] || 200;
      basePrice += topRate;
    }

    return basePrice * state.quantity;
  }

  renderItemDetails(catKey) {
    const detailsContainer = document.getElementById(`details-${catKey}`);
    if (!detailsContainer) return;

    const state = this.sectionStates[catKey];
    const catData = MENU_DATA[catKey];
    const item = catData.items[state.currentIndex];

    const currentPrice = this.calculateItemPrice(catKey);
    const itemIndexText = `${String(state.currentIndex + 1).padStart(2, '0')} / ${String(catData.items.length).padStart(2, '0')}`;

    // Size Pills HTML
    const sizes = item.availableSizes || Object.keys(item.prices);
    const sizePillsHtml = sizes.map(size => {
      const p = item.prices[size];
      const isSelected = size === state.selectedSize;
      return `
        <button class="size-pill ${isSelected ? 'active' : ''}" data-size="${size}">
          <span>${size}</span>
          ${p ? `<span class="size-pill-price">Rs. ${p.toLocaleString()}</span>` : ''}
        </button>
      `;
    }).join('');

    // Extra Customizations HTML
    let addonHtml = '';
    if (catKey === 'burgers' && item.mealPrice) {
      addonHtml = `
        <div class="customization-section">
          <span class="customization-label">Combo Upgrade</span>
          <div class="addon-options-group">
            <button class="addon-pill ${state.isMealUpgrade ? 'selected' : ''}" id="addon-meal-${catKey}">
              <i class="fas fa-french-fries"></i>
              <span>Make a Meal with Fries & Drink (+Rs. ${item.mealPrice})</span>
            </button>
          </div>
        </div>
      `;
    } else if (catKey === 'pizzas' && item.extraToppingRates) {
      const topPrice = item.extraToppingRates[state.selectedSize] || 200;
      addonHtml = `
        <div class="customization-section">
          <span class="customization-label">Custom Topping</span>
          <div class="addon-options-group">
            <button class="addon-pill ${state.extraToppings ? 'selected' : ''}" id="addon-toppings-${catKey}">
              <i class="fas fa-cheese"></i>
              <span>Extra Mozzarella & Toppings (+Rs. ${topPrice})</span>
            </button>
          </div>
        </div>
      `;
    }

    detailsContainer.innerHTML = `
      <div>
        <div class="item-meta-top">
          <span class="item-index-counter">${itemIndexText}</span>
          <span class="item-tag-badge">${item.tag || 'Popular Pick'}</span>
        </div>
        <h3 class="item-title">${item.name}</h3>
        <p class="item-category-label"><i class="fas fa-utensils"></i> ${item.category}</p>
        <p class="item-description">${item.desc}</p>
      </div>

      <div>
        ${sizes.length > 1 ? `
          <div class="customization-section">
            <span class="customization-label">Select Portion / Size</span>
            <div class="size-pill-group" id="size-group-${catKey}">
              ${sizePillsHtml}
            </div>
          </div>
        ` : ''}

        ${addonHtml}

        <div class="action-price-bar">
          <div class="price-display-wrapper">
            <span class="price-display-label">Total Price</span>
            <div class="price-display-amount">Rs. ${currentPrice.toLocaleString()}</div>
          </div>

          <div class="quantity-add-group">
            <div class="qty-counter">
              <button class="qty-btn" id="qty-dec-${catKey}"><i class="fas fa-minus"></i></button>
              <span class="qty-number" id="qty-num-${catKey}">${state.quantity}</span>
              <button class="qty-btn" id="qty-inc-${catKey}"><i class="fas fa-plus"></i></button>
            </div>

            <button class="add-to-cart-action-btn" id="add-cart-btn-${catKey}">
              <i class="fas fa-shopping-bag"></i>
              <span>Add to Order</span>
            </button>
          </div>
        </div>
      </div>
    `;

    // Bind size click events
    const sizePillBtns = detailsContainer.querySelectorAll(`#size-group-${catKey} .size-pill`);
    sizePillBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const chosenSize = btn.getAttribute('data-size');
        state.selectedSize = chosenSize;
        this.playBeep('click');
        this.renderItemDetails(catKey);
      });
    });

    // Bind Addon Toggles
    const mealBtn = detailsContainer.querySelector(`#addon-meal-${catKey}`);
    if (mealBtn) {
      mealBtn.addEventListener('click', () => {
        state.isMealUpgrade = !state.isMealUpgrade;
        this.playBeep('click');
        this.renderItemDetails(catKey);
      });
    }

    const toppingBtn = detailsContainer.querySelector(`#addon-toppings-${catKey}`);
    if (toppingBtn) {
      toppingBtn.addEventListener('click', () => {
        state.extraToppings = !state.extraToppings;
        this.playBeep('click');
        this.renderItemDetails(catKey);
      });
    }

    // Bind Quantity Buttons
    const decBtn = detailsContainer.querySelector(`#qty-dec-${catKey}`);
    const incBtn = detailsContainer.querySelector(`#qty-inc-${catKey}`);
    if (decBtn) {
      decBtn.addEventListener('click', () => {
        if (state.quantity > 1) {
          state.quantity--;
          this.playBeep('click');
          this.renderItemDetails(catKey);
        }
      });
    }
    if (incBtn) {
      incBtn.addEventListener('click', () => {
        if (state.quantity < 20) {
          state.quantity++;
          this.playBeep('click');
          this.renderItemDetails(catKey);
        }
      });
    }

    // Bind Add to Cart
    const addCartBtn = detailsContainer.querySelector(`#add-cart-btn-${catKey}`);
    if (addCartBtn) {
      addCartBtn.addEventListener('click', () => {
        this.addToCart(catKey);
      });
    }
  }

  addToCart(catKey) {
    const state = this.sectionStates[catKey];
    const catData = MENU_DATA[catKey];
    const item = catData.items[state.currentIndex];
    const unitPrice = this.calculateItemPrice(catKey) / state.quantity;

    const cartEntry = {
      id: `${item.id}-${state.selectedSize}-${state.isMealUpgrade}-${state.extraToppings}`,
      name: item.name,
      category: item.category,
      size: state.selectedSize,
      isMeal: state.isMealUpgrade,
      extraToppings: state.extraToppings,
      unitPrice: unitPrice,
      quantity: state.quantity
    };

    // Check if already in cart
    const existing = this.cart.find(c => c.id === cartEntry.id);
    if (existing) {
      existing.quantity += cartEntry.quantity;
    } else {
      this.cart.push(cartEntry);
    }

    this.playBeep('cart');
    this.updateCartUI();
    this.showToast(`Added ${state.quantity}x ${item.name} (${state.selectedSize}) to order!`);

    state.quantity = 1;
    this.renderItemDetails(catKey);
  }

  setupCartEvents() {
    const cartToggleBtn = document.getElementById('cart-toggle-btn');
    const cartCloseBtn = document.getElementById('cart-close-btn');
    const cartOverlay = document.getElementById('cart-overlay');
    const whatsappBtn = document.getElementById('whatsapp-checkout-btn');

    if (cartToggleBtn) {
      cartToggleBtn.addEventListener('click', () => {
        this.openCart();
      });
    }

    if (cartCloseBtn) {
      cartCloseBtn.addEventListener('click', () => {
        this.closeCart();
      });
    }

    if (cartOverlay) {
      cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) {
          this.closeCart();
        }
      });
    }

    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', () => {
        this.checkoutWhatsApp();
      });
    }
  }

  openCart() {
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartOverlay) {
      cartOverlay.classList.add('open');
      this.renderCartItems();
    }
  }

  closeCart() {
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartOverlay) {
      cartOverlay.classList.remove('open');
    }
  }

  updateCartUI() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById('cart-badge-count');
    if (cartCountEl) {
      cartCountEl.textContent = totalItems;
    }
  }

  renderCartItems() {
    const listEl = document.getElementById('cart-items-list');
    const subtotalEl = document.getElementById('cart-subtotal-val');
    const totalEl = document.getElementById('cart-grandtotal-val');
    if (!listEl) return;

    if (this.cart.length === 0) {
      listEl.innerHTML = `
        <div class="cart-empty-state">
          <i class="fas fa-shopping-bag"></i>
          <h4>Your Feast is Empty</h4>
          <p>Explore pizzas, burgers, shawarmas, and drinks to add delicious items!</p>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = 'Rs. 0';
      if (totalEl) totalEl.textContent = 'Rs. 0';
      return;
    }

    let subtotal = 0;
    listEl.innerHTML = '';

    this.cart.forEach((cartItem, idx) => {
      const itemTotal = cartItem.unitPrice * cartItem.quantity;
      subtotal += itemTotal;

      let extras = [];
      if (cartItem.size) extras.push(`Size: ${cartItem.size}`);
      if (cartItem.isMeal) extras.push('With Fries & Drink Meal (+Rs. 250)');
      if (cartItem.extraToppings) extras.push('Extra Toppings Added');

      const row = document.createElement('div');
      row.className = 'cart-item-row';
      row.innerHTML = `
        <div class="cart-item-info">
          <div class="cart-item-name">${cartItem.name}</div>
          <div class="cart-item-details">${extras.join(' • ')}</div>
          <div style="margin-top: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
            <div class="qty-counter" style="scale: 0.85; transform-origin: left center;">
              <button class="qty-btn" data-action="dec" data-index="${idx}"><i class="fas fa-minus"></i></button>
              <span class="qty-number">${cartItem.quantity}</span>
              <button class="qty-btn" data-action="inc" data-index="${idx}"><i class="fas fa-plus"></i></button>
            </div>
            <button class="cart-del-btn" data-index="${idx}" style="background:none; border:none; color:#e63946; font-size:0.8rem; cursor:pointer; padding: 0.2rem 0.4rem;">Remove</button>
          </div>
        </div>
        <div class="cart-item-price-col">
          <div class="cart-item-subtotal">Rs. ${itemTotal.toLocaleString()}</div>
        </div>
      `;
      listEl.appendChild(row);
    });

    listEl.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        const index = parseInt(btn.getAttribute('data-index'), 10);
        if (action === 'inc') {
          this.cart[index].quantity++;
        } else if (action === 'dec') {
          if (this.cart[index].quantity > 1) {
            this.cart[index].quantity--;
          } else {
            this.cart.splice(index, 1);
          }
        }
        this.updateCartUI();
        this.renderCartItems();
      });
    });

    listEl.querySelectorAll('.cart-del-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'), 10);
        this.cart.splice(index, 1);
        this.updateCartUI();
        this.renderCartItems();
      });
    });

    if (subtotalEl) subtotalEl.textContent = `Rs. ${subtotal.toLocaleString()}`;
    if (totalEl) totalEl.textContent = `Rs. ${subtotal.toLocaleString()}`;
  }

  checkoutWhatsApp() {
    if (this.cart.length === 0) {
      alert("Your order is empty. Please add some delicious food items first!");
      return;
    }

    const nameInput = document.getElementById('cust-name');
    const phoneInput = document.getElementById('cust-phone');
    const addressInput = document.getElementById('cust-address');

    const customerName = (nameInput && nameInput.value.trim()) || "Guest Customer";
    const customerPhone = (phoneInput && phoneInput.value.trim()) || "Not provided";
    const customerAddress = (addressInput && addressInput.value.trim()) || "Dine-in / Pickup";

    let message = `🍕 *NEW ORDER - RESTAURANT MENU*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `👤 *Customer:* ${customerName}\n`;
    message += `📞 *Phone:* ${customerPhone}\n`;
    message += `📍 *Delivery Address:* ${customerAddress}\n\n`;
    message += `📋 *ORDER ITEMS:*\n`;

    let total = 0;
    this.cart.forEach((item, i) => {
      const lineTotal = item.unitPrice * item.quantity;
      total += lineTotal;
      let details = item.size ? `(${item.size})` : '';
      if (item.isMeal) details += ' [+Meal]';
      if (item.extraToppings) details += ' [+Toppings]';
      message += `${i + 1}. *${item.name}* ${details}\n   Qty: ${item.quantity} × Rs. ${item.unitPrice.toLocaleString()} = *Rs. ${lineTotal.toLocaleString()}*\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 *TOTAL BILL:* *Rs. ${total.toLocaleString()}*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `🚀 Order placed via Interactive Menu Website`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  }

  showToast(text) {
    const toast = document.getElementById('toast-notice');
    if (!toast) return;
    toast.querySelector('.toast-text').textContent = text;
    toast.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  setupScrollSpy() {
    const sections = document.querySelectorAll('.food-section');
    const navPills = document.querySelectorAll('.category-nav-pill');

    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      const scrollPos = window.scrollY + 200;

      sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = sec.getAttribute('data-category');
        }
      });

      if (currentSectionId) {
        navPills.forEach(pill => {
          const cat = pill.getAttribute('data-cat');
          pill.classList.toggle('active', cat === currentSectionId);
        });
      }
    }, { passive: true });
  }

  setupGlobalShortcuts() {
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        this.soundEnabled = !this.soundEnabled;
        soundBtn.innerHTML = this.soundEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
        this.showToast(this.soundEnabled ? "Sound Effects Enabled 🔊" : "Sound Muted 🔇");
      });
    }

    // Keyboard arrow navigation for active section
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const sections = Array.from(document.querySelectorAll('.food-section'));
        const visibleSection = sections.find(sec => {
          const rect = sec.getBoundingClientRect();
          return rect.top >= -200 && rect.top <= window.innerHeight * 0.5;
        });

        if (visibleSection) {
          const catKey = visibleSection.getAttribute('data-category');
          if (catKey && this.sectionStates[catKey]) {
            const catData = MENU_DATA[catKey];
            const state = this.sectionStates[catKey];
            const delta = e.key === 'ArrowRight' ? 1 : -1;
            const newIndex = (state.currentIndex + delta + catData.items.length) % catData.items.length;
            this.selectItemByIndex(catKey, newIndex);
          }
        }
      }
    });
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new RestaurantPhotoApp();
});
