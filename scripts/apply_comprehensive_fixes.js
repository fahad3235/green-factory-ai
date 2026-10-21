const fs = require('fs');

let html = fs.readFileSync('preview/index.html', 'utf8');

// 1. Upgrade openAppModal to support confirmText & cancelText alongside confirmLabel & cancelLabel
const oldOpenAppModal = `    function openAppModal({ title, subtitle, bodyHtml, confirmLabel, onConfirm }) {
      const backdrop = document.getElementById('app-modal-backdrop');
      const tEl = document.getElementById('app-modal-title');
      const sEl = document.getElementById('app-modal-subtitle');
      const bEl = document.getElementById('app-modal-body');
      const fEl = document.getElementById('app-modal-footer');
      if (!backdrop || !tEl || !bEl || !fEl) return;

      tEl.textContent = title || 'Dialog';
      sEl.textContent = subtitle || 'Simulation Action Gate';
      bEl.innerHTML = bodyHtml || '';
      ModalConfirmCallback = onConfirm || null;

      fEl.innerHTML = \`
        <button type="button" onclick="closeAppModal()" class="px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">Close</button>
        \${confirmLabel ? \`<button type="button" onclick="triggerModalConfirm()" class="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs">\${confirmLabel}</button>\` : ''}
      \`;
      backdrop.classList.remove('hidden');
    }`;

const newOpenAppModal = `    function openAppModal({ title, subtitle, bodyHtml, confirmLabel, confirmText, cancelLabel, cancelText, onConfirm }) {
      const backdrop = document.getElementById('app-modal-backdrop');
      const tEl = document.getElementById('app-modal-title');
      const sEl = document.getElementById('app-modal-subtitle');
      const bEl = document.getElementById('app-modal-body');
      const fEl = document.getElementById('app-modal-footer');
      if (!backdrop || !tEl || !bEl || !fEl) return;

      tEl.textContent = title || 'Dialog';
      sEl.textContent = subtitle || 'Simulation Action Gate';
      bEl.innerHTML = bodyHtml || '';
      ModalConfirmCallback = onConfirm || null;

      const cBtnText = confirmLabel || confirmText;
      const cancelBtnText = cancelLabel || cancelText || 'Close';
      const showCancel = cancelText !== '' && cancelLabel !== '';

      fEl.innerHTML = \`
        \${showCancel ? \`<button type="button" onclick="closeAppModal()" class="px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">\${cancelBtnText}</button>\` : ''}
        \${cBtnText ? \`<button type="button" onclick="triggerModalConfirm()" class="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs">\${cBtnText}</button>\` : ''}
      \`;
      backdrop.classList.remove('hidden');
    }`;

if (html.includes(oldOpenAppModal)) {
  html = html.replace(oldOpenAppModal, newOpenAppModal);
  console.log('✓ Successfully upgraded openAppModal to handle confirmText & cancelText!');
} else {
  console.error('Could not find oldOpenAppModal block!');
}

// 2. Add exportInventoryCsv and downloadActivityAuditLogCsv and alias setLanguage
const insertTarget = '    function openAdjustStockModal(skuId) {';
const newHelperFuncs = `    function exportInventoryCsv() {
      const items = AppState.inventoryItems || [];
      const headers = ['SKU_ID', 'Material_Name', 'Category', 'Allocated_Line', 'Stock_Quantity', 'Unit', 'Reorder_Threshold', 'Status', 'Energy_Per_Unit_kWh'];
      const rows = items.map(it => [
        it.id || '',
        '"' + (it.name || '').replace(/"/g, '""') + '"',
        '"' + (it.category || '').replace(/"/g, '""') + '"',
        it.line || '',
        it.stockQty || 0,
        it.unit || '',
        it.reorderThreshold || 0,
        it.status || '',
        it.energyPerUnitKwh || 0
      ]);
      const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'inventory_stock_register_rupsha_garments_' + new Date().toISOString().slice(0, 10) + '.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Exported inventory stock register to CSV.', 'success');
    }

    function downloadActivityAuditLogCsv() {
      const logs = AppState.activityLog || [];
      const headers = ['Log_ID', 'Timestamp', 'Actor', 'Action_Description'];
      const rows = logs.map(l => [
        l.id || '',
        '"' + (l.timestamp || '').replace(/"/g, '""') + '"',
        '"' + (l.actor || '').replace(/"/g, '""') + '"',
        '"' + (l.action || '').replace(/"/g, '""') + '"'
      ]);
      const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'audit_activity_log_rupsha_garments_' + new Date().toISOString().slice(0, 10) + '.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Exported platform activity audit trail CSV.', 'success');
    }

    const setLanguage = setAppLanguage;

`;

if (!html.includes('function exportInventoryCsv')) {
  html = html.replace(insertTarget, newHelperFuncs + insertTarget);
  console.log('✓ Added exportInventoryCsv, downloadActivityAuditLogCsv, and setLanguage alias!');
}

// 3. Update setLanguage calls in Settings view to setAppLanguage
html = html.replace(
  `<button type="button" onclick="setLanguage('en')" class="px-2.5 py-1 rounded \${AppState.language === 'en' ? 'bg-emerald-700 text-white' : 'text-slate-600 dark:text-slate-300'}">English</button>`,
  `<button type="button" onclick="setAppLanguage('en')" class="px-2.5 py-1 rounded \${AppState.language === 'en' ? 'bg-emerald-700 text-white' : 'text-slate-600 dark:text-slate-300'}">English</button>`
);
html = html.replace(
  `<button type="button" onclick="setLanguage('bn')" class="px-2.5 py-1 rounded \${AppState.language === 'bn' ? 'bg-emerald-700 text-white' : 'text-slate-600 dark:text-slate-300'}">বাংলা</button>`,
  `<button type="button" onclick="setAppLanguage('bn')" class="px-2.5 py-1 rounded \${AppState.language === 'bn' ? 'bg-emerald-700 text-white' : 'text-slate-600 dark:text-slate-300'}">বাংলা</button>`
);

fs.writeFileSync('preview/index.html', html, 'utf8');
console.log('preview/index.html updated successfully with all comprehensive fixes!');
