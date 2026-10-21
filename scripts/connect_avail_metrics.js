const fs = require('fs');
let html = fs.readFileSync('preview/index.html', 'utf8');

const target = 'const availabilityPct = totalMachines > 0 ? (availableUnits / totalMachines) * 100.0 : 0;';
const replacement = `const baseAvail = totalMachines > 0 ? (availableUnits / totalMachines) * 100.0 : 0;
      let availabilityPct = (AppState.fleetAvailabilityRealtime !== undefined) ? AppState.fleetAvailabilityRealtime : baseAvail;
      if (AppState.activeScenario === 'machine_overload') availabilityPct = Math.min(availabilityPct, 88.9);
      if (AppState.activeScenario === 'night_idle') availabilityPct = Math.min(availabilityPct, 83.3);
      if (AppState.activeScenario === 'shift_change') availabilityPct = Math.min(availabilityPct, 77.8);`;

if (html.includes(target)) {
  html = html.replace(target, replacement);
  fs.writeFileSync('preview/index.html', html, 'utf8');
  console.log('getDerivedMetrics availability updated successfully.');
} else {
  console.log('Target not found in getDerivedMetrics!');
}
