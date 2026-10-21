const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const t1 = `deptSharePct[k] = totalPeriodKwh > 0 ? ((deptKwh[k] / totalPeriodKwh) * 100.0) : 0;
      }

      return {`.replace(/\r\n/g, '\n');

const t2 = `AppState.simAvoidedKwh = (AppState.simAvoidedKwh || 0) + stepAvoidedKwh;
      AppState.simSavingsAccruedBdt = (AppState.simSavingsAccruedBdt || 0) + (stepAvoidedKwh * tariff);`.replace(/\r\n/g, '\n');

const t3 = '<!-- 4 Real-Time Carbon Credit Wallet Metric Cards -->';

const t4 = 'function mintTelemetryCarbonCredits() {';

const t5 = '<div id="sim-kpi-carbon"';

const t6 = "if (q.includes('credit') || q.includes('carbon credit') || q.includes('ক্রেডিট')";

console.log('Target 1 (getDerivedMetrics return):', html.indexOf(t1));
console.log('Target 2 (stepSimulationForward simAvoidedKwh):', html.indexOf(t2));
console.log('Target 3 (CarbonIQ panel metric cards):', html.indexOf(t3));
console.log('Target 4 (mintTelemetryCarbonCredits):', html.indexOf(t4));
console.log('Target 5 (Simulation KPI carbon card):', html.indexOf(t5));
console.log('Target 6 (Copilot prompt branch):', html.indexOf(t6));
