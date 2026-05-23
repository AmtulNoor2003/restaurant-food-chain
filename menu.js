/* ============================================
   MENU.JS  —  Member 3  |  FoodieExpress
   Handles: Food data, filtering, search,
            cart (localStorage), detail page,
            wishlist, navbar scroll, hamburger
============================================ */

'use strict';

// ──────────────────────────────────────────
//  FOOD DATABASE
//  Replace emoji field with img:"path/to/img"
//  when you have real food photos.
// ──────────────────────────────────────────
const FOODS = [
  // ── PIZZA ──
  {
    id: 1, category: 'pizza',
    name: 'Pepperoni Feast',
    emoji: '🍕',
    desc: 'Loaded with spicy pepperoni slices, stretchy mozzarella & our signature tomato sauce.',
    price: 850, rating: 4.8, reviews: 120,
    badge: 'Bestseller',
    tags: ['Spicy', 'Cheesy', 'Popular'],
  },
  {
    id: 2, category: 'pizza',
    name: 'BBQ Chicken Pizza',
    emoji: '🍕',
    desc: 'Grilled chicken chunks, smoky BBQ sauce, caramelised onions & cheddar blend.',
    price: 900, rating: 4.7, reviews: 89,
    badge: 'Hot 🌶️',
    tags: ['BBQ', 'Grilled', 'Smoky'],
  },
  {
    id: 3, category: 'pizza',
    name: 'Veggie Supreme',
    emoji: '🍕',
    desc: 'Fresh bell peppers, black olives, mushrooms, onions on a creamy white garlic sauce.',
    price: 750, rating: 4.5, reviews: 60,
    badge: null,
    tags: ['Vegetarian', 'Healthy'],
  },
  // ── BURGER ──
  {
    id: 4, category: 'burger',
    name: 'Classic Smash Burger',
    emoji: '🍔',
    desc: 'Double smashed beef patty, American cheddar, crispy pickles & special burger sauce.',
    price: 550, rating: 4.9, reviews: 200,
    badge: 'Bestseller',
    tags: ['Crispy', 'Double Patty'],
  },
  {
    id: 5, category: 'burger',
    name: 'Zinger Burger',
    emoji: '🍔',
    desc: 'Crispy fried chicken fillet, creamy coleslaw, jalapeños & fiery chipotle mayo.',
    price: 480, rating: 4.6, reviews: 155,
    badge: 'Spicy 🌶️',
    tags: ['Crispy', 'Spicy', 'Chicken'],
  },
  {
    id: 6, category: 'burger',
    name: 'Mushroom Swiss',
    emoji: '🍔',
    desc: 'Juicy beef patty, sautéed garlic mushrooms, melted Swiss cheese & Dijon mustard.',
    price: 600, rating: 4.4, reviews: 74,
    badge: null,
    tags: ['Gourmet', 'Beef'],
  },
  // ── DRINKS ──
  {
    id: 7, category: 'drinks',
    name: 'Strawberry Shake',
    emoji: '🥤',
    desc: 'Thick creamy fresh strawberry milkshake whipped to perfection with whipped cream on top.',
    price: 280, rating: 4.7, reviews: 98,
    badge: 'New',
    tags: ['Sweet', 'Cold', 'Fruity'],
  },
  {
    id: 8, category: 'drinks',
    name: 'Mint Lemonade',
    emoji: '🥤',
    desc: 'Ice-cold fresh squeezed lemon juice with garden mint leaves, sugar & a pinch of salt.',
    price: 220, rating: 4.5, reviews: 62,
    badge: null,
    tags: ['Refreshing', 'Tangy'],
  },
  {
    id: 9, category: 'drinks',
    name: 'Cold Coffee',
    emoji: '☕',
    desc: 'Chilled double espresso blended with full-fat milk, vanilla syrup & crushed ice.',
    price: 250, rating: 4.8, reviews: 110,
    badge: 'Trending',
    tags: ['Coffee', 'Chilled', 'Rich'],
  },
  // ── DESSERTS ──
  {
    id: 10, category: 'desserts',
    name: 'Chocolate Lava Cake',
    emoji: '🎂',
    desc: 'Warm dark chocolate cake with a gloriously gooey molten centre. Served with vanilla ice cream.',
    price: 350, rating: 4.9, reviews: 175,
    badge: 'Must Try',
    tags: ['Chocolate', 'Warm', 'Indulgent'],
  },
  {
    id: 11, category: 'desserts',
    name: 'NY Cheesecake',
    emoji: '🍰',
    desc: 'Classic New York-style baked cheesecake on a buttery Graham cracker crust. Dense & creamy.',
    price: 300, rating: 4.6, reviews: 88,
    badge: null,
    tags: ['Creamy', 'Classic'],
  },
  {
    id: 12, category: 'desserts',
    name: 'Nutella Waffle',
    emoji: '🧇',
    desc: 'Crispy golden Belgian waffle loaded with Nutella, banana slices & crushed Oreo crumbles.',
    price: 320, rating: 4.7, reviews: 95,
    badge: 'New',
    tags: ['Sweet', 'Crunchy', 'Nutella'],
  },
  // ── BBQ ──
  {
    id: 13, category: 'bbq',
    name: 'Seekh Kabab Platter',
    emoji: '🔥',
    desc: '6 juicy minced beef seekh kababs marinated in spices. Served with mint raita & butter naan.',
    price: 780, rating: 4.8, reviews: 142,
    badge: 'Bestseller',
    tags: ['Grilled', 'Spiced', 'Halal'],
  },
  {
    id: 14, category: 'bbq',
    name: 'BBQ Ribs Rack',
    emoji: '🍖',
    desc: 'Slow-cooked baby back ribs glazed in our housemade smoky BBQ sauce. Fall-off-the-bone tender.',
    price: 1200, rating: 4.9, reviews: 90,
    badge: 'Premium',
    tags: ['Smoky', 'Tender', 'Premium'],
  },
  {
    id: 15, category: 'bbq',
    name: 'Grilled Wings',
    emoji: '🍗',
    desc: '8 jumbo chicken wings marinated in garlic herb butter and grilled over open flame till charred.',
    price: 650, rating: 4.5, reviews: 77,
    badge: null,
    tags: ['Grilled', 'Chicken', 'Juicy'],
  },
];

// ──────────────────────────────────────────
//  STATE
// ──────────────────────────────────────────
let state = {
  category: 'all',
  query:    '',
  wishlist: new Set(JSON.parse(localStorage.getItem('fe_wishlist') || '[]')),
};

let cart = JSON.parse(localStorage.getItem('fe_cart') || '[]');

// ──────────────────────────────────────────
//  CART HELPERS
// ──────────────────────────────────────────
function saveCart() {
  localStorage.setItem('fe_cart', JSON.stringify(cart));
}

function cartTotal() {
  return cart.reduce((s, i) => s + i.qty, 0);
}

function updateCartBadge() {
  document.querySelectorAll('#cartCount').forEach(el => {
    el.textContent = cartTotal();
  });
}

function addToCart(food, qty = 1) {
  const found = cart.find(i => i.id === food.id);
  if (found) found.qty += qty;
  else cart.push({ id: food.id, name: food.name, price: food.price, emoji: food.emoji, qty });
  saveCart();
  updateCartBadge();
  showToast(`${food.name} added to cart 🛒`);
}

// ──────────────────────────────────────────
//  WISHLIST
// ──────────────────────────────────────────
function toggleWishlist(id) {
  if (state.wishlist.has(id)) state.wishlist.delete(id);
  else state.wishlist.add(id);
  localStorage.setItem('fe_wishlist', JSON.stringify([...state.wishlist]));
}

// ──────────────────────────────────────────
//  TOAST
// ──────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  const label = document.getElementById('toastMsg');
  if (!toast) return;
  label.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

// ──────────────────────────────────────────
//  UTILITIES
// ──────────────────────────────────────────
const Rs = n => 'Rs. ' + n.toLocaleString('en-PK');

function stars(r) {
  const full = Math.floor(r), half = r % 1 >= .5 ? '½' : '', empty = 5 - full - (half ? 1 : 0);
  return '★'.repeat(full) + half + '☆'.repeat(empty);
}

// ──────────────────────────────────────────
//  CARD FACTORY
// ──────────────────────────────────────────
function createCard(food, delay = 0) {
  const liked = state.wishlist.has(food.id);

  const card = document.createElement('div');
  card.className = 'food-card';
  card.style.animationDelay = `${delay * 0.065}s`;

  card.innerHTML = `
    <div class="card-img-area">
      ${food.badge ? `<span class="card-badge">${food.badge}</span>` : ''}
      <button class="card-like${liked ? ' liked' : ''}" data-id="${food.id}" title="Wishlist">
        <i class="fa${liked ? 's' : 'r'} fa-heart"></i>
      </button>
      <span role="img" aria-label="${food.name}">${food.emoji}</span>
    </div>
    <div class="card-body">
      <div class="card-name">${food.name}</div>
      <div class="card-desc">${food.desc}</div>
      <div class="card-rating">
        <span class="card-stars">${stars(food.rating)}</span>
        <span>${food.rating} (${food.reviews})</span>
      </div>
      <div class="card-footer">
        <div class="card-price">${Rs(food.price)}</div>
        <button class="btn-add" data-id="${food.id}">
          <i class="fas fa-plus"></i> Add
        </button>
      </div>
    </div>
  `;

  // Navigate to detail on card click (except buttons)
  card.addEventListener('click', e => {
    if (!e.target.closest('.btn-add') && !e.target.closest('.card-like')) {
      window.location.href = `food-detail.html?id=${food.id}`;
    }
  });

  // Add to cart
  card.querySelector('.btn-add').addEventListener('click', e => {
    e.stopPropagation();
    addToCart(food);
  });

  // Wishlist toggle
  card.querySelector('.card-like').addEventListener('click', e => {
    e.stopPropagation();
    toggleWishlist(food.id);
    const btn = e.currentTarget;
    const isNowLiked = state.wishlist.has(food.id);
    btn.classList.toggle('liked', isNowLiked);
    btn.innerHTML = `<i class="fa${isNowLiked ? 's' : 'r'} fa-heart"></i>`;
    showToast(isNowLiked ? 'Added to wishlist ❤️' : 'Removed from wishlist');
  });

  return card;
}

// ──────────────────────────────────────────
//  FILTER & RENDER GRID
// ──────────────────────────────────────────
function filtered() {
  const q = state.query.toLowerCase();
  return FOODS.filter(f => {
    const catOk  = state.category === 'all' || f.category === state.category;
    const queryOk = !q || f.name.toLowerCase().includes(q) ||
                    f.desc.toLowerCase().includes(q) ||
                    (f.tags && f.tags.some(t => t.toLowerCase().includes(q)));
    return catOk && queryOk;
  });
}

function renderGrid() {
  const grid       = document.getElementById('foodGrid');
  const empty      = document.getElementById('emptyState');
  const itemCount  = document.getElementById('itemCount');
  const titleEl    = document.getElementById('sectionTitle');
  if (!grid) return;

  const list = filtered();
  grid.innerHTML = '';

  const catNames = { all:'All Items', pizza:'Pizza', burger:'Burgers', drinks:'Drinks', desserts:'Desserts', bbq:'BBQ' };
  if (titleEl) titleEl.textContent = state.query ? `Results for "${state.query}"` : catNames[state.category] || 'All Items';
  if (itemCount) itemCount.textContent = `${list.length} item${list.length !== 1 ? 's' : ''}`;

  if (list.length === 0) {
    empty && empty.classList.remove('hidden');
    return;
  }
  empty && empty.classList.add('hidden');
  list.forEach((f, i) => grid.appendChild(createCard(f, i)));
}

// ──────────────────────────────────────────
//  INIT MENU PAGE
// ──────────────────────────────────────────
function initMenuPage() {
  updateCartBadge();
  renderGrid();

  // Category tabs
  document.querySelectorAll('.pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.category = btn.dataset.cat;
      renderGrid();
    });
  });

  // Search
  const inp  = document.getElementById('searchInput');
  const clr  = document.getElementById('clearSearch');
  if (inp) inp.addEventListener('input', () => { state.query = inp.value.trim(); renderGrid(); });
  if (clr) clr.addEventListener('click', () => { inp.value = ''; state.query = ''; renderGrid(); inp.focus(); });

  initNavbar();
}

// ──────────────────────────────────────────
//  DETAIL PAGE
// ──────────────────────────────────────────
function initDetailPage() {
  updateCartBadge();

  const id    = parseInt(new URLSearchParams(window.location.search).get('id'));
  const food  = FOODS.find(f => f.id === id);
  const wrap  = document.getElementById('detailWrap');
  const ldr   = document.getElementById('detailLoader');

  if (ldr) ldr.remove();

  if (!food || !wrap) {
    wrap && (wrap.innerHTML = '<p style="text-align:center;padding:80px;color:var(--muted)">Food not found 😞 <a href="menu.html" style="color:var(--primary)">← Back to menu</a></p>');
    return;
  }

  let qty = 1;

  const tagsHTML = food.tags ? food.tags.map(t => `<span class="tag">${t}</span>`).join('') : '';

  wrap.innerHTML = `
    <div class="detail-card">
      <div class="detail-img-panel">
        ${food.badge ? `<span class="detail-badge">${food.badge}</span>` : ''}
        <span role="img" aria-label="${food.name}">${food.emoji}</span>
      </div>
      <div class="detail-info">
        <div class="detail-cat">${food.category.toUpperCase()}</div>
        <h1 class="detail-name">${food.name}</h1>
        <div class="detail-rating">
          <span class="detail-stars">${stars(food.rating)}</span>
          <span>${food.rating} · ${food.reviews} reviews</span>
        </div>
        <p class="detail-desc">${food.desc}</p>
        ${tagsHTML ? `<div class="detail-tags">${tagsHTML}</div>` : ''}
        <div class="detail-price">${Rs(food.price)}</div>
        <div class="qty-row">
          <span class="qty-label">Quantity</span>
          <div class="qty-stepper">
            <button id="qtyMinus" aria-label="Decrease">−</button>
            <span class="qty-val" id="qtyVal">1</span>
            <button id="qtyPlus"  aria-label="Increase">+</button>
          </div>
        </div>
        <div class="detail-cta">
          <button class="btn-cart-main" id="detailAddBtn">
            <i class="fas fa-shopping-cart"></i> Add to Cart · ${Rs(food.price)}
          </button>
          <button class="btn-wish" id="detailWish" title="Wishlist">
            <i class="fa${state.wishlist.has(food.id) ? 's' : 'r'} fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  // Qty controls
  document.getElementById('qtyMinus').addEventListener('click', () => {
    if (qty > 1) { qty--; update(); }
  });
  document.getElementById('qtyPlus').addEventListener('click', () => {
    qty++; update();
  });

  function update() {
    document.getElementById('qtyVal').textContent = qty;
    document.getElementById('detailAddBtn').innerHTML =
      `<i class="fas fa-shopping-cart"></i> Add to Cart · ${Rs(food.price * qty)}`;
  }

  // Add to cart
  document.getElementById('detailAddBtn').addEventListener('click', () => addToCart(food, qty));

  // Wishlist
  document.getElementById('detailWish').addEventListener('click', () => {
    toggleWishlist(food.id);
    const btn = document.getElementById('detailWish');
    const liked = state.wishlist.has(food.id);
    btn.innerHTML = `<i class="fa${liked ? 's' : 'r'} fa-heart"></i>`;
    showToast(liked ? 'Added to wishlist ❤️' : 'Removed from wishlist');
  });

  // Related foods
  const related = FOODS.filter(f => f.category === food.category && f.id !== food.id).slice(0, 4);
  const relatedWrap = document.getElementById('relatedWrap');
  const relatedGrid = document.getElementById('relatedGrid');

  if (related.length > 0 && relatedWrap && relatedGrid) {
    relatedWrap.style.display = '';
    related.forEach((f, i) => relatedGrid.appendChild(createCard(f, i)));
  }

  initNavbar();
}

// ──────────────────────────────────────────
//  NAVBAR — scroll shadow + hamburger
// ──────────────────────────────────────────
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 10
        ? '0 4px 24px rgba(255,107,129,.14)'
        : '';
    }, { passive: true });
  }

  const hbg   = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (hbg && links) {
    hbg.addEventListener('click', () => {
      const open = links.style.display === 'flex';
      links.style.cssText = open
        ? ''
        : 'display:flex;flex-direction:column;position:absolute;top:68px;left:0;right:0;background:#fff;padding:20px 5%;gap:18px;box-shadow:0 8px 24px rgba(255,107,129,.12);z-index:800;';
    });
  }
}

// ──────────────────────────────────────────
//  PAGE BOOTSTRAP
// ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const isDetail = window.location.pathname.includes('food-detail');
  if (isDetail) initDetailPage();
  else           initMenuPage();
});