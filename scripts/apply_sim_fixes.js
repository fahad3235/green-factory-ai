const fs = require('fs');
const path = require('path');

const indexPath = path.resolve('preview/index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// 1. Update stepSimulationForward to accumulate live savings and avoidable carbon
const oldStepSim = `    function stepSimulationForward(silent = false) {
      AppState.simTickCount += 1;
      const prng = createDeterministicPrng(AppState.simSeed + AppState.simTickCount);

      AppState.fleet.forEach(u => {
        if (u.status === 'Running') {
          const delta = (prng() - 0.48) * 0.35;
          u.currentKw = Math.max(1.5, Math.min(u.ratedKw * 1.05, Number((u.currentKw + delta).toFixed(2))));
          u.periodKwh = Math.round(u.periodKwh + u.currentKw * 0.05);
          u.tempC = Number((u.tempC + (prng() - 0.49) * 0.25).toFixed(1));
        }
      });

      const now = new Date();
      const pad = n => String(n).padStart(2, '0');
      AppState.lastUpdateTimestamp = \`Oct 18, \${pad(now.getHours())}:\${pad(now.getMinutes())}:\${pad(now.getSeconds())} BST\`;
      const clk = document.getElementById('last-update-clock');
      if (clk) clk.textContent = AppState.lastUpdateTimestamp;

      if (AppState.activeRoute !== 'digital-twin') {
        renderActiveView();
      } else {
        renderCopilotDrawerContent();
      }
      if (!silent) {
        showToast('Advanced simulation by +1 deterministic step (Tick #' + AppState.simTickCount + ').', 'info');
      }
    }`;

const newStepSim = `    function stepSimulationForward(silent = false) {
      AppState.simTickCount += 1;
      const prng = createDeterministicPrng(AppState.simSeed + AppState.simTickCount);

      let stepAvoidedKwh = 0;
      let stepWasteKwh = 0;

      AppState.fleet.forEach(u => {
        if (u.status === 'Running') {
          const delta = (prng() - 0.48) * 0.35;
          u.currentKw = Math.max(1.5, Math.min(u.ratedKw * 1.05, Number((u.currentKw + delta).toFixed(2))));
          u.periodKwh = Math.round(u.periodKwh + u.currentKw * 0.05);
          u.tempC = Number((u.tempC + (prng() - 0.49) * 0.25).toFixed(1));

          // Real-time avoided energy & waste simulation
          if (u.id === 'MCH-SEW-03' && AppState.activeScenario === 'night_idle') {
            stepWasteKwh += 1.45; // 38 kW idle leak cost drain
          } else {
            stepAvoidedKwh += u.currentKw * 0.0075; // Continuous verified energy efficiency savings
          }
        }
      });

      const tariff = (AppState.assumptions && AppState.assumptions.tariffBdtPerKwh) || 12.40;
      AppState.simAvoidedKwh = (AppState.simAvoidedKwh || 0) + stepAvoidedKwh;
      AppState.simSavingsAccruedBdt = (AppState.simSavingsAccruedBdt || 0) + (stepAvoidedKwh * tariff);
      if (stepWasteKwh > 0) {
        AppState.simWasteCostBdt = (AppState.simWasteCostBdt || 0) + (stepWasteKwh * tariff);
      }

      const now = new Date();
      const pad = n => String(n).padStart(2, '0');
      AppState.lastUpdateTimestamp = \`Oct 18, \${pad(now.getHours())}:\${pad(now.getMinutes())}:\${pad(now.getSeconds())} BST\`;
      const clk = document.getElementById('last-update-clock');
      if (clk) clk.textContent = AppState.lastUpdateTimestamp;

      if (AppState.activeRoute !== 'digital-twin') {
        renderActiveView();
      } else {
        renderCopilotDrawerContent();
      }
      if (!silent) {
        showToast('Advanced simulation by +1 deterministic step (Tick #' + AppState.simTickCount + ').', 'info');
      }
    }`;

if (content.includes(oldStepSim)) {
  content = content.replace(oldStepSim, newStepSim);
  console.log('✓ Successfully updated stepSimulationForward with live real-time savings & carbon accumulator');
} else {
  console.error('Could not find oldStepSim');
}

// 2. Update getDerivedMetrics to calculate live real-time estimatedSavingsBdt and totalRecSavedCo2
const oldMetricsSavings = `      const estimatedSavingsBdt = Math.round(totalRecSavedBdt);
      const savingsTargetPct = a.savingsPlanTargetBdt > 0
        ? Math.min(100, Math.round((estimatedSavingsBdt / a.savingsPlanTargetBdt) * 100))
        : 0;`;

const newMetricsSavings = `      // Real-time live net estimated savings:
      // Base: ৳ 68,000 + real-time accrued simulation savings - active waste leaks + applied actions
      const baseRecSavingsBdt = 68000;
      const netLiveAccruedBdt = (AppState.simSavingsAccruedBdt || 0) - (AppState.simWasteCostBdt || 0);
      const estimatedSavingsBdt = Math.max(0, Math.round(baseRecSavingsBdt + netLiveAccruedBdt + appliedRecSavedBdt));

      // Real-time live avoidable carbon reduction:
      // Base: 3.07 tCO2e / mo (from the 5 ranked actions) + real-time avoided carbon
      const baseAvoidableCo2 = 3.07;
      const dynAvoidedCo2 = ((AppState.simAvoidedKwh || 0) * (a.gridEmissionFactorKgPerKwh / 1000));
      totalRecSavedCo2 = Number((baseAvoidableCo2 + dynAvoidedCo2).toFixed(2));

      const savingsTargetPct = a.savingsPlanTargetBdt > 0
        ? Math.min(100, Math.round((estimatedSavingsBdt / a.savingsPlanTargetBdt) * 100))
        : 0;`;

if (content.includes(oldMetricsSavings)) {
  content = content.replace(oldMetricsSavings, newMetricsSavings);
  console.log('✓ Successfully updated getDerivedMetrics with live real-time savings & avoidable carbon calculation');
} else {
  console.error('Could not find oldMetricsSavings');
}

// 3. Inject initViewCharts and chart definitions right after renderActiveView
const targetAfterRenderActiveView = `      viewport.innerHTML = html;
      renderCopilotDrawerContent();
      initViewCharts(m);

      if (AppState.activeRoute === 'digital-twin' && AppState.epmsViewMode === '3d') {
        setTimeout(() => initEpms3dScene(), 40);
      } else {
        disposeEpms3dScene();
      }
    }`;

const chartsImplementation = `      viewport.innerHTML = html;
      renderCopilotDrawerContent();
      initViewCharts(m);

      if (AppState.activeRoute === 'digital-twin' && AppState.epmsViewMode === '3d') {
        setTimeout(() => initEpms3dScene(), 40);
      } else {
        disposeEpms3dScene();
      }
    }

    // ============================================================================
    // DYNAMIC VIEW CHARTS (Energy Usage Overview & Analytics Real-Time Engine)
    // ============================================================================
    let ActiveCharts = {};

    function destroyChartIfExists(key) {
      if (ActiveCharts[key]) {
        try {
          ActiveCharts[key].destroy();
        } catch (e) {}
        delete ActiveCharts[key];
      }
    }

    function initViewCharts(m) {
      if (typeof Chart === 'undefined') return;

      const isDark = document.documentElement.classList.contains('dark') || AppState.theme === 'dark';
      const textColor = isDark ? '#94A3B8' : '#64748B';
      const gridColor = isDark ? 'rgba(148, 163, 184, 0.1)' : 'rgba(148, 163, 184, 0.15)';

      // 1. DASHBOARD: Energy Usage Overview (Electricity kWh vs Garment Output pcs & Daily Target)
      if (AppState.activeRoute === 'dashboard') {
        const ctxDash = document.getElementById('dashboard-energy-chart');
        if (ctxDash) {
          const period = AppState.energyChartPeriod || 'month';
          const simFactor = (m.totalCurrentKw / 199.2);
          const tickWobble = Math.sin((AppState.simTickCount || 0) * 0.45) * 120;

          let labels = [];
          let usageData = [];
          let prodData = [];
          let targetData = [];

          if (period === 'day') {
            labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'];
            usageData = [140, 85, 210, 245, Math.round(230 * simFactor + tickWobble * 0.05), 195, 120];
            prodData = [0, 0, 1850, 2600, Math.round(2450 * simFactor), 1900, 200];
            targetData = [200, 200, 200, 200, 200, 200, 200];
          } else if (period === 'week') {
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri (Current)', 'Sat', 'Sun'];
            usageData = [7450, 7820, 7650, 8100, Math.round(7950 * simFactor + tickWobble), 6800, 2400];
            prodData = [11200, 11800, 11500, 12300, Math.round(11900 * simFactor), 9800, 1500];
            targetData = [8000, 8000, 8000, 8000, 8000, 8000, 8000];
          } else if (period === 'year') {
            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct (Current)', 'Nov', 'Dec'];
            usageData = [48500, 51200, 53400, 52100, 54200, 53800, 51900, 52800, 54100, Math.round(m.totalPeriodKwh), 51000, 49500];
            prodData = [72000, 76000, 79000, 77500, 81000, 80500, 78000, 79500, 82000, Math.round(m.totalPeriodKwh * 1.5), 77000, 74000];
            targetData = Array(12).fill(52000);
          } else {
            // 'month' (default - exactly matching Reference Image 2)
            labels = ['Oct 1', 'Oct 5', 'Oct 10', 'Oct 15 (Peak)', 'Oct 20 (Live)', 'Oct 25', 'Oct 31'];
            const liveDayVal = Math.round(7850 * simFactor + tickWobble);
            usageData = [3100, 4200, 6800, 8240, liveDayVal, 6900, 5200];
            prodData = [4500, 6200, 10100, 12450, Math.round(11800 * simFactor), 10500, 7800];
            targetData = [6500, 6500, 6500, 6500, 6500, 6500, 6500];
          }

          if (ActiveCharts.dashboardEnergy) {
            ActiveCharts.dashboardEnergy.data.labels = labels;
            ActiveCharts.dashboardEnergy.data.datasets[0].data = usageData;
            ActiveCharts.dashboardEnergy.data.datasets[1].data = prodData;
            ActiveCharts.dashboardEnergy.data.datasets[2].data = targetData;
            ActiveCharts.dashboardEnergy.update('none');
          } else {
            destroyChartIfExists('dashboardEnergy');
            ActiveCharts.dashboardEnergy = new Chart(ctxDash, {
              type: 'line',
              data: {
                labels: labels,
                datasets: [
                  {
                    label: 'Total Usage (kWh) [SIMULATION]',
                    data: usageData,
                    borderColor: '#0EA5E9',
                    backgroundColor: 'rgba(14, 165, 233, 0.12)',
                    borderWidth: 2.2,
                    pointBackgroundColor: '#0EA5E9',
                    pointBorderColor: '#FFFFFF',
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    fill: true,
                    tension: 0.38,
                    yAxisID: 'y'
                  },
                  {
                    label: 'Production (pcs) [SIMULATION]',
                    data: prodData,
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.08)',
                    borderWidth: 2.2,
                    pointBackgroundColor: '#10B981',
                    pointBorderColor: '#FFFFFF',
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    fill: false,
                    tension: 0.38,
                    yAxisID: 'y1'
                  },
                  {
                    label: 'Target (kWh)',
                    data: targetData,
                    borderColor: '#14B8A6',
                    borderWidth: 1.6,
                    borderDash: [5, 5],
                    pointRadius: 0,
                    fill: false,
                    tension: 0,
                    yAxisID: 'y'
                  }
                ]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                  legend: {
                    display: true,
                    position: 'top',
                    labels: {
                      color: textColor,
                      font: { family: 'Inter', size: 11, weight: '500' },
                      boxWidth: 12,
                      boxHeight: 12,
                      usePointStyle: true
                    }
                  },
                  tooltip: {
                    backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                    titleColor: isDark ? '#FFFFFF' : '#0F172A',
                    bodyColor: isDark ? '#CBD5E1' : '#334155',
                    borderColor: isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(16, 185, 129, 0.3)',
                    borderWidth: 1,
                    padding: 10,
                    boxPadding: 4,
                    usePointStyle: true,
                    callbacks: {
                      afterBody: function(context) {
                        return 'Factory: Rupsha Garments Ltd. (Gazipur)\nStatus: Live Simulated Meter Telemetry';
                      }
                    }
                  }
                },
                scales: {
                  x: {
                    grid: { display: false },
                    ticks: { color: textColor, font: { family: 'Inter', size: 10 } }
                  },
                  y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    grid: { color: gridColor },
                    ticks: {
                      color: textColor,
                      font: { family: 'JetBrains Mono', size: 10 },
                      callback: val => val.toLocaleString() + ' kWh'
                    }
                  },
                  y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: { drawOnChartArea: false },
                    ticks: {
                      color: '#10B981',
                      font: { family: 'JetBrains Mono', size: 10 },
                      callback: val => val.toLocaleString() + ' pcs'
                    }
                  }
                }
              }
            });
          }
        }
      }

      // 2. ENERGY ANALYTICS: Energy vs Production Chart & Demand Profile
      if (AppState.activeRoute === 'energy-analytics') {
        const ctx1 = document.getElementById('analytics-energy-chart');
        if (ctx1) {
          destroyChartIfExists('analyticsEnergy');
          ActiveCharts.analyticsEnergy = new Chart(ctx1, {
            type: 'bar',
            data: {
              labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4 (Current)'],
              datasets: [
                {
                  label: 'Baseline Period (kWh) [SAMPLE]',
                  data: [14800, 15100, 14950, 14582],
                  backgroundColor: 'rgba(148, 163, 184, 0.45)',
                  borderRadius: 6
                },
                {
                  label: 'Current Simulation (kWh) [SIMULATION]',
                  data: [13100, 13450, 12900, Math.round(m.totalPeriodKwh - 39450)],
                  backgroundColor: 'rgba(16, 185, 129, 0.82)',
                  borderRadius: 6
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { labels: { color: textColor, font: { size: 11 } } } },
              scales: {
                x: { grid: { display: false }, ticks: { color: textColor } },
                y: { grid: { color: gridColor }, ticks: { color: textColor } }
              }
            }
          });
        }

        const ctx2 = document.getElementById('analytics-demand-chart');
        if (ctx2) {
          destroyChartIfExists('analyticsDemand');
          ActiveCharts.analyticsDemand = new Chart(ctx2, {
            type: 'line',
            data: {
              labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00 (Peak)', '21:00'],
              datasets: [
                {
                  label: 'Active Demand (kW) [SIMULATION]',
                  data: [138, 64, 78, 192, Math.round(m.totalCurrentKw), 195, 186, 162],
                  borderColor: '#0EA5E9',
                  backgroundColor: 'rgba(14, 165, 233, 0.14)',
                  fill: true,
                  tension: 0.35
                },
                {
                  label: 'Post-Intervention Target (kW) [ESTIMATE]',
                  data: [115, 42, 68, 178, 182, 179, 164, 140],
                  borderColor: '#10B981',
                  borderDash: [4, 4],
                  fill: false,
                  tension: 0.35
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { labels: { color: textColor, font: { size: 11 } } } },
              scales: {
                x: { grid: { display: false }, ticks: { color: textColor } },
                y: { grid: { color: gridColor }, ticks: { color: textColor } }
              }
            }
          });
        }
      }

      // 3. BILL & CARBON FORECAST: Forecast Trajectory
      if (AppState.activeRoute === 'bill-carbon-forecast') {
        const ctxF = document.getElementById('forecast-trajectory-chart');
        if (ctxF) {
          destroyChartIfExists('forecastTrajectory');
          const baseBill = Math.round(m.currentBillBdt);
          const optBill = Math.max(0, Math.round(m.currentBillBdt - m.estimatedSavingsBdt));
          ActiveCharts.forecastTrajectory = new Chart(ctxF, {
            type: 'line',
            data: {
              labels: ['Jul (Actual)', 'Aug (Actual)', 'Sep (Baseline)', 'Oct (Current)', 'Nov (Forecast)', 'Dec (Forecast)', 'Jan (Forecast)'],
              datasets: [
                {
                  label: 'No-Action Scenario Bill (BDT) [ESTIMATE]',
                  data: [715000, 728000, 736956, baseBill, Math.round(baseBill * 1.02), Math.round(baseBill * 1.03), Math.round(baseBill * 1.04)],
                  borderColor: '#F59E0B',
                  backgroundColor: 'rgba(245, 158, 11, 0.1)',
                  tension: 0.3
                },
                {
                  label: 'AI Intervention Scenario Bill (BDT) [ESTIMATE]',
                  data: [715000, 728000, 736956, baseBill, optBill, Math.round(optBill * 0.98), Math.round(optBill * 0.97)],
                  borderColor: '#10B981',
                  backgroundColor: 'rgba(16, 185, 129, 0.16)',
                  fill: true,
                  tension: 0.3
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { labels: { color: textColor, font: { size: 11 } } } },
              scales: {
                x: { grid: { display: false }, ticks: { color: textColor } },
                y: { grid: { color: gridColor }, ticks: { color: textColor } }
              }
            }
          });
        }
      }
    }`;

if (content.includes(targetAfterRenderActiveView)) {
  content = content.replace(targetAfterRenderActiveView, chartsImplementation);
  console.log('✓ Successfully injected initViewCharts with dynamic Energy Usage Overview Chart.js engine');
} else {
  console.error('Could not find targetAfterRenderActiveView');
}

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Done updating preview/index.html with real-time simulation updates!');
