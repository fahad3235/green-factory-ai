const http = require('http');

http.get('http://127.0.0.1:4321/', (res) => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Has energyChartPeriod day:', body.includes("energyChartPeriod: 'day'"));
    console.log('Has updateEnergyChartTooltip:', body.includes('updateEnergyChartTooltip'));
    console.log('Has getDashboardEnergyChartFooter:', body.includes('getDashboardEnergyChartFooter'));
    console.log('Has 14:00 (Peak):', body.includes('14:00 (Peak)'));
    console.log('Has 16:00 (Live):', body.includes('16:00 (Live)'));
  });
});
