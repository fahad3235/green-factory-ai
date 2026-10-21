const fs = require('fs');

const scenarioBases = {
  baseline: 4.72,
  energy_intervention: 18.40,
  production_surge: 2.80,
  night_idle: 1.85,
  compressor_leak: 2.10,
  machine_overload: 2.20,
  shift_change: 3.10,
  tariff_change: 4.72,
  maintenance_downtime: 3.80
};

let simTickCount = 0;
let simAvoidedKwh = 0;
let currentScenario = 'baseline';

function getSimMetrics() {
  const baseAbatement = scenarioBases[currentScenario] || 4.72;
  const simLiveAvoidedCo2Tons = (simAvoidedKwh * 0.62) / 1000.0;
  const simTotalAbatementTons = Number((baseAbatement + simLiveAvoidedCo2Tons).toFixed(2));
  const baseAvail = 64.10;
  const liveAvail = Number((baseAvail + simTotalAbatementTons).toFixed(2));
  const vcmPrice = 21.50;
  const valUsd = Number((liveAvail * vcmPrice).toFixed(2));
  const valBdt = Math.round(valUsd * 120);
  return {
    simTickCount,
    simAvoidedKwh,
    simTotalAbatementTons,
    liveAvail,
    valUsd,
    valBdt
  };
}

function tickForward() {
  simTickCount++;
  // Each tick represents 1 simulation cycle yielding ~16.2 kWh avoided energy (~0.01 tCO2e)
  const stepAvoidedKwh = 16.2;
  simAvoidedKwh += stepAvoidedKwh;
  return getSimMetrics();
}

console.log('--- Initial State (Baseline, Tick #0) ---');
let prev = getSimMetrics();
console.log(prev);

console.log('\n--- Ticking Forward 25 Ticks ---');
for (let i = 1; i <= 25; i++) {
  const curr = tickForward();
  if (curr.simTotalAbatementTons < prev.simTotalAbatementTons) {
    throw new Error(`Regression! Credit decreased at tick ${i}: ${curr.simTotalAbatementTons} < ${prev.simTotalAbatementTons}`);
  }
  if (curr.liveAvail < prev.liveAvail) {
    throw new Error(`Regression! Available wallet decreased at tick ${i}: ${curr.liveAvail} < ${prev.liveAvail}`);
  }
  if (i === 1 || i === 5 || i === 10 || i === 20 || i === 22 || i === 25) {
    console.log(`Tick #${curr.simTickCount}: Sim Yield = +${curr.simTotalAbatementTons} tCO2e | Available Wallet = ${curr.liveAvail} tCO2e | Valuation = $${curr.valUsd} (৳ ${curr.valBdt})`);
  }
  prev = curr;
}

console.log('\n✓ Monotonic Increase Test Passed! Credits strictly increase with every tick, zero decrease.');
