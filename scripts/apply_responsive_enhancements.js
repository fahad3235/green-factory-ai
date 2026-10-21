const fs = require('fs');

console.log('Applying comprehensive UI/UX responsiveness enhancements across all devices...');

// ==========================================
// 1. UPDATE preview/index.html
// ==========================================
let indexHtml = fs.readFileSync('preview/index.html', 'utf8');

// A. Add Mobile Responsive CSS in <style>
const mobileCss = `
    /* Cross-Device Mobile & Tablet UI/UX Ergonomics */
    html {
      -webkit-text-size-adjust: 100%;
      text-size-adjust: 100%;
      touch-action: manipulation;
    }
    @supports (padding: max(0px)) {
      body {
        padding-top: env(safe-area-inset-top);
        padding-bottom: env(safe-area-inset-bottom);
        padding-left: env(safe-area-inset-left);
        padding-right: env(safe-area-inset-right);
      }
    }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    .mobile-nav-btn {
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }
    .mobile-nav-btn.mobile-nav-active {
      color: #34d399 !important;
      background: rgba(16, 185, 129, 0.14);
      border-radius: 12px;
    }
    .mobile-nav-btn.mobile-nav-active svg {
      stroke: #34d399;
      filter: drop-shadow(0 0 6px rgba(52, 211, 153, 0.6));
    }
    /* Touch target enlargement for mobile */
    @media (max-width: 768px) {
      button, a, select, input[type="range"] {
        min-height: 38px;
      }
      .touch-target {
        min-height: 44px;
        min-width: 44px;
      }
    }
`;

if (!indexHtml.includes('Cross-Device Mobile & Tablet UI/UX Ergonomics')) {
  indexHtml = indexHtml.replace('</style>', `${mobileCss}\n  </style>`);
  console.log('✓ Injected cross-device mobile/tablet CSS');
}

// B. Update <main id="main-viewport"> to have pb-24 on mobile so dock never covers content
indexHtml = indexHtml.replace(
  '<main id="main-viewport" class="flex-1 overflow-y-auto custom-scroll p-3 sm:p-5 space-y-5" tabindex="-1">',
  '<main id="main-viewport" class="flex-1 overflow-y-auto custom-scroll p-3 sm:p-5 space-y-5 pb-24 md:pb-6" tabindex="-1">'
);

// C. Fix #copilot-drawer initial classes from "fixed xl:static ... flex" to "hidden xl:flex fixed xl:static"
const oldDrawerTag = `<aside id="copilot-drawer" aria-label="Ask Green AI Copilot" class="fixed xl:static inset-y-0 right-0 z-40 w-full sm:w-[410px] xl:w-[395px] 2xl:w-[420px] bg-[#f4fbf7] dark:bg-slate-900/98 border-l-[1.5px] xl:border-[1.5px] border-[#b9e6c9] dark:border-emerald-500/35 xl:rounded-[26px] xl:my-2.5 xl:mr-2.5 flex flex-col justify-between shrink-0 transition-all duration-300 shadow-[0_14px_40px_-12px_rgba(22,163,74,0.22)] text-[#111827] dark:text-slate-100 overflow-hidden">`;
const newDrawerTag = `<aside id="copilot-drawer" aria-label="Ask Green AI Copilot" class="hidden xl:flex fixed xl:static inset-y-0 right-0 z-45 w-full sm:w-[420px] xl:w-[395px] 2xl:w-[420px] bg-[#f4fbf7] dark:bg-slate-900/98 border-l-[1.5px] xl:border-[1.5px] border-[#b9e6c9] dark:border-emerald-500/35 xl:rounded-[26px] xl:my-2.5 xl:mr-2.5 flex-col justify-between shrink-0 transition-all duration-300 shadow-[0_14px_40px_-12px_rgba(22,163,74,0.22)] text-[#111827] dark:text-slate-100 overflow-hidden">`;

if (indexHtml.includes(oldDrawerTag)) {
  indexHtml = indexHtml.replace(oldDrawerTag, newDrawerTag);
  console.log('✓ Updated copilot-drawer initial state to hidden xl:flex');
}

// D. Add #mobile-copilot-backdrop right before #copilot-drawer
if (!indexHtml.includes('id="mobile-copilot-backdrop"')) {
  indexHtml = indexHtml.replace(
    '<!-- 3. RIGHT EXPANDED WORKSPACE',
    `<!-- Mobile Copilot Drawer Backdrop -->\n    <div id="mobile-copilot-backdrop" onclick="toggleCopilotDrawer(false)" class="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 hidden xl:hidden"></div>\n\n    <!-- 3. RIGHT EXPANDED WORKSPACE`
  );
  console.log('✓ Added mobile-copilot-backdrop');
}

// E. Update toggleCopilotDrawer() to toggle backdrop
const oldToggleFn = `function toggleCopilotDrawer(forceState) {
      if (forceState !== false && !isSessionAuthenticated()) {
        toggleLoginPortalModal(true);
        showToast('Please sign in as Factory Manager or Factory Owner first.', 'info');
        return;
      }
      const drawer = document.getElementById('copilot-drawer');
      if (!drawer) return;
      if (forceState === true) {
        drawer.classList.remove('hidden');
      } else if (forceState === false) {
        drawer.classList.add('hidden');
      } else {
        drawer.classList.toggle('hidden');
      }
      if (!drawer.classList.contains('hidden')) {
        renderCopilotDrawerContent();
        const input = document.getElementById('copilot-input');
        if (input) setTimeout(() => input.focus(), 150);
      }
    }`;

const newToggleFn = `function toggleCopilotDrawer(forceState) {
      if (forceState !== false && !isSessionAuthenticated()) {
        toggleLoginPortalModal(true);
        showToast('Please sign in as Factory Manager or Factory Owner first.', 'info');
        return;
      }
      const drawer = document.getElementById('copilot-drawer');
      const backdrop = document.getElementById('mobile-copilot-backdrop');
      if (!drawer) return;
      if (forceState === true) {
        drawer.classList.remove('hidden');
        if (backdrop) backdrop.classList.remove('hidden');
      } else if (forceState === false) {
        drawer.classList.add('hidden');
        if (backdrop) backdrop.classList.add('hidden');
      } else {
        const isHidden = drawer.classList.toggle('hidden');
        if (backdrop) {
          if (isHidden) backdrop.classList.add('hidden');
          else backdrop.classList.remove('hidden');
        }
      }
      if (!drawer.classList.contains('hidden')) {
        renderCopilotDrawerContent();
        const input = document.getElementById('copilot-input');
        if (input) setTimeout(() => input.focus(), 150);
      }
    }`;

if (indexHtml.includes(oldToggleFn)) {
  indexHtml = indexHtml.replace(oldToggleFn, newToggleFn);
  console.log('✓ Updated toggleCopilotDrawer to sync with backdrop');
}

// F. Adjust floating-ai-launcher position on mobile to bottom-20 md:bottom-5
indexHtml = indexHtml.replace(
  'id="floating-ai-launcher" class="fixed bottom-5 right-5 z-30 flex items-center print:hidden"',
  'id="floating-ai-launcher" class="fixed bottom-20 md:bottom-5 right-4 md:right-5 z-25 flex items-center print:hidden"'
);

// G. Inject Mobile Bottom Navigation Dock right before </body>
const mobileDockHtml = `
  <!-- MOBILE BOTTOM NAVIGATION DOCK (Ergonomic Native App Dock for Phones & Foldables) -->
  <nav id="mobile-app-dock" aria-label="Mobile Bottom Navigation" class="fixed bottom-0 inset-x-0 h-16 bg-[#07111b]/95 dark:bg-[#060e17]/95 backdrop-blur-xl border-t border-emerald-500/30 z-30 flex items-center justify-around px-2 md:hidden shadow-[0_-8px_30px_rgba(0,0,0,0.6)] select-none">
    <!-- 1. Dashboard -->
    <button type="button" onclick="navigateTo('dashboard')" data-mobile-route="dashboard" class="mobile-nav-btn flex flex-col items-center justify-center gap-1 w-14 h-12 rounded-xl text-slate-400 hover:text-emerald-300 active:scale-95 transition-all" title="Factory Dashboard">
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      <span class="text-[9.5px] font-semibold leading-none">Home</span>
    </button>

    <!-- 2. 3D Twin -->
    <button type="button" onclick="navigateTo('digital-twin')" data-mobile-route="digital-twin" class="mobile-nav-btn flex flex-col items-center justify-center gap-1 w-14 h-12 rounded-xl text-slate-400 hover:text-emerald-300 active:scale-95 transition-all" title="3D Digital Twin">
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
      <span class="text-[9.5px] font-semibold leading-none">3D Twin</span>
    </button>

    <!-- 3. Elevated Ask AI Button (Thumb Zone Hero Action) -->
    <button type="button" onclick="toggleCopilotDrawer()" class="flex flex-col items-center justify-center -mt-5 group" aria-label="Ask Green AI Copilot">
      <div class="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 p-0.5 shadow-[0_0_20px_rgba(16,185,129,0.6)] group-hover:scale-105 active:scale-95 transition-all">
        <div class="w-full h-full rounded-full bg-[#061811] flex items-center justify-center">
          <div class="mini-orb" style="width:24px;height:24px;"><div class="mini-eye"></div><div class="mini-eye"></div></div>
        </div>
      </div>
      <span class="text-[9px] font-bold text-emerald-400 mt-1 leading-none">Ask AI</span>
    </button>

    <!-- 4. 6-Agent Console -->
    <button type="button" onclick="navigateTo('agent-console')" data-mobile-route="agent-console" class="mobile-nav-btn flex flex-col items-center justify-center gap-1 w-14 h-12 rounded-xl text-slate-400 hover:text-emerald-300 active:scale-95 transition-all" title="6-Agent Autonomous Console">
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="12" x="3" y="8" rx="2"/><path d="M12 2v6"/><circle cx="9" cy="14" r="1.5" fill="currentColor"/><circle cx="15" cy="14" r="1.5" fill="currentColor"/><path d="M8 18h8"/></svg>
      <span class="text-[9.5px] font-semibold leading-none">Agents</span>
    </button>

    <!-- 5. All Navigation Menu (Drawer Toggle) -->
    <button type="button" onclick="toggleMobileSidebar(true)" class="mobile-nav-btn flex flex-col items-center justify-center gap-1 w-14 h-12 rounded-xl text-slate-400 hover:text-emerald-300 active:scale-95 transition-all" aria-label="Open full factory navigation menu">
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
      <span class="text-[9.5px] font-semibold leading-none">Menu</span>
    </button>
  </nav>
`;

if (!indexHtml.includes('id="mobile-app-dock"')) {
  indexHtml = indexHtml.replace('</body>', `${mobileDockHtml}\n</body>`);
  console.log('✓ Injected mobile-app-dock');
}

// H. Update renderActiveView() to update mobile dock active state
const oldRenderActiveSlice = `// Update active nav button styling
      document.querySelectorAll('.nav-btn').forEach(btn => {
        const r = btn.getAttribute('data-route');
        if (r === AppState.activeRoute) {
          btn.classList.add('nav-item-active');
        } else {
          btn.classList.remove('nav-item-active');
        }
      });`;

const newRenderActiveSlice = `// Update active nav button styling (Desktop Sidebar)
      document.querySelectorAll('.nav-btn').forEach(btn => {
        const r = btn.getAttribute('data-route');
        if (r === AppState.activeRoute) {
          btn.classList.add('nav-item-active');
        } else {
          btn.classList.remove('nav-item-active');
        }
      });

      // Update active mobile dock button styling (Phones & Tablets)
      document.querySelectorAll('.mobile-nav-btn[data-mobile-route]').forEach(mbtn => {
        const mr = mbtn.getAttribute('data-mobile-route');
        if (mr === AppState.activeRoute) {
          mbtn.classList.add('mobile-nav-active');
        } else {
          mbtn.classList.remove('mobile-nav-active');
        }
      });`;

if (indexHtml.includes(oldRenderActiveSlice)) {
  indexHtml = indexHtml.replace(oldRenderActiveSlice, newRenderActiveSlice);
  console.log('✓ Updated renderActiveView to highlight mobile dock active tab');
}

fs.writeFileSync('preview/index.html', indexHtml, 'utf8');
console.log('Finished updating preview/index.html!');

// ==========================================
// 2. UPDATE preview/digital-twin.html
// ==========================================
let dtHtml = fs.readFileSync('preview/digital-twin.html', 'utf8');

// Hide long badge on mobile so header controls don't squish
dtHtml = dtHtml.replace(
  'class="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">ULTRA-HD 4K SHADOWS • 30 NPCs • NCP-01</span>',
  'class="hidden md:inline-block text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">ULTRA-HD 4K SHADOWS • 30 NPCs • NCP-01</span>'
);

// Add smooth touch scrolling class to header
dtHtml = dtHtml.replace(
  '<header class="absolute top-0 left-0 right-0 h-11 z-30 flex items-center justify-between px-2 bg-[#070c16]/95 border-b border-slate-800/90 gap-1.5 overflow-x-auto">',
  '<header class="absolute top-0 left-0 right-0 h-11 z-30 flex items-center justify-between px-2 bg-[#070c16]/95 border-b border-slate-800/90 gap-1.5 overflow-x-auto no-scrollbar py-0.5">'
);

// Add touch-action styles in digital twin
if (!dtHtml.includes('touch-action: manipulation;')) {
  dtHtml = dtHtml.replace('</style>', `
    button { touch-action: manipulation; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  </style>`);
}

fs.writeFileSync('preview/digital-twin.html', dtHtml, 'utf8');
console.log('Finished updating preview/digital-twin.html!');
