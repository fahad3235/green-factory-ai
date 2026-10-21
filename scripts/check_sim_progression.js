const scenarioBases = {
  baseline: 4.72,
  energy_intervention: 18.40,
  production_surge: 2.80,
  night_idle: 1.85
};

for (let tick = 0; tick <= 10; tick++) {
  const baseAbatement = scenarioBases.baseline;
  const tickAvoidedCo2 = (tick * 16.2 * 0.62) / 1000.0;
  const simTotalAbatement = Number((baseAbatement + tickAvoidedCo2).toFixed(2));
  const liveAvail = Number((64.10 + simTotalAbatement).toFixed(2));
  console.log(`Tick ${tick}: Sim Yield = +${simTotalAbatement} tCO2e | Available Wallet = ${liveAvail} tCO2e | Net Change = +${(simTotalAbatement - 4.72).toFixed(2)}`);
}
