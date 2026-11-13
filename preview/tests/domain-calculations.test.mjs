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
  calculateMicrogridMetrics,
  calculateCarbonCreditForecast,
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

// 9. Rooftop Solar PV & BESS Microgrid Simulator calculations & boundary clamping
{
  // Default values check
  const def = calculateMicrogridMetrics();
  assert.equal(def.solarKwp, 320);
  assert.equal(def.bessKwh, 150);
  assert.equal(def.dieselDisplacementPct, 45);
  assert.equal(def.annualSolarMwh, 448.0);
  assert.equal(def.storageCyclingMwh, 45.0);
  assert.ok(def.gridBdtSavings > 4800000);
  assert.ok(def.dieselBackupSavingsBdt > 250000);
  assert.ok(!isNaN(def.totalAnnualSavingsBdt));
  assert.ok(!isNaN(def.paybackYears));
  assert.ok(!isNaN(def.vcsCarbonCreditsTons));

  // Boundary clamping (0 or below minimum should clamp to 100 kWp, 50 kWh, 0%)
  const minClamped = calculateMicrogridMetrics({ solarKwp: 0, bessKwh: 0, dieselDisplacementPct: -10 });
  assert.equal(minClamped.solarKwp, 100, 'Solar capacity under 100 must clamp to 100 kWp');
  assert.equal(minClamped.bessKwh, 50, 'BESS storage under 50 must clamp to 50 kWh');
  assert.equal(minClamped.dieselDisplacementPct, 0, 'Diesel displacement under 0 must clamp to 0%');
  assert.equal(minClamped.dieselBackupSavingsBdt, 0);

  // Maximum boundary clamping (above 1000 kWp, 500 kWh, 100%)
  const maxClamped = calculateMicrogridMetrics({ solarKwp: 5000, bessKwh: 1200, dieselDisplacementPct: 150 });
  assert.equal(maxClamped.solarKwp, 1000, 'Solar capacity above 1000 must clamp to 1000 kWp');
  assert.equal(maxClamped.bessKwh, 500, 'BESS storage above 500 must clamp to 500 kWh');
  assert.equal(maxClamped.dieselDisplacementPct, 100, 'Diesel displacement above 100 must clamp to 100%');

  // Undefined/null edge cases must NOT return NaN
  const missingArgs = calculateMicrogridMetrics({ solarKwp: null, bessKwh: undefined, dieselDisplacementPct: null });
  assert.ok(!isNaN(missingArgs.annualSolarMwh), 'annualSolarMwh must not be NaN');
  assert.ok(!isNaN(missingArgs.dieselBackupSavingsBdt), 'dieselBackupSavingsBdt must not be NaN');
  assert.ok(!isNaN(missingArgs.totalAnnualSavingsBdt), 'totalAnnualSavingsBdt must not be NaN');
  assert.ok(!isNaN(missingArgs.vcsCarbonCreditsTons), 'vcsCarbonCreditsTons must not be NaN');

  console.log('✓ PASS: Rooftop Solar PV & BESS Microgrid Simulator calculations & boundary clamping');
}

// 10. Carbon Credit & Business Profit Prediction calculations & edge cases
{
  const forecast = calculateCarbonCreditForecast({
    monthlyAvoidedTons: 4.0,
    monthlyEnergySavingsBdt: 90000,
    monthlySavedKwh: 7143,
    customPriceUsdPerTon: 18,
    usdToBdt: 120,
    implementationCapexBdt: 485000,
    annualTargetTons: 52.0,
    cbamRateUsdPerTon: 65
  });
  assert.equal(forecast.scenarios.length, 3, 'Must produce Low/Medium/High scenarios');
  assert.equal(forecast.scenarios[0].priceUsdPerTon, 10);
  assert.equal(forecast.scenarios[1].priceUsdPerTon, 18);
  assert.equal(forecast.scenarios[2].priceUsdPerTon, 30);
  assert.equal(forecast.monthlyPotentialCreditBdt, Math.round(4.0 * 18 * 120));
  assert.equal(forecast.monthlySeries.length, 12, 'Must generate 12-month forecast series');
  assert.equal(forecast.projectedAnnualTons, 48.0);
  assert.equal(forecast.targetTracker.shortfallTons, 4.0);
  assert.equal(forecast.targetTracker.onTrack, false);
  assert.equal(forecast.verificationStatus, 'POTENTIAL_UNVERIFIED');
  assert.ok(forecast.paybackMonthsWithCredits < forecast.paybackMonthsEnergyOnly);
  assert.ok(forecast.cbamSimulation.avoidedCbamLiabilityBdt > 0);

  // Zero / negative / missing edge cases must never produce NaN or crash
  const zeroCase = calculateCarbonCreditForecast({
    monthlyAvoidedTons: -5,
    monthlyEnergySavingsBdt: 0,
    customPriceUsdPerTon: 999,
    cbamRateUsdPerTon: -20
  });
  assert.equal(zeroCase.monthlyAvoidedTons, 0);
  assert.equal(zeroCase.customPriceUsdPerTon, 150, 'Credit price above max clamps to 150');
  assert.equal(zeroCase.paybackMonthsEnergyOnly, null);
  assert.equal(zeroCase.cbamSimulation.cbamRateUsdPerTon, 0);
  assert.ok(!Number.isNaN(zeroCase.roi12MonthPct));
  console.log('✓ PASS: Carbon Credit & Business Profit Prediction calculations & edge cases');
}

console.log('ALL 10 DOMAIN CALCULATION TEST SUITES PASSED (10/10).');
