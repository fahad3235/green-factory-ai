const fs = require('fs');

let html = fs.readFileSync('preview/index.html', 'utf8');

// 1. Make sure factoryImgBase64 is declared globally
if (!html.includes('const factoryImgBase64 =')) {
  // Extract factory image from file
  const fIdx = html.indexOf('Factory Profile Card');
  let imgStart = -1;
  if (fIdx !== -1) {
    imgStart = html.indexOf('data:image/jpeg;base64,', fIdx);
  } else {
    imgStart = html.indexOf('data:image/jpeg;base64,');
  }
  const imgEnd = html.indexOf('"', imgStart);
  const base64Data = html.substring(imgStart, imgEnd);

  const insertTarget = 'const AppState = {';
  const decl = `const factoryImgBase64 = "${base64Data}";\n\n    `;
  html = html.replace(insertTarget, decl + insertTarget);
  console.log('✓ Declared factoryImgBase64 globally');
}

// 2. Add helper functions: setSimulationSpeed, promptResetSimulation, runIndividualAgent, runFullAgentWorkflow, openAdjustStockModal
const helperFunctionsCode = `
    function setSimulationSpeed(spd) {
      AppState.simSpeed = spd;
      startOrUpdateSimulationTimer();
      renderActiveView();
      showToast('Simulation engine speed set to ' + spd + 'x.', 'info');
    }

    function promptResetSimulation() {
      openAppModal({
        title: 'Reset Simulation to Factory Baseline?',
        subtitle: 'Revert all machine telemetry, accrued savings, and scenarios to Seed #20261018.',
        confirmText: 'Reset Simulation',
        cancelText: 'Cancel',
        onConfirm: () => {
          AppState.simTickCount = 0;
          AppState.simAvoidedKwh = 0;
          AppState.simSavingsAccruedBdt = 0;
          AppState.simWasteCostBdt = 0;
          AppState.activeScenario = 'baseline';
          AppState.fleet = createInitialFleet();
          AppState.fleetAvailabilityRealtime = 94.4;
          closeAppModal();
          renderActiveView();
          showToast('Simulation reset to factory baseline (Seed #20261018).', 'success');
        }
      });
    }

    function runIndividualAgent(agentId) {
      const ag = AppState.agents.find(a => a.id === agentId);
      if (!ag) return;
      ag.lastRunId = 'RUN-' + agentId.replace('AGT-', '') + '-' + (9050 + Math.floor(Math.random() * 40));
      ag.completedAt = new Date().toISOString().replace('T', ' ').substring(0, 19);
      ag.status = 'Completed';
      logActivity(ag.name, 'Manually executed ' + ag.lastRunId + ' across shared simulation state.');
      renderActiveView();
      showToast(ag.name + ' executed successfully (' + ag.lastRunId + ').', 'success');
    }

    function runFullAgentWorkflow() {
      const m = getDerivedMetrics();
      AppState.agents.forEach((ag, idx) => {
        ag.lastRunId = 'RUN-SEQ-' + (9100 + idx);
        ag.completedAt = new Date().toISOString().replace('T', ' ').substring(0, 19);
        if (ag.id !== 'AGT-RECOMMEND') ag.status = 'Completed';
      });
      logActivity('Agent Orchestrator', 'Executed full 6-agent sequential workflow.');
      renderActiveView();
      openAppModal({
        title: '6-Agent Sequential Workflow Executed',
        subtitle: 'All 6 Rule-Based Agents completed deterministic verification across ' + formatNum(m.totalPeriodKwh) + ' kWh shared state.',
        confirmText: 'Acknowledge',
        cancelText: '',
        onConfirm: () => closeAppModal()
      });
    }

    function openAdjustStockModal(skuId) {
      const item = AppState.inventoryItems.find(it => it.id === skuId);
      if (!item) return;
      openAppModal({
        title: 'Adjust Material Stock: ' + item.name,
        subtitle: 'Current Stock: ' + item.stockQty.toLocaleString() + ' ' + item.unit + ' (Reorder Threshold: ' + item.reorderThreshold.toLocaleString() + ')',
        confirmText: 'Save Stock Level',
        cancelText: 'Cancel',
        onConfirm: () => {
          const inp = document.getElementById('modal-stock-input');
          if (inp) {
            const val = Number(inp.value);
            if (!isNaN(val) && val >= 0) {
              item.stockQty = val;
              item.status = val < item.reorderThreshold * 0.5 ? 'Reorder Needed' : val < item.reorderThreshold ? 'Low Stock' : 'In Stock';
              logActivity(AppState.currentUser.name, 'Updated ' + item.id + ' stock to ' + val + ' ' + item.unit + '.');
              closeAppModal();
              renderActiveView();
              showToast('Updated ' + item.id + ' stock to ' + val + ' ' + item.unit + '.', 'success');
            }
          }
        }
      });
      setTimeout(() => {
        const body = document.getElementById('app-modal-body');
        if (body) {
          body.innerHTML = '<div class="space-y-3 pt-2 text-xs text-slate-600 dark:text-slate-300">' +
            '<div>Enter new quantity in <strong>' + item.unit + '</strong>:</div>' +
            '<input id="modal-stock-input" type="number" value="' + item.stockQty + '" class="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-mono font-bold text-slate-900 dark:text-white" />' +
            '<div class="text-[11px] text-slate-500">Threshold: ' + item.reorderThreshold + ' ' + item.unit + ' • Allocated to: ' + item.line + '</div>' +
          '</div>';
        }
      }, 20);
    }
`;

if (!html.includes('function setSimulationSpeed')) {
  const insertTarget = 'function renderActiveView() {';
  html = html.replace(insertTarget, helperFunctionsCode + '\n    ' + insertTarget);
  console.log('✓ Added helper functions');
}

fs.writeFileSync('preview/index.html', html, 'utf8');
console.log('Helpers and global image variable configured.');
