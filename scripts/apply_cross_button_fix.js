const fs = require('fs');

let html = fs.readFileSync('preview/index.html', 'utf8');

// 1. Locate and clean up the close button in copilot drawer header
const oldBtnRegex = /<button type="button" onclick="toggleCopilotDrawer\(false\)"[^>]*>[\s\S]*?<\/svg><\/button>/;
const match = html.match(oldBtnRegex);
if (!match) {
  console.error('Could not find old close button regex match!');
  process.exit(1);
}

console.log('Found old button:\n', match[0]);

const newBtnHtml = `<button type="button" id="btn-close-copilot-drawer" onclick="toggleCopilotDrawer(false)" class="text-slate-600 dark:text-emerald-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-800 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition cursor-pointer shrink-0" aria-label="Close Ask Green AI Copilot" title="Close Copilot Panel">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>`;

html = html.replace(oldBtnRegex, newBtnHtml);
console.log('✓ Replaced close button HTML');

// 2. Replace toggleCopilotDrawer function with bulletproof implementation
const oldFnRegex = /function toggleCopilotDrawer\(forceState\)[\s\S]*?if \(!drawer\.classList\.contains\('hidden'\)\) \{[\s\S]*?setTimeout\(\(\) => input\.focus\(\), 150\);[\s\S]*?\}[\s\S]*?\}/;

const newToggleFn = `function toggleCopilotDrawer(forceState) {
      if (forceState !== false && !isSessionAuthenticated()) {
        toggleLoginPortalModal(true);
        showToast('Please sign in as Factory Manager or Factory Owner first.', 'info');
        return;
      }
      const drawer = document.getElementById('copilot-drawer');
      const backdrop = document.getElementById('mobile-copilot-backdrop');
      if (!drawer) return;

      // Determine current visibility state
      const isCurrentlyOpen = (drawer.style.display !== 'none' && !drawer.classList.contains('hidden') && !drawer.classList.contains('!hidden'));
      const shouldOpen = (forceState === true) ? true : (forceState === false) ? false : !isCurrentlyOpen;

      if (shouldOpen) {
        // OPEN DRAWER (Works seamlessly on PC, Laptop, Tablet & Phone)
        drawer.style.display = 'flex';
        drawer.classList.remove('hidden', '!hidden');
        if (window.innerWidth < 1280) {
          if (backdrop) backdrop.classList.remove('hidden');
        }
        renderCopilotDrawerContent();
        const input = document.getElementById('copilot-input');
        if (input) setTimeout(() => input.focus(), 150);
      } else {
        // CLOSE DRAWER (100% Guaranteed to close on PC, Laptop, Tablet & Phone)
        drawer.style.display = 'none';
        drawer.classList.add('hidden', '!hidden');
        if (backdrop) backdrop.classList.add('hidden');
      }
    }`;

if (oldFnRegex.test(html)) {
  html = html.replace(oldFnRegex, newToggleFn);
  console.log('✓ Replaced toggleCopilotDrawer function');
} else {
  console.error('Could not find old toggleCopilotDrawer regex!');
  process.exit(1);
}

// 3. Update askCopilotDirect and runCopilotAutoDemo to call toggleCopilotDrawer(true)
html = html.replace(
  `function askCopilotDirect(queryText) {
      if (!queryText) return;
      const drawer = document.getElementById('copilot-drawer');
      if (drawer && drawer.classList.contains('hidden')) {
        drawer.classList.remove('hidden');
      }
      submitCopilotQuestion(queryText);
    }`,
  `function askCopilotDirect(queryText) {
      if (!queryText) return;
      toggleCopilotDrawer(true);
      submitCopilotQuestion(queryText);
    }`
);

html = html.replace(
  `function runCopilotAutoDemo() {
      const drawer = document.getElementById('copilot-drawer');
      if (drawer && drawer.classList.contains('hidden')) {
        drawer.classList.remove('hidden');
      }
      const demoPrompts = [`,
  `function runCopilotAutoDemo() {
      toggleCopilotDrawer(true);
      const demoPrompts = [`
);

// 4. In window.onload, ensure initial display is set properly according to viewport
if (!html.includes('syncInitialCopilotDrawerState')) {
  const initSyncCode = `
      // Sync Copilot drawer visibility: visible on desktop (>=1280px), closed on mobile/tablet (<1280px)
      function syncInitialCopilotDrawerState() {
        const drawer = document.getElementById('copilot-drawer');
        const backdrop = document.getElementById('mobile-copilot-backdrop');
        if (!drawer) return;
        if (window.innerWidth < 1280) {
          drawer.style.display = 'none';
          drawer.classList.add('hidden', '!hidden');
          if (backdrop) backdrop.classList.add('hidden');
        } else {
          drawer.style.display = 'flex';
          drawer.classList.remove('hidden', '!hidden');
          if (backdrop) backdrop.classList.add('hidden');
        }
      }
      syncInitialCopilotDrawerState();
  `;

  html = html.replace('updateHeaderProfileUI();', `updateHeaderProfileUI();\n${initSyncCode}`);
  console.log('✓ Injected syncInitialCopilotDrawerState into window.onload');
}

fs.writeFileSync('preview/index.html', html, 'utf8');
console.log('Successfully updated preview/index.html with bulletproof cross button fix!');
