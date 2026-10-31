// Placeholder catalog. Store and product names are fictional; photos come from picsum.photos.
(() => {
  const categories = [
    { id: 'beauty', name: 'Beauty', color: '#e7516a',
      subs: ['Skin care', 'Hair care', 'Makeup', 'Perfume & cologne', 'Bath & body', 'Nail care', 'Shaving & grooming'],
      features: [['Korean skincare icons', 'Shop beauty all-stars from Seoul.'], ['Coconut milk nails', 'Sheer, off-white, glossy manicures.'], ['Soft skin & scents', 'Body washes, mists, and lotions.']],
      items: [['Glow Serum: Propolis + Niacinamide', 17], ['Dynasty Cream', 15], ['Rice Milk Toner', 18], ['Rice + Arbutin Serum', 17], ['Green Plum Cleanser', 13], ['Ginseng Essence Water', 18], ['Rice and Honey Glow Mask', 18], ['Peptide Lip Tint', 20], ['Hydrating Body Lotion', 33], ['Eau de Parfum 50ml', 124], ['Cream Blush Stick', 26], ['Tinted Moisturizer SPF 30', 42]] },
    { id: 'women', name: 'Women', color: '#c8262a', sized: true,
      subs: ['Tops', 'Dresses', 'Bottoms', 'Outerwear', 'Activewear', 'Shoes', 'Bags'],
      features: [["The '90s slip", 'Bias cuts and satin sheen.'], ['Elevated loungewear', 'Soft sets for staying in.'], ['Fall layers', 'Cardigans, knits, and jackets.']],
      items: [['Solid Long Sleeve Tee', 30.95], ['Merino V-Neck T-Shirt', 98], ['Brushed Bamboo Pullover', 78], ['Satin Effect Tank Top', 35], ['Washed Low Rise Jeans', 50], ['Bow Detail Mini Skirt', 38], ['Chunky Knit Cardigan', 64], ['Tailored Button-Up Shirt', 49.5], ['Bias Cut Slip Dress', 58], ['Ribbed Baby Tee', 22], ['Wide Leg Trousers', 68], ['Cropped Zip Hoodie', 46]] },
    { id: 'men', name: 'Men', color: '#3a3243', sized: true,
      subs: ['Shirts', 'Hoodies & sweatshirts', 'Pants', 'Shorts', 'Outerwear', 'Shoes', 'Accessories'],
      features: [['Weatherproof fall fits', 'Shells, pants, and sneakers.'], ['Gym to street', 'Joggers and heavyweight tees.'], ['Merino essentials', 'Soft, warm, odor-resistant.']],
      items: [['Big Patch Sweats', 60], ['Baggy Sweatpants', 64], ['Heavyweight Hoodie', 72], ['Oversized Tee', 32], ['Relaxed Cargo Pants', 78], ['Merino Crew Sweater', 98], ['Fleece Quarter Zip', 88], ['Running Shorts', 40], ['Flannel Overshirt', 70], ['Packable Rain Shell', 140], ['Slim Chino', 68], ['Rib Knit Beanie', 28]] },
    { id: 'home', name: 'Home', color: '#6e6a68',
      subs: ['Bedding', 'Bath', 'Decor', 'Lighting', 'Furniture', 'Kitchen', 'Storage'],
      features: [['Elevated entryway decor', 'Shoe storage, mirrors, catchall trays.'], ['Bath & bedtime favorites', 'Wind-down essentials.'], ['Hosting season', 'Serveware and linens.']],
      items: [['Percale Sheet Set', 189], ['Linen Duvet Cover', 299], ['Down Alternative Pillow', 129], ['Waffle Bath Towel', 39], ['Cotton Knit Throw', 119], ['Nylon Weekender Bag', 128], ['Memory Foam Mattress', 999], ['Ceramic Table Lamp', 149], ['Round Wall Mirror', 179], ['Marble Catchall Tray', 38], ['Oak Shoe Bench', 220], ['Fig Leaf Candle', 34]] },
    { id: 'fitness', name: 'Fitness & nutrition', color: '#51545a',
      subs: ['Drinkware', 'Strength', 'Yoga', 'Recovery', 'Supplements', 'Boxing'],
      features: [['Boxing for beginners', 'Gloves, wraps, and bags.'], ['Studio-to-street activewear', 'Pieces that move with you.'], ['Hydration station', 'Tumblers that go everywhere.']],
      items: [['Flowstate Tumbler 40 oz', 50], ['Quencher Tumbler 30 oz', 45], ['Adjustable Weight Bench', 199], ['All-in-One Home Gym', 1899], ['Cork Yoga Mat', 88], ['Resistance Band Set', 29], ['Cast Iron Kettlebell 25 lb', 64], ['Protein Shaker Bottle', 18], ['Training Boxing Gloves', 79], ['Speed Jump Rope', 24], ['High Density Foam Roller', 35], ['Adjustable Dumbbell Set', 249]] },
    { id: 'baby', name: 'Baby & toddler', color: '#b4692e',
      subs: ['Feeding', 'Nursery', 'Clothing', 'Gear', 'Bath', 'Toys'],
      features: [['Nursery must-haves', 'Swaddles, sheets, and play mats.'], ['Feeding time', 'Formula, bibs, and cups.'], ['On the go', 'Carriers and diaper bags.']],
      items: [['Stage 1 Organic Formula 800g', 49.99], ['Stage 2 Organic Formula 800g', 49.99], ['Muslin Swaddle 3-Pack', 45], ['Silicone Bib', 15], ['Ergonomic Baby Carrier', 159], ['Organic Crib Sheet', 34], ['Teething Ring', 12], ['First Walker Sneakers', 42], ['Padded Play Mat', 89], ['Spill-Proof Sippy Cup', 16], ['Muslin Burp Cloths', 24], ['Bath Toy Set', 22]] },
    { id: 'pet', name: 'Pet supplies', color: '#d55a2e',
      subs: ['Dogs', 'Cats', 'Beds', 'Toys', 'Treats', 'Walking'],
      features: [['First puppy favorites', 'Beds, chews, and walking gear.'], ['Cat corner', 'Trees, scratchers, and toys.'], ['Calm and cozy', 'Blankets and orthopedic beds.']],
      items: [['Orthopedic Dog Bed', 129], ['Chew Toy Bundle', 28], ['No-Pull Walking Harness', 42], ['Rope Leash', 30], ['Puppy Training Treats', 14], ['Modern Cat Tree', 159], ['Slow Feeder Bowl', 22], ['Deshedding Brush', 18], ['Travel Water Bottle', 20], ['Plush Squeaker Toy', 12], ['Leather Collar', 26], ['Calming Blanket', 45]] },
    { id: 'sporting', name: 'Sporting goods', color: '#2051b4',
      subs: ['Racquet sports', 'Camping', 'Hiking', 'Cycling', 'Golf', 'Swim'],
      features: [['Pickleball starter kit', 'Paddles, balls, and bags.'], ['Trail ready', 'Packs, headlamps, and shoes.'], ['Weekend campout', 'Chairs and cookware.']],
      items: [['Carbon Pickleball Paddle', 89], ['Graphite Tennis Racket', 179], ['Match Soccer Ball', 35], ['Hiking Daypack 24L', 98], ['Insulated Water Bottle', 32], ['Trail Running Shoes', 140], ['Folding Camp Chair', 65], ['Rechargeable Headlamp', 40], ['Golf Balls 12-Pack', 48], ['Climbing Chalk Bag', 25], ['Anti-Fog Swim Goggles', 22], ['Commuter Bike Helmet', 75]] },
    { id: 'electronics', name: 'Electronics', color: '#2b2f3a',
      subs: ['Audio', 'Phone accessories', 'Computer accessories', 'Smart home', 'Wearables'],
      features: [['Desk setup upgrades', 'Keyboards, hubs, and lamps.'], ['Sound on', 'Earbuds and speakers.'], ['Charge everything', 'Power banks and pads.']],
      items: [['Wireless Earbuds', 129], ['Over-Ear Headphones', 249], ['Portable Speaker', 99], ['Clear Phone Case', 39], ['Magnetic Charger', 49], ['Smart Plug 2-Pack', 29], ['Mechanical Keyboard', 149], ['USB-C Hub', 59], ['LED Desk Lamp', 79], ['HD Webcam', 89], ['Power Bank 10K', 45], ['Silicone Watch Band', 35]] },
    { id: 'toys', name: 'Toys & games', color: '#7aa4cf',
      subs: ['Puzzles', 'Board games', 'Building', 'Plush', 'Outdoor play', 'Arts & crafts'],
      features: [['Entertaining brain teasers', 'Puzzles and games for game night.'], ['Build it', 'Blocks and magnetic tiles.'], ['Art hour', 'Kits for little makers.']],
      items: [['Building Blocks Set', 49], ['Brain Teaser Puzzle', 18], ['1000-Piece Jigsaw', 25], ['Plush Bear', 30], ['Party Card Game', 20], ['Wooden Train Set', 65], ['Watercolor Art Kit', 34], ['Remote Control Car', 59], ['Strategy Board Game', 40], ['Magnetic Tiles 60pc', 79], ['Diamond Kite', 28], ['Bubble Machine', 26]] },
  ];

  // [id, name, category, rating, reviews, brand color, collections]
  const storeRows = [
    ['joseon-lab', 'Joseon Lab', 'beauty', 4.8, '35.3K', '#c9b48f', ['Serums', 'Moisturizers', 'Cleansers', 'Masks']],
    ['velour', 'Velour', 'beauty', 4.8, '35.3K', '#b8742f', ['Eau de parfum', 'Discovery sets', 'Body mists']],
    ['sachet', 'Sachet', 'beauty', 4.5, '5.7K', '#8a5a5a', ['Lips', 'Brows', 'Face']],
    ['dossier-lane', 'Dossier Lane', 'beauty', 4.5, '101.6K', '#6b5440', ['Women', 'Men', 'Minis']],
    ['drmhouse', 'DRMHOUSE', 'beauty', 4.5, '12.4K', '#9a8d84', ['Devices', 'Skin care']],
    ['kitto', '/kitto/', 'beauty', 4.5, '22.0K', '#2a2a2a', ['Hair', 'Clips', 'Bath']],
    ['edited', 'Edited', 'women', 4.4, '106.6K', '#4a4440', ['Tops', 'Clothing', 'Accessories', 'Sets', 'New In', 'SALE', 'Dresses', 'Bottoms']],
    ['softhaus', 'Softhaus', 'women', 4.8, '18.2K', '#8c7b6b', ['Hoodies', 'Sweatpants', 'Blankets']],
    ['good-days', 'Good Days', 'women', 4.7, '61.3K', '#5b7a5a', ['Tees', 'Long sleeves', 'Hats']],
    ['woolwise', 'Woolwise', 'women', 4.6, '1.9K', '#3d4f5c', ['Merino tees', 'Sweaters']],
    ['mellowe', 'mellowe', 'women', 4.3, '3.1K', '#6d6a8e', ['Sleep', 'Lounge']],
    ['hana-hana', 'Hana Hana', 'women', 4.9, '2.4K', '#9b8a3a', ['Textiles', 'Bags', 'Socks']],
    ['younglo', 'Younglo', 'men', 4.9, '418.3K', '#4e3f36', ['Joggers', 'Tees', 'Hoodies', 'Shorts']],
    ['ironleaf', 'Ironleaf', 'men', 4.8, '7.7K', '#2c2c2c', ['Outerwear', 'Knives', 'Tools']],
    ['northpine', 'Northpine', 'men', 4.6, '9.0K', '#3f5a48', ['Flannels', 'Rain gear']],
    ['parachute', 'Parachute', 'home', 4.3, '24K', '#7a6f66', ['Bedding', 'Bath', 'Decor']],
    ['linenly', 'Linenly', 'home', 4.5, '145.9K', '#5d7c86', ['Sheets', 'Duvets', 'Towels']],
    ['helio', 'Helio', 'home', 4.3, '43.1K', '#6c6c70', ['Mattresses', 'Pillows']],
    ['carryall', 'Carryall', 'home', 4.8, '52.9K', '#7a1e1e', ['Luggage', 'Weekenders', 'Organizers']],
    ['nestwell', 'Nestwell', 'home', 4.6, '9.4K', '#8a7b63', ['Lighting', 'Mirrors', 'Storage']],
    ['steelcup', 'Steelcup', 'fitness', 4.9, '256.8K', '#5c7480', ['Tumblers', 'Bottles', 'Accessories']],
    ['liftline', 'Liftline', 'fitness', 4.7, '14.5K', '#363a40', ['Benches', 'Racks', 'Weights']],
    ['formfield', 'Formfield', 'baby', 4.9, '8.2K', '#2f3d34', ['Formula', 'Feeding', 'Nursery']],
    ['pawpost', 'Pawpost', 'pet', 4.8, '31.0K', '#a65b2e', ['Dogs', 'Cats', 'Treats']],
    ['tidewell', 'Tidewell', 'sporting', 4.7, '6.6K', '#2a4f7a', ['Pickleball', 'Camping', 'Bottles']],
    ['voltbox', 'Voltbox', 'electronics', 4.6, '19.8K', '#1f2430', ['Audio', 'Charging', 'Desk']],
    ['brightblock', 'Brightblock', 'toys', 4.8, '11.2K', '#4d84b8', ['Puzzles', 'Building', 'Games']],
    ['kumo-goods', 'Kumo Goods', 'home', 4.8, '4.4K', '#5e6b73', ['Kitchen', 'Tableware']],
  ];

  // Small deterministic PRNG so prices/ratings are stable across reloads.
  const hash = (s) => { let h = 2166136261; for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; };
  const rand = (seed) => (hash(seed) % 1000) / 1000;

  const catById = Object.fromEntries(categories.map((c) => [c.id, c]));
  const stores = storeRows.map(([id, name, category, rating, reviews, color, collections]) => ({ id, name, category, rating, reviews, color, collections }));
  const storeById = Object.fromEntries(stores.map((s) => [s.id, s]));

  const products = [];
  for (const s of stores) {
    const cat = catById[s.category];
    cat.items.forEach(([title, base], i) => {
      const id = `${s.id}-${i}`;
      const r = rand(id);
      const price = Math.round(base * (0.85 + r * 0.3) * 100) / 100;
      const onSale = r > 0.62;
      products.push({
        id, storeId: s.id, category: cat.id, title,
        sub: cat.subs[i % cat.subs.length],
        collection: s.collections[i % s.collections.length],
        price: onSale ? Math.round(price * 0.7 * 100) / 100 : price,
        compareAt: onSale ? price : null,
        rating: Math.round((4 + rand(id + 'r')) * 10) / 10,
        ratingCount: Math.round(20 + rand(id + 'c') * 9000),
        isNew: rand(id + 'n') > 0.7,
        exclusive: rand(id + 'x') > 0.8,
        sizes: cat.sized ? ['XS', 'S', 'M', 'L', 'XL'] : null,
        colors: ['Black', 'Cream', 'Sage', 'Navy'].slice(0, 1 + (hash(id) % 4)),
      });
    });
  }
  const productById = Object.fromEntries(products.map((p) => [p.id, p]));

  window.ShopData = { categories, catById, stores, storeById, products, productById };
})();
