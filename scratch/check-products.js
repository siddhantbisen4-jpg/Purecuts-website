const fs = require('fs');

const content = fs.readFileSync('src/db/seed-data.ts', 'utf8');

const regex = /"?slug"?:\s*"([^"]+)",\s*"?name"?:\s*"([^"]+)",\s*"?brand"?:\s*"([^"]+)",\s*"?category"?:\s*"([^"]+)",\s*"?categorySlug"?:\s*"([^"]+)"/g;


let match;
const products = [];
while ((match = regex.exec(content)) !== null) {
  products.push({
    slug: match[1],
    name: match[2],
    brand: match[3],
    category: match[4],
    categorySlug: match[5]
  });
}

console.log('Total products matched:', products.length);
const byCategory = {};
products.forEach(p => {
  if (!byCategory[p.categorySlug]) byCategory[p.categorySlug] = [];
  byCategory[p.categorySlug].push({ name: p.name, brand: p.brand, slug: p.slug });
});

for (const [cat, list] of Object.entries(byCategory)) {
  console.log(`\n=== Category: ${cat} (${list.length} products) ===`);
  list.forEach(p => console.log(`  - [${p.brand}] ${p.name.slice(0, 60)}... (${p.slug})`));
}
