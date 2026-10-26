// TypeScript/JavaScript parity check — Green Factory Brain AI
// Compares preview/src/domain/calculations.ts (TypeScript) against
// preview/src/domain/calculations.mjs (JavaScript) on identical vectors.
// Requires Node.js >= 22.18 (native TypeScript type stripping); on older
// Node versions it prints SKIP and exits 0 so CI matrices stay green.
// Run: node scripts/test_typescript_parity.mjs

import assert from 'node:assert/strict';

const [major, minor] = process.versions.node.split('.').map(Number);
if (major < 22 || (major === 22 && minor < 18)) {
  console.log(`SKIP: TypeScript parity check needs Node >= 22.18 (running ${process.versions.node}).`);
  process.exit(0);
}

const js = await import('../preview/src/domain/calculations.mjs');
const ts = await import('../preview/src/domain/calculations.ts');

let checks = 0;
function eq(a, b, label) {
  assert.deepEqual(a, b, label);
  checks++;
}

// Constants identical
eq(ts.DATA_CLASSES, js.DATA_CLASSES, 'DATA_CLASSES identical');
eq(ts.DEFAULT_ASSUMPTIONS, js.DEFAULT_ASSUMPTIONS, 'DEFAULT_ASSUMPTIONS identical');

// Energy / kVA / bill / emissions
eq(ts.calculateEnergyKwh(18.5, 10), js.calculateEnergyKwh(18.5, 10), 'energy kWh');
eq(ts.calculateApparentPowerKva(1910, 0.92), js.calculateApparentPowerKva(1910, 0.92), 'apparent kVA');
eq(ts.calculateBillBdt(52300, 12.40), js.calculateBillBdt(52300, 12.40), 'bill BDT');
eq(ts.calculateScope2EmissionsTons(52300, 0.560), js.calculateScope2EmissionsTons(52300, 0.560), 'scope 2');
eq(ts.calculateScope1EmissionsTons(2430.6930693069307, 2.020), js.calculateScope1EmissionsTons(2430.6930693069307, 2.020), 'scope 1');

// Comparable savings (equal + normalized windows)
const savingsInput = {
  baselineKwh: 59431.82, postActionKwh: 52300,
  baselinePeriodHours: 720, postActionPeriodHours: 720,
  tariffRateBdtPerKwh: 12.40, gridFactorKgPerKwh: 0.560
};
eq(ts.calculateComparableSavings(savingsInput), js.calculateComparableSavings(savingsInput), 'savings equal windows');
eq(
  ts.calculateComparableSavings({ ...savingsInput, postActionPeriodHours: 744 }),
  js.calculateComparableSavings({ ...savingsInput, postActionPeriodHours: 744 }),
  'savings normalized windows'
);

// Payback incl. edge cases
for (const [cost, save, label] of [
  [38850, 18500, 'months'], [null, 18500, undefined], [50000, 0, undefined],
  [50000, -1200, undefined], [-5, 1000, undefined], [0, 1000, undefined]
]) {
  eq(ts.calculatePaybackPeriod(cost, save, label), js.calculatePaybackPeriod(cost, save, label), `payback ${cost}/${save}`);
}

// Fleet aggregation
const fleet = [
  { id: 'M1', status: 'Running', currentKw: 14.2, periodKwh: 12400, outputPcs: 4200 },
  { id: 'M2', status: 'Idle', currentKw: 3.8, periodKwh: 4900, outputPcs: 0 },
  { id: 'M3', status: 'Maintenance', currentKw: 0.0, periodKwh: 2000, outputPcs: 1100 },
  { id: 'M4', status: 'Running', currentKw: 22.0, periodKwh: 33000, outputPcs: 7150 }
];
eq(ts.aggregateFleetMetrics(fleet), js.aggregateFleetMetrics(fleet), 'fleet metrics');

// PRNG determinism + cross-implementation equality
const a = ts.createDeterministicPrng(42);
const b = js.createDeterministicPrng(42);
eq([a(), a(), a()], [b(), b(), b()], 'PRNG sequences identical');

// Error behavior identical
for (const fn of [
  () => ts.calculateEnergyKwh(-5, 10), () => js.calculateEnergyKwh(-5, 10),
  () => ts.calculateApparentPowerKva(100, 0), () => js.calculateApparentPowerKva(100, 0),
  () => ts.calculateBillBdt(-1, 5), () => js.calculateBillBdt(-1, 5)
]) {
  assert.throws(fn);
  checks++;
}

console.log(`TypeScript/JavaScript parity PASSED (${checks} checks, 0 differences).`);
