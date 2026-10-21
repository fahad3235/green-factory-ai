const fs = require('fs');

const files = ['preview/index.html', 'preview/simulation.html', 'preview/digital-twin.html'];

files.forEach(filePath => {
  const html = fs.readFileSync(filePath, 'utf8');
  console.log(`\n========================================`);
  console.log(`AUDIT: ${filePath}`);
  console.log(`========================================`);
  
  // 1. Viewport tag
  const viewportMatch = html.match(/<meta\s+name=["']viewport["'][^>]*>/i);
  console.log('Viewport Meta:', viewportMatch ? viewportMatch[0] : 'MISSING!');
  
  // 2. Sidebar structure
  const sidebarMatch = html.match(/<aside[^>]*class=["']([^"']*)["']/i);
  if (sidebarMatch) {
    console.log('Sidebar classes:', sidebarMatch[1]);
  }
  
  // 3. Mobile toggles / hamburger
  const hamburger = html.match(/id=["'](menu-toggle|sidebar-toggle|mobile-menu-btn|btn-menu|hamburger)["']/i);
  console.log('Mobile menu button:', hamburger ? hamburger[0] : 'None found');
  
  // 4. Fixed width containers that could break mobile
  const fixedWidths = html.match(/class=["'][^"']*\bw-\[\d{3,}px\][^"']*["']/g) || [];
  console.log('Hardcoded large fixed-widths (e.g. w-[600px]):', fixedWidths.length);
  if (fixedWidths.length > 0) {
    console.log('Samples:', fixedWidths.slice(0, 3));
  }
  
  // 5. Overflow handling
  const overflowX = (html.match(/overflow-x-auto/g) || []).length;
  console.log('overflow-x-auto containers:', overflowX);
  
  // 6. Media queries in style tags
  const mediaQueries = html.match(/@media[^{]+\{/g) || [];
  console.log('Custom CSS @media queries:', mediaQueries.length);
  if (mediaQueries.length > 0) {
    console.log('Queries:', mediaQueries);
  }
});
