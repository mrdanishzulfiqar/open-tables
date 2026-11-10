// ============================================================
// DATA STORE — OPEN TABLES (localStorage-backed)
// ============================================================

const DB = {
  get(key) {
    try { return JSON.parse(localStorage.getItem('opentables_' + key)); } catch { return null; }
  },
  set(key, val) {
    localStorage.setItem('opentables_' + key, JSON.stringify(val));
  }
};

// ---- SEED DEFAULT DATA FOR OPEN TABLES ----
function initData() {
  if (!DB.get('seeded_v2')) {

    DB.set('restaurant_info', {
      name: 'OPEN TABLES',
      tagline: 'Casual Dining & Fast Food · Lahore',
      address: '12 Canal Rd, Lahore Medical Housing Society Commercial Area Phase 1 Lahore Medical Housing Scheme, Lahore, 54000, Pakistan',
      phone: '03224710141',
      mapsUrl: 'https://maps.app.goo.gl/im5g5WJNsADPqmjK8',
      hours: {
        monThu: '12:00 PM – 1:00 AM',
        friSat: '12:00 PM – 2:00 AM',
        sunday: '12:00 PM – 1:00 AM'
      }
    });

    DB.set('products', [
      // === Wraps & Shawarma ===
      { id: 101, category: 'Wraps & Shawarma', name: 'Shawarma', emoji: '🌯', desc: 'Classic spiced chicken shawarma with pita, pickles & creamy mayo tahini.', price: 290, badge: 'popular', available: true },
      { id: 102, category: 'Wraps & Shawarma', name: 'Crispy Roll', emoji: '🌯', desc: 'Golden crispy chicken strips rolled with sauces and fresh crunchy greens.', price: 320, badge: '', available: true },
      { id: 103, category: 'Wraps & Shawarma', name: 'Zinger Shawarma', emoji: '🌯', desc: 'Crunchy zinger chicken chunks loaded with signature sauce and garlic mayo.', price: 390, badge: 'popular', available: true },
      { id: 104, category: 'Wraps & Shawarma', name: 'Arabian Shawarma', emoji: '🌯', desc: 'Authentic Middle Eastern Arabian wrap with pickled cucumber & garlic cream.', price: 350, badge: '', available: true },
      { id: 105, category: 'Wraps & Shawarma', name: 'Tortilla Wrap', emoji: '🌯', desc: 'Soft tortilla filled with chicken. Available in Mild, Spicy, Chipotle or Hot Sauce.', price: 520, badge: 'spicy', available: true },
      { id: 106, category: 'Wraps & Shawarma', name: 'Twister', emoji: '🌯', desc: 'Crispy chicken tenders rolled with lettuce, tomatoes and pepper mayo.', price: 520, badge: 'popular', available: true },
      { id: 107, category: 'Wraps & Shawarma', name: 'Paratha Kabab', emoji: '🌯', desc: 'Crispy golden flaky paratha rolled with seasoned grilled kabab and chutneys.', price: 420, badge: '', available: true },
      { id: 108, category: 'Wraps & Shawarma', name: 'Doner', emoji: '🥙', desc: 'Turkish-style roasted shaved meat wrap packed with salads and specialty sauce.', price: 520, badge: '', available: true },
      { id: 109, category: 'Wraps & Shawarma', name: 'Grilled Chicken Wrap', emoji: '🌯', desc: 'Healthy chargrilled chicken breast wrap with herbs and low-cal dressing.', price: 520, badge: '', available: true },

      // === Platters ===
      { id: 201, category: 'Platters', name: 'Chicken Platter', emoji: '🍱', desc: 'Grilled chicken served with flavorful rice, French fries, Garlic Sauce & Peri Sauce.', price: 790, badge: 'popular', available: true },
      { id: 202, category: 'Platters', name: 'Turkish Platter', emoji: '🍱', desc: 'Grilled spiced chicken served with warm bread, garlic fries & specialty Peri sauce.', price: 820, badge: 'popular', available: true },
      { id: 203, category: 'Platters', name: 'Fish & Chips Platter', emoji: '🐟', desc: 'Two pieces crispy fried fish fillet with a large basket of fries & tartar dip sauce.', price: 950, badge: '', available: true },

      // === Burgers ===
      { id: 301, category: 'Burgers', name: 'Classic Patty Burger', emoji: '🍔', desc: 'Classic chicken patty, fresh crispy lettuce and creamy mayo.', price: 320, badge: '', available: true },
      { id: 302, category: 'Burgers', name: 'Chicken Chapli Kabab Burger', emoji: '🍔', desc: 'Traditional chicken chapli kabab patty, lettuce, onions & secret green chilli sauce.', price: 370, badge: 'spicy', available: true },
      { id: 303, category: 'Burgers', name: 'Zinger Burger', emoji: '🍔', desc: 'Signature crispy zinger fillet, crunchy lettuce and premium mayo sauce.', price: 420, badge: 'popular', available: true },
      { id: 304, category: 'Burgers', name: 'Fillet Chicken Burger', emoji: '🍔', desc: 'Deep-fried breast fillet, crisp lettuce & house special garlic mayo sauce.', price: 520, badge: '', available: true },
      { id: 305, category: 'Burgers', name: 'Peri Peri Grilled Burger', emoji: '🍔', desc: 'Grilled breast fillet, lettuce, tomatoes, jalapenos with spicy Peri Peri sauce.', price: 550, badge: 'spicy', available: true },
      { id: 306, category: 'Burgers', name: 'The Little Boy', emoji: '🍔', desc: 'Single smash patty with melted cheddar, jalapenos, fried bun & secret sauce.', price: 620, badge: '', available: true },
      { id: 307, category: 'Burgers', name: 'Fiery Chicken Fillet Burger', emoji: '🍔', desc: 'Deep fried breast fillet in fiery marinade, jalapenos, nacho cheese & garlic mayo.', price: 620, badge: 'spicy', available: true },
      { id: 308, category: 'Burgers', name: 'Fish Burger', emoji: '🍔', desc: 'Golden crumbed fish fillet, crisp lettuce & house special tartar blend.', price: 650, badge: '', available: true },
      { id: 309, category: 'Burgers', name: 'Mighty Zinger Burger', emoji: '🍔', desc: 'Double zinger fillets, double cheese slice, fresh lettuce & mayo.', price: 650, badge: 'popular', available: true },
      { id: 310, category: 'Burgers', name: 'Original Beef Smash Burger', emoji: '🍔', desc: 'Double 100% pure beef patties smashed with melted American cheese & pickles.', price: 690, badge: 'popular', available: true },
      { id: 311, category: 'Burgers', name: 'Loaded Grilled Chicken Burger', emoji: '🍔', desc: '2 grilled breast fillets, lettuce, sliced tomatoes, cheese & chef special sauce.', price: 790, badge: 'popular', available: true },
      { id: 312, category: 'Burgers', name: 'American Grill Cheese Burger', emoji: '🍔', desc: '2 grilled fillets, chopped jalapenos, house sauce & 2 slices of yellow cheddar.', price: 820, badge: '', available: true },
      { id: 313, category: 'Burgers', name: 'Beef Monstrosity Smash Burger', emoji: '🍔', desc: 'Massive 4 beef patties layered with American cheese and caramelized goodness.', price: 1190, badge: 'popular', available: true },

      // === Soups ===
      { id: 401, category: 'Soups', name: 'Chicken Corn Soup (Single)', emoji: '🍲', desc: 'Warm savory soup loaded with shredded chicken and tender sweet corn.', price: 340, badge: '', available: true },
      { id: 402, category: 'Soups', name: 'Chicken Corn Soup (Family)', emoji: '🍲', desc: 'Family bowl of warm comforting chicken corn soup.', price: 950, badge: 'popular', available: true },
      { id: 403, category: 'Soups', name: 'Hot & Sour Soup (Single)', emoji: '🥣', desc: 'Tangy and spicy broth with chicken, mushrooms and egg drops.', price: 360, badge: 'spicy', available: true },
      { id: 404, category: 'Soups', name: 'Hot & Sour Soup (Family)', emoji: '🥣', desc: 'Family bowl of bold, authentic hot and sour soup.', price: 990, badge: 'spicy', available: true },
      { id: 405, category: 'Soups', name: '19-B Soup House Special (Single)', emoji: '🍲', desc: 'Chef specialty thick rich soup with chicken, prawn & mixed herbs.', price: 410, badge: 'popular', available: true },
      { id: 406, category: 'Soups', name: '19-B Soup House Special (Family)', emoji: '🍲', desc: 'Family size serving of our famous 19-B House Special soup.', price: 1150, badge: 'popular', available: true },
      { id: 407, category: 'Soups', name: 'Cream of Chicken (Single)', emoji: '🥣', desc: 'Rich velvety French cream soup with finely minced chicken.', price: 450, badge: '', available: true },
      { id: 408, category: 'Soups', name: 'Cream of Chicken (Family)', emoji: '🥣', desc: 'Family bowl of rich creamy chicken soup.', price: 1250, badge: '', available: true },

      // === Pan Asian ===
      { id: 501, category: 'Pan Asian', name: 'Black Pepper Chicken', emoji: '🍛', desc: 'Chicken cubes wok-tossed with aromatic peppercorns, onions & bell peppers. Served with rice.', price: 890, badge: 'popular', available: true },
      { id: 502, category: 'Pan Asian', name: 'Chinese Chilli Dry', emoji: '🍛', desc: 'Sliced tender chicken in green chilli sauce, fresh ginger and chillies. Served with rice.', price: 890, badge: 'spicy', available: true },

      // === Pizza (Regular Flavours) ===
      { id: 601, category: 'Pizza', name: 'Crispy Chicken & Cheese Pizza (Small)', emoji: '🍕', desc: 'Hand tossed dough topped with crispy chicken chunks, tomato sauce and mozzarella.', price: 750, badge: '', available: true },
      { id: 602, category: 'Pizza', name: 'Crispy Chicken & Cheese Pizza (Medium)', emoji: '🍕', desc: 'Medium 10-inch hand tossed crispy chicken and mozzarella pizza.', price: 1350, badge: 'popular', available: true },
      { id: 603, category: 'Pizza', name: 'Crispy Chicken & Cheese Pizza (Large)', emoji: '🍕', desc: 'Large 13-inch crispy chicken & cheese pizza with generous toppings.', price: 1750, badge: '', available: true },
      { id: 604, category: 'Pizza', name: 'Spicy Buffalo Chicken Pizza (Medium)', emoji: '🍕', desc: 'Tangy buffalo hot sauce chicken with onions, capsicum & mozzarella.', price: 1350, badge: 'spicy', available: true },
      { id: 605, category: 'Pizza', name: 'Spicy Buffalo Chicken Pizza (Large)', emoji: '🍕', desc: 'Large spicy buffalo chicken with herbs and melted cheese.', price: 1750, badge: 'spicy', available: true },
      { id: 606, category: 'Pizza', name: 'Sicilian Fajita Pizza (Medium)', emoji: '🍕', desc: 'Fajita chicken, onions, bell peppers and oregano on savory marinara.', price: 1350, badge: '', available: true },
      { id: 607, category: 'Pizza', name: 'Sicilian Fajita Pizza (Large)', emoji: '🍕', desc: 'Large Sicilian fajita feast with premium mozzarella cheese.', price: 1750, badge: 'popular', available: true },
      { id: 608, category: 'Pizza', name: 'Pepperoni Pizza (Medium)', emoji: '🍕', desc: 'Generous beef/chicken pepperoni slices with herb marinara and melted mozzarella.', price: 1350, badge: '', available: true },
      { id: 609, category: 'Pizza', name: 'Pepperoni Pizza (Large)', emoji: '🍕', desc: 'Large classic pepperoni pizza with golden crust.', price: 1750, badge: 'popular', available: true },
      { id: 610, category: 'Pizza', name: 'Smoky Bar-B-Q Pizza (Large)', emoji: '🍕', desc: 'Charcoal BBQ chicken chunks, smoky barbecue sauce, red onions and cheese.', price: 1750, badge: '', available: true },
      { id: 611, category: 'Pizza', name: 'Garlic Parmesan Pizza (Large)', emoji: '🍕', desc: 'White garlic butter parmesan sauce with grilled chicken and herbs.', price: 1750, badge: '', available: true },
      { id: 612, category: 'Pizza', name: 'Seekh Kabab Pizza (Large)', emoji: '🍕', desc: 'Traditional seekh kabab pieces, green chillies, onions and desi-style spices.', price: 1750, badge: 'spicy', available: true },
      { id: 613, category: 'Pizza', name: 'XL Giant Pizza (Any Regular Flavour)', emoji: '🍕', desc: 'Super sized 16-inch XL party pizza in your choice of regular flavour.', price: 2450, badge: 'popular', available: true },

      // === Special Pizza (Slice of the Heaven) ===
      { id: 701, category: 'Special Pizza', name: 'Malai Botti Special Pizza (Medium)', emoji: '🍕', desc: 'Creamy malai boti chicken chunks, white sauce, bell peppers and olives.', price: 1550, badge: 'popular', available: true },
      { id: 702, category: 'Special Pizza', name: 'Malai Botti Special Pizza (Large)', emoji: '🍕', desc: 'Large creamy malai boti specialty pizza with rich melted cheese.', price: 1950, badge: 'popular', available: true },
      { id: 703, category: 'Special Pizza', name: 'Chicken Extreme Pizza (Large)', emoji: '🍕', desc: 'Loaded with double chicken, sausage slices, mushrooms, jalapenos & olives.', price: 1950, badge: 'popular', available: true },
      { id: 704, category: 'Special Pizza', name: 'Alfredo Gourmet Pizza (Large)', emoji: '🍕', desc: 'Rich Alfredo garlic cream sauce, grilled chicken fillet and parmesan.', price: 1950, badge: '', available: true },
      { id: 705, category: 'Special Pizza', name: 'Kabab Popper Pizza (Large)', emoji: '🍕', desc: 'Crust filled with kabab bites and topped with premium chicken and jalapenos.', price: 1950, badge: 'spicy', available: true },
      { id: 706, category: 'Special Pizza', name: 'Stuffed Crust Pizza (Large)', emoji: '🍕', desc: 'Gooey mozzarella cheese rolled inside the crust edge with loaded toppings.', price: 1950, badge: 'popular', available: true },
      { id: 707, category: 'Special Pizza', name: 'Crown Crust Pizza (Large)', emoji: '🍕', desc: 'Royal crown shaped crust pockets stuffed with cheese and chicken fillings.', price: 1950, badge: 'popular', available: true },
      { id: 708, category: 'Special Pizza', name: 'Special XL Pizza (Crown / Stuffed / Alfredo)', emoji: '🍕', desc: '16-inch Giant Special Pizza with premium stuffed crust & luxury toppings.', price: 2750, badge: '', available: true }
    ]);

    // === Deals from Menu Card ===
    DB.set('offers', [
      {
        id: 1,
        title: 'Deal for Two',
        desc: '2 Small Pizzas (Regular Flavours) + 1 Dip Sauce + 500ML Chilled Drink.',
        discount: 'Rs. 1,390',
        code: 'DEAL2',
        validUntil: '2025-12-31',
        minOrder: 1390,
        active: true
      },
      {
        id: 2,
        title: 'Deal for Four',
        desc: '2 Medium Pizzas (Regular Flavours) + 2 Dip Sauces + 1 Litre Chilled Drink.',
        discount: 'Rs. 2,250',
        code: 'DEAL4',
        validUntil: '2025-12-31',
        minOrder: 2250,
        active: true
      },
      {
        id: 3,
        title: 'Family Deal',
        desc: '2 Large Pizzas (Regular Flavours) + 4 Dip Sauces + 1.5 Litre Chilled Drink.',
        discount: 'Rs. 3,150',
        code: 'FAMILYDEAL',
        validUntil: '2025-12-31',
        minOrder: 3150,
        active: true
      },
      {
        id: 4,
        title: 'Burger Deal Box - 1',
        desc: '4 Classic Chicken Patty Burgers + 1.5 Litre Chilled Soft Drink.',
        discount: 'Rs. 1,450',
        code: 'BOX1',
        validUntil: '2025-12-31',
        minOrder: 1450,
        active: true
      },
      {
        id: 5,
        title: 'Burger Deal Box - 2',
        desc: '4 Crispy Zinger Burgers + 1 Family Basket Fries + 1.5 Litre Chilled Soft Drink.',
        discount: 'Rs. 1,790',
        code: 'BOX2',
        validUntil: '2025-12-31',
        minOrder: 1790,
        active: true
      }
    ]);

    DB.set('orders', [
      {
        id: 'ORD-1001',
        customer: 'Hamza Tariq',
        phone: '0321-4455667',
        type: 'Dine-in',
        items: [
          { name: 'Zinger Burger', qty: 2, price: 420 },
          { name: 'Chicken Platter', qty: 1, price: 790 }
        ],
        total: 1630,
        status: 'delivered',
        time: '2024-10-21 19:15',
        note: 'Table 4'
      },
      {
        id: 'ORD-1002',
        customer: 'Ayesha Khan',
        phone: '0333-8899001',
        type: 'Delivery',
        items: [
          { name: 'Deal for Four', qty: 1, price: 2250 },
          { name: 'Twister', qty: 1, price: 520 }
        ],
        total: 2920,
        status: 'preparing',
        time: '2024-10-21 20:30',
        note: 'Extra garlic mayo dip'
      }
    ]);

    DB.set('seeded_v2', true);
  }
}

initData();

window.getRestaurantInfo = () => DB.get('restaurant_info') || {
  name: 'OPEN TABLES',
  address: '12 Canal Rd, Lahore Medical Housing Society Commercial Area Phase 1 Lahore Medical Housing Scheme, Lahore, 54000, Pakistan',
  phone: '03224710141',
  mapsUrl: 'https://maps.app.goo.gl/im5g5WJNsADPqmjK8'
};
window.getProducts = () => DB.get('products') || [];
window.getOffers = () => DB.get('offers') || [];
window.getOrders = () => DB.get('orders') || [];
window.saveProducts = (p) => DB.set('products', p);
window.saveOffers = (o) => DB.set('offers', o);
window.saveOrders = (o) => DB.set('orders', o);
window.saveRestaurantInfo = (info) => DB.set('restaurant_info', info);

// Dynamic category helpers
window.getCategories = () => {
  const products = window.getProducts();
  const productCats = products.map(p => p.category).filter(Boolean);
  const customCats = DB.get('custom_categories') || [];
  const merged = ['Wraps & Shawarma', 'Platters', 'Burgers', 'Soups', 'Pan Asian', 'Pizza', 'Special Pizza', ...customCats, ...productCats];
  return [...new Set(merged)];
};

window.addCategory = (catName) => {
  if (!catName || !catName.trim()) return false;
  const name = catName.trim();
  const current = DB.get('custom_categories') || [];
  if (!current.includes(name)) {
    current.push(name);
    DB.set('custom_categories', current);
  }
  return true;
};

window.deleteCategory = (catName) => {
  const current = DB.get('custom_categories') || [];
  const filtered = current.filter(c => c !== catName);
  DB.set('custom_categories', filtered);
};
