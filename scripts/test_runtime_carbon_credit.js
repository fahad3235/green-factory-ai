const fs = require('fs');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync('preview/index.html', 'utf8');

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  resources: 'usable',
  url: 'http://localhost:4321/'
});

const { window } = dom;

// Wait for scripts to initialize
setTimeout(() => {
  try {
    const { AppState, AppIcons, getDerivedMetrics, renderCarbonIqReportView, mintTelemetryCarbonCredits, downloadCarbonCreditsLedgerCsv, generateGroundedCopilotReply } = window;
    
    console.log('Testing AppState.carbonCredits:');
    console.log('Available credits:', AppState.carbonCredits.available, 'tCO2e');
    console.log('VCM price:', '$' + AppState.carbonCredits.vcmPriceUsd);
    console.log('Ledger count:', AppState.carbonCredits.ledger.length);
    
    if (!AppState.carbonCredits || AppState.carbonCredits.available !== 64.10) {
      throw new Error('AppState.carbonCredits not initialized properly');
    }
    
    console.log('Testing AppIcons:');
    const coinSvg = AppIcons.coin('w-5 h-5');
    const certSvg = AppIcons.certificate('w-5 h-5');
    const qrSvg = AppIcons.qrCode('w-5 h-5');
    console.log('coin icon SVG length:', coinSvg.length);
    console.log('certificate icon SVG length:', certSvg.length);
    console.log('qrCode icon SVG length:', qrSvg.length);
    
    console.log('Testing renderCarbonIqReportView():');
    const viewHtml = renderCarbonIqReportView();
    if (!viewHtml.includes('carbon-credit-system-panel')) {
      throw new Error('renderCarbonIqReportView() does not contain carbon-credit-system-panel');
    }
    if (!viewHtml.includes('VERRA VCS METHODOLOGY VM0008')) {
      throw new Error('renderCarbonIqReportView() missing Verra VCS methodology badge');
    }
    if (!viewHtml.includes('VCS-BD-2026-RUP-048291')) {
      throw new Error('renderCarbonIqReportView() missing serial ledger rows');
    }
    console.log('✓ renderCarbonIqReportView() renders Carbon Credit Wallet & Registry cleanly!');
    
    console.log('Testing mintTelemetryCarbonCredits():');
    const prevAvailable = AppState.carbonCredits.available;
    const prevCount = AppState.carbonCredits.ledger.length;
    mintTelemetryCarbonCredits();
    console.log('Minted! New available:', AppState.carbonCredits.available, 'New count:', AppState.carbonCredits.ledger.length);
    if (AppState.carbonCredits.available <= prevAvailable || AppState.carbonCredits.ledger.length <= prevCount) {
      throw new Error('mintTelemetryCarbonCredits() did not increase balance or ledger');
    }
    console.log('✓ mintTelemetryCarbonCredits() functions correctly!');
    
    console.log('Testing generateGroundedCopilotReply for Carbon Credits:');
    const m = getDerivedMetrics();
    const replyEn = generateGroundedCopilotReply('What is our carbon credit balance and how much BDT revenue can we generate?', m);
    console.log('English AI Copilot reply snippet:', replyEn.slice(0, 150));
    if (!replyEn.includes('Voluntary Carbon Credit System') || !replyEn.includes('VERRA VCS VM0008')) {
      throw new Error('Copilot English reply missing carbon credit details');
    }
    
    AppState.language = 'bn';
    const replyBn = generateGroundedCopilotReply('আমাদের কার্বন ক্রেডিট ব্যালেন্স কত এবং কত টাকা রাজস্ব আয় হতে পারে?', m);
    console.log('Bangla AI Copilot reply snippet:', replyBn.slice(0, 150));
    if (!replyBn.includes('কার্বন ক্রেডিট ওয়ালেট') || !replyBn.includes('VERRA VCS VM0008')) {
      throw new Error('Copilot Bangla reply missing carbon credit details');
    }
    console.log('✓ Ask Green AI Copilot answers Carbon Credit questions grounded in telemetry in both EN and BN!');
    
    console.log('===================================================');
    console.log('ALL RUNTIME CARBON CREDIT VERIFICATIONS PASSED 100%');
    console.log('===================================================');
    process.exit(0);
  } catch (err) {
    console.error('Runtime test failed:', err);
    process.exit(1);
  }
}, 500);
