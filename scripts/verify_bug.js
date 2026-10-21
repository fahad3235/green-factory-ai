// Let's test the hypothesis:
// In browser:
// 1. Chart is created on canvas element A.
// 2. renderActiveView() executes: viewport.innerHTML = ...
// 3. New canvas element B is in DOM.
// 4. ActiveCharts.dashboardEnergy is still holding canvas element A!
// 5. ActiveCharts.dashboardEnergy.canvas === B is FALSE!
// 6. Because ActiveCharts.dashboardEnergy is truthy, code calls ActiveCharts.dashboardEnergy.update() on element A!
// 7. Element B in DOM remains completely empty / blank!

console.log('Hypothesis verified by logic:');
console.log('ActiveCharts.dashboardEnergy.canvas !== ctxDash when innerHTML is replaced.');
