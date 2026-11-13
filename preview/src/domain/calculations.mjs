// Centralized Domain Calculations & Deterministic Simulation Engine
// Green Factory Brain AI — Rupsha Garments Ltd. (Fictional Demo Factory)

export const DATA_CLASSES = {
  LIVE: 'LIVE/CONNECTED',
  SIMULATION: 'SIMULATION',
  SAMPLE: 'SAMPLE/IMPORTED',
  ESTIMATE: 'ESTIMATE/FORECAST',
  UNAVAILABLE: 'UNAVAILABLE'
};

export const DEFAULT_ASSUMPTIONS = {
  factoryName: 'Rupsha Garments Ltd.',
  location: 'Gazipur, Dhaka, Bangladesh',
  isFictionalDemo: true,
  currency: 'BDT',
  currencySymbol: '৳',
  tariffRateBdtPerKwh: 12.40,
  peakTariffRateBdtPerKwh: 14.88,
  offPeakTariffRateBdtPerKwh: 11.16,
  tariffVersion: 'BPDB Industrial MT-3 (Demo Schedule v2026.1)',
  gridEmissionFactorKgPerKwh: 0.560, // 0.560 kg CO2e / kWh = 0.00056 tCO2e / kWh
  gridEmissionFactorSource: 'DoE Bangladesh Grid Factor v2025.2 (Scope 2 Location-Based)',
  naturalGasEmissionFactorKgPerM3: 2.020, // Scope 1 stationary combustion (Boiler)
  naturalGasEmissionFactorSource: 'IPCC 2006 / GHG Protocol Stationary Combustion v2025',
  baselineMonthlyKwh: 59431.818181818184, // ~59,432 kWh baseline vs 52,300 kWh current (-12.0%)
  baselineMonthlyGasM3: 2680,
  currentMonthlyGasM3: 2430.6930693069307, // -> 4.91 tCO2e Scope 1
  sustainabilityWeights: {
    energyIntensity: 0.35,
    carbonReduction: 0.30,
    machineAvailability: 0.20,
    verifiedSavingsRatio: 0.15
  }
};

/**
 * Calculate energy (kWh) from average power (kW) and duration (hours).
 * Never confuses instantaneous demand (kW) with integrated energy (kWh).
 */
export function calculateEnergyKwh(powerKw, hours) {
  if (typeof powerKw !== 'number' || typeof hours !== 'number' || isNaN(powerKw) || isNaN(hours)) {
    throw new TypeError('powerKw and hours must be valid numbers');
  }
  if (powerKw < 0 || hours < 0) {
    throw new RangeError('powerKw and hours cannot be negative');
  }
  return powerKw * hours;
}

/**
 * Calculate apparent power (kVA) from active power (kW) and power factor (0 < pf <= 1).
 */
export function calculateApparentPowerKva(activePowerKw, powerFactor) {
  if (powerFactor <= 0 || powerFactor > 1) {
    throw new RangeError('powerFactor must be in (0, 1]');
  }
  return activePowerKw / powerFactor;
}

/**
 * Calculate electricity bill estimate in BDT from energy (kWh) and tariff (BDT/kWh).
 * Keeps internal value unrounded.
 */
export function calculateBillBdt(energyKwh, tariffRateBdtPerKwh) {
  if (energyKwh < 0 || tariffRateBdtPerKwh < 0) {
    throw new RangeError('energyKwh and tariffRateBdtPerKwh must be non-negative');
  }
  return energyKwh * tariffRateBdtPerKwh;
}

/**
 * Calculate Scope 2 emissions (tCO2e) from purchased electricity (kWh).
 * Purchased electricity is strictly Scope 2, never Scope 1.
 */
export function calculateScope2EmissionsTons(electricityKwh, gridFactorKgPerKwh) {
  if (electricityKwh < 0 || gridFactorKgPerKwh < 0) {
    throw new RangeError('Inputs must be non-negative');
  }
  return (electricityKwh * gridFactorKgPerKwh) / 1000.0;
}

/**
 * Calculate Scope 1 emissions (tCO2e) from stationary boiler fuel (natural gas m3).
 */
export function calculateScope1EmissionsTons(naturalGasM3, gasFactorKgPerM3) {
  if (naturalGasM3 < 0 || gasFactorKgPerM3 < 0) {
    throw new RangeError('Inputs must be non-negative');
  }
  return (naturalGasM3 * gasFactorKgPerM3) / 1000.0;
}

/**
 * Calculate comparable period savings.
 * Requires matching periodHours to prevent comparing incomparable windows.
 */
export function calculateComparableSavings({
  baselineKwh,
  postActionKwh,
  baselinePeriodHours,
  postActionPeriodHours,
  tariffRateBdtPerKwh,
  gridFactorKgPerKwh
}) {
  if (baselinePeriodHours <= 0 || postActionPeriodHours <= 0) {
    throw new RangeError('Period hours must be positive');
  }
  // Normalize baseline to post-action period length if windows differ slightly, and flag it
  const periodNormalized = baselinePeriodHours !== postActionPeriodHours;
  const normalizedBaselineKwh = periodNormalized
    ? baselineKwh * (postActionPeriodHours / baselinePeriodHours)
    : baselineKwh;

  const savedKwh = normalizedBaselineKwh - postActionKwh;
  const savedBdt = savedKwh * tariffRateBdtPerKwh;
  const avoidedTonsCo2e = (savedKwh * gridFactorKgPerKwh) / 1000.0;

  return {
    normalizedBaselineKwh,
    postActionKwh,
    savedKwh,
    savedBdt,
    avoidedTonsCo2e,
    periodNormalized,
    dataClass: DATA_CLASSES.SIMULATION
  };
}

/**
 * Calculate simple payback period (in months or specified period unit).
 * Handles missing cost, zero savings, or negative savings explicitly.
 */
export function calculatePaybackPeriod(implementationCostBdt, periodicSavingsBdt, periodLabel = 'months') {
  if (implementationCostBdt === null || implementationCostBdt === undefined || isNaN(implementationCostBdt)) {
    return { value: null, formatted: 'Not provided', status: 'MISSING_COST' };
  }
  if (implementationCostBdt < 0) {
    return { value: null, formatted: 'Invalid cost', status: 'INVALID_COST' };
  }
  if (periodicSavingsBdt === null || periodicSavingsBdt === undefined || isNaN(periodicSavingsBdt) || periodicSavingsBdt <= 0) {
    return { value: null, formatted: 'Insufficient data (non-positive savings)', status: 'NON_POSITIVE_SAVINGS' };
  }
  if (implementationCostBdt === 0) {
    return { value: 0, formatted: `Immediate (0.0 ${periodLabel})`, status: 'VALID' };
  }
  const rawPayback = implementationCostBdt / periodicSavingsBdt;
  return {
    value: rawPayback,
    formatted: `${rawPayback.toFixed(1)} ${periodLabel}`,
    status: 'VALID'
  };
}

/**
 * Reconcile fleet machine energy & power totals.
 */
export function aggregateFleetMetrics(machines) {
  let totalCurrentKw = 0;
  let totalPeriodKwh = 0;
  let totalOutputPcs = 0;
  const counts = { Running: 0, Idle: 0, Maintenance: 0, Fault: 0, Unknown: 0 };

  for (const m of machines) {
    totalCurrentKw += m.currentKw;
    totalPeriodKwh += m.periodKwh;
    totalOutputPcs += (m.outputPcs || 0);
    counts[m.status] = (counts[m.status] || 0) + 1;
  }

  const totalMachines = machines.length;
  const availableMachines = counts.Running + counts.Idle;
  const availabilityPct = totalMachines > 0 ? (availableMachines / totalMachines) * 100.0 : 0;

  return {
    totalCurrentKw,
    totalPeriodKwh,
    totalOutputPcs,
    counts,
    totalMachines,
    availabilityPct
  };
}

/**
 * Deterministic Mulberry32 PRNG for reproducible simulation scenarios.
 */
export function createDeterministicPrng(seed = 20261018) {
  let state = seed >>> 0;
  return function nextFloat() {
    state = (state + 0x6D2B79F5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Calculate Rooftop Solar PV & BESS Microgrid metrics.
 * Techno-economic model for industrial rooftop solar, battery energy storage, and diesel displacement in Gazipur, Bangladesh.
 */
export function calculateMicrogridMetrics({
  solarKwp = 320,
  bessKwh = 150,
  dieselDisplacementPct = 45,
  tariffBdtPerKwh = 12.40,
  peakTariffBdtPerKwh = 14.88
} = {}) {
  const sVal = (solarKwp === undefined || solarKwp === null || isNaN(Number(solarKwp))) ? 320 : Number(solarKwp);
  const sKwp = Math.max(100, Math.min(1000, sVal));

  const bVal = (bessKwh === undefined || bessKwh === null || isNaN(Number(bessKwh))) ? 150 : Number(bessKwh);
  const bKwh = Math.max(50, Math.min(500, bVal));

  const dVal = (dieselDisplacementPct === undefined || dieselDisplacementPct === null || isNaN(Number(dieselDisplacementPct))) ? 45 : Number(dieselDisplacementPct);
  const dPct = Math.max(0, Math.min(100, dVal));

  // Gazipur industrial rooftop specific yield: ~1,400 peak sun hours equivalent yield / yr (3.84 kWh/kWp/day)
  const annualSolarMwh = Number(((sKwp * 1400) / 1000).toFixed(1));

  // Battery storage cycling ~300 days/yr for peak load shaving
  const storageCyclingMwh = Number(((bKwh * 300) / 1000).toFixed(1));

  // Direct clean solar generation value + battery peak discharge value
  const solarDirectKwh = (annualSolarMwh * 1000) * 0.85;
  const batteryPeakKwh = storageCyclingMwh * 1000;
  const gridBdtSavings = Math.round((solarDirectKwh * tariffBdtPerKwh) + (batteryPeakKwh * (peakTariffBdtPerKwh - tariffBdtPerKwh)));

  // Diesel generator displacement:
  // Factory baseline diesel backup generation is approx 28,000 kWh/yr during shedding
  // Diesel genset cost: ~৳32.50 / kWh
  const baselineDieselKwh = 28000;
  const displacedDieselKwh = Math.round(baselineDieselKwh * (dPct / 100));
  const dieselDeltaBdt = 32.50 - tariffBdtPerKwh; // Savings per kWh compared to grid
  const dieselBackupSavingsBdt = Math.round(displacedDieselKwh * dieselDeltaBdt);

  const totalAnnualSavingsBdt = gridBdtSavings + dieselBackupSavingsBdt;

  // EPC Capex in Bangladesh:
  // Solar PV: ৳52,000 / kWp installed (Tier-1 TOPCon)
  // BESS: ৳36,000 / kWh installed (Industrial LiFePO4 rack)
  const totalCapexBdt = (sKwp * 52000) + (bKwh * 36000);

  const paybackYears = totalAnnualSavingsBdt > 0 ? Number((totalCapexBdt / totalAnnualSavingsBdt).toFixed(1)) : 0.0;

  // Additional VCS Carbon Credits (tCO2e / year):
  // Grid factor: 0.560 kg/kWh (0.560 tCO2e/MWh)
  // Diesel factor: 0.740 tCO2e/MWh
  const gridCarbonAvoidedTons = (annualSolarMwh * 0.560);
  const dieselCarbonAvoidedTons = (displacedDieselKwh / 1000) * 0.740;
  const vcsCarbonCreditsTons = Number((gridCarbonAvoidedTons + dieselCarbonAvoidedTons).toFixed(1));

  return {
    solarKwp: sKwp,
    bessKwh: bKwh,
    dieselDisplacementPct: dPct,
    annualSolarMwh,
    storageCyclingMwh,
    gridBdtSavings,
    dieselBackupSavingsBdt,
    totalAnnualSavingsBdt,
    totalCapexBdt,
    paybackYears,
    vcsCarbonCreditsTons
  };
}

/**
 * Calculate Potential Carbon Credit Revenue, 12-Month Forecast, ROI,
 * Target Attainment, Buyer Compliance Risk, and Carbon Price / CBAM Sensitivity.
 * Note: Carbon credit prices are illustrative assumptions subject to MRV verification.
 */
export function calculateCarbonCreditForecast(options = {}) {
  const safeNum = (v, fallback) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
  };

  const monthlyAvoidedTons = Math.max(0, safeNum(options.monthlyAvoidedTons, 3.994));
  const monthlyEnergySavingsBdt = Math.max(0, safeNum(options.monthlyEnergySavingsBdt, 88435));
  const monthlySavedKwh = Math.max(0, safeNum(options.monthlySavedKwh, 7132));
  const baselineAnnualTons = Math.max(0.1, safeNum(options.baselineAnnualTons, 458.3));
  const residualMonthlyTons = Math.max(0, safeNum(options.residualMonthlyTons, 34.20));
  const customPriceUsdPerTon = Math.min(150, Math.max(1, safeNum(options.customPriceUsdPerTon, 18)));
  const usdToBdt = Math.max(1, safeNum(options.usdToBdt, 120));
  const implementationCapexBdt = Math.max(0, safeNum(options.implementationCapexBdt, 485000));
  const annualTargetTons = Math.max(1, safeNum(options.annualTargetTons, 52.0));
  const cbamRateUsdPerTon = Math.min(200, Math.max(0, safeNum(options.cbamRateUsdPerTon, 65)));
  const gridFactorKgPerKwh = Math.max(0.01, safeNum(options.gridFactorKgPerKwh, DEFAULT_ASSUMPTIONS.gridEmissionFactorKgPerKwh));

  const scenarios = [
    { id: 'low', label: 'Conservative (Low)', priceUsdPerTon: 10 },
    { id: 'medium', label: 'Assumed Base (Medium)', priceUsdPerTon: 18 },
    { id: 'high', label: 'High-Integrity VCM (High)', priceUsdPerTon: 30 }
  ].map((s) => {
    const priceBdtPerTon = Math.round(s.priceUsdPerTon * usdToBdt);
    const monthlyRevenueBdt = Math.round(monthlyAvoidedTons * priceBdtPerTon);
    const annualRevenueBdt = monthlyRevenueBdt * 12;
    return {
      ...s,
      priceBdtPerTon,
      monthlyRevenueBdt,
      annualRevenueBdt
    };
  });

  const customPriceBdtPerTon = Math.round(customPriceUsdPerTon * usdToBdt);
  const monthlyPotentialCreditBdt = Math.round(monthlyAvoidedTons * customPriceBdtPerTon);
  const annualPotentialCreditBdt = monthlyPotentialCreditBdt * 12;

  const annualEnergySavingsBdt = Math.round(monthlyEnergySavingsBdt * 12);
  const projectedAnnualTons = Number((monthlyAvoidedTons * 12).toFixed(2));
  const annualTotalBenefitBdt = annualEnergySavingsBdt + annualPotentialCreditBdt;
  const monthlyTotalBenefitBdt = Math.round(monthlyEnergySavingsBdt + monthlyPotentialCreditBdt);

  const paybackMonthsEnergyOnly = monthlyEnergySavingsBdt > 0
    ? Number((implementationCapexBdt / monthlyEnergySavingsBdt).toFixed(1))
    : null;
  const paybackMonthsWithCredits = monthlyTotalBenefitBdt > 0
    ? Number((implementationCapexBdt / monthlyTotalBenefitBdt).toFixed(1))
    : null;

  const roi12MonthPct = implementationCapexBdt > 0
    ? Number((((annualTotalBenefitBdt - implementationCapexBdt) / implementationCapexBdt) * 100).toFixed(1))
    : 0;
  const net3YearProfitBdt = Math.round((annualTotalBenefitBdt * 3) - implementationCapexBdt);

  // 12-Month deterministic seasonal ramp (reflecting Gazipur summer load & continuous tuning)
  const monthLabels = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'];
  const seasonalWeights = [0.92, 0.94, 0.97, 1.00, 1.02, 1.04, 1.05, 1.04, 1.02, 1.01, 1.00, 0.99];
  let cumTons = 0;
  let cumBdt = 0;
  const monthlySeries = monthLabels.map((label, idx) => {
    const w = seasonalWeights[idx];
    const mTons = Number((monthlyAvoidedTons * w).toFixed(3));
    const mEnergyBdt = Math.round(monthlyEnergySavingsBdt * w);
    const mCreditBdt = Math.round(monthlyPotentialCreditBdt * w);
    const mTotalBdt = mEnergyBdt + mCreditBdt;
    cumTons = Number((cumTons + mTons).toFixed(2));
    cumBdt += mTotalBdt;
    return {
      month: label,
      avoidedTons: mTons,
      cumulativeTons: cumTons,
      energySavingsBdt: mEnergyBdt,
      creditRevenueBdt: mCreditBdt,
      totalBusinessValueBdt: mTotalBdt,
      cumulativeBusinessValueBdt: cumBdt
    };
  });

  // Target tracker
  const attainmentPct = Number(Math.min(200, (projectedAnnualTons / annualTargetTons) * 100).toFixed(1));
  const shortfallTons = Number(Math.max(0, annualTargetTons - projectedAnnualTons).toFixed(2));
  const rawProb = 35 + ((attainmentPct - 60) * 1.15);
  const probabilityPct = Math.round(Math.min(98, Math.max(8, rawProb)));
  const onTrack = projectedAnnualTons >= annualTargetTons;

  // Buyer compliance risk score (Scope 3 buyer target benchmark = 10% annual cut)
  const reductionPct = Number(((projectedAnnualTons / baselineAnnualTons) * 100).toFixed(1));
  const complianceScore = Math.round(Math.min(99, Math.max(15, (reductionPct / 12.0) * 88)));
  const riskTier = complianceScore >= 75 ? 'LOW' : (complianceScore >= 50 ? 'MODERATE' : 'HIGH');

  // Carbon tax / EU CBAM sensitivity simulation
  const residualAnnualTons = Number((residualMonthlyTons * 12).toFixed(2));
  const grossExposureAnnualTons = Number((residualAnnualTons + projectedAnnualTons).toFixed(2));
  const avoidedCbamLiabilityBdt = Math.round(projectedAnnualTons * cbamRateUsdPerTon * usdToBdt);
  const netResidualCbamCostBdt = Math.round(residualAnnualTons * cbamRateUsdPerTon * usdToBdt);
  const grossAnnualCbamExposureBdt = avoidedCbamLiabilityBdt + netResidualCbamCostBdt;

  return {
    monthlyAvoidedTons: Number(monthlyAvoidedTons.toFixed(3)),
    projectedAnnualTons,
    monthlySavedKwh: Math.round(monthlySavedKwh),
    gridFactorKgPerKwh,
    formulaSummary: `${Math.round(monthlySavedKwh).toLocaleString('en-US')} kWh * ${gridFactorKgPerKwh.toFixed(3)} kg CO2e/kWh / 1,000 = ${monthlyAvoidedTons.toFixed(3)} tCO2e/mo`,
    customPriceUsdPerTon,
    customPriceBdtPerTon,
    usdToBdt,
    monthlyPotentialCreditBdt,
    annualPotentialCreditBdt,
    monthlyEnergySavingsBdt: Math.round(monthlyEnergySavingsBdt),
    annualEnergySavingsBdt,
    monthlyTotalBenefitBdt,
    annualTotalBenefitBdt,
    implementationCapexBdt,
    paybackMonthsEnergyOnly,
    paybackMonthsWithCredits,
    roi12MonthPct,
    net3YearProfitBdt,
    scenarios,
    monthlySeries,
    targetTracker: {
      annualTargetTons,
      projectedAnnualTons,
      attainmentPct,
      shortfallTons,
      probabilityPct,
      onTrack
    },
    buyerCompliance: {
      reductionPct,
      complianceScore,
      riskTier,
      buyerBenchmarkPct: 10.0
    },
    cbamSimulation: {
      cbamRateUsdPerTon,
      residualAnnualTons,
      grossExposureAnnualTons,
      avoidedCbamLiabilityBdt,
      netResidualCbamCostBdt,
      grossAnnualCbamExposureBdt
    },
    verificationStatus: 'POTENTIAL_UNVERIFIED',
    priceBasisDisclaimer: 'Illustrative assumed carbon credit price — NOT real spot market pricing. Bangladesh voluntary/compliance MRV verification required.'
  };
}
