// Checks the remake against the shop.com home page section list.
// Usage: node report.mjs
import { readFileSync, existsSync } from 'node:fs';

const dir = new URL('.', import.meta.url);
const read = (f) => (existsSync(new URL(f, dir)) ? readFileSync(new URL(f, dir), 'utf8') : '');
const html = read('index.html');
const css = read('styles.css');
const js = read('app.js');

const checks = [
  ['Logo + left rail nav (home, categories, cart, deals, orders)', /class="rail"/.test(html) && (html.match(/class="rail-btn/g) || []).length >= 6],
  ['Sign in in bottom rail', html.includes('rail-signin')],
  ['Floating search with image search', html.includes('What are you shopping for today?') && html.includes('img-search')],
  ['Category chips row', (html.match(/<li><a href="#"><img/g) || []).length >= 5],
  ['Hero carousel: $1M Shop Cash giveaway + dots', html.includes('Shop Cash giveaway') && html.includes('Enter by Nov 1') && js.includes('setHero')],
  ['Hero extra slides (Korean Beauty Edit, Shop is all about you)', html.includes('Korean') && html.includes('Shop is all')],
  ['Deals only on Shop row', html.includes('Deals only on Shop') && js.includes("fill('deals'")],
  ['Trending stores with exclusive deal panels', html.includes('Trending stores') && js.includes('Exclusive deal available')],
  ['Categories tiles', html.includes('Categories') && js.includes("fill('categories'")],
  ['Rotating category word reel + product row', js.includes('setReel') && js.includes('renderProducts')],
  ['Home stores row', html.includes('data-fill="home"')],
  ['Discover something you love + editorial cards', html.includes('Discover something') && js.includes("fill('editorial'")],
  ['Footer: QR, wordmark, 4 link columns, app badges', html.includes('class="qr"') && (html.match(/<h4>/g) || []).length === 4 && html.includes('store-badge')],
  ['Shop purple + 36px hero radius tokens', css.includes('rgb(84, 51, 235)') && css.includes('--radius-xl: 36px')],
  ['Responsive breakpoints', (css.match(/@media \(max-width/g) || []).length >= 2],
  ['Unaffiliated notice', html.includes('not affiliated')],
];

let failed = 0;
for (const [name, ok] of checks) {
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
}
console.log(`\n${checks.length - failed}/${checks.length} checks passed`);
console.log(failed ? 'REMAKE INCOMPLETE' : 'REMAKE COMPLETE');
process.exit(failed ? 1 : 0);
