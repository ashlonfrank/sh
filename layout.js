// Shared chrome (rail, search, footer), card templates, and the localStorage cart/saved lists.
(() => {
  const { catById, storeById, productById } = window.ShopData;
  const page = document.body.dataset.page;

  const img = (seed, w = 400, h = w) => `https://picsum.photos/seed/${seed}/${w}/${h}`;
  const money = (n) => `$${n.toFixed(2)}`;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const param = (k) => new URLSearchParams(location.search).get(k);

  const urls = {
    home: 'index.html',
    categories: 'categories.html',
    category: (id) => `category.html?c=${id}`,
    store: (id) => `store.html?s=${id}`,
    product: (id) => `product.html?id=${id}`,
    search: (q) => `search.html?q=${encodeURIComponent(q)}`,
  };

  // ---------- Persistent lists ----------
  const list = (key) => ({
    get() { try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; } },
    set(v) { try { localStorage.setItem(key, JSON.stringify(v)); } catch {} renderBadges(); },
  });
  const cartStore = list('sh-cart');
  const savedStore = list('sh-saved');
  const cart = {
    items: () => cartStore.get().filter((l) => productById[l.id]),
    add(id, opts = {}, qty = 1) {
      const items = cartStore.get();
      const key = [id, opts.size, opts.color].join('|');
      const line = items.find((l) => l.key === key);
      if (line) line.qty += qty; else items.push({ key, id, qty, ...opts });
      cartStore.set(items);
    },
    setQty(key, qty) { cartStore.set(cartStore.get().map((l) => (l.key === key ? { ...l, qty } : l)).filter((l) => l.qty > 0)); },
    count: () => cart.items().reduce((n, l) => n + l.qty, 0),
  };
  const saved = {
    ids: () => savedStore.get().filter((id) => productById[id]),
    has: (id) => savedStore.get().includes(id),
    toggle(id) { const s = savedStore.get(); savedStore.set(s.includes(id) ? s.filter((x) => x !== id) : [...s, id]); },
  };

  // ---------- Cards ----------
  const stars = (r) => '★★★★★'.slice(0, Math.round(r)) + '☆☆☆☆☆'.slice(0, 5 - Math.round(r));
  const k = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}K` : n);
  const productCard = (p, { showStore = true } = {}) => {
    const s = storeById[p.storeId];
    const off = p.compareAt ? Math.round((1 - p.price / p.compareAt) * 100) : 0;
    return `
    <a class="product" href="${urls.product(p.id)}">
      <div class="img">
        <img loading="lazy" src="${img('prod-' + p.id)}" alt="">
        ${off ? `<span class="badge-off">${off}% off</span>` : p.exclusive ? '<span class="badge-excl">Exclusive deal available</span>' : ''}
      </div>
      ${showStore ? `<div class="brand">${esc(s.name)}</div>` : ''}
      <h3>${esc(p.title)}</h3>
      <div class="stars">${stars(p.rating)}<small>(${k(p.ratingCount)})</small></div>
      <div class="price">${money(p.price)}${p.compareAt ? `<s>${money(p.compareAt)}</s>` : ''}</div>
    </a>`;
  };
  const storeDeal = (s, prods) => `
    <div class="store-deal">
      <span class="pill">Exclusive deal available</span>
      <div class="thumbs">${prods.slice(0, 2).map((p) => `
        <div class="thumb"><img loading="lazy" src="${img('prod-' + p.id, 200)}" alt=""><span class="price">${money(p.price)}</span></div>`).join('')}
      </div>
    </div>`;
  const storeCard = (s, cls = 'store-card') => {
    const prods = window.ShopData.products.filter((p) => p.storeId === s.id);
    const [w, h] = cls === 'home-card' ? [680, 960] : [500, 760];
    return `
    <a class="${cls}" href="${urls.store(s.id)}" style="background:${s.color}">
      <img loading="lazy" src="${img('store-' + s.id, w, h)}" alt="">
      <div class="store-head"><div class="name">${esc(s.name)}</div><div class="rating">${s.rating} ★ (${s.reviews})</div></div>
      ${storeDeal(s, prods)}
    </a>`;
  };
  const row = (inner, cls = '') => `
    <div class="row-wrap"><div class="row ${cls}">${inner}</div><button class="row-next" aria-label="Next">›</button></div>`;

  // ---------- Chrome ----------
  const icon = {
    home: '<path d="M12 3 3 10v10a1 1 0 0 0 1 1h5v-6h6v6h5a1 1 0 0 0 1-1V10l-9-7Z"/>',
    categories: '<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/>',
    cart: '<path d="M2 3h3l2.4 11.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.5L21 7H6.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="9.5" cy="20" r="1.5"/><circle cx="17.5" cy="20" r="1.5"/>',
    deals: '<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Z"/><circle cx="8" cy="8" r="1.6" fill="#fff"/>',
    orders: '<path d="M4 7h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Zm2-4h12l2 4H4l2-4Z"/><rect x="9" y="11" width="6" height="2" rx="1" fill="#fff"/>',
    saved: '<path d="M12 21s-8-5.2-8-11.2A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 2.8C20 15.8 12 21 12 21Z"/>',
  };
  const railBtn = (id, href, label) => `
    <a href="${href}" class="rail-btn${page === id ? ' active' : ''}" aria-label="${label}" title="${label}">
      <svg viewBox="0 0 24 24">${icon[id]}</svg>${id === 'cart' ? '<span class="cart-badge" hidden></span>' : ''}
    </a>`;
  const searchForm = (pos) => `
    <form class="search search-${pos}" role="search" action="search.html">
      <svg viewBox="0 0 24 24" class="search-icon"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
      <input type="search" name="q" placeholder="What are you shopping for today?" aria-label="Search products and stores" value="${esc(param('q') || '')}">
      <button type="submit" class="search-go" aria-label="Search">→</button>
    </form>`;

  document.body.insertAdjacentHTML('afterbegin', `
    <a class="logo" href="${urls.home}" aria-label="Shop home">
      <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true"><path d="M16 4a12 12 0 1 1-8.5 3.5l3 3A7.8 7.8 0 1 0 16 8.2V4Z"/><circle cx="16" cy="16" r="3.4"/></svg>
    </a>
    <nav class="rail" aria-label="Main">
      ${railBtn('home', urls.home, 'Home')}
      ${railBtn('categories', urls.categories, 'Categories')}
      ${railBtn('cart', 'cart.html', 'Cart')}
      ${railBtn('deals', 'deals.html', 'Deals')}
      ${railBtn('orders', 'orders.html', 'Orders')}
    </nav>
    <nav class="rail rail-bottom" aria-label="Account">
      ${railBtn('saved', 'saved.html', 'Saved')}
      <button type="button" class="rail-signin" data-signin>Sign in</button>
    </nav>
    ${page === 'home' ? `<header class="top">${searchForm('top')}</header>` : `<div class="bottom-search">${searchForm('bottom')}</div>`}
  `);

  document.body.insertAdjacentHTML('beforeend', `
    <footer class="footer">
      <div class="footer-brand">
        <div class="qr" aria-hidden="true"></div>
        <div class="wordmark">shop</div>
        <p>Shopping designed around you.</p>
      </div>
      <div class="footer-cols">
        <div><h4>Learn more</h4><a href="#">What is Shop?</a><a href="#">Why trust Shop?</a><a href="#">Why use Shop Pay?</a><a href="#">Help center</a></div>
        <div><h4>Get started</h4><a href="#">For brands</a><a href="#">For creators</a><a href="#">For agents</a><a href="#">Build your store</a></div>
        <div><h4>Social</h4><a href="#">Instagram</a></div>
        <div><h4>Legal</h4><a href="#">Terms of Service</a><a href="#">Privacy Policy</a><a href="#">Your Privacy Choices</a></div>
      </div>
      <div class="footer-bottom">
        <div class="stores"><a href="#" class="store-badge"> App Store</a><a href="#" class="store-badge">▶ Google Play</a></div>
        <div class="legal"><span>Unofficial study remake · not affiliated with Shop or Shopify</span><a href="#">Language</a></div>
      </div>
    </footer>
    <div class="toast" role="status" aria-live="polite"></div>
  `);

  let toastTimer;
  const toast = (msg) => {
    const t = document.querySelector('.toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
  };

  function renderBadges() {
    const b = document.querySelector('.cart-badge');
    if (!b) return;
    const n = cart.count();
    b.hidden = !n;
    b.textContent = n;
  }
  renderBadges();

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-signin]')) toast('Sign in is not part of this remake.');
    const next = e.target.closest('.row-next');
    if (next) { const r = next.previousElementSibling; r.scrollBy({ left: r.clientWidth * 0.8 }); }
    const dead = e.target.closest('a[href="#"]');
    if (dead) { e.preventDefault(); toast('That page is not part of this remake.'); }
  });
  document.addEventListener('submit', (e) => {
    const q = e.target.q && e.target.q.value.trim();
    if (e.target.matches('.search') && !q) e.preventDefault();
  });

  window.Shop = { img, money, esc, param, urls, cart, saved, productCard, storeCard, storeDeal, row, stars, k, toast, catById, storeById, productById };
})();
