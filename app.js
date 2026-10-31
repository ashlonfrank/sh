// Placeholder content. Store and product names are fictional; photos come from picsum.photos.
const img = (seed, w = 400, h = w) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

const deals = [
  ['Softhaus', 4.8], ['Kumo Goods', 4.8], ['Ironleaf', 4.8], ['Hana Hana', 4.9],
  ['mellowe', 4.3], ['DRMHOUSE', 4.5], ['/kitto/', 4.5], ['Northpine', 4.6], ['Tidewell', 4.7],
];

const trending = [
  ['Velour', '4.8', '35.3K', '#b8742f', ['$179.99', '$124.99']],
  ['Edited', '4.4', '106.6K', '#3b3b3b', ['$35.00', '$49.50']],
  ['Younglo', '4.9', '418.3K', '#4e3f36', ['$60.00', '$64.00']],
  ['Steelcup', '4.9', '256.8K', '#5c7480', ['$50.00', '$18.00']],
  ['Formfield', '4.9', '8.2K', '#2f3d34', ['$49.99', '$49.99']],
  ['Lumen & Co', '4.7', '12.1K', '#6e4a5c', ['$28.00', '$42.00']],
];

const categories = [
  ['Beauty', '#e7516a'], ['Women', '#c8262a'], ['Men', '#3a3243'], ['Home', '#6e6a68'],
  ['Fitness & nutrition', '#51545a'], ['Baby & toddler', '#b4692e'], ['Pet supplies', '#d55a2e'],
  ['Sporting goods', '#2051b4'], ['Electronics', '#2b2f3a'], ['Toys & games', '#7aa4cf'],
];

const reel = ['Pet supplies', 'Beauty', 'Women', 'Men', 'Home', 'Sporting goods'];

const productsByCategory = {
  Beauty: [
    ['Joseon Lab', 'Glow Serum: Propolis + Niacinamide', 2.9, '15.30', '17.00'],
    ['Joseon Lab', 'Dynasty Cream', 5.7, '15.00'],
    ['Joseon Lab', 'Glow Replenishing Rice Milk', 2.7, '15.30', '18.00'],
    ['Joseon Lab', 'Glow Deep Serum: Rice + Arbutin', 2.2, '17.00'],
    ['Joseon Lab', 'Green Plum Refreshing Cleanser', 3.9, '13.00'],
    ['Joseon Lab', 'Ginseng Essence Water', 2.0, '18.00'],
    ['Joseon Lab', 'Ground Rice and Honey Glow Mask', 2.0, '15.30', '18.00'],
  ],
  Women: [
    ['Good Days', "Women's Solid Long Sleeve Tee", 0.5, '30.95'],
    ['Woolwise', "Women's Merino V-Neck T-Shirt", 1.9, '98.00'],
    ['Cozy Grove', "Women's Brushed Bamboo Pullover", 1.5, '78.00'],
    ['Good Days', "Women's Crusher-Lite Vee Tunic", 0.2, '32.95'],
    ['Good Days', "Women's Among the Trees Tee", 0.2, '34.95'],
    ['Good Days', "Women's Little Fox Long Sleeve", 0.1, '34.95'],
    ['Cozy Grove', "Women's All Day Tee", 0.2, '58.00'],
  ],
};
productsByCategory['Pet supplies'] = productsByCategory.Beauty;
productsByCategory.Men = productsByCategory.Women;
productsByCategory.Home = productsByCategory.Beauty;
productsByCategory['Sporting goods'] = productsByCategory.Women;

const homeStores = [
  ['Parachute', '4.3', '24K'], ['Linenly', '4.5', '145.9K'],
  ['Helio', '4.3', '43.1K'], ['Carryall', '4.8', '52.9K'], ['Nestwell', '4.6', '9.4K'],
];

const editorial = [
  ['Brand Spotlight: Staude', 'Timeless pieces with a contemporary touch.'],
  ['Weatherproof fall fits', 'Shells, pants, and sneakers.'],
  ['Barely-there beauty edit', 'Tinted moisturizers, cream blush, and lip oils.'],
  ['Elevated entryway decor', 'Shoe storage, mirrors, catchall trays.'],
  ['Entertaining brain teasers', 'Puzzles and games for game night.'],
  ['First puppy favorites', 'Beds, chews, and walking gear.'],
  ['Studio-to-street activewear', 'Pieces that move with you.'],
  ['Bath & bedtime favorites', 'Wind-down essentials.'],
];

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const fill = (name, html) => { document.querySelector(`[data-fill="${name}"]`).innerHTML = html; };
const storeDeal = (seed, prices) => `
  <div class="store-deal">
    <span class="pill">Exclusive deal available</span>
    <div class="thumbs">${prices.map((p, i) => `
      <div class="thumb"><img loading="lazy" src="${img(`${seed}-p${i}`, 200)}" alt=""><span class="price">${p}</span></div>`).join('')}
    </div>
  </div>`;

fill('deals', deals.map(([name, rating]) => `
  <a class="deal" href="#">
    <div class="deal-img"><img loading="lazy" src="${img('deal-' + slug(name))}" alt=""><span class="deal-name">${name}</span></div>
    <div class="deal-meta"><span class="avatar">${name.slice(0, 2)}</span>${name}<span class="rating">${rating} ★</span></div>
  </a>`).join(''));

fill('trending', trending.map(([name, r, n, color, prices]) => `
  <a class="store-card" href="#" style="background:${color}">
    <img loading="lazy" src="${img('trend-' + slug(name), 500, 760)}" alt="">
    <div class="store-head"><div class="name">${name}</div><div class="rating">${r} ★ (${n})</div></div>
    ${storeDeal('trend-' + slug(name), prices)}
  </a>`).join(''));

fill('categories', categories.slice(0, 5).map(([name, color]) => `
  <a class="cat" href="#" style="background:${color}">
    <img loading="lazy" src="${img('cat-' + slug(name), 500, 260)}" alt=""><span>${name}</span>
  </a>`).join(''));

fill('reel', reel.map((w) => `<span>${w}</span>`).join(''));

fill('home', homeStores.map(([name, r, n]) => `
  <a class="home-card" href="#">
    <img loading="lazy" src="${img('home-' + slug(name), 680, 800)}" alt="">
    <div class="store-head"><div class="name">${name}</div><div class="rating">${r} ★ (${n})</div></div>
    ${storeDeal('home-' + slug(name), ['$89.00', '$129.00'])}
  </a>`).join(''));

fill('editorial', editorial.map(([title, sub]) => `
  <a class="edit-card" href="#">
    <img loading="lazy" src="${img('edit-' + slug(title), 840, 1120)}" alt="">
    <div class="edit-copy"><h3>${title}</h3><p>${sub}</p></div>
    <div class="edit-thumbs"><img src="${img('edit-t1-' + slug(title), 80)}" alt=""><img src="${img('edit-t2-' + slug(title), 80)}" alt=""></div>
  </a>`).join(''));

// Category reel: rotate the active word and swap the product row under it.
const renderProducts = (cat) => fill('products', productsByCategory[cat].map(([brand, title, k, price, was]) => `
  <a class="product" href="#">
    <div class="img"><img loading="lazy" src="${img('prod-' + slug(cat + title))}" alt=""></div>
    <div class="brand">${brand}</div>
    <h3>${title}</h3>
    <div class="stars">★★★★★<small>(${k}K)</small></div>
    <div class="price">$${price}${was ? `<s>$${was}</s>` : ''}</div>
  </a>`).join(''));

const words = [...document.querySelectorAll('.reel-words span')];
let reelIndex = 1;
const setReel = (i) => {
  reelIndex = (i + words.length) % words.length;
  const el = words[reelIndex];
  words.forEach((w) => w.classList.toggle('on', w === el));
  document.querySelector('.reel-words').style.transform = `translateX(${-(el.offsetLeft + el.offsetWidth / 2)}px)`;
  renderProducts(el.textContent);
};
words.forEach((w, i) => w.addEventListener('click', () => setReel(i)));
setReel(reelIndex);
setInterval(() => setReel(reelIndex + 1), 4500);

// Hero carousel
const track = document.querySelector('.hero-track');
const slides = track.children;
const dots = document.querySelector('.hero-dots');
let heroIndex = 0;
const setHero = (i) => {
  heroIndex = (i + slides.length) % slides.length;
  track.style.transform = `translateX(-${heroIndex * 100}%)`;
  [...dots.children].forEach((d, j) => d.setAttribute('aria-selected', j === heroIndex));
};
[...slides].forEach((_, i) => {
  const b = document.createElement('button');
  b.setAttribute('role', 'tab');
  b.setAttribute('aria-label', `Slide ${i + 1}`);
  b.onclick = () => setHero(i);
  dots.append(b);
});
setHero(0);
setInterval(() => setHero(heroIndex + 1), 6000);

// Row "next" arrows
document.querySelectorAll('.row-next').forEach((btn) => {
  btn.addEventListener('click', () => {
    const row = btn.previousElementSibling;
    row.scrollBy({ left: row.clientWidth * 0.8 });
  });
});
