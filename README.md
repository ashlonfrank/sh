# sh — shop.com remake

A static HTML/CSS/JS study remake of [shop.com](https://shop.com/).

**Unofficial.** This project is not affiliated with Shop or Shopify. Store and product names are fictional, copy is rewritten, and photos are placeholders from picsum.photos.

## Pages

| Page | URL | What it has |
| --- | --- | --- |
| Home | `index.html` | Hero carousel, deals and trending store rows, categories, rotating category reel, home stores, editorial cards |
| All categories | `categories.html` | Every category with subcategory links |
| Category | `category.html?c=beauty` | Subcategory chips, feature tiles, Top rated / What's new, stores, bestsellers |
| Store | `store.html?s=edited` | Store-colored page, follow, collection chips, in-store search, sort and filters |
| Product | `product.html?id=edited-3` | Gallery, color/size/quantity, add to cart, buy now, save, share, reviews |
| Search | `search.html?q=serum` | Results grid, store matches, sale and price filters |
| Cart | `cart.html` | Items grouped by store, quantity steppers, subtotals |
| Deals | `deals.html` | Stores with exclusive deals and biggest markdowns |
| Orders | `orders.html` | Sign-in empty state |
| Saved | `saved.html` | Products you saved |

Cart, saved items and followed stores are kept in your browser's localStorage. Sign in and checkout are not part of the remake.

## Run

```bash
git clone https://github.com/ashlonfrank/sh.git ~/sh
cd ~/sh
python3 -m http.server 4321
```

Then open http://localhost:4321. The server must be started from inside the repo folder.

## Report

```bash
node report.mjs
```

Checks the remake against shop.com's page types and home page sections, and that every link target exists in the catalog. Prints `REMAKE COMPLETE` when every check passes.

## Files

- `data.js` — catalog: categories, stores, products
- `layout.js` — shared rail, search bar, footer, cart/saved storage, card templates
- `app.js` — home page
- `pages.js` — every other page, chosen by `<body data-page>`
- `styles.css` — all styles
