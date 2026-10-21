const fs = require('fs');

let html = fs.readFileSync('preview/index.html', 'utf8');

// 1. Remove any leftover HTML comment in header about Sign Out
html = html.replace('<!-- Direct 1-Click Sign Out Button in Header -->', '');

// 2. Enhance openUserProfileModal with role-isolation and premium UI
const oldProfileFnMatch = html.match(/function openUserProfileModal\(\) \{[\s\S]*?bodyHtml: `[\s\S]*?`\s*\}\);\s*\}/);

const newProfileFn = `function openUserProfileModal() {
      if (!isSessionAuthenticated()) {
        toggleLoginPortalModal(true);
        return;
      }
      const u = AppState.currentUser;
      const initials = u.initials || u.name.split(' ').map(p => p[0]).join('').substring(0, 2).toUpperCase();
      const avatarContent = u.avatarUrl
        ? \`<img src="\${u.avatarUrl}" alt="\${u.name}" class="w-full h-full object-cover rounded-full" />\`
        : \`<span>\${initials}</span>\`;

      const isMgr = u.role.includes('Manager');

      // Strict role-based isolation: When Manager logs in, ONLY show Manager. When Owner/Admin logs in, ONLY show Owner/Admin.
      const roleClearanceHtml = isMgr ? \`
        <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Operator Clearance</div>
          <div class="flex items-center gap-2 mt-1.5">
            <div class="w-full px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white flex items-center justify-between shadow-xs">
              <span class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                <span>Factory Manager (Operational Control)</span>
              </span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/20 text-white font-bold">LEVEL-4 ACTIVE</span>
            </div>
          </div>
          <div class="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Session locked strictly to Factory Manager role</span>
          </div>
        </div>
      \` : \`
        <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Operator Clearance</div>
          <div class="flex items-center gap-2 mt-1.5">
            <div class="w-full px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between shadow-xs">
              <span class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-amber-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <span>Factory Owner &amp; Executive Admin</span>
              </span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/20 text-white font-bold">LEVEL-5 ROOT</span>
            </div>
          </div>
          <div class="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Session locked strictly to Factory Owner / Admin role</span>
          </div>
        </div>
      \`;

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
            <!-- Main Operator Card -->
            <div class="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-emerald-500/30 shadow-xs">
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

                <!-- Prominent Red Sign Out Button inside Profile Card -->
                <div class="pt-2">
                  <button type="button" onclick="closeAppModal(); handleSignOut();" class="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs shadow-md shadow-rose-900/20 transition flex items-center justify-center gap-2">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                    <span>Sign Out &amp; Lock Platform</span>
                    <span class="ml-2 px-2 py-0.5 rounded bg-black/25 text-[10px] font-mono">CTRL + L</span>
                  </button>
                </div>

                <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                  <button type="button" onclick="triggerProfilePhotoInput()" class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    <span>Upload Profile Photo</span>
                  </button>
                  <button type="button" onclick="removeProfilePhoto()" class="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 font-semibold text-xs transition flex items-center gap-1">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    <span>Reset Photo</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Security Gate & Role Clearance Cards (Strict Role Isolation: Manager only shows Manager, Owner only shows Owner) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Security Gate</div>
                <div class="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1">
                  <span>🔒</span><span>Password + Passkey Verified</span>
                </div>
                <div class="text-[10px] text-slate-500 mt-0.5">Only Manager &amp; Owner roles permitted</div>
              </div>
              \${roleClearanceHtml}
            </div>
          </div>
        \`
      });
    }`;

if (oldProfileFnMatch) {
  html = html.replace(oldProfileFnMatch[0], newProfileFn);
}

fs.writeFileSync('preview/index.html', html, 'utf8');
console.log('✓ preview/index.html updated with role-isolation profile modal!');
