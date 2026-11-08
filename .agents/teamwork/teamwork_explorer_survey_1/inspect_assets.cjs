const fs = require('fs');

const files = ['preview/index.html', 'preview/simulation.html', 'preview/digital-twin.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log('=== ' + f + ' ===');
  const scripts = content.match(/<script[^>]*src=["'][^"']*["'][^>]*>/gi) || [];
  const links = content.match(/<link[^>]*href=["'][^"']*["'][^>]*>/gi) || [];
  const imgs = content.match(/<img[^>]*src=["'][^"']*["'][^>]*>/gi) || [];
  console.log('Scripts (' + scripts.length + '):');
  scripts.forEach(s => console.log('  ' + s));
  console.log('Links (' + links.length + '):');
  links.forEach(l => console.log('  ' + l));
  console.log('Images (' + imgs.length + '):');
  imgs.forEach(i => console.log('  ' + i));
});
