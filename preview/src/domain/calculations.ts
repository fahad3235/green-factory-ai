// Typed Domain Calculations & Deterministic Simulation Engine (TypeScript)
// Green Factory Brain AI — Rupsha Garments Ltd. (Fictional Demo Factory)
//
// This module is a faithful typed port of preview/src/domain/calculations.mjs.
// It uses erasable TypeScript syntax only (interfaces, type annotations, `as`
// assertions — no enums, namespaces, or parameter properties), so it executes
// directly on Node.js >= 22.18 via native type stripping and type-checks with
// `tsc --noEmit` (see tsconfig.json).
//
// The JavaScript module remains the runtime used by the server and test suites;
// this TypeScript module is kept output-identical to it, verified by
// scripts/test_typescript_parity.mjs (same vectors, deep-equal results).

export type DataClass =
  | 'LIVE/CONNECTED'
  | 'SIMULATION'
  | 'SAMPLE/IMPORTED'
  | 'ESTIMATE/FORECAST'
  | 'UNAVAILABLE';

export const DATA_CLASSES: Record<string, DataClass> = {
  LIVE: 'LIVE/CONNECTED',
  SIMULATION: 'SIMULATION',
  SAMPLE: 'SAMPLE/IMPORTED',
  ESTIMATE: 'ESTIMATE/FORECAST',
  UNAVAILABLE: 'UNAVAILABLE'
};

export interface SustainabilityWeights {
  energyIntensity: number;
  carbonReduction: number;
  machineAvailability: number;
  verifiedSavingsRatio: number;
}

export interface FactoryAssumptions {
  factoryName: string;
  location: string;
  isFictionalDemo: boolean;
  currency: string;
  currencySymbol: string;
  tariffRateBdtPerKwh: number;
  peakTariffRateBdtPerKwh: number;
  offPeakTariffRateBdtPerKwh: number;
  tariffVersion: string;
  gridEmissionFactorKgPerKwh: number;
  gridEmissionFactorSource: string;
  naturalGasEmissionFactorKgPerM3: number;
  naturalGasEmissionFactorSource: string;
  baselineMonthlyKwh: number;
  baselineMonthlyGasM3: number;
  currentMonthlyGasM3: number;
  sustainabilityWeights: SustainabilityWeights;
}

export const DEFAULT_ASSUMPTIONS: FactoryAssumptions = {
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
export function calculateEnergyKwh(powerKw: number, hours: number): number {
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
export function calculateApparentPowerKva(activePowerKw: number, powerFactor: number): number {
  if (powerFactor <= 0 || powerFactor > 1) {
    throw new RangeError('powerFactor must be in (0, 1]');
  }
  return activePowerKw / powerFactor;
}

/**
 * Calculate electricity bill estimate in BDT from energy (kWh) and tariff (BDT/kWh).
 * Keeps internal value unrounded.
 */
export function calculateBillBdt(energyKwh: number, tariffRateBdtPerKwh: number): number {
  if (energyKwh < 0 || tariffRateBdtPerKwh < 0) {
    throw new RangeError('energyKwh and tariffRateBdtPerKwh must be non-negative');
  }
  return energyKwh * tariffRateBdtPerKwh;
}

/**
 * Calculate Scope 2 emissions (tCO2e) from purchased electricity (kWh).
 * Purchased electricity is strictly Scope 2, never Scope 1.
 */
export function calculateScope2EmissionsTons(electricityKwh: number, gridFactorKgPerKwh: number): number {
  if (electricityKwh < 0 || gridFactorKgPerKwh < 0) {
    throw new RangeError('Inputs must be non-negative');
  }
  return (electricityKwh * gridFactorKgPerKwh) / 1000.0;
}

/**
 * Calculate Scope 1 emissions (tCO2e) from stationary boiler fuel (natural gas m3).
 */
export function calculateScope1EmissionsTons(naturalGasM3: number, gasFactorKgPerM3: number): number {
  if (naturalGasM3 < 0 || gasFactorKgPerM3 < 0) {
    throw new RangeError('Inputs must be non-negative');
  }
  return (naturalGasM3 * gasFactorKgPerM3) / 1000.0;
}

export interface ComparableSavingsInput {
  baselineKwh: number;
  postActionKwh: number;
  baselinePeriodHours: number;
  postActionPeriodHours: number;
  tariffRateBdtPerKwh: number;
  gridFactorKgPerKwh: number;
}

export interface ComparableSavingsResult {
  normalizedBaselineKwh: number;
  postActionKwh: number;
  savedKwh: number;
  savedBdt: number;
  avoidedTonsCo2e: number;
  periodNormalized: boolean;
  dataClass: DataClass;
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
}: ComparableSavingsInput): ComparableSavingsResult {
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

export type PaybackStatus =
  | 'VALID'
  | 'MISSING_COST'
  | 'INVALID_COST'
  | 'NON_POSITIVE_SAVINGS';

export interface PaybackResult {
  value: number | null;
  formatted: string;
  status: PaybackStatus;
}

/**
 * Calculate simple payback period (in months or specified period unit).
 * Handles missing cost, zero savings, or negative savings explicitly.
 */
export function calculatePaybackPeriod(
  implementationCostBdt: number | null | undefined,
  periodicSavingsBdt: number | null | undefined,
  periodLabel = 'months'
): PaybackResult {
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

export interface FleetMachine {
  id?: string;
  status: string;
  currentKw: number;
  periodKwh: number;
  outputPcs?: number;
}

export interface FleetMetrics {
  totalCurrentKw: number;
  totalPeriodKwh: number;
  totalOutputPcs: number;
  counts: Record<string, number>;
  totalMachines: number;
  availabilityPct: number;
}

/**
 * Reconcile fleet machine energy & power totals.
 */
export function aggregateFleetMetrics(machines: FleetMachine[]): FleetMetrics {
  let totalCurrentKw = 0;
  let totalPeriodKwh = 0;
  let totalOutputPcs = 0;
  const counts: Record<string, number> = { Running: 0, Idle: 0, Maintenance: 0, Fault: 0, Unknown: 0 };

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
export function createDeterministicPrng(seed = 20261018): () => number {
  let state = seed >>> 0;
  return function nextFloat(): number {
    state = (state + 0x6D2B79F5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
