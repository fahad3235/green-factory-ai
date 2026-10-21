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
vm.runInContext(scriptContent + `
  console.log('Inside VM context:');
  console.log('VALID_ROUTES:', VALID_ROUTES);
  const m = getDerivedMetrics();

  for (const route of VALID_ROUTES) {
    try {
      AppState.activeRoute = route;
      let html = '';
      switch (route) {
        case 'dashboard': html = renderDashboardView(m); break;
        case 'energy-analytics': html = renderEnergyAnalyticsView(m); break;
        case 'factory-operations': html = renderFactoryOperationsView(m); break;
        case 'bill-carbon-forecast': html = renderBillCarbonForecastView(m); break;
        case 'ai-recommendations': html = renderAiRecommendationsView(m); break;
        case 'savings-tracker': html = renderSavingsTrackerView(m); break;
        case 'carboniq-report': html = renderCarbonIqReportView(m); break;
        case 'sustainability-reports': html = renderSustainabilityReportsView(m); break;
        case 'machine-monitoring': html = renderMachineMonitoringView(m); break;
        case 'digital-twin': html = renderDigitalTwinView(m); break;
        case 'inventory-production': html = renderInventoryProductionView(m); break;
        case 'simulation-control': html = renderSimulationControlView(m); break;
        case 'settings': html = renderSettingsView(m); break;
        case 'agent-console': html = renderAgentConsoleView(m); break;
        default: console.log('UNKNOWN ROUTE:', route); break;
      }
      console.log('✓ ' + route + ' rendered ' + (html ? html.length : 0) + ' bytes');
    } catch (e) {
      console.error('✗ ERROR IN ROUTE ' + route + ':', e.message);
    }
  }

  // Also test renderActiveView() for each route
  console.log('\n--- Testing renderActiveView() across all routes ---');
  for (const route of VALID_ROUTES) {
    try {
      AppState.activeRoute = route;
      renderActiveView();
      console.log('✓ renderActiveView for ' + route + ' SUCCESS');
    } catch (e) {
      console.error('✗ renderActiveView for ' + route + ' FAILED:', e.message, e.stack);
    }
  }
`, context);
