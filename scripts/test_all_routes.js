const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('preview/index.html', 'utf8');
const scriptStart = html.lastIndexOf('<script>');
const scriptEnd = html.lastIndexOf('</script>');
const scriptContent = html.substring(scriptStart + 8, scriptEnd);

const domMocks = {
  document: {
    documentElement: { classList: { contains: () => false } },
    getElementById: (id) => {
      return {
        innerHTML: '',
        textContent: '',
        classList: { add: () => {}, remove: () => {}, contains: () => false },
        setAttribute: () => {},
        style: {}
      };
    },
    querySelectorAll: () => []
  },
  window: {
    location: { hash: '' },
    addEventListener: () => {},
    sessionStorage: { getItem: () => 'true' }
  },
  sessionStorage: { getItem: () => 'true' },
  console: console
};

const context = vm.createContext(domMocks);
vm.runInContext(scriptContent, context);

console.log('VALID_ROUTES:', context.VALID_ROUTES);

// Test rendering for each route
for (const route of context.VALID_ROUTES) {
  try {
    context.AppState.activeRoute = route;
    const m = context.getDerivedMetrics();
    console.log(`Testing route: ${route}`);
    let viewHtml = '';
    switch (route) {
      case 'dashboard': viewHtml = context.renderDashboardView(m); break;
      case 'energy-analytics': viewHtml = context.renderEnergyAnalyticsView(m); break;
      case 'factory-operations': viewHtml = context.renderFactoryOperationsView(m); break;
      case 'bill-carbon-forecast': viewHtml = context.renderBillCarbonForecastView(m); break;
      case 'ai-recommendations': viewHtml = context.renderAiRecommendationsView(m); break;
      case 'savings-tracker': viewHtml = context.renderSavingsTrackerView(m); break;
      case 'carboniq-report': viewHtml = context.renderCarbonIqReportView(m); break;
      case 'sustainability-reports': viewHtml = context.renderSustainabilityReportsView(m); break;
      case 'machine-monitoring': viewHtml = context.renderMachineMonitoringView(m); break;
      case 'digital-twin': viewHtml = context.renderDigitalTwinView(m); break;
      case 'inventory-production': viewHtml = context.renderInventoryProductionView(m); break;
      case 'simulation-control': viewHtml = context.renderSimulationControlView(m); break;
      case 'settings': viewHtml = context.renderSettingsView(m); break;
      case 'agent-console': viewHtml = context.renderAgentConsoleView(m); break;
      default: console.log(`No explicit renderer for ${route}`); break;
    }
    console.log(`✓ Route ${route} rendered ${viewHtml ? viewHtml.length : 0} bytes`);
  } catch (err) {
    console.error(`✗ Route ${route} ERROR:`, err);
  }
}
