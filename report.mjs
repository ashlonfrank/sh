// Checks the remake against the shop.com page types and home page section list.
// Usage: node report.mjs
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';

const dir = new URL('.', import.meta.url);
const read = (f) => (existsSync(new URL(f, dir)) ? readFileSync(new URL(f, dir), 'utf8') : '');
const html = read('index.html');
const css = read('styles.css');
const js = read('app.js');
const layout = read('layout.js');
const pages = read('pages.js');

// Load the catalog so link targets can be checked against real ids.
const sandbox = { window: {} };
vm.runInNewContext(read('data.js'), sandbox);
const D = sandbox.window.ShopData || { categories: [], stores: [], products: [] };

const pageTypes = ['categories', 'category', 'store', 'product', 'search', 'cart', 'deals', 'orders', 'saved'];
const shellOk = (p) => {
  const h = read(`${p}.html`);
  return h.includes(`data-page="${p}"`) && h.includes('layout.js') && h.includes('pages.js') && pages.includes(`${p}(`);
};

// Ids in the home page's `[...].map((id) =>` lists and editorial rows must exist in the catalog.
const homeIdsOk = () => {
  const lists = [...js.matchAll(/\[((?:\s*'[a-z-]+',?)+)\s*\]\.map\(\(id\)/g)].flatMap((m) => m[1].match(/[a-z-]+/g));
  const editorial = [...js.matchAll(/', '([a-z-]+)'\],/g)].map((m) => m[1]);
  const ids = [...lists, ...editorial];
  return ids.length > 20 && ids.every((id) => D.stores.some((s) => s.id === id) || D.categories.some((c) => c.id === id));
};

const checks = [
  // Home page
  ['Logo + left rail nav (home, categories, cart, deals, orders)', ['index.html', 'categories.html', 'cart.html', 'deals.html', 'orders.html'].every((h) => layout.includes(h))],
  ['Sign in in bottom rail', layout.includes('rail-signin')],
  ['Search submits to search page', layout.includes('What are you shopping for today?') && layout.includes('action="search.html"')],
  ['Category chips row', js.includes("fill('chips'")],
  ['Hero carousel: $1M Shop Cash giveaway + dots', html.includes('Shop Cash giveaway') && html.includes('Enter by Nov 1') && js.includes('setHero')],
  ['Hero extra slides (Korean Beauty Edit, Shop is all about you)', html.includes('Korean') && html.includes('Shop is all')],
  ['Deals only on Shop row', html.includes('Deals only on Shop') && js.includes("fill('deals'")],
  ['Trending stores with exclusive deal panels', html.includes('Trending stores') && layout.includes('Exclusive deal available')],
  ['Categories tiles', html.includes('Categories') && js.includes("fill('categories'")],
  ['Rotating category word reel + product row', js.includes('setReel')],
  ['Home stores row', html.includes('data-fill="home"')],
  ['Discover something you love + editorial cards', html.includes('Discover something') && js.includes("fill('editorial'")],
  ['Footer: QR, wordmark, 4 link columns, app badges', layout.includes('class="qr"') && (layout.match(/<h4>/g) || []).length === 4 && layout.includes('store-badge')],
  ['Shop purple + 36px hero radius tokens', css.includes('rgb(84, 51, 235)') && css.includes('--radius-xl: 36px')],
  ['Responsive breakpoints', (css.match(/@media \(max-width/g) || []).length >= 4],
  ['Unaffiliated notice', layout.includes('not affiliated')],
  // Other pages
  ...pageTypes.map((p) => [`Page: ${p}.html`, shellOk(p)]),
  ['Catalog: 10 categories, 25+ stores, 300+ products', D.categories.length >= 10 && D.stores.length >= 25 && D.products.length >= 300],
  ['Every store has products', D.stores.every((s) => D.products.some((p) => p.storeId === s.id))],
  ['Home page links point at real stores and categories', homeIdsOk()],
  ['Product page: options, add to cart, buy now, save, reviews', ['data-size', 'data-color', 'data-add', 'data-buy', 'data-save', 'id="reviews"'].every((x) => pages.includes(x))],
  ['Cart persists and shows count badge', layout.includes("list('sh-cart')") && layout.includes('cart-badge')],
  ['Store page: collections, sort, sale, price filters, follow', ['data-col', 'data-sort', 'data-sale', 'data-price', 'data-follow'].every((x) => pages.includes(x))],
];

let failed = 0;
for (const [name, ok] of checks) {
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
}
console.log(`\n${checks.length - failed}/${checks.length} checks passed`);
console.log(failed ? 'REMAKE INCOMPLETE' : 'REMAKE COMPLETE');
process.exit(failed ? 1 : 0);
