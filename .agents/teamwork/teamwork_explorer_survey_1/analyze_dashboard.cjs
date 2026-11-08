const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('preview/index.html', 'utf8');
const scriptStart = html.lastIndexOf('<script>');
const scriptEnd = html.lastIndexOf('</script>');
const scriptContent = html.substring(scriptStart + 8, scriptEnd);

let dashHtml = '';
const domMocks = {
  document: {
    documentElement: { classList: { contains: () => false, add: () => {}, remove: () => {} } },
    getElementById: (id) => ({
      innerHTML: '',
      set innerHTML(val) { if (id === 'main-viewport') dashHtml = val; },
      textContent: '',
      classList: { add: () => {}, remove: () => {}, contains: () => false },
      setAttribute: () => {},
      removeAttribute: () => {},
      style: {}
    }),
    querySelectorAll: () => [],
    querySelector: () => null,
    createElement: () => ({ setAttribute: () => {}, appendChild: () => {}, style: {} })
  },
  window: {
    location: { hash: '' },
    addEventListener: () => {},
    sessionStorage: { getItem: () => 'true' },
    localStorage: { getItem: () => null },
    lucide: { createIcons: () => {} },
    Chart: function() { return { destroy: () => {}, update: () => {} }; }
  },
  sessionStorage: { getItem: () => 'true' },
  localStorage: { getItem: () => null },
  setTimeout: (fn) => fn(),
  setInterval: () => 1,
  console: console
};
const context = vm.createContext(domMocks);
vm.runInContext(scriptContent, context);
vm.runInContext("AppState.activeRoute = 'dashboard'; renderActiveView();", context);

const sections = dashHtml.split('</section>');
console.log('Section 1 preview:\n', sections[0].slice(0, 300));
const svgs1 = (sections[0].match(/<svg[\s\S]*?<\/svg>/g) || []);
console.log('Section 1 svgs count:', svgs1.length, 'sizes:', svgs1.map(s => s.length));

const sec1 = sections[0];
const base64Match = sec1.match(/data:image[^"']+/g);
console.log('Sec1 Base64 images:', base64Match ? base64Match.map(b => b.length) : 'none');

const sec5 = sections[4];
const base64Match5 = sec5.match(/data:image[^"']+/g);
console.log('Sec5 Base64 images:', base64Match5 ? base64Match5.map(b => b.length) : 'none');
