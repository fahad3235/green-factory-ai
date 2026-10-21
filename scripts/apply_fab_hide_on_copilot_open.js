const fs = require('fs');

let html = fs.readFileSync('preview/index.html', 'utf8');

// 1. Update toggleCopilotDrawer to hide/show floating-ai-launcher
const oldToggleFn = `function toggleCopilotDrawer(forceState) {
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

const newToggleFn = `function toggleCopilotDrawer(forceState) {
      if (forceState !== false && !isSessionAuthenticated()) {
        toggleLoginPortalModal(true);
        showToast('Please sign in as Factory Manager or Factory Owner first.', 'info');
        return;
      }
      const drawer = document.getElementById('copilot-drawer');
      const backdrop = document.getElementById('mobile-copilot-backdrop');
      const floatingLauncher = document.getElementById('floating-ai-launcher');
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
        // HIDE FLOATING AI WIDGET SO IT NEVER OVERLAPS THE CHAT INPUT
        if (floatingLauncher) {
          floatingLauncher.style.setProperty('display', 'none', 'important');
          floatingLauncher.classList.add('hidden', '!hidden');
        }
        renderCopilotDrawerContent();
        const input = document.getElementById('copilot-input');
        if (input) setTimeout(() => input.focus(), 150);
      } else {
        // CLOSE DRAWER (100% Guaranteed to close on PC, Laptop, Tablet & Phone)
        drawer.style.display = 'none';
        drawer.classList.add('hidden', '!hidden');
        if (backdrop) backdrop.classList.add('hidden');
        // RESTORE FLOATING AI WIDGET WHEN DRAWER IS CLOSED
        if (floatingLauncher) {
          floatingLauncher.style.removeProperty('display');
          floatingLauncher.style.display = 'flex';
          floatingLauncher.classList.remove('hidden', '!hidden');
        }
      }
    }`;

if (html.includes(oldToggleFn)) {
  html = html.replace(oldToggleFn, newToggleFn);
  console.log('✓ Successfully updated toggleCopilotDrawer to hide floating-ai-launcher when open');
} else {
  console.error('Could not find oldToggleFn in preview/index.html');
  process.exit(1);
}

// 2. Update syncInitialCopilotDrawerState
const oldSyncCode = `// Sync Copilot drawer visibility: visible on desktop (>=1280px), closed on mobile/tablet (<1280px)
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
      syncInitialCopilotDrawerState();`;

const newSyncCode = `// Sync Copilot drawer & floating launcher visibility
      function syncInitialCopilotDrawerState() {
        const drawer = document.getElementById('copilot-drawer');
        const backdrop = document.getElementById('mobile-copilot-backdrop');
        const floatingLauncher = document.getElementById('floating-ai-launcher');
        if (!drawer) return;
        if (window.innerWidth < 1280) {
          drawer.style.display = 'none';
          drawer.classList.add('hidden', '!hidden');
          if (backdrop) backdrop.classList.add('hidden');
          // On mobile, drawer is closed, so floating launcher is available
          if (floatingLauncher) {
            floatingLauncher.style.removeProperty('display');
            floatingLauncher.style.display = 'flex';
            floatingLauncher.classList.remove('hidden', '!hidden');
          }
        } else {
          // On desktop, drawer starts open, so hide floating launcher to prevent input overlap
          drawer.style.display = 'flex';
          drawer.classList.remove('hidden', '!hidden');
          if (backdrop) backdrop.classList.add('hidden');
          if (floatingLauncher) {
            floatingLauncher.style.setProperty('display', 'none', 'important');
            floatingLauncher.classList.add('hidden', '!hidden');
          }
        }
      }
      syncInitialCopilotDrawerState();`;

if (html.includes(oldSyncCode)) {
  html = html.replace(oldSyncCode, newSyncCode);
  console.log('✓ Successfully updated syncInitialCopilotDrawerState');
} else {
  console.error('Could not find oldSyncCode in preview/index.html');
  process.exit(1);
}

// 3. Also update the initial class of #floating-ai-launcher in HTML:
// On desktop (xl:), since the drawer starts open, the floating launcher should be xl:hidden by default!
// When the drawer is closed, JS dynamically shows it.
html = html.replace(
  'id="floating-ai-launcher" class="fixed bottom-20 md:bottom-5 right-4 md:right-5 z-25 flex items-center print:hidden"',
  'id="floating-ai-launcher" class="fixed bottom-20 md:bottom-5 right-4 md:right-5 z-25 flex xl:hidden items-center print:hidden"'
);
console.log('✓ Updated initial class of floating-ai-launcher to xl:hidden (visible on mobile, hidden on desktop when drawer open)');

fs.writeFileSync('preview/index.html', html, 'utf8');
console.log('All changes written to preview/index.html successfully!');
