const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('preview/index.html', 'utf8');

const scriptRegex = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi;
let combinedJs = '';
let match;
while ((match = scriptRegex.exec(html)) !== null) {
  combinedJs += match[1] + '\n;';
}

const sandbox = {
  console: console,
  tailwind: { config: {} },
  Chart: class { constructor() {} destroy() {} update() {} },
  document: {
    documentElement: { classList: { contains: () => true, toggle: () => true } },
    getElementById: (id) => ({
      id,
      innerHTML: '',
      value: '12.40',
      textContent: '',
      classList: { add: () => {}, remove: () => {}, toggle: () => true, contains: () => true },
      appendChild: () => {},
      removeChild: () => {},
      setAttribute: () => {},
      style: {},
      getContext: () => ({})
    }),
    querySelectorAll: () => [],
    createElement: (tag) => ({
      href: '',
      download: '',
      setAttribute: () => {},
      click: () => {},
      style: {}
    }),
    body: {
      appendChild: () => {},
      removeChild: () => {}
    },
    addEventListener: () => {}
  },
  window: {
    addEventListener: () => {},
    location: { hash: '' }
  },
  setInterval: () => 1,
  clearInterval: () => {},
  setTimeout: (fn) => typeof fn === 'function' && fn(),
  clearTimeout: () => {},
  navigator: { userAgent: 'test' },
  sessionStorage: {
    getItem: () => 'true',
    setItem: () => {},
    removeItem: () => {}
  },
  localStorage: {
    getItem: () => '',
    setItem: () => {},
    removeItem: () => {}
  },
  Blob: class {},
  URL: { createObjectURL: () => 'blob:mock', revokeObjectURL: () => {} }
};

sandbox.window.document = sandbox.document;
sandbox.global = sandbox;

vm.createContext(sandbox);
vm.runInContext(combinedJs, sandbox);

const funcsToTest = [
  'navigateTo',
  'toggleSimulationPlay',
  'stepSimulationForward',
  'setSimulationSpeed',
  'setDashboardChartPeriod',
  'setDashboardMachineFilter',
  'setForecastHorizon',
  'setAppLanguage',
  'toggleThemeMode',
  'toggleLoginPortalModal',
  'simulatePasskeyDemoSignIn',
  'selectQuickPersona',
  'openUserProfileModal',
  'removeProfilePhoto',
  'switchAuthorizedOperatorQuick',
  'handleSignOut',
  'toggleCopilotDrawer',
  'toggleCopilotLanguage',
  'askSuggestedPrompt',
  'openScenarioPickerModal',
  'openResetDemoModal',
  'openAlertsModal',
  'openCommandPaletteModal',
  'openPrintableReportModal',
  'openAddInventoryModal',
  'openAdjustStockModal',
  'openRecommendationModal',
  'closeAppModal',
  'triggerModalConfirm',
  'runFullAgentWorkflow',
  'runIndividualAgent',
  'exportFilteredEnergyCsv',
  'downloadCarbonIqReportCsv',
  'downloadReportItemCsv',
  'generateCustomSessionReport',
  'confirmAcknowledgeAlert',
  'updateTariffAssumption',
  'updateGridFactorAssumption',
  'updateRecommendationStatus',
  'applyRecommendationInSimulation',
  'promptRejectRecommendation',
  'promptMachineStateSim',
  'promptScenarioChange',
  'promptResetSimulation',
  'inspectMachineDetail',
  'toggleMachineSort',
  'setInventoryStatusFilter',
  'runComparableWindowVerificationModal'
];

console.log('Testing execution of all user-interactive functions...');
funcsToTest.forEach(fn => {
  try {
    vm.runInContext(`
      if (typeof ${fn} === 'function') {
        ${fn}('test-arg-1', 'test-arg-2');
        console.log('✓ PASS:', '${fn}');
      } else {
        console.log('❌ NOT DEFINED:', '${fn}');
      }
    `, sandbox);
  } catch (err) {
    console.error(`❌ ERROR in ${fn}:`, err.message);
  }
});
