// Home page sections, built from the shared catalog in data.js.
const { categories, catById, stores, storeById, products } = window.ShopData;
const { img, esc, urls, productCard, storeCard, row } = window.Shop;

const fill = (name, html) => { document.querySelector(`[data-fill="${name}"]`).innerHTML = html; };
const byStore = (id) => products.filter((p) => p.storeId === id);

fill('chips', ['beauty', 'women', 'men', 'baby', 'sporting'].map((id) => `
  <li><a href="${urls.category(id)}"><img src="${img('chip-' + id, 64)}" alt="">${catById[id].name}</a></li>`).join('')
  + `<li><a href="${urls.categories}" class="chip-more" aria-label="All categories"><svg viewBox="0 0 24 24"><rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/></svg></a></li>`);

fill('deals', row(['softhaus', 'kumo-goods', 'ironleaf', 'hana-hana', 'mellowe', 'drmhouse', 'kitto', 'northpine', 'tidewell'].map((id) => {
  const s = storeById[id];
  return `
  <a class="deal" href="${urls.store(id)}">
    <div class="deal-img"><img loading="lazy" src="${img('deal-' + id)}" alt=""><span class="deal-name">${esc(s.name)}</span></div>
    <div class="deal-meta"><span class="avatar">${esc(s.name.replace('/', '').slice(0, 2))}</span>${esc(s.name)}<span class="rating">${s.rating} ★</span></div>
  </a>`;
}).join(''), 'deals'));

fill('trending', row(['velour', 'edited', 'younglo', 'steelcup', 'formfield', 'pawpost'].map((id) => storeCard(storeById[id])).join(''), 'trending'));

fill('categories', categories.slice(0, 5).map((c) => `
  <a class="cat" href="${urls.category(c.id)}" style="background:${c.color}">
    <img loading="lazy" src="${img('cat-' + c.id, 500, 260)}" alt=""><span>${c.name}</span>
  </a>`).join(''));

fill('home', row(['parachute', 'linenly', 'helio', 'carryall', 'nestwell'].map((id) => storeCard(storeById[id], 'home-card')).join(''), 'home-stores'));

const editorial = [
  ['Brand Spotlight: Edited', 'Timeless pieces with a contemporary touch.', 'edited'],
  ['Weatherproof fall fits', 'Shells, pants, and sneakers.', 'northpine'],
  ['Barely-there beauty edit', 'Tinted moisturizers, cream blush, and lip oils.', 'sachet'],
  ['Elevated entryway decor', 'Shoe storage, mirrors, catchall trays.', 'nestwell'],
  ['Entertaining brain teasers', 'Puzzles and games for game night.', 'brightblock'],
  ['First puppy favorites', 'Beds, chews, and walking gear.', 'pawpost'],
  ['Studio-to-street activewear', 'Pieces that move with you.', 'younglo'],
  ['Bath & bedtime favorites', 'Wind-down essentials.', 'linenly'],
];
fill('editorial', editorial.map(([title, sub, storeId]) => {
  const [a, b] = byStore(storeId);
  return `
  <a class="edit-card" href="${urls.store(storeId)}">
    <img loading="lazy" src="${img('edit-' + storeId, 840, 1120)}" alt="">
    <div class="edit-copy"><h3>${title}</h3><p>${sub}</p></div>
    <div class="edit-thumbs"><img src="${img('prod-' + a.id, 80)}" alt=""><img src="${img('prod-' + b.id, 80)}" alt=""></div>
  </a>`;
}).join(''));

// Category reel: rotate the active word and swap the product row under it.
const reel = ['pet', 'beauty', 'women', 'men', 'home', 'sporting'];
fill('reel', reel.map((id) => `<a href="${urls.category(id)}" data-cat="${id}">${catById[id].name}</a>`).join(''));
const words = [...document.querySelectorAll('.reel-words a')];
let reelIndex = 1;
const setReel = (i) => {
  reelIndex = (i + words.length) % words.length;
  const el = words[reelIndex];
  words.forEach((w) => w.classList.toggle('on', w === el));
  document.querySelector('.reel-words').style.transform = `translateX(${-(el.offsetLeft + el.offsetWidth / 2)}px)`;
  const picks = products.filter((p) => p.category === el.dataset.cat).sort((a, b) => b.ratingCount - a.ratingCount).slice(0, 10);
  fill('products', row(picks.map((p) => productCard(p)).join(''), 'products'));
};
let reelTimer = setInterval(() => setReel(reelIndex + 1), 4500);
words.forEach((w, i) => w.addEventListener('click', (e) => {
  if (!w.classList.contains('on')) { e.preventDefault(); setReel(i); clearInterval(reelTimer); }
}));
setReel(reelIndex);

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
