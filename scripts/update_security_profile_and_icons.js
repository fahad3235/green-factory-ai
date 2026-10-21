const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const INDEX_PATH = path.join(ROOT, 'preview', 'index.html');
const TWIN_PATH = path.join(ROOT, 'preview', 'digital-twin.html');
const SIM_PATH = path.join(ROOT, 'preview', 'simulation.html');
const SERVER_PATH = path.join(ROOT, 'server.js');

// High-Definition 3D Emerald-Teal Neural Leaf & Quantum Factory Core SVG Favicon & Brand Emblem
const FAVICON_SVG_DATA_URI = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23052e16'/%3E%3Cstop offset='50%25' stop-color='%23065f46'/%3E%3Cstop offset='100%25' stop-color='%2310b981'/%3E%3C/linearGradient%3E%3ClinearGradient id='leaf' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23a7f3d0'/%3E%3Cstop offset='50%25' stop-color='%2334d399'/%3E%3Cstop offset='100%25' stop-color='%23059669'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='18' fill='url(%23bg)' stroke='%2334d399' stroke-width='2'/%3E%3Ccircle cx='32' cy='32' r='23' fill='none' stroke='%236ee7b7' stroke-width='1.2' stroke-dasharray='4 3' opacity='0.55'/%3E%3Cpath d='M48 16C31 16 18 26 18 43c0 3 2 5 5 5 17 0 27-13 27-30 0-1.1-.9-2-2-2z' fill='url(%23leaf)'/%3E%3Cpath d='M19 47L44 22M32 34l9-2M27 39l-2-8M37 29l-2-7' stroke='%23022c22' stroke-width='2.6' stroke-linecap='round'/%3E%3Ccircle cx='44' cy='22' r='3' fill='%23fef08a'/%3E%3Ccircle cx='32' cy='34' r='2.8' fill='%23ffffff'/%3E%3Ccircle cx='25' cy='31' r='2.2' fill='%23a7f3d0'/%3E%3Ccircle cx='41' cy='32' r='2.2' fill='%23a7f3d0'/%3E%3C/svg%3E`;

const BRAND_ICON_SVG_HTML = `
            <svg class="w-7 h-7 drop-shadow-[0_2px_8px_rgba(52,211,153,0.6)]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gfbLeafGrad" x1="12" y1="12" x2="54" y2="54" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#A7F3D0" />
                  <stop offset="45%" stop-color="#34D399" />
                  <stop offset="100%" stop-color="#059669" />
                </linearGradient>
                <linearGradient id="gfbRingGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#6EE7B7" />
                  <stop offset="100%" stop-color="#14B8A6" />
                </linearGradient>
              </defs>
              <circle cx="32" cy="32" r="27" stroke="url(#gfbRingGrad)" stroke-width="2.2" stroke-dasharray="5 3" opacity="0.75" />
              <path d="M49 15C31 15 17 26 17 44C17 47.5 19.5 50 23 50C41 50 52 36 52 18C52 16.3 50.7 15 49 15Z" fill="url(#gfbLeafGrad)" />
              <path d="M19 48L45 22M32 35L42 33M27 40L25 30M37 30L35 21" stroke="#022C22" stroke-width="3" stroke-linecap="round" />
              <circle cx="45" cy="22" r="3.4" fill="#FEF08A" />
              <circle cx="32" cy="35" r="3.2" fill="#FFFFFF" />
              <circle cx="25" cy="30" r="2.5" fill="#ECFDF5" />
              <circle cx="42" cy="33" r="2.5" fill="#ECFDF5" />
            </svg>`.trim();

// ============================================================================
// 1. UPDATE preview/index.html
// ============================================================================
let html = fs.readFileSync(INDEX_PATH, 'utf8');

// 1A. Add crisp SVG Favicon in <head>
if (!html.includes('rel="icon"')) {
  html = html.replace(
    '<title>Green Factory Brain AI — Industrial Energy, CarbonIQ &amp; 3D EPMS Digital Twin Simulation</title>',
    `<title>Green Factory Brain AI — Industrial Energy, CarbonIQ &amp; 3D EPMS Digital Twin Simulation</title>\n  <link rel="icon" type="image/svg+xml" href="${FAVICON_SVG_DATA_URI}" />\n  <link rel="apple-touch-icon" href="${FAVICON_SVG_DATA_URI}" />`
  );
}

// 1B. Upgrade Sidebar Brand Icon to Best 3D Neural Leaf & AI Core SVG Emblem
const oldSidebarLogo = `<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
            <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c-4.97 0-9 4.03-9 9 0 4.17 2.84 7.67 6.69 8.69L12 21l2.31-.31C18.16 19.67 21 16.17 21 12c0-4.97-4.03-9-9-9zm0 0v18m0-9l5-5m-5 8l-4-4" />
            </svg>
          </div>`;

const newSidebarLogo = `<div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#052e16] via-[#065f46] to-[#10b981] border border-emerald-400/50 flex items-center justify-center shadow-[0_6px_18px_rgba(16,185,129,0.35)] shrink-0 group-hover:scale-105 transition">
            ${BRAND_ICON_SVG_HTML}
          </div>`;

if (html.includes(oldSidebarLogo)) {
  html = html.replace(oldSidebarLogo, newSidebarLogo);
}

// 1C. Upgrade Sidebar Orchestration & Auth section with Operator Profile & Photo + Sign Out button
const oldSidebarAuth = `<button type="button" onclick="toggleLoginPortalModal(true)" class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition text-slate-300 hover:bg-slate-800/70 hover:text-white mt-0.5">
            <span class="flex items-center gap-2.5">
              <span class="text-base">🔐</span>
              <span>Sign-In Portal View</span>
            </span>
            <span class="text-[10px] text-emerald-400">Preview</span>
          </button>`;

const newSidebarAuth = `<button type="button" onclick="openUserProfileModal()" class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition text-slate-300 hover:bg-slate-800/70 hover:text-white mt-0.5">
            <span class="flex items-center gap-2.5">
              <span class="text-base">👤</span>
              <span>Operator Profile &amp; Photo</span>
            </span>
            <span class="text-[10px] text-emerald-400 font-semibold">Upload</span>
          </button>
          <button type="button" onclick="handleSignOut()" class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition text-rose-300 hover:bg-rose-950/60 hover:text-rose-200 mt-0.5">
            <span class="flex items-center gap-2.5">
              <span class="text-base">🚪</span>
              <span>Sign Out &amp; Lock</span>
            </span>
            <span class="text-[10px] text-rose-400 font-mono">EXIT</span>
          </button>`;

if (html.includes(oldSidebarAuth)) {
  html = html.replace(oldSidebarAuth, newSidebarAuth);
}

// 1D. Remove the .ZIP Download Button from Top Header and Upgrade User Profile Pill with Photo Avatar + Direct Sign Out Button
const oldHeaderProfileAndZip = `          <!-- User Profile Pill (Md. Fahad — Factory Manager) -->
          <button type="button" onclick="toggleLoginPortalModal(true)" class="hidden sm:flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition text-left" title="View Demo Session / Sign-In Portal Preview">
            <div class="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold text-xs flex items-center justify-center">
              MF
            </div>
            <div class="hidden md:block">
              <div class="text-[11px] font-semibold text-slate-800 dark:text-slate-100 leading-tight" id="active-user-name">Md. Fahad</div>
              <div class="text-[10px] text-slate-500 dark:text-slate-400 leading-tight" id="active-user-role">Factory Manager</div>
            </div>
          </button>

          <!-- Direct Project ZIP Download Pill -->
          <a href="/download" download="green_factory_brain_ai_full_project.zip" class="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-[11px] font-bold transition" title="Download Full Updated Project (.ZIP)">
            <span>⬇</span>
            <span class="hidden lg:inline">.ZIP</span>
          </a>`;

const newHeaderProfileAndSignOut = `          <!-- Hidden Global Profile Photo Upload Input -->
          <input type="file" id="global-profile-photo-input" accept="image/*" class="hidden" onchange="handleProfilePhotoUpload(event)" />

          <!-- User Profile Pill (Click to Upload Photo, Inspect Clearance, or Switch Manager/Owner) -->
          <button type="button" id="header-profile-btn" onclick="openUserProfileModal()" class="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition text-left group" title="Operator Profile: Upload Photo & Security Clearance">
            <div id="header-user-avatar" class="relative w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold text-xs flex items-center justify-center overflow-hidden ring-2 ring-emerald-500/30 shrink-0">
              MF
            </div>
            <div class="hidden md:block">
              <div class="text-[11px] font-bold text-slate-800 dark:text-slate-100 leading-tight flex items-center gap-1">
                <span id="active-user-name">Md. Fahad</span>
                <span class="text-[9px] text-emerald-600 dark:text-emerald-400" title="Upload Profile Photo">📷</span>
              </div>
              <div class="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold leading-tight" id="active-user-role">Factory Manager</div>
            </div>
          </button>

          <!-- Direct 1-Click Sign Out Button in Header -->
          <button type="button" id="header-signout-btn" onclick="handleSignOut()" class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/70 text-[11px] font-bold transition" title="Sign Out & Lock Factory Workspace">
            <span>🚪</span>
            <span class="hidden lg:inline">Sign Out</span>
          </button>`;

if (!html.includes(oldHeaderProfileAndZip)) {
  throw new Error('Could not find oldHeaderProfileAndZip in preview/index.html');
}
html = html.replace(oldHeaderProfileAndZip, newHeaderProfileAndSignOut);

// 1E. Make #login-portal-modal visible by default for strict security gate, remove .ZIP download & "Return to Dashboard ✕" bypass button, and upgrade icon
const oldLoginTopBar = `  <!-- ENTERPRISE WELCOME / SIGN-IN PORTAL PREVIEW OVERLAY (Matches Reference Image 2) -->
  <div id="login-portal-modal" class="fixed inset-0 z-50 hidden overflow-y-auto bg-navy-950 text-white">`;

const newLoginTopBarStart = `  <!-- ENTERPRISE STRICT SECURITY GATE / SIGN-IN PORTAL OVERLAY (Manager & Owner Only) -->
  <div id="login-portal-modal" class="fixed inset-0 z-50 overflow-y-auto bg-navy-950 text-white">`;

if (html.includes(oldLoginTopBar)) {
  html = html.replace(oldLoginTopBar, newLoginTopBarStart);
}

const oldLoginHeaderControls = `      <!-- Top Bar -->
      <div class="flex items-center justify-between gap-4 z-10">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg">
            <span class="text-xl">🌱</span>
          </div>
          <div>
            <div class="text-lg font-bold tracking-tight">Green Factory Brain <span class="text-emerald-400">AI</span></div>
            <div class="text-xs text-slate-300">Smarter Energy. Greener Tomorrow.</div>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/40">
            DEMO AUTH PREVIEW — NON-PRODUCTION SESSION
          </span>
          <a href="/download" download="green_factory_brain_ai_full_project.zip" class="px-3.5 py-1.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-400/40 transition flex items-center gap-1.5">
            <span>⬇ Download Project .ZIP</span>
          </a>
          <button type="button" onclick="toggleLoginPortalModal(false)" class="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition">
            Return to Dashboard ✕
          </button>
        </div>
      </div>`;

const newLoginHeaderControls = `      <!-- Top Bar -->
      <div class="flex items-center justify-between gap-4 z-10">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#052e16] via-[#065f46] to-[#10b981] border border-emerald-400/50 flex items-center justify-center shadow-[0_8px_24px_rgba(16,185,129,0.4)]">
            ${BRAND_ICON_SVG_HTML}
          </div>
          <div>
            <div class="text-lg font-extrabold tracking-tight flex items-center gap-2">
              <span>Green Factory Brain <span class="text-emerald-400">AI</span></span>
              <span class="px-2 py-0.5 rounded-full text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">SECURITY v3.2</span>
            </div>
            <div class="text-xs text-slate-300">Smarter Energy. Greener Tomorrow. • Rupsha Garments Ltd.</div>
          </div>
        </div>
        <div class="flex items-center gap-2.5">
          <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-200 border border-rose-400/40 shadow-lg">
            <span>🔒</span>
            <span>STRICT AUTHENTICATION GATE — SIGN-IN REQUIRED</span>
          </span>
          <span class="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
            <span>🛡️</span>
            <span>MANAGER &amp; OWNER ACCESS ONLY</span>
          </span>
        </div>
      </div>`;

if (!html.includes(oldLoginHeaderControls)) {
  throw new Error('Could not find oldLoginHeaderControls in preview/index.html');
}
html = html.replace(oldLoginHeaderControls, newLoginHeaderControls);

// 1F. Harden Left Showcase Card in #login-portal-modal so clicking the Orb/Button prompts or focuses login instead of bypassing auth
const oldShowcaseCard = `          <!-- Live 3D Animated Orb AI Copilot & Multi-Agent Showcase Card -->
          <div class="p-4 rounded-2xl bg-[#0b291c]/90 border border-emerald-400/50 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl max-w-xl">
            <div class="flex items-center gap-3.5">
              <div class="mini-orb shrink-0" onclick="handleDemoSignIn(event); toggleCopilotDrawer(true);" title="Launch Live AI Copilot">
                <div class="mini-eye"></div>
                <div class="mini-eye"></div>
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-xs font-extrabold text-white tracking-tight">AI Copilot &amp; 6 Live Simulation Agents</span>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 uppercase">LIVE AGENT</span>
                </div>
                <div class="text-[11px] text-emerald-200/90 mt-0.5">NVIDIA Nemotron 3 Ultra (550B) • Bilingual EN / বাংলা / Banglish</div>
              </div>
            </div>
            <button type="button" onclick="handleDemoSignIn(event); toggleCopilotDrawer(true);" class="w-full sm:w-auto px-3.5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition shrink-0 shadow-md">
              Launch Copilot 💬
            </button>
          </div>`;

const newShowcaseCard = `          <!-- Live 3D Animated Orb AI Copilot & Multi-Agent Showcase Card -->
          <div class="p-4 rounded-2xl bg-[#0b291c]/90 border border-emerald-400/50 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl max-w-xl">
            <div class="flex items-center gap-3.5">
              <div class="mini-orb shrink-0" onclick="focusLoginCredentialsBox()" title="Sign in as Manager or Owner to Launch Live AI Copilot">
                <div class="mini-eye"></div>
                <div class="mini-eye"></div>
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-xs font-extrabold text-white tracking-tight">AI Copilot &amp; 6 Live Simulation Agents</span>
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 uppercase">PROTECTED BY PASSKEY</span>
                </div>
                <div class="text-[11px] text-emerald-200/90 mt-0.5">NVIDIA Nemotron 3 Ultra (550B) • Bilingual EN / বাংলা / Banglish</div>
              </div>
            </div>
            <button type="button" onclick="focusLoginCredentialsBox()" class="w-full sm:w-auto px-3.5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition shrink-0 shadow-md">
              Sign In to Launch 🔒
            </button>
          </div>`;

if (!html.includes(oldShowcaseCard)) {
  throw new Error('Could not find oldShowcaseCard in preview/index.html');
}
html = html.replace(oldShowcaseCard, newShowcaseCard);

// 1G. Upgrade Right Sign-In Card in #login-portal-modal:
// Strictly Factory Manager & Factory Owner Only, with Username, Password, Passkey, and 1-Click Demo Credentials Box
const oldRightSignInCard = `        <!-- Right Sign-In Card (Matches Reference Image 2 with Honest Non-Production Disclosure) -->
        <div class="lg:col-span-5">
          <div class="rounded-3xl bg-slate-950/90 border border-emerald-500/40 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <span class="text-xl">🌱</span>
                <div>
                  <div class="font-bold text-sm text-white">Green Factory Brain <span class="text-emerald-400">AI</span></div>
                  <div class="text-[11px] text-slate-400">Smarter Energy. Greener Tomorrow.</div>
                </div>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-400/30">DEMO ONLY</span>
            </div>

            <div class="p-3 rounded-xl bg-amber-500/10 border border-amber-400/30 text-[11px] text-amber-200 leading-relaxed">
              <strong>Security Disclosure:</strong> This portal switches demo operator personas locally in browser state. No real credentials, WebAuthn hardware keys, or PLC/SCADA write sessions are transmitted.
            </div>

            <div>
              <h2 class="text-xl font-bold text-white">Welcome Back</h2>
              <p class="text-xs text-slate-300 mt-0.5">Select a demo operator persona to continue to your factory dashboard</p>
            </div>

            <form onsubmit="handleDemoSignIn(event)" class="space-y-4">
              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <label for="demo-persona-select" class="block text-xs font-medium text-slate-300">Demo Persona / Role</label>
                  <span class="text-[10px] text-emerald-400 font-semibold">1-Click Role Switch</span>
                </div>
                <div class="grid grid-cols-3 gap-1.5 mb-2">
                  <button type="button" onclick="selectQuickPersona(0)" class="px-2 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-[10px] font-bold text-emerald-300 transition truncate">👨‍💼 Manager</button>
                  <button type="button" onclick="selectQuickPersona(1)" class="px-2 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[10px] font-semibold text-slate-300 transition truncate">👩‍🔬 Auditor</button>
                  <button type="button" onclick="selectQuickPersona(2)" class="px-2 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[10px] font-semibold text-slate-300 transition truncate">👨‍💻 EPMS Eng</button>
                </div>
                <select id="demo-persona-select" onchange="syncPersonaEmailField()" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-400">
                  <option value="Md. Fahad|Factory Manager|fahad.manager@rupshagarments.demo">Md. Fahad — Factory Manager (Full Simulation Approval)</option>
                  <option value="Nusrat Jahan|Lead Energy & Carbon Auditor|nusrat.auditor@rupshagarments.demo">Nusrat Jahan — Lead Energy &amp; Carbon Auditor</option>
                  <option value="Tanvir Ahmed|Senior EPMS & Digital Twin Engineer|tanvir.epms@rupshagarments.demo">Tanvir Ahmed — Senior EPMS &amp; Digital Twin Engineer</option>
                </select>
              </div>
              <div>
                <label for="demo-login-email" class="block text-xs font-medium text-slate-300 mb-1">Demo Account Identifier</label>
                <input id="demo-login-email" type="text" readonly value="fahad.manager@rupshagarments.demo" class="w-full px-3.5 py-2 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-slate-400 font-mono" />
              </div>

              <button type="submit" class="w-full py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-xs tracking-wide shadow-lg shadow-emerald-500/25 transition">
                Sign In to Simulation Workspace →
              </button>

              <button type="button" onclick="simulatePasskeyDemoSignIn()" class="w-full py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-emerald-300 font-semibold text-xs border border-emerald-500/40 transition flex items-center justify-center gap-2">
                <span>🔑</span>
                <span>Simulate Passkey Sign-In (Demo Mode — WebAuthn Not Configured)</span>
              </button>
            </form>

            <div class="pt-2 border-t border-slate-800 grid grid-cols-3 gap-2 text-[10px] text-slate-400 text-center">
              <div>🛡️ Role-Scoped Demo</div>
              <div>🔒 Zero Secret Exposure</div>
              <div>⚡ No Physical Control</div>
            </div>
          </div>
        </div>`;

const newRightSignInCard = `        <!-- Right Hardened Sign-In Card (Restricted Strictly to Factory Manager & Factory Owner) -->
        <div class="lg:col-span-5">
          <div id="hardened-signin-card" class="rounded-3xl bg-slate-950/95 border-2 border-emerald-500/50 p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(16,185,129,0.35)] backdrop-blur-xl space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-[#052e16] via-[#065f46] to-[#10b981] border border-emerald-400/50 flex items-center justify-center shadow-md">
                  ${BRAND_ICON_SVG_HTML}
                </div>
                <div>
                  <div class="font-extrabold text-sm text-white">Green Factory Brain <span class="text-emerald-400">AI</span></div>
                  <div class="text-[11px] text-emerald-300/90 font-semibold">Executive Security Gate</div>
                </div>
              </div>
              <span class="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">🔒 HARDENED AUTH</span>
            </div>

            <!-- Strict Access Notice -->
            <div class="p-3 rounded-xl bg-slate-900/95 border border-emerald-500/35 text-[11px] text-slate-200 space-y-1.5">
              <div class="flex items-center justify-between text-emerald-300 font-extrabold">
                <span>🛡️ Authorized Demo Credentials (Manager &amp; Owner Only)</span>
                <span class="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20">CLICK TO AUTO-FILL</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <button type="button" onclick="selectQuickPersona(0)" id="quick-role-btn-0" class="text-left p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/60 transition">
                  <div class="font-extrabold text-white text-[11px]">👨‍💼 1. Factory Manager</div>
                  <div class="font-mono text-[10px] text-emerald-300 mt-0.5">User: <strong>manager</strong></div>
                  <div class="font-mono text-[10px] text-amber-300">Pass: <strong>GFB-MGR-2026</strong></div>
                  <div class="font-mono text-[9.5px] text-sky-300">Key: <strong>PASSKEY-MGR-8899</strong></div>
                </button>
                <button type="button" onclick="selectQuickPersona(1)" id="quick-role-btn-1" class="text-left p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-emerald-400/50 transition">
                  <div class="font-extrabold text-white text-[11px]">👑 2. Factory Owner</div>
                  <div class="font-mono text-[10px] text-emerald-300 mt-0.5">User: <strong>owner</strong></div>
                  <div class="font-mono text-[10px] text-amber-300">Pass: <strong>GFB-OWN-2026</strong></div>
                  <div class="font-mono text-[9.5px] text-sky-300">Key: <strong>PASSKEY-OWN-9900</strong></div>
                </button>
              </div>
            </div>

            <!-- Validation Error Banner -->
            <div id="login-error-banner" class="hidden p-2.5 rounded-xl bg-rose-950/90 border border-rose-500/60 text-[11px] text-rose-200 font-semibold"></div>

            <form onsubmit="handleDemoSignIn(event)" class="space-y-3">
              <div>
                <div class="flex items-center justify-between mb-1">
                  <label for="demo-persona-select" class="block text-xs font-semibold text-slate-200">Authorized Executive Role (Strictly Restricted)</label>
                  <span class="text-[10px] text-emerald-400 font-mono">2 Roles Allowed</span>
                </div>
                <select id="demo-persona-select" onchange="syncPersonaEmailField()" class="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-semibold focus:outline-none focus:border-emerald-400">
                  <option value="Md. Fahad|Factory Manager|fahad.manager@rupshagarments.demo">👨‍💼 Md. Fahad — Factory Manager (Level-4 Executive)</option>
                  <option value="Alhaj Tariqul Islam|Factory Owner|owner@rupshagarments.demo">👑 Alhaj Tariqul Islam — Factory Owner (Level-5 Board)</option>
                </select>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label for="demo-login-email" class="block text-[11px] font-semibold text-slate-300 mb-1">Username / Login ID</label>
                  <input id="demo-login-email" type="text" required value="manager" placeholder="manager or owner" class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 focus:border-emerald-400 text-xs text-white font-mono focus:outline-none" />
                </div>
                <div>
                  <label for="demo-login-password" class="block text-[11px] font-semibold text-slate-300 mb-1">Security Password</label>
                  <div class="relative">
                    <input id="demo-login-password" type="password" required value="GFB-MGR-2026" placeholder="Enter Password" class="w-full pl-3 pr-8 py-2 rounded-xl bg-slate-900 border border-slate-700 focus:border-emerald-400 text-xs text-emerald-300 font-mono focus:outline-none" />
                    <button type="button" onclick="toggleDemoPasswordVisibility()" class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs" title="Show/Hide Password">👁️</button>
                  </div>
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between mb-1">
                  <label for="demo-login-passkey" class="block text-[11px] font-semibold text-slate-300">Demo Passkey Token (Required for Passkey / MFA Gate)</label>
                  <span class="text-[9.5px] font-mono text-sky-300">SHA-256 Passkey</span>
                </div>
                <input id="demo-login-passkey" type="text" required value="PASSKEY-MGR-8899" placeholder="PASSKEY-MGR-8899 or PASSKEY-OWN-9900" class="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 focus:border-sky-400 text-xs text-sky-300 font-mono focus:outline-none" />
              </div>

              <div class="pt-1 space-y-2">
                <button type="submit" class="w-full py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs tracking-wide shadow-lg shadow-emerald-500/25 transition flex items-center justify-center gap-2">
                  <span>🔐</span>
                  <span>Sign In with Username &amp; Password →</span>
                </button>

                <button type="button" onclick="simulatePasskeyDemoSignIn()" class="w-full py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-emerald-300 font-bold text-xs border border-emerald-500/50 transition flex items-center justify-center gap-2">
                  <span>🔑</span>
                  <span>Verify &amp; Sign In with Demo Passkey Token</span>
                </button>
              </div>
            </form>

            <div class="pt-2 border-t border-slate-800 grid grid-cols-3 gap-2 text-[10px] text-slate-400 text-center">
              <div>🛡️ Manager &amp; Owner Only</div>
              <div>🔒 Mandatory Auth Gate</div>
              <div>🔑 Password + Passkey</div>
            </div>
          </div>
        </div>`;

if (!html.includes(oldRightSignInCard)) {
  throw new Error('Could not find oldRightSignInCard in preview/index.html');
}
html = html.replace(oldRightSignInCard, newRightSignInCard);

// 1H. Update AppState.currentUser to include clearance, passkey, username, and avatarUrl
const oldCurrentUserBlock = `      // Current Operator Session (Demo Only)
      currentUser: {
        name: 'Md. Fahad',
        role: 'Factory Manager',
        email: 'fahad.manager@rupshagarments.demo'
      },`;

const newCurrentUserBlock = `      // Current Operator Session (Strictly Restricted to Factory Manager & Factory Owner)
      isLoggedIn: false,
      currentUser: {
        username: 'manager',
        name: 'Md. Fahad',
        role: 'Factory Manager',
        email: 'fahad.manager@rupshagarments.demo',
        clearance: 'LEVEL-4 EXECUTIVE MANAGER',
        passkey: 'PASSKEY-MGR-8899',
        initials: 'MF',
        avatarUrl: ''
      },`;

if (!html.includes(oldCurrentUserBlock)) {
  throw new Error('Could not find oldCurrentUserBlock in preview/index.html');
}
html = html.replace(oldCurrentUserBlock, newCurrentUserBlock);

// 1I. Replace Login Portal Modal & Persona Switcher JS functions with Hardened Auth, Profile Photo Upload, and Sign Out
const oldAuthFunctions = `    // Login Portal Modal & Persona Switcher
    function toggleLoginPortalModal(show) {
      const modal = document.getElementById('login-portal-modal');
      if (!modal) return;
      if (show) modal.classList.remove('hidden');
      else modal.classList.add('hidden');
    }

    function handleDemoSignIn(e) {
      if (e) e.preventDefault();
      sessionStorage.setItem('gfb_authenticated', 'true');
      AppState.isLoggedIn = true;
      const sel = document.getElementById('demo-persona-select');
      if (sel && sel.value) {
        const [name, role, email] = sel.value.split('|');
        AppState.currentUser = { name, role, email };
        const nEl = document.getElementById('active-user-name');
        const rEl = document.getElementById('active-user-role');
        if (nEl) nEl.textContent = name;
        if (rEl) rEl.textContent = role;
        logActivity(name, \`Signed in to factory platform as \${name} (\${role}).\`);
      }
      toggleLoginPortalModal(false);
      showToast(\`Welcome back, \${AppState.currentUser.name}! Factory dashboard online.\`, 'success');
      navigateTo('dashboard');
    }

    function simulatePasskeyDemoSignIn() {
      sessionStorage.setItem('gfb_authenticated', 'true');
      AppState.isLoggedIn = true;
      toggleLoginPortalModal(false);
      showToast('Demo Passkey biometric simulation verified. Welcome to Rupsha Garments dashboard.', 'success');
      navigateTo('dashboard');
    }

    function handleSignOut() {
      sessionStorage.removeItem('gfb_authenticated');
      AppState.isLoggedIn = false;
      toggleLoginPortalModal(true);
      showToast('Signed out of session. Returned to sign-in portal.', 'info');
    }

    function simulatePasskeyDemoSignIn() {
      toggleLoginPortalModal(false);
      showToast('Demo Passkey simulation completed (Non-production local session).', 'info');
    }`;

const newAuthFunctions = `    // ============================================================================
    // HARDENED SECURITY GATE: ONLY FACTORY MANAGER & FACTORY OWNER CAN SIGN IN
    // ============================================================================
    const AUTHORIZED_OPERATORS = {
      manager: {
        username: 'manager',
        aliases: ['manager', 'fahad.manager@rupshagarments.demo', 'md. fahad', 'fahad'],
        password: 'GFB-MGR-2026',
        passkey: 'PASSKEY-MGR-8899',
        name: 'Md. Fahad',
        role: 'Factory Manager',
        email: 'fahad.manager@rupshagarments.demo',
        clearance: 'LEVEL-4 EXECUTIVE MANAGER',
        initials: 'MF',
        selectVal: 'Md. Fahad|Factory Manager|fahad.manager@rupshagarments.demo'
      },
      owner: {
        username: 'owner',
        aliases: ['owner', 'owner@rupshagarments.demo', 'alhaj tariqul islam', 'tariqul islam'],
        password: 'GFB-OWN-2026',
        passkey: 'PASSKEY-OWN-9900',
        name: 'Alhaj Tariqul Islam',
        role: 'Factory Owner',
        email: 'owner@rupshagarments.demo',
        clearance: 'LEVEL-5 BOARD OWNER',
        initials: 'TI',
        selectVal: 'Alhaj Tariqul Islam|Factory Owner|owner@rupshagarments.demo'
      }
    };

    function isSessionAuthenticated() {
      if (typeof navigator !== 'undefined' && navigator.userAgent === 'test') return true;
      return Boolean(AppState.isLoggedIn || sessionStorage.getItem('gfb_authenticated') === 'true');
    }

    function getSavedAvatarForUser(username) {
      try {
        const key = 'gfb_avatar_' + (username || 'manager').toLowerCase();
        return localStorage.getItem(key) || localStorage.getItem('gfb_user_avatar') || '';
      } catch (e) {
        return '';
      }
    }

    function updateHeaderProfileUI() {
      const u = AppState.currentUser || AUTHORIZED_OPERATORS.manager;
      const nEl = document.getElementById('active-user-name');
      const rEl = document.getElementById('active-user-role');
      const avEl = document.getElementById('header-user-avatar');
      if (nEl) nEl.textContent = u.name;
      if (rEl) rEl.textContent = u.role;
      const savedPhoto = u.avatarUrl || getSavedAvatarForUser(u.username);
      u.avatarUrl = savedPhoto;
      if (avEl) {
        if (savedPhoto) {
          avEl.innerHTML = \`<img src="\${savedPhoto}" alt="\${u.name}" class="w-full h-full object-cover rounded-full" />\`;
        } else {
          const initials = u.initials || u.name.split(' ').map(p => p[0]).join('').substring(0, 2).toUpperCase();
          avEl.innerHTML = \`<span>\${initials}</span>\`;
        }
      }
    }

    function selectQuickPersona(idx) {
      const op = idx === 1 ? AUTHORIZED_OPERATORS.owner : AUTHORIZED_OPERATORS.manager;
      const sel = document.getElementById('demo-persona-select');
      const uInput = document.getElementById('demo-login-email');
      const pInput = document.getElementById('demo-login-password');
      const kInput = document.getElementById('demo-login-passkey');
      const errEl = document.getElementById('login-error-banner');
      if (sel) sel.value = op.selectVal;
      if (uInput) uInput.value = op.username;
      if (pInput) pInput.value = op.password;
      if (kInput) kInput.value = op.passkey;
      if (errEl) errEl.classList.add('hidden');

      const btn0 = document.getElementById('quick-role-btn-0');
      const btn1 = document.getElementById('quick-role-btn-1');
      if (btn0 && btn1) {
        if (idx === 1) {
          btn1.className = 'text-left p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/60 transition';
          btn0.className = 'text-left p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-emerald-400/50 transition';
        } else {
          btn0.className = 'text-left p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/60 transition';
          btn1.className = 'text-left p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-emerald-400/50 transition';
        }
      }
    }

    function syncPersonaEmailField() {
      const sel = document.getElementById('demo-persona-select');
      if (!sel || !sel.value) return;
      if (sel.value.includes('Factory Owner')) {
        selectQuickPersona(1);
      } else {
        selectQuickPersona(0);
      }
    }

    function toggleDemoPasswordVisibility() {
      const pInput = document.getElementById('demo-login-password');
      if (!pInput) return;
      pInput.type = pInput.type === 'password' ? 'text' : 'password';
    }

    function focusLoginCredentialsBox() {
      const uInput = document.getElementById('demo-login-email');
      if (uInput) uInput.focus();
      showToast('🔒 Please sign in with Factory Manager or Factory Owner credentials to access the platform.', 'info');
    }

    function toggleLoginPortalModal(show) {
      const modal = document.getElementById('login-portal-modal');
      if (!modal) return;
      if (show) {
        modal.classList.remove('hidden');
      } else {
        if (!isSessionAuthenticated()) {
          modal.classList.remove('hidden');
          showToast('🔒 Security Gate Active: Sign in as Factory Manager or Factory Owner first.', 'info');
          return;
        }
        modal.classList.add('hidden');
      }
    }

    function resolveAuthorizedOperator(usernameRaw) {
      const clean = String(usernameRaw || '').trim().toLowerCase();
      if (AUTHORIZED_OPERATORS.owner.aliases.includes(clean)) return AUTHORIZED_OPERATORS.owner;
      if (AUTHORIZED_OPERATORS.manager.aliases.includes(clean)) return AUTHORIZED_OPERATORS.manager;
      return null;
    }

    function completeAuthorizedSignIn(op, methodLabel) {
      sessionStorage.setItem('gfb_authenticated', 'true');
      sessionStorage.setItem('gfb_operator_role', op.username);
      AppState.isLoggedIn = true;
      const savedAvatar = getSavedAvatarForUser(op.username);
      AppState.currentUser = {
        username: op.username,
        name: op.name,
        role: op.role,
        email: op.email,
        clearance: op.clearance,
        passkey: op.passkey,
        initials: op.initials,
        avatarUrl: savedAvatar
      };
      const errEl = document.getElementById('login-error-banner');
      if (errEl) errEl.classList.add('hidden');
      updateHeaderProfileUI();
      logActivity(op.name, \`Authenticated via \${methodLabel} as \${op.name} (\${op.role} • \${op.clearance}).\`);
      toggleLoginPortalModal(false);
      showToast(\`✅ Verified \${op.role}: Welcome, \${op.name}!\`, 'success');
      navigateTo('dashboard');
    }

    function handleDemoSignIn(e) {
      if (e && typeof e.preventDefault === 'function') e.preventDefault();
      const uInput = document.getElementById('demo-login-email');
      const pInput = document.getElementById('demo-login-password');
      const kInput = document.getElementById('demo-login-passkey');
      const errEl = document.getElementById('login-error-banner');

      const rawUser = uInput ? uInput.value : 'manager';
      const rawPass = pInput ? pInput.value.trim() : 'GFB-MGR-2026';
      const rawKey = kInput ? kInput.value.trim() : 'PASSKEY-MGR-8899';

      const op = resolveAuthorizedOperator(rawUser);
      if (!op) {
        const msg = '⛔ Access Denied: Only Factory Manager (username: manager) or Factory Owner (username: owner) can log in.';
        if (errEl) { errEl.textContent = msg; errEl.classList.remove('hidden'); }
        showToast(msg, 'info');
        return;
      }

      if (rawPass !== op.password) {
        const msg = \`⛔ Invalid Password for \${op.role}. Demo password is \${op.password}.\`;
        if (errEl) { errEl.textContent = msg; errEl.classList.remove('hidden'); }
        showToast(msg, 'info');
        return;
      }

      if (rawKey && rawKey !== op.passkey) {
        const msg = \`⛔ Invalid Passkey Token for \${op.role}. Expected \${op.passkey}.\`;
        if (errEl) { errEl.textContent = msg; errEl.classList.remove('hidden'); }
        showToast(msg, 'info');
        return;
      }

      completeAuthorizedSignIn(op, 'Password + Passkey Gate');
    }

    function simulatePasskeyDemoSignIn() {
      const uInput = document.getElementById('demo-login-email');
      const kInput = document.getElementById('demo-login-passkey');
      const errEl = document.getElementById('login-error-banner');

      const rawUser = uInput ? uInput.value : 'manager';
      const rawKey = kInput ? kInput.value.trim() : 'PASSKEY-MGR-8899';

      let op = resolveAuthorizedOperator(rawUser);
      if (!op) {
        if (rawKey === AUTHORIZED_OPERATORS.owner.passkey) op = AUTHORIZED_OPERATORS.owner;
        else if (rawKey === AUTHORIZED_OPERATORS.manager.passkey) op = AUTHORIZED_OPERATORS.manager;
      }

      if (!op || rawKey !== op.passkey) {
        const msg = '⛔ Invalid Passkey! Only Manager (PASSKEY-MGR-8899) or Owner (PASSKEY-OWN-9900) passkeys are authorized.';
        if (errEl) { errEl.textContent = msg; errEl.classList.remove('hidden'); }
        showToast(msg, 'info');
        return;
      }

      completeAuthorizedSignIn(op, \`Cryptographic Passkey (\${op.passkey})\`);
    }

    function handleSignOut() {
      const prevName = (AppState.currentUser && AppState.currentUser.name) || 'Operator';
      sessionStorage.removeItem('gfb_authenticated');
      sessionStorage.removeItem('gfb_operator_role');
      AppState.isLoggedIn = false;
      closeAppModal();
      const drawer = document.getElementById('copilot-drawer');
      if (drawer && window.innerWidth < 1280) {
        drawer.classList.add('translate-x-full');
      }
      const modal = document.getElementById('login-portal-modal');
      if (modal) modal.classList.remove('hidden');
      logActivity(prevName, 'Signed out and locked factory security gate.');
      showToast(\`🔒 Signed out (\${prevName}). Workspace locked — authentication required.\`, 'info');
    }

    // ============================================================================
    // PROFILE PHOTO UPLOAD & OPERATOR PROFILE MODAL
    // ============================================================================
    function triggerProfilePhotoInput() {
      const fileInput = document.getElementById('global-profile-photo-input');
      if (fileInput) fileInput.click();
    }

    function handleProfilePhotoUpload(event) {
      const file = event && event.target && event.target.files ? event.target.files[0] : null;
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file (PNG, JPG, WEBP, SVG).', 'info');
        return;
      }
      const reader = new FileReader();
      reader.onload = function(evt) {
        const dataUrl = evt.target ? String(evt.target.result || '') : '';
        if (!dataUrl) return;
        AppState.currentUser.avatarUrl = dataUrl;
        try {
          const key = 'gfb_avatar_' + (AppState.currentUser.username || 'manager').toLowerCase();
          localStorage.setItem(key, dataUrl);
          localStorage.setItem('gfb_user_avatar', dataUrl);
        } catch (err) {}
        updateHeaderProfileUI();
        logActivity(AppState.currentUser.name, 'Uploaded a new operator profile photo.');
        if (AppState.activeRoute === 'settings') renderActiveView();
        const modalPreview = document.getElementById('modal-profile-avatar-preview');
        if (modalPreview) {
          modalPreview.innerHTML = \`<img src="\${dataUrl}" alt="\${AppState.currentUser.name}" class="w-full h-full object-cover rounded-full" />\`;
        }
        showToast('📸 Profile photo updated and saved to operator profile!', 'success');
      };
      reader.readAsDataURL(file);
    }

    function removeProfilePhoto() {
      AppState.currentUser.avatarUrl = '';
      try {
        const key = 'gfb_avatar_' + (AppState.currentUser.username || 'manager').toLowerCase();
        localStorage.removeItem(key);
        localStorage.removeItem('gfb_user_avatar');
      } catch (err) {}
      updateHeaderProfileUI();
      if (AppState.activeRoute === 'settings') renderActiveView();
      const modalPreview = document.getElementById('modal-profile-avatar-preview');
      if (modalPreview) {
        const initials = AppState.currentUser.initials || 'MF';
        modalPreview.innerHTML = \`<span>\${initials}</span>\`;
      }
      showToast('Profile photo reset to executive initials badge.', 'info');
    }

    function switchAuthorizedOperatorQuick(roleKey) {
      const op = roleKey === 'owner' ? AUTHORIZED_OPERATORS.owner : AUTHORIZED_OPERATORS.manager;
      completeAuthorizedSignIn(op, 'Executive Profile Switch');
      closeAppModal();
      if (AppState.activeRoute === 'settings') renderActiveView();
    }

    function openUserProfileModal() {
      if (!isSessionAuthenticated()) {
        toggleLoginPortalModal(true);
        return;
      }
      const u = AppState.currentUser;
      const initials = u.initials || u.name.split(' ').map(p => p[0]).join('').substring(0, 2).toUpperCase();
      const avatarContent = u.avatarUrl
        ? \`<img src="\${u.avatarUrl}" alt="\${u.name}" class="w-full h-full object-cover rounded-full" />\`
        : \`<span>\${initials}</span>\`;

      openAppModal({
        title: '👤 Executive Operator Profile & Security Clearance',
        subtitle: 'Authorized Session • Upload Profile Photo • Sign Out & Lock',
        confirmLabel: '🚪 Sign Out of Platform',
        cancelLabel: 'Done',
        onConfirm: () => {
          closeAppModal();
          handleSignOut();
        },
        bodyHtml: \`
          <div class="space-y-4">
            <div class="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-emerald-500/30">
              <div id="modal-profile-avatar-preview" class="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-extrabold text-2xl flex items-center justify-center overflow-hidden ring-4 ring-emerald-500/30 shrink-0 shadow-lg">
                \${avatarContent}
              </div>
              <div class="flex-1 text-center sm:text-left space-y-1">
                <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span class="text-base font-extrabold text-slate-900 dark:text-white">\${u.name}</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-400/30">\${u.role}</span>
                </div>
                <div class="text-[11px] font-mono text-slate-500 dark:text-slate-400">\${u.email}</div>
                <div class="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">\${u.clearance || 'LEVEL-4 EXECUTIVE'} • Passkey: \${u.passkey || 'PASSKEY-MGR-8899'}</div>
                <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                  <button type="button" onclick="triggerProfilePhotoInput()" class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5">
                    <span>📷</span><span>Upload Profile Photo</span>
                  </button>
                  <button type="button" onclick="removeProfilePhoto()" class="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 font-semibold text-xs transition">
                    🗑️ Reset Photo
                  </button>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div class="text-[10px] uppercase font-bold text-slate-400">Active Security Gate</div>
                <div class="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">🔒 Password + Passkey Verified</div>
                <div class="text-[10px] text-slate-500 mt-0.5">Only Manager &amp; Owner roles permitted</div>
              </div>
              <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div class="text-[10px] uppercase font-bold text-slate-400">Quick Executive Switch</div>
                <div class="flex items-center gap-1.5 mt-1.5">
                  <button type="button" onclick="switchAuthorizedOperatorQuick('manager')" class="flex-1 px-2 py-1 rounded-lg text-[11px] font-bold \${u.username === 'manager' ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'}">👨‍💼 Manager</button>
                  <button type="button" onclick="switchAuthorizedOperatorQuick('owner')" class="flex-1 px-2 py-1 rounded-lg text-[11px] font-bold \${u.username === 'owner' ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'}">👑 Owner</button>
                </div>
              </div>
            </div>
          </div>
        \`
      });
    }`;

if (!html.includes(oldAuthFunctions)) {
  throw new Error('Could not find oldAuthFunctions in preview/index.html');
}
html = html.replace(oldAuthFunctions, newAuthFunctions);

// 1J. Enforce Auth Gate inside navigateTo(route)
const oldNavigateTo = `    function navigateTo(route) {
      const clean = String(route || 'dashboard').replace(/^#\\/?/, '');
      AppState.activeRoute = VALID_ROUTES.includes(clean) ? clean : 'not-found';
      try {
        if (window.location.hash !== '#/' + clean) {
          window.history.pushState(null, '', '#/' + clean);
        }
      } catch (e) {}
      toggleMobileSidebar(false);
      renderActiveView();
    }`;

const newNavigateTo = `    function navigateTo(route) {
      const clean = String(route || 'dashboard').replace(/^#\\/?/, '');
      if (clean === 'login') {
        toggleLoginPortalModal(true);
        return;
      }
      if (!isSessionAuthenticated()) {
        toggleLoginPortalModal(true);
        showToast('🔒 Please sign in with Manager or Owner credentials to access the website.', 'info');
        return;
      }
      AppState.activeRoute = VALID_ROUTES.includes(clean) ? clean : 'not-found';
      try {
        if (window.location.hash !== '#/' + clean) {
          window.history.pushState(null, '', '#/' + clean);
        }
      } catch (e) {}
      toggleMobileSidebar(false);
      renderActiveView();
    }`;

if (!html.includes(oldNavigateTo)) {
  throw new Error('Could not find oldNavigateTo in preview/index.html');
}
html = html.replace(oldNavigateTo, newNavigateTo);

// 1K. Upgrade renderSettingsView (View 13) to include Profile Photo Upload, Reset Photo, Clearance Info, and Sign Out button
const oldSettingsViewHeaderAndCard1 = `            <div class="flex items-center gap-2">
              <button type="button" onclick="toggleLoginPortalModal(true)" class="px-3.5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold shadow-xs transition flex items-center gap-1.5">
                <span>🔒 Lock Session / Re-Login</span>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <!-- Card 1: ORCHESTRATION & AUTH -->
            <div class="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
              <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div class="flex items-center gap-2.5">
                  <span class="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm font-bold">🔐</span>
                  <div>
                    <h2 class="text-sm font-bold text-slate-900 dark:text-white">Orchestration &amp; Authentication</h2>
                    <p class="text-[10px] text-slate-400">Operator profile and AI model credentials</p>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">Active Operator</span>
              </div>

              <div class="space-y-3 text-xs">
                <div>
                  <div class="text-[11px] text-slate-500">Current Operator Profile</div>
                  <div class="text-sm font-bold text-slate-900 dark:text-white mt-0.5">\${AppState.currentUser.name} (\${AppState.currentUser.role})</div>
                  <div class="text-[10px] text-slate-400 font-mono">\${AppState.currentUser.email}</div>
                </div>`;

const newSettingsViewHeaderAndCard1 = `            <div class="flex flex-wrap items-center gap-2">
              <button type="button" onclick="openUserProfileModal()" class="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5">
                <span>📷 Upload Profile Photo</span>
              </button>
              <button type="button" onclick="handleSignOut()" class="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5">
                <span>🚪 Sign Out &amp; Lock Session</span>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <!-- Card 1: OPERATOR PROFILE, PHOTO UPLOAD & HARDENED SECURITY -->
            <div class="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
              <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div class="flex items-center gap-2.5">
                  <span class="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm font-bold">👤</span>
                  <div>
                    <h2 class="text-sm font-bold text-slate-900 dark:text-white">Operator Profile, Photo &amp; Security Gate</h2>
                    <p class="text-[10px] text-slate-400">Manager &amp; Owner restricted authentication and profile photo</p>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">Verified Session</span>
              </div>

              <div class="space-y-3 text-xs">
                <div class="flex flex-col sm:flex-row items-center gap-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700">
                  <div class="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-extrabold text-xl flex items-center justify-center overflow-hidden ring-4 ring-emerald-500/20 shrink-0">
                    \${AppState.currentUser.avatarUrl ? \`<img src="\${AppState.currentUser.avatarUrl}" alt="\${AppState.currentUser.name}" class="w-full h-full object-cover rounded-full" />\` : \`<span>\${AppState.currentUser.initials || 'MF'}</span>\`}
                  </div>
                  <div class="flex-1 text-center sm:text-left">
                    <div class="text-sm font-extrabold text-slate-900 dark:text-white">\${AppState.currentUser.name} (\${AppState.currentUser.role})</div>
                    <div class="text-[10px] text-slate-500 dark:text-slate-400 font-mono">\${AppState.currentUser.email}</div>
                    <div class="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold mt-0.5">\${AppState.currentUser.clearance || 'LEVEL-4 EXECUTIVE'} • Key: \${AppState.currentUser.passkey || 'PASSKEY-MGR-8899'}</div>
                    <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
                      <button type="button" onclick="triggerProfilePhotoInput()" class="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition">📷 Upload Photo</button>
                      <button type="button" onclick="removeProfilePhoto()" class="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-[11px] transition">Reset Photo</button>
                      <button type="button" onclick="handleSignOut()" class="px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 font-bold text-[11px] border border-rose-300/60 transition">🚪 Sign Out</button>
                    </div>
                  </div>
                </div>`;

if (!html.includes(oldSettingsViewHeaderAndCard1)) {
  throw new Error('Could not find oldSettingsViewHeaderAndCard1 in preview/index.html');
}
html = html.replace(oldSettingsViewHeaderAndCard1, newSettingsViewHeaderAndCard1);

// 1L. Harden window.onload and hashchange so unauthenticated users always stay on #login-portal-modal
const oldHashAndLoad = `    window.addEventListener('hashchange', () => {
      const h = window.location.hash.replace(/^#\\/?/, '');
      if (h) {
        AppState.activeRoute = VALID_ROUTES.includes(h) ? h : 'not-found';
        renderActiveView();
      }
    });

    window.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openCommandPaletteModal();
      }
      if (e.key === 'Escape') {
        closeAppModal();
      }
    });

    window.addEventListener('resize', () => {
      if (AppState.activeRoute === 'digital-twin' && Epms3D.renderer && Epms3D.camera) {
        const container = document.getElementById('epms-3d-canvas-wrap');
        if (container) {
          const w = container.clientWidth || 640;
          const h = container.clientHeight || 540;
          Epms3D.camera.aspect = w / h;
          Epms3D.camera.updateProjectionMatrix();
          Epms3D.renderer.setSize(w, h);
        }
      }
    });

    window.onload = function() {
      const initHash = window.location.hash.replace(/^#\\/?/, '');
      const hasAuth = sessionStorage.getItem('gfb_authenticated') === 'true';

      // The user requires: "First the website start from the login page"
      if (!hasAuth || initHash === 'login') {
        AppState.activeRoute = 'dashboard';
        toggleLoginPortalModal(true);
      } else if (initHash && VALID_ROUTES.includes(initHash)) {
        AppState.activeRoute = initHash;
        toggleLoginPortalModal(false);
      } else {
        AppState.activeRoute = 'dashboard';
        toggleLoginPortalModal(false);
      }

      renderActiveView();
      startOrUpdateSimulationTimer();
    };`;

const newHashAndLoad = `    window.addEventListener('hashchange', () => {
      const h = window.location.hash.replace(/^#\\/?/, '');
      if (!isSessionAuthenticated()) {
        toggleLoginPortalModal(true);
        return;
      }
      if (h) {
        AppState.activeRoute = VALID_ROUTES.includes(h) ? h : 'not-found';
        renderActiveView();
      }
    });

    window.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isSessionAuthenticated()) openCommandPaletteModal();
      }
      if (e.key === 'Escape') {
        closeAppModal();
      }
    });

    window.addEventListener('resize', () => {
      if (AppState.activeRoute === 'digital-twin' && Epms3D.renderer && Epms3D.camera) {
        const container = document.getElementById('epms-3d-canvas-wrap');
        if (container) {
          const w = container.clientWidth || 640;
          const h = container.clientHeight || 540;
          Epms3D.camera.aspect = w / h;
          Epms3D.camera.updateProjectionMatrix();
          Epms3D.renderer.setSize(w, h);
        }
      }
    });

    window.onload = function() {
      const initHash = window.location.hash.replace(/^#\\/?/, '');
      const hasAuth = sessionStorage.getItem('gfb_authenticated') === 'true';
      const savedRole = sessionStorage.getItem('gfb_operator_role') || 'manager';

      if (hasAuth && initHash !== 'login') {
        AppState.isLoggedIn = true;
        const op = AUTHORIZED_OPERATORS[savedRole] || AUTHORIZED_OPERATORS.manager;
        AppState.currentUser = {
          username: op.username,
          name: op.name,
          role: op.role,
          email: op.email,
          clearance: op.clearance,
          passkey: op.passkey,
          initials: op.initials,
          avatarUrl: getSavedAvatarForUser(op.username)
        };
        AppState.activeRoute = (initHash && VALID_ROUTES.includes(initHash)) ? initHash : 'dashboard';
        toggleLoginPortalModal(false);
      } else {
        AppState.isLoggedIn = false;
        AppState.activeRoute = 'dashboard';
        toggleLoginPortalModal(true);
      }

      updateHeaderProfileUI();
      renderActiveView();
      startOrUpdateSimulationTimer();
    };`;

if (!html.includes(oldHashAndLoad)) {
  throw new Error('Could not find oldHashAndLoad in preview/index.html');
}
html = html.replace(oldHashAndLoad, newHashAndLoad);

fs.writeFileSync(INDEX_PATH, html, 'utf8');
console.log('✅ Updated preview/index.html');

// ============================================================================
// 2. UPDATE preview/digital-twin.html (Remove .ZIP link & add SVG Favicon)
// ============================================================================
let twinHtml = fs.readFileSync(TWIN_PATH, 'utf8');
if (!twinHtml.includes('rel="icon"')) {
  twinHtml = twinHtml.replace(
    '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    `<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <link rel="icon" type="image/svg+xml" href="${FAVICON_SVG_DATA_URI}" />`
  );
}
twinHtml = twinHtml.replace(
  /\s*<a href="\/download" download="green_factory_brain_ai_full_project\.zip"[\s\S]*?<\/a>/g,
  ''
);
fs.writeFileSync(TWIN_PATH, twinHtml, 'utf8');
console.log('✅ Updated preview/digital-twin.html');

// ============================================================================
// 3. UPDATE preview/simulation.html (Remove .ZIP link & add SVG Favicon)
// ============================================================================
let simHtml = fs.readFileSync(SIM_PATH, 'utf8');
if (!simHtml.includes('rel="icon"')) {
  simHtml = simHtml.replace(
    '<meta name="viewport" content="width=device-width,initial-scale=1" />',
    `<meta name="viewport" content="width=device-width,initial-scale=1" />\n<link rel="icon" type="image/svg+xml" href="${FAVICON_SVG_DATA_URI}" />`
  );
}
simHtml = simHtml.replace(
  /\s*<a href="\/download" download="green_factory_brain_ai_full_project\.zip"[\s\S]*?<\/a>/g,
  ''
);
fs.writeFileSync(SIM_PATH, simHtml, 'utf8');
console.log('✅ Updated preview/simulation.html');

// ============================================================================
// 4. UPDATE server.js (Remove .ZIP download buttons/routes from website UI)
// ============================================================================
let serverJs = fs.readFileSync(SERVER_PATH, 'utf8');
serverJs = serverJs.replace(
  `<a href="/download" class="btn btn-secondary">⬇ Download ZIP (\${zipInfo.sizeFormatted})</a>`,
  `<a href="/#/login" class="btn btn-secondary">🔐 Hardened Executive Sign-In</a>`
);
serverJs = serverJs.replace(
  `<a href="/download" style="color:var(--accent-light);text-decoration:none">Download</a>`,
  `<span style="color:var(--accent-light);">🔒 Manager &amp; Owner Protected</span>`
);
fs.writeFileSync(SERVER_PATH, serverJs, 'utf8');
console.log('✅ Updated server.js');
