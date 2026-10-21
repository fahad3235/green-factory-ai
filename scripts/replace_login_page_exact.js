const fs = require('fs');

let html = fs.readFileSync('preview/index.html', 'utf8');

const startTag = '<div id="login-portal-modal"';
const startIdx = html.indexOf(startTag);
const endTag = '<!-- UNIVERSAL CONFIRMATION & INSPECTION MODAL -->';
const endIdx = html.indexOf(endTag, startIdx);

console.log('startIdx:', startIdx, 'endIdx:', endIdx);
if (startIdx === -1 || endIdx === -1) {
  throw new Error('Could not find start or end of login-portal-modal!');
}

const currentBlock = html.substring(startIdx, endIdx);
console.log('Current block length:', currentBlock.length);

// Extract the background image URL from the current block
let bgUrl = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600';
const bgMatch = currentBlock.match(/url\('([^']+)'\)/);
if (bgMatch) {
  bgUrl = bgMatch[1];
}

const newLoginPortal = `<div id="login-portal-modal" class="fixed inset-0 z-50 overflow-y-auto bg-[#040e14] text-white">
    <div class="min-h-screen w-full relative flex flex-col justify-between p-4 sm:p-8 lg:p-10 bg-cover bg-center" style="background-image: linear-gradient(135deg, rgba(3, 14, 20, 0.90) 0%, rgba(5, 25, 28, 0.74) 50%, rgba(3, 14, 20, 0.92) 100%), url('${bgUrl}');">
      
      <!-- Top Bar (Matches Exact User Screenshot) -->
      <div class="flex items-center justify-between gap-4 z-10 max-w-7xl mx-auto w-full">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#10b981] border border-emerald-400/60 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.35)] shrink-0">
            <svg class="w-6 h-6 text-emerald-300 drop-shadow-[0_2px_8px_rgba(52,211,153,0.8)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 20A7 7 0 0 1 4 13C4 9.5 7 4 13 3c5.5 0 8 2.5 8 8 0 5-4.5 9-10 9Z"/>
              <path d="M11 20c0-6 4-10 10-10"/>
            </svg>
          </div>
          <div>
            <div class="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
              <span>Green Factory Brain <span class="text-emerald-400">AI</span></span>
              <span class="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">SECURITY v3.2</span>
            </div>
            <div class="text-[11px] text-slate-300 font-medium">Smarter Factories. Greener Tomorrow.</div>
          </div>
        </div>
        <div class="flex items-center gap-2.5">
          <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#062024]/90 text-emerald-300 border border-emerald-500/50 shadow-sm">
            <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0110 0v4"></path></svg>
            <span>SECURE AUTHENTICATION GATE</span>
          </span>
          <span class="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#062024]/90 text-emerald-300 border border-emerald-500/50 shadow-sm">
            <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            <span>MANAGER &amp; OWNER ACCESS ONLY</span>
          </span>
        </div>
      </div>

      <!-- Main Showcase Grid (Matches Exact User Screenshot) -->
      <div class="my-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto w-full z-10">
        <!-- Left Showcase Column -->
        <div class="lg:col-span-7 space-y-5">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold tracking-wider uppercase shadow-xs">
            <span>🍃 AI POWERED SUSTAINABILITY PLATFORM</span>
          </div>

          <h1 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            Transforming Factories<br/>into a <span class="text-emerald-400">Greener Future</span> 🍃
          </h1>

          <p class="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Green Factory Brain AI helps garment factories reduce energy costs, minimize carbon emissions, and verify operational savings with deterministic simulation, transparent agent workflows, and an interactive 3D EPMS Digital Twin.
          </p>

          <!-- 4 Interactive Feature Cards Row (Matches Exact User Screenshot) -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 max-w-xl">
            <!-- Card 1: Energy Analytics -->
            <div class="p-3.5 rounded-2xl bg-[#071924]/90 border border-emerald-500/35 flex flex-col justify-between h-24 hover:border-emerald-400 transition group cursor-pointer shadow-md" onclick="focusLoginCredentialsBox()">
              <div class="w-8 h-8 rounded-full bg-[#052c24] border border-emerald-400/50 flex items-center justify-center text-emerald-400 shadow-xs">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <div class="flex items-end justify-between">
                <div class="text-[11px] font-bold text-white leading-tight">Real-time<br/><span class="text-slate-300 font-normal">Energy Analytics</span></div>
                <span class="text-xs text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition font-bold">→</span>
              </div>
            </div>

            <!-- Card 2: Carbon Tracking -->
            <div class="p-3.5 rounded-2xl bg-[#071924]/90 border border-emerald-500/35 flex flex-col justify-between h-24 hover:border-emerald-400 transition group cursor-pointer shadow-md" onclick="focusLoginCredentialsBox()">
              <div class="w-8 h-8 rounded-full bg-[#052c24] border border-emerald-400/50 flex items-center justify-center text-emerald-400 shadow-xs">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 20A7 7 0 0 1 4 13C4 9.5 7 4 13 3c5.5 0 8 2.5 8 8 0 5-4.5 9-10 9Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M11 20c0-6 4-10 10-10"/></svg>
              </div>
              <div class="flex items-end justify-between">
                <div class="text-[11px] font-bold text-white leading-tight">Carbon<br/><span class="text-slate-300 font-normal">Tracking</span></div>
                <span class="text-xs text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition font-bold">→</span>
              </div>
            </div>

            <!-- Card 3: AI Recommendations -->
            <div class="p-3.5 rounded-2xl bg-[#071924]/90 border border-emerald-500/35 flex flex-col justify-between h-24 hover:border-emerald-400 transition group cursor-pointer shadow-md" onclick="focusLoginCredentialsBox()">
              <div class="w-8 h-8 rounded-full bg-[#052c24] border border-emerald-400/50 flex items-center justify-center text-emerald-400 shadow-xs">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
              </div>
              <div class="flex items-end justify-between">
                <div class="text-[11px] font-bold text-white leading-tight">AI<br/><span class="text-slate-300 font-normal">Recommendations</span></div>
                <span class="text-xs text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition font-bold">→</span>
              </div>
            </div>

            <!-- Card 4: 3D EPMS Twin -->
            <div class="p-3.5 rounded-2xl bg-[#071924]/90 border border-emerald-500/35 flex flex-col justify-between h-24 hover:border-emerald-400 transition group cursor-pointer shadow-md" onclick="focusLoginCredentialsBox()">
              <div class="w-8 h-8 rounded-full bg-[#052c24] border border-emerald-400/50 flex items-center justify-center text-sky-400 shadow-xs">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/><circle cx="12" cy="11" r="1.5" fill="currentColor"/></svg>
              </div>
              <div class="flex items-end justify-between">
                <div class="text-[11px] font-bold text-white leading-tight">3D EPMS<br/><span class="text-slate-300 font-normal">Twin</span></div>
                <span class="text-xs text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition font-bold">→</span>
              </div>
            </div>
          </div>

          <!-- AI Copilot Showcase Banner (Matches Exact User Screenshot) -->
          <div class="p-4 rounded-2xl bg-[#071c18]/90 border border-emerald-500/40 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl max-w-xl">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-[#04281f] border border-emerald-400/60 flex items-center justify-center text-emerald-300 shrink-0 shadow-xs">
                <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="3" stroke-linecap="round" stroke-linejoin="round"></rect><circle cx="8.5" cy="16" r="1.5" fill="currentColor"></circle><circle cx="15.5" cy="16" r="1.5" fill="currentColor"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M12 2v4m0 0a2 2 0 100 4 2 2 0 000-4zM2 15h1m18 0h1"/></svg>
              </div>
              <div>
                <div class="text-xs font-bold text-white">AI Copilot &amp; Live Simulation Agents</div>
                <div class="text-[11px] text-slate-300 leading-snug">Your factory intelligence assistant is online. Ready to help with insights, recommendations and simulation scenarios.</div>
              </div>
            </div>
            <button type="button" onclick="focusLoginCredentialsBox()" class="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition shrink-0 flex items-center gap-1.5 shadow-md shadow-emerald-500/20">
              <span>💬</span>
              <span>Sign in to Launch</span>
              <span>→</span>
            </button>
          </div>

          <!-- HUD Telemetry Circular Dials (Matches Exact User Screenshot) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 max-w-xl">
            <!-- Dial 1 -->
            <div class="p-3.5 rounded-2xl bg-[#071924]/90 border border-emerald-500/35 flex items-center gap-4 shadow-lg">
              <div class="w-12 h-12 rounded-full border-2 border-emerald-400/80 flex items-center justify-center font-extrabold text-xs text-white shrink-0 shadow-inner">
                72%
              </div>
              <div>
                <div class="text-[10px] text-slate-400 font-semibold uppercase">Savings Plan Target</div>
                <div class="text-sm font-black text-white">↓ 12% Energy Use</div>
                <div class="text-[9.5px] text-amber-300 font-mono">SIMULATION METRIC</div>
              </div>
            </div>

            <!-- Dial 2 -->
            <div class="p-3.5 rounded-2xl bg-[#071924]/90 border border-emerald-500/35 flex items-center gap-4 shadow-lg">
              <div class="w-12 h-12 rounded-full border-2 border-teal-400/80 flex items-center justify-center font-extrabold text-xs text-white shrink-0 shadow-inner">
                CO₂e
              </div>
              <div>
                <div class="text-[10px] text-slate-400 font-semibold uppercase">Monthly Footprint</div>
                <div class="flex items-center gap-2">
                  <span class="text-sm font-black text-white">34.2 tCO₂e</span>
                  <span class="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">↓ 32%</span>
                </div>
                <div class="text-[9.5px] text-slate-400 font-mono">SCOPE 1 + SCOPE 2</div>
              </div>
            </div>
          </div>

          <!-- Left Footer Disclosures -->
          <div class="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80 max-w-xl">
            <div>Fictional Demo Facility: <strong class="text-slate-200">Rupsha Garments Ltd. (Gazipur, Bangladesh)</strong></div>
            <div class="text-emerald-400 flex items-center gap-1 font-medium"><span>🍃</span><span>Sustainable • Efficient • Intelligent</span></div>
          </div>
        </div>

        <!-- Right Hardened Sign-In Card (Matches Exact User Screenshot) -->
        <div class="lg:col-span-5">
          <div id="hardened-signin-card" class="rounded-3xl bg-[#06151f]/95 border-2 border-emerald-500/60 p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(16,185,129,0.2)] backdrop-blur-xl space-y-4">
            <!-- Card Header -->
            <div class="flex items-center justify-between pb-2 border-b border-slate-800">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#10b981] border border-emerald-400/50 flex items-center justify-center shadow-xs">
                  <svg class="w-5 h-5 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                  <div class="font-extrabold text-sm text-white">Green Factory Brain AI</div>
                  <div class="text-[10.5px] text-slate-400 font-medium">Executive Security Gate</div>
                </div>
              </div>
              <span class="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#062024] text-emerald-300 border border-emerald-400/40 flex items-center gap-1">
                <span>🔒</span>
                <span>SECURE ACCESS</span>
              </span>
            </div>

            <!-- Select Your Demo Role -->
            <div class="space-y-2">
              <div class="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Select Your Demo Role</div>
              
              <div class="grid grid-cols-2 gap-2.5">
                <!-- Card 1: Factory Manager (Active by default) -->
                <button type="button" id="persona-card-manager" onclick="selectQuickPersona(0)" class="p-3 rounded-2xl bg-[#092219] border-2 border-emerald-500 text-left transition relative shadow-sm group">
                  <div class="flex items-center justify-between mb-1.5">
                    <div class="w-7 h-7 rounded-full bg-emerald-950 border border-emerald-400/50 flex items-center justify-center text-emerald-300">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                    </div>
                    <span id="persona-check-manager" class="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[10px] font-black">✓</span>
                  </div>
                  <div class="text-xs font-black text-white">1. Factory Manager</div>
                  <div class="text-[9.5px] text-emerald-300/80 font-medium mt-0.5">Monitor • Operate • Optimize</div>
                  <div class="text-[10px] font-mono text-slate-400 mt-2 space-y-0.5">
                    <div>User: <span class="text-emerald-300 font-bold">manager_demo</span></div>
                    <div>Pass: <span class="text-slate-300">demo123</span></div>
                  </div>
                </button>

                <!-- Card 2: Factory Owner -->
                <button type="button" id="persona-card-owner" onclick="selectQuickPersona(1)" class="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-left transition relative group">
                  <div class="flex items-center justify-between mb-1.5">
                    <div class="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-300">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    </div>
                    <span id="persona-check-owner" class="hidden w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[10px] font-black">✓</span>
                  </div>
                  <div class="text-xs font-black text-white">2. Factory Owner</div>
                  <div class="text-[9.5px] text-slate-400 font-medium mt-0.5">Strategize • Grow • Lead</div>
                  <div class="text-[10px] font-mono text-slate-400 mt-2 space-y-0.5">
                    <div>User: <span class="text-slate-300 font-bold">owner_demo</span></div>
                    <div>Pass: <span class="text-slate-300">demo123</span></div>
                  </div>
                </button>
              </div>
            </div>

            <!-- Form Fields (Matches Exact User Screenshot) -->
            <form id="hardened-login-form" onsubmit="event.preventDefault(); simulatePasskeyDemoSignIn();" class="space-y-3 pt-1">
              <!-- Role Select -->
              <div>
                <label class="block text-[11px] font-semibold text-slate-300 mb-1">Role</label>
                <div class="relative">
                  <select id="demo-persona-select" onchange="syncRoleFromDropdown(this.value)" class="w-full pl-9 pr-8 py-2 rounded-xl bg-[#091a26] border border-slate-700 text-xs text-white appearance-none focus:outline-none focus:border-emerald-500">
                    <option value="manager_demo">Factory Manager</option>
                    <option value="owner_demo">Factory Owner</option>
                  </select>
                  <svg class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                  <svg class="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </div>
              </div>

              <!-- Username -->
              <div>
                <label class="block text-[11px] font-semibold text-slate-300 mb-1">Username</label>
                <div class="relative">
                  <input type="text" id="demo-login-email" value="manager_demo" placeholder="manager_demo" class="w-full pl-9 pr-3 py-2 rounded-xl bg-[#091a26] border border-slate-700 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-emerald-500" />
                  <svg class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                </div>
              </div>

              <!-- Password -->
              <div>
                <label class="block text-[11px] font-semibold text-slate-300 mb-1">Password</label>
                <div class="relative">
                  <input type="password" id="demo-login-password" value="demo123" placeholder="Enter your password" class="w-full pl-9 pr-10 py-2 rounded-xl bg-[#091a26] border border-slate-700 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-emerald-500" />
                  <svg class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0110 0v4"></path></svg>
                  <button type="button" onclick="togglePasswordVisibility()" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white" title="Toggle password visibility">👁️</button>
                </div>
              </div>

              <!-- Demo Token (Optional) -->
              <div>
                <label class="block text-[11px] font-semibold text-slate-300 mb-1">Demo Token <span class="text-slate-500 font-normal">(Optional)</span></label>
                <div class="relative">
                  <input type="text" id="demo-login-passkey" value="PASSKEY-MGR-8899" placeholder="Enter demo token (if provided)" class="w-full pl-9 pr-3 py-2 rounded-xl bg-[#091a26] border border-slate-700 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-emerald-500" />
                  <svg class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
                </div>
              </div>

              <!-- Primary Button: Sign In Securely -->
              <button type="submit" id="btn-login-submit" class="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:brightness-110 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 transition flex items-center justify-center gap-2">
                <svg class="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span>Sign In Securely</span>
                <span>→</span>
              </button>

              <!-- Secondary Button: Verify Demo Token -->
              <button type="button" onclick="verifyDemoTokenQuick()" class="w-full py-2 px-4 rounded-xl bg-[#091a26] hover:bg-[#0d2232] text-slate-300 font-semibold text-xs border border-slate-700 transition flex items-center justify-center gap-2">
                <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
                <span>Verify Demo Token</span>
              </button>
            </form>

            <!-- Footer Security Pills -->
            <div class="flex items-center justify-between text-[10px] text-slate-400 pt-3 border-t border-slate-800">
              <span>🛡️ Manager &amp; Owner Only</span>
              <span class="text-slate-700">|</span>
              <span>🛡️ Mandatory Auth Gate</span>
              <span class="text-slate-700">|</span>
              <span>🔒 Password + Passkey</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>\n\n  `;

html = html.substring(0, startIdx) + newLoginPortal + html.substring(endIdx);
fs.writeFileSync('preview/index.html', html, 'utf8');
console.log('✓ Successfully wrote new login page matching user screenshot into preview/index.html! New file size:', fs.statSync('preview/index.html').size);
