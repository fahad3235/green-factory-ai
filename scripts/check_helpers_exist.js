const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const helpers = [
  'openAddInventoryModal',
  'openAdjustStockModal',
  'runIndividualAgent',
  'runFullAgentWorkflow',
  'updateTariffAssumption',
  'updateGridFactorAssumption',
  'toggleSimulationPlay',
  'stepSimulationForward',
  'setSimulationSpeed',
  'promptResetSimulation'
];

helpers.forEach(h => {
  console.log(h + ' exists:', html.includes('function ' + h));
});
