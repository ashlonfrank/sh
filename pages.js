// Renderers for every page except home, picked by <body data-page>.
(() => {
  const { categories, stores, products } = window.ShopData;
  const { img, money, esc, param, urls, cart, saved, productCard, storeCard, row, stars, k, toast, catById, storeById, productById } = window.Shop;
  const main = document.querySelector('main');
  const grid = (items, opts) => `<div class="product-grid">${items.map((p) => productCard(p, opts)).join('')}</div>`;
  const setTitle = (t) => { document.title = `${t} - Shop`; };
  const notFound = (what) => {
    main.innerHTML = `<div class="empty"><h1>${what} not found</h1><p>It may have moved, or the link is wrong.</p><a class="btn" href="${urls.home}">Back to home</a></div>`;
  };
  const cartSvg = `<svg class="empty-art" viewBox="0 0 120 100" aria-hidden="true"><path d="M10 14h16l12 52h56l10-38H32" fill="none" stroke="#5433eb" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M40 30h58M42 40h52M44 50h46" stroke="#c9c0fb" stroke-width="3"/><circle cx="46" cy="84" r="7" fill="#222"/><circle cx="86" cy="84" r="7" fill="#222"/></svg>`;

  const renderers = {
    categories() {
      setTitle('Categories');
      main.innerHTML = `
        <header class="page-head"><h1>Categories</h1></header>
        <div class="all-cats">${categories.map((c) => `
          <section class="all-cat">
            <a class="cat cat-lg" href="${urls.category(c.id)}" style="background:${c.color}">
              <img loading="lazy" src="${img('cat-' + c.id, 600, 300)}" alt=""><span>${c.name}</span>
            </a>
            <div class="sub-links">${c.subs.map((s) => `<a href="${urls.search(s)}&c=${c.id}">${s}</a>`).join('')}</div>
          </section>`).join('')}
        </div>`;
    },

    category() {
      const c = catById[param('c')];
      if (!c) return notFound('Category');
      setTitle(c.name);
      const items = products.filter((p) => p.category === c.id);
      const catStores = stores.filter((s) => s.category === c.id);
      const topRated = [...items].sort((a, b) => b.rating - a.rating || b.ratingCount - a.ratingCount).slice(0, 10);
      const whatsNew = items.filter((p) => p.isNew).slice(0, 10);
      const best = [...items].sort((a, b) => b.ratingCount - a.ratingCount).slice(0, 12);
      main.innerHTML = `
        <header class="page-head">
          <h1>${c.name}</h1>
          <nav class="crumbs"><a href="${urls.categories}">All categories</a><span>•</span><span>${c.name}</span></nav>
          <ul class="chips sub-chips">${c.subs.map((s, i) => `<li><a href="${urls.search(s)}&c=${c.id}"><img src="${img(`sub-${c.id}-${i}`, 64)}" alt="">${s}</a></li>`).join('')}</ul>
        </header>
        <div class="feature-grid">${c.features.map(([t, d], i) => {
          const s = catStores[i % catStores.length];
          return `<a class="feature" href="${urls.store(s.id)}"><img src="${img(`feat-${c.id}-${i}`, 800, 420)}" alt=""><div><h3>${t}</h3><p>${d}</p></div><span class="feature-go">→</span></a>`;
        }).join('')}</div>
        <div class="panels">
          <section class="panel"><h2 class="section-title">Top rated</h2>${row(topRated.map((p) => productCard(p)).join(''))}</section>
          <section class="panel"><h2 class="section-title">What's new</h2>${row((whatsNew.length ? whatsNew : items.slice(-6)).map((p) => productCard(p)).join(''))}</section>
        </div>
        <section class="section"><h2 class="section-title">Shop by type</h2>
          <div class="sub-tiles">${c.subs.slice(0, 4).map((s, i) => `<a class="sub-tile" href="${urls.search(s)}&c=${c.id}"><img loading="lazy" src="${img(`subtile-${c.id}-${i}`, 500, 200)}" alt=""><span>${s}</span></a>`).join('')}</div>
        </section>
        <section class="section"><h2 class="section-title">Favorites for a reason</h2>${row(catStores.map((s) => storeCard(s)).join(''), 'trending')}</section>
        <section class="section"><h2 class="section-title">Bestsellers</h2>${grid(best)}</section>`;
    },

    store() {
      const s = storeById[param('s')];
      if (!s) return notFound('Store');
      setTitle(s.name);
      document.body.classList.add('store-page');
      document.body.style.setProperty('--store', s.color);
      const all = products.filter((p) => p.storeId === s.id);
      const state = { collection: null, sort: 'featured', sale: false, price: 'all', q: '' };
      const following = () => { try { return localStorage.getItem('sh-follow-' + s.id) === '1'; } catch { return false; } };
      main.innerHTML = `
        <div class="store-banner"><button type="button" data-signin>Sign in to view your exclusive deal ⓘ</button></div>
        <section class="store-hero">
          <img src="${img('store-' + s.id, 1600, 700)}" alt="">
          <div class="store-tools">
            <label class="store-search"><svg viewBox="0 0 24 24" class="search-icon"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><input type="search" placeholder="Search ${esc(s.name)}..." data-store-q></label>
            <button type="button" class="follow" data-follow>${following() ? 'Following' : 'Follow'}</button>
          </div>
          <div class="store-title"><h1>${esc(s.name)}</h1><div class="rating">${s.rating} ★ ${s.reviews} Reviews</div></div>
        </section>
        <div class="store-chips" data-chips>
          <button type="button" class="on" data-col="">Shop all</button>
          ${s.collections.map((col, i) => `<button type="button" data-col="${esc(col)}"><img src="${img(`col-${s.id}-${i}`, 48)}" alt="">${esc(col)}</button>`).join('')}
        </div>
        <section class="store-products">
          <h2 class="section-title">Products</h2>
          <div class="filters">
            <select data-sort aria-label="Sort by"><option value="featured">Sort by</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="rating">Top rated</option></select>
            <button type="button" class="filter" data-sale>On sale</button>
            <select data-price aria-label="Price"><option value="all">Price</option><option value="0-50">Under $50</option><option value="50-150">$50 to $150</option><option value="150-">$150+</option></select>
            <button type="button" class="filter on">In-stock</button>
          </div>
          <div data-results></div>
        </section>`;
      const render = () => {
        let list = all.filter((p) => (!state.collection || p.collection === state.collection)
          && (!state.sale || p.compareAt)
          && (!state.q || p.title.toLowerCase().includes(state.q)));
        if (state.price !== 'all') {
          const [lo, hi] = state.price.split('-').map(Number);
          list = list.filter((p) => p.price >= lo && (!hi || p.price < hi));
        }
        if (state.sort === 'low') list.sort((a, b) => a.price - b.price);
        if (state.sort === 'high') list.sort((a, b) => b.price - a.price);
        if (state.sort === 'rating') list.sort((a, b) => b.rating - a.rating);
        main.querySelector('[data-results]').innerHTML = list.length ? grid(list, { showStore: false }) : '<p class="muted">No products match these filters.</p>';
      };
      main.querySelector('[data-chips]').addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        main.querySelectorAll('[data-chips] button').forEach((x) => x.classList.toggle('on', x === b));
        state.collection = b.dataset.col || null; render();
      });
      main.querySelector('[data-sort]').onchange = (e) => { state.sort = e.target.value; render(); };
      main.querySelector('[data-price]').onchange = (e) => { state.price = e.target.value; render(); };
      main.querySelector('[data-sale]').onclick = (e) => { state.sale = !state.sale; e.target.classList.toggle('on', state.sale); render(); };
      main.querySelector('[data-store-q]').oninput = (e) => { state.q = e.target.value.trim().toLowerCase(); render(); };
      main.querySelector('[data-follow]').onclick = (e) => {
        const now = !following();
        try { localStorage.setItem('sh-follow-' + s.id, now ? '1' : '0'); } catch {}
        e.target.textContent = now ? 'Following' : 'Follow';
        toast(now ? `Following ${s.name}` : `Unfollowed ${s.name}`);
      };
      render();
    },

    product() {
      const p = productById[param('id')];
      if (!p) return notFound('Product');
      const s = storeById[p.storeId];
      setTitle(`${s.name} ${p.title}`);
      const off = p.compareAt ? Math.round((1 - p.price / p.compareAt) * 100) : 0;
      const pick = { color: p.colors[0], size: p.sizes ? p.sizes[0] : undefined, qty: 1 };
      const shots = [0, 1, 2, 3, 4].map((i) => img(`prod-${p.id}${i ? '-' + i : ''}`, 900, 1100));
      const bars = [5, 4, 3, 2, 1].map((n) => {
        const pct = n === 5 ? 68 : n === 4 ? 20 : n === 3 ? 7 : n === 2 ? 3 : 2;
        return `<div class="bar"><span>${n}</span><i><b style="width:${pct}%"></b></i></div>`;
      }).join('');
      const more = products.filter((x) => x.storeId === s.id && x.id !== p.id).slice(0, 10);
      const similar = products.filter((x) => x.category === p.category && x.storeId !== s.id).sort((a, b) => b.ratingCount - a.ratingCount).slice(0, 10);
      main.innerHTML = `
        <div class="pdp">
          <div class="gallery">
            <div class="thumbs-col">${shots.map((u, i) => `<button type="button" class="${i ? '' : 'on'}" data-shot="${i}" aria-label="Image ${i + 1}"><img src="${u.replace('900/1100', '120/146')}" alt=""></button>`).join('')}</div>
            <div class="main-shot"><img src="${shots[0]}" alt="${esc(p.title)}" data-main></div>
          </div>
          <aside class="buy">
            <a class="pdp-store" href="${urls.store(s.id)}"><span class="avatar" style="background:${s.color}">${esc(s.name.replace('/', '').slice(0, 2))}</span><span><b>${esc(s.name)}</b><small>${s.rating} ★ (${s.reviews})</small></span></a>
            <h1>${esc(p.title)}</h1>
            <a class="pdp-rating" href="#reviews">${stars(p.rating)} <u>${p.ratingCount} ratings</u></a>
            <div class="pdp-price">${money(p.price)}${p.compareAt ? `<s>${money(p.compareAt)}</s><span class="off-chip">${off}% off</span>` : ''}</div>
            <button type="button" class="unlock" data-signin><b>Unlock exclusive pricing</b><small>Sign in to view your exclusive deal</small><span>›</span></button>
            <div class="opt"><div class="opt-label">Color <b data-color-label>${p.colors[0]}</b></div>
              <div class="swatches">${p.colors.map((c, i) => `<button type="button" class="swatch${i ? '' : ' on'}" data-color="${c}" aria-label="${c}"><img src="${img(`prod-${p.id}-${i}`, 80)}" alt=""></button>`).join('')}</div></div>
            ${p.sizes ? `<div class="opt"><div class="opt-label">Size <b data-size-label>${p.sizes[0]}</b></div>
              <div class="sizes">${p.sizes.map((z, i) => `<button type="button" class="${i ? '' : 'on'}" data-size="${z}">${z}</button>`).join('')}</div></div>` : ''}
            <div class="opt"><div class="opt-label">Quantity</div>
              <div class="stepper"><button type="button" data-qty="-1" aria-label="Decrease">−</button><span data-qty-val>1</span><button type="button" data-qty="1" aria-label="Increase">+</button></div></div>
            <button type="button" class="btn btn-block" data-add>Add to cart</button>
            <button type="button" class="btn btn-block btn-dark" data-buy>Buy now</button>
            <div class="pdp-actions">
              <button type="button" data-save>${saved.has(p.id) ? '♥ Saved' : '♡ Save'}</button>
              <button type="button" data-share>⇪ Share</button>
            </div>
            <details open><summary>Description</summary>
              <p>${esc(p.title)} from ${esc(s.name)}, part of the ${esc(p.collection)} collection.</p>
              <ul><li>${catById[p.category].name}</li><li>Available in ${p.colors.join(', ')}</li><li>Ships from ${esc(s.name)}</li><li>Placeholder description for this remake</li></ul>
            </details>
            <details open id="reviews"><summary>Reviews</summary>
              <div class="review-sum"><div><div class="score">${p.rating}</div><div>${stars(p.rating)}</div><small>${p.ratingCount} ratings</small></div><div class="bars">${bars}</div></div>
              <div class="reviews">
                <article><div>★★★★★</div><p>Exactly as pictured and arrived quickly. Would buy again.</p><small>Sam · 4 days ago</small></article>
                <article><div>★★★★☆</div><p>Great quality for the price. Runs a little small.</p><small>Riley · 2 weeks ago</small></article>
              </div>
            </details>
            <details><summary>Delivery &amp; Returns</summary>
              <ul class="plain"><li>📍 Ships to your address</li><li>🚚 Shipping calculated at checkout</li><li>📦 Estimated delivery in 3 to 6 days</li></ul>
              <a class="btn btn-ghost btn-block" href="${urls.store(s.id)}">Visit ${esc(s.name)}</a>
            </details>
          </aside>
        </div>
        <section class="section"><h2 class="section-title"><a href="${urls.store(s.id)}">More from ${esc(s.name)} <span class="chev">›</span></a></h2>${row(more.map((x) => productCard(x, { showStore: false })).join(''), 'products')}</section>
        <section class="section"><h2 class="section-title">You might also like</h2>${row(similar.map((x) => productCard(x)).join(''), 'products')}</section>`;

      const $ = (sel) => main.querySelector(sel);
      main.querySelectorAll('[data-shot]').forEach((b) => b.addEventListener('click', () => {
        main.querySelectorAll('[data-shot]').forEach((x) => x.classList.toggle('on', x === b));
        $('[data-main]').src = shots[b.dataset.shot];
      }));
      main.querySelectorAll('[data-color]').forEach((b) => b.addEventListener('click', () => {
        main.querySelectorAll('[data-color]').forEach((x) => x.classList.toggle('on', x === b));
        pick.color = b.dataset.color; $('[data-color-label]').textContent = pick.color;
      }));
      main.querySelectorAll('[data-size]').forEach((b) => b.addEventListener('click', () => {
        main.querySelectorAll('[data-size]').forEach((x) => x.classList.toggle('on', x === b));
        pick.size = b.dataset.size; $('[data-size-label]').textContent = pick.size;
      }));
      main.querySelectorAll('[data-qty]').forEach((b) => b.addEventListener('click', () => {
        pick.qty = Math.max(1, Math.min(10, pick.qty + Number(b.dataset.qty)));
        $('[data-qty-val]').textContent = pick.qty;
      }));
      const add = () => cart.add(p.id, { size: pick.size, color: pick.color }, pick.qty);
      $('[data-add]').onclick = (e) => {
        add(); toast(`Added to cart · ${p.title}`);
        e.target.textContent = 'Added to cart'; setTimeout(() => { e.target.textContent = 'Add to cart'; }, 1500);
      };
      $('[data-buy]').onclick = () => { add(); location.href = 'cart.html'; };
      $('[data-save]').onclick = (e) => { saved.toggle(p.id); e.target.textContent = saved.has(p.id) ? '♥ Saved' : '♡ Save'; };
      $('[data-share]').onclick = async () => {
        try { await navigator.clipboard.writeText(location.href); toast('Link copied'); } catch { toast(location.href); }
      };
    },

    search() {
      const q = (param('q') || '').trim();
      const c = catById[param('c')];
      setTitle(q || 'Search');
      const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
      const hay = (p) => [p.title, p.sub, p.collection, storeById[p.storeId].name, catById[p.category].name].join(' ').toLowerCase();
      // Match all terms; fall back to any term so short queries still return something.
      let hits = products.filter((p) => (!c || p.category === c.id) && terms.every((t) => hay(p).includes(t.replace(/s$/, ''))));
      if (!hits.length && terms.length) hits = products.filter((p) => (!c || p.category === c.id) && terms.some((t) => hay(p).includes(t.replace(/s$/, ''))));
      const storeHits = stores.filter((s) => terms.length && terms.some((t) => s.name.toLowerCase().includes(t)));
      const state = { sale: false, price: 'all' };
      const related = c ? c.subs.filter((x) => x.toLowerCase() !== q.toLowerCase()).slice(0, 4) : categories.slice(0, 4).map((x) => x.name);
      main.innerHTML = `
        <div class="filters search-filters">
          <button type="button" class="filter" data-sale>On sale</button>
          <button type="button" class="filter" data-signin>Your deals</button>
          <select data-price aria-label="Price"><option value="all">Price</option><option value="0-50">Under $50</option><option value="50-150">$50 to $150</option><option value="150-">$150+</option></select>
          ${c ? `<a class="filter on" href="${urls.search(q)}">${c.name} ✕</a>` : ''}
          ${related.map((r) => `<a class="filter" href="${urls.search(r)}${c ? '&c=' + c.id : ''}">${esc(r)}</a>`).join('')}
        </div>
        ${storeHits.length ? `<section class="section"><h2 class="section-title">Stores</h2>${row(storeHits.map((s) => storeCard(s)).join(''), 'trending')}</section>` : ''}
        <section class="section"><h2 class="section-title">Results <small class="muted" data-count></small></h2><div data-results></div></section>`;
      const render = () => {
        let list = hits.filter((p) => !state.sale || p.compareAt);
        if (state.price !== 'all') {
          const [lo, hi] = state.price.split('-').map(Number);
          list = list.filter((p) => p.price >= lo && (!hi || p.price < hi));
        }
        main.querySelector('[data-count]').textContent = `${list.length} for “${q}”`;
        main.querySelector('[data-results]').innerHTML = list.length ? grid(list.slice(0, 60))
          : `<div class="empty small"><p>No results for “${esc(q)}”. Try another search or browse <a href="${urls.categories}"><u>categories</u></a>.</p></div>`;
      };
      main.querySelector('[data-sale]').onclick = (e) => { state.sale = !state.sale; e.target.classList.toggle('on', state.sale); render(); };
      main.querySelector('[data-price]').onchange = (e) => { state.price = e.target.value; render(); };
      render();
    },

    cart() {
      setTitle('Cart');
      const render = () => {
        const lines = cart.items();
        if (!lines.length) {
          main.innerHTML = `<div class="empty">${cartSvg}<h1>Your cart is waiting</h1><p>Add products from your favorite stores to see them here.</p><a class="btn" href="${urls.categories}">Browse categories</a></div>`;
          return;
        }
        const groups = {};
        lines.forEach((l) => { const sid = productById[l.id].storeId; (groups[sid] = groups[sid] || []).push(l); });
        main.innerHTML = `<header class="page-head left"><h1>Cart</h1></header>
          <div class="cart-groups">${Object.entries(groups).map(([sid, ls]) => {
            const s = storeById[sid];
            const sub = ls.reduce((n, l) => n + productById[l.id].price * l.qty, 0);
            return `<section class="cart-group">
              <a class="pdp-store" href="${urls.store(sid)}"><span class="avatar" style="background:${s.color}">${esc(s.name.replace('/', '').slice(0, 2))}</span><span><b>${esc(s.name)}</b><small>${s.rating} ★ (${s.reviews})</small></span></a>
              ${ls.map((l) => {
                const p = productById[l.id];
                return `<div class="cart-line">
                  <a href="${urls.product(p.id)}"><img src="${img('prod-' + p.id, 160)}" alt=""></a>
                  <div class="cart-info"><a href="${urls.product(p.id)}"><b>${esc(p.title)}</b></a><small>${[l.color, l.size].filter(Boolean).join(' / ')}</small><span>${money(p.price)}</span></div>
                  <div class="stepper"><button type="button" data-line="${esc(l.key)}" data-d="-1" aria-label="Decrease">${l.qty === 1 ? '🗑' : '−'}</button><span>${l.qty}</span><button type="button" data-line="${esc(l.key)}" data-d="1" aria-label="Increase">+</button></div>
                </div>`;
              }).join('')}
              <div class="cart-total"><span>Subtotal</span><b>${money(sub)}</b></div>
              <button type="button" class="btn btn-block" data-checkout>Check out</button>
            </section>`;
          }).join('')}</div>`;
      };
      main.addEventListener('click', (e) => {
        const b = e.target.closest('[data-line]');
        if (b) {
          const line = cart.items().find((l) => l.key === b.dataset.line);
          cart.setQty(line.key, line.qty + Number(b.dataset.d));
          render();
        }
        if (e.target.closest('[data-checkout]')) toast('Checkout is not part of this remake.');
      });
      render();
    },

    deals() {
      setTitle('Deals');
      const sale = products.filter((p) => p.compareAt).sort((a, b) => (1 - b.price / b.compareAt) - (1 - a.price / a.compareAt));
      main.innerHTML = `
        <header class="page-head"><h1>Deals</h1><p class="muted">Exclusive offers from stores on Shop.</p></header>
        <section class="section"><h2 class="section-title">Deals only on Shop</h2>${row(stores.slice(0, 10).map((s) => storeCard(s)).join(''), 'trending')}</section>
        <section class="section"><h2 class="section-title">Biggest markdowns</h2>${grid(sale.slice(0, 36))}</section>`;
    },

    orders() {
      setTitle('Orders');
      main.innerHTML = `<div class="empty"><svg class="empty-art" viewBox="0 0 120 100" aria-hidden="true"><rect x="20" y="28" width="80" height="60" rx="10" fill="#e9e3ff"/><path d="M28 16h64l8 14H20l8-14Z" fill="#5433eb"/><rect x="48" y="44" width="24" height="6" rx="3" fill="#5433eb"/></svg>
        <h1>Track all your orders</h1><p>Sign in to see deliveries from every store in one place.</p><button type="button" class="btn" data-signin>Sign in</button></div>`;
    },

    saved() {
      setTitle('Saved');
      const ids = saved.ids();
      main.innerHTML = ids.length
        ? `<header class="page-head left"><h1>Saved</h1></header>${grid(ids.map((id) => productById[id]))}`
        : `<div class="empty"><svg class="empty-art" viewBox="0 0 24 24" aria-hidden="true"><path fill="#5433eb" d="M12 21s-8-5.2-8-11.2A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 2.8C20 15.8 12 21 12 21Z"/></svg><h1>Nothing saved yet</h1><p>Tap Save on any product to keep it here.</p><a class="btn" href="${urls.home}">Start exploring</a></div>`;
    },
  };

  (renderers[document.body.dataset.page] || (() => notFound('Page')))();
})();
