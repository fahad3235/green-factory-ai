import assert from 'node:assert/strict';
import {
  calculateEnergyKwh,
  calculateApparentPowerKva,
  calculateBillBdt,
  calculateScope2EmissionsTons,
  calculateScope1EmissionsTons,
  calculateComparableSavings,
  calculatePaybackPeriod,
  aggregateFleetMetrics,
  createDeterministicPrng,
  DEFAULT_ASSUMPTIONS
} from '../src/domain/calculations.mjs';

console.log('Running Green Factory Brain AI — Domain Calculation & Simulation Tests...');

// 1. kW vs kWh separation test
{
  const kw = 18.5;
  const hours = 10;
  const kwh = calculateEnergyKwh(kw, hours);
  assert.equal(kwh, 185.0, 'Energy (kWh) must equal power (kW) * duration (hours)');
  assert.throws(() => calculateEnergyKwh(-5, 10), RangeError, 'Negative power must throw RangeError');
  console.log('✓ PASS: kW vs kWh separation & validation');
}

// 2. Apparent Power (kVA) and Power Factor reconciliation
{
  const kva = calculateApparentPowerKva(1910, 0.92);
  assert.ok(Math.abs(kva - 2076.0869565) < 0.001, 'kVA must equal kW / PF unrounded');
  console.log('✓ PASS: Apparent Power (kVA) and Power Factor formula');
}

// 3. Tariff x kWh bill calculation (unrounded internal, rounded display)
{
  const kwh = 52300;
  const tariff = DEFAULT_ASSUMPTIONS.tariffRateBdtPerKwh; // 12.40
  const bill = calculateBillBdt(kwh, tariff);
  assert.equal(bill, 648520, '52,300 kWh * 12.40 BDT/kWh must equal 648,520 BDT');
  console.log('✓ PASS: Tariff x kWh expected cost calculation');
}

// 4. Scope 1 and Scope 2 Emissions factor and unit conversion
{
  const scope2Tons = calculateScope2EmissionsTons(52300, 0.560); // 29.288 tCO2e
  const scope1Tons = calculateScope1EmissionsTons(DEFAULT_ASSUMPTIONS.currentMonthlyGasM3, 2.020); // 4.91 tCO2e
  const totalTons = scope1Tons + scope2Tons;
  assert.ok(Math.abs(scope2Tons - 29.288) < 1e-6, 'Scope 2 grid electricity conversion kg->metric ton');
  assert.ok(Math.abs(scope1Tons - 4.91) < 1e-6, 'Scope 1 boiler natural gas conversion kg->metric ton');
  assert.ok(Math.abs(totalTons - 34.198) < 1e-3, 'Total emissions reconcile to ~34.2 tCO2e');
  console.log('✓ PASS: Scope 1 & Scope 2 emissions factor & unit conversion');
}

// 5. Comparable period savings calculation
{
  const res = calculateComparableSavings({
    baselineKwh: 59431.82,
    postActionKwh: 52300,
    baselinePeriodHours: 720,
    postActionPeriodHours: 720,
    tariffRateBdtPerKwh: 12.40,
    gridFactorKgPerKwh: 0.560
  });
  assert.equal(res.periodNormalized, false);
  assert.ok(Math.abs(res.savedKwh - 7131.82) < 0.01);
  assert.ok(Math.abs(res.savedBdt - 88434.568) < 0.1);
  assert.ok(Math.abs(res.avoidedTonsCo2e - 3.9938) < 0.01);
  console.log('✓ PASS: Comparable period savings reconciliation');
}

// 6. Payback handles zero, missing, and negative values safely
{
  const valid = calculatePaybackPeriod(38850, 18500, 'months');
  assert.equal(valid.status, 'VALID');
  assert.equal(valid.formatted, '2.1 months');

  const missingCost = calculatePaybackPeriod(null, 18500);
  assert.equal(missingCost.status, 'MISSING_COST');
  assert.equal(missingCost.formatted, 'Not provided');

  const zeroSavings = calculatePaybackPeriod(50000, 0);
  assert.equal(zeroSavings.status, 'NON_POSITIVE_SAVINGS');
  assert.equal(zeroSavings.formatted, 'Insufficient data (non-positive savings)');

  const negativeSavings = calculatePaybackPeriod(50000, -1200);
  assert.equal(negativeSavings.status, 'NON_POSITIVE_SAVINGS');
  console.log('✓ PASS: Payback zero/missing/negative edge cases');
}

// 7. Fleet aggregation reconciles to totals
{
  const sampleFleet = [
    { id: 'M1', status: 'Running', currentKw: 14.2, periodKwh: 12400, outputPcs: 4200 },
    { id: 'M2', status: 'Idle', currentKw: 3.8, periodKwh: 4900, outputPcs: 0 },
    { id: 'M3', status: 'Maintenance', currentKw: 0.0, periodKwh: 2000, outputPcs: 1100 },
    { id: 'M4', status: 'Running', currentKw: 22.0, periodKwh: 33000, outputPcs: 7150 }
  ];
  const agg = aggregateFleetMetrics(sampleFleet);
  assert.equal(agg.totalCurrentKw, 40.0);
  assert.equal(agg.totalPeriodKwh, 52300);
  assert.equal(agg.totalOutputPcs, 12450);
  assert.equal(agg.availabilityPct, 75.0);
  console.log('✓ PASS: Machine fleet aggregates reconcile to exact totals');
}

// 8. Deterministic PRNG reproducibility
{
  const prngA = createDeterministicPrng(42);
  const prngB = createDeterministicPrng(42);
  const seqA = [prngA(), prngA(), prngA()];
  const seqB = [prngB(), prngB(), prngB()];
  assert.deepEqual(seqA, seqB, 'Identical seeds must produce identical sequences');
  console.log('✓ PASS: Deterministic seed replay consistency');
}

console.log('ALL 8 DOMAIN CALCULATION TEST SUITES PASSED (8/8).');
