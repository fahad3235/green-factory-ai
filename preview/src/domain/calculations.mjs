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
