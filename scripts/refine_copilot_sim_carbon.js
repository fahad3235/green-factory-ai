const fs = require('fs');
const path = require('path');

const filePath = path.resolve('preview/index.html');
let html = fs.readFileSync(filePath, 'utf8');

const targetCopilotOld = `        const simYieldTons = m.simPotentialCredits || 0;
        const simYieldUsd = m.simRevenueUsd || 0;
        const simYieldBdt = m.simRevenueBdt || 0;
        return useBn
          ? \`<strong>কার্বন ক্রেডিট ওয়ালেট ও ভিসিএম ট্রেডিং রেজিস্ট্রি [VERRA VCS VM0008]:</strong><br/>
          • <strong>ওয়ালেটে বিদ্যমান ক্রেডিট:</strong> <strong>\${formatNum(cc.available, 2)} tCO₂e</strong> (মূল্যায়ন: $\${formatNum(availUsd, 2)} USD / ৳ \${formatNum(availBdt, 0)} BDT)।<br/>
          • <strong>বাজারদর (VCM Spot Index):</strong> <strong>$\${formatNum(cc.vcmPriceUsd, 2)}/tCO₂e</strong> (৳ \${formatNum(cc.vcmPriceUsd * cc.usdToBdtRate, 0)}/ক্রেডিট)।<br/>
          • <strong>পোশাক ক্রেতাদের জন্য অবসরপ্রাপ্ত ক্রেডিট:</strong> <strong>\${formatNum(cc.retired, 2)} tCO₂e</strong> (H&amp;M Group, Inditex/Zara, M&amp;S-এর জন্য প্রত্যয়িত)।<br/>
          • <strong>নগদীকরণ সাশ্রয় আয়:</strong> ৳ \${formatNum(cc.cumulativeEarningsBdt, 0)} BDT সরাসরি ফ্যাক্টরি অ্যাকাউন্টে ক্রেডিট করা হয়েছে।\`
          : \`<strong>Voluntary Carbon Credit System &amp; MRV Registry [VERRA VCS VM0008]:</strong><br/>
          • <strong>Available Credit Balance:</strong> <strong>\${formatNum(cc.available, 2)} tCO₂e</strong> (Portfolio Value: <strong>$\${formatNum(availUsd, 2)} USD</strong> / <strong>৳ \${formatNum(availBdt, 0)} BDT</strong>).<br/>
          • <strong>Global VCM Spot Price:</strong> <strong>$\${formatNum(cc.vcmPriceUsd, 2)} / tCO₂e</strong> (৳ \${formatNum(cc.vcmPriceUsd * cc.usdToBdtRate, 0)} BDT / credit via Climate Impact X).<br/>
          • <strong>Scope 3 Buyer Retirements:</strong> <strong>\${formatNum(cc.retired, 2)} tCO₂e</strong> retired for H&amp;M, Inditex/Zara, and Marks &amp; Spencer supply chain compliance.<br/>
          • <strong>Dual Monetization Pathway:</strong> 1 VCU = 1 metric ton CO₂e avoided. Verified via continuous IoT edge meters &amp; SGS ISO 14065 audit trail.\`;`;

const newCopilotRefined = `        const simYieldTons = m.simPotentialCredits || 0;
        const simYieldUsd = m.simRevenueUsd || 0;
        const simYieldBdt = m.simRevenueBdt || 0;
        return useBn
          ? \`<strong>কার্বন ক্রেডিট ওয়ালেট ও ভিসিএম ট্রেডিং রেজিস্ট্রি [VERRA VCS VM0008]:</strong><br/>
          • <strong>ওয়ালেটে বিদ্যমান ভেরিফায়েড ক্রেডিট:</strong> <strong>\${formatNum(cc.available, 2)} tCO₂e</strong> (মূল্যায়ন: $\${formatNum(availUsd, 2)} USD / ৳ \${formatNum(availBdt, 0)} BDT)।<br/>
          • <strong>সক্রিয় সিমুলেশন কার্বন ফলন:</strong> <strong>+\${formatNum(simYieldTons, 2)} tCO₂e</strong> (দৃশ্যপট: <em>\${AppState.activeScenario.toUpperCase()}</em>, প্রত্যাশিত আয়: <strong>+$\${formatNum(simYieldUsd, 2)} USD</strong> / <strong>৳ \${formatNum(simYieldBdt, 0)} BDT</strong>)।<br/>
          • <strong>বাজারদর (VCM Spot Index):</strong> <strong>$\${formatNum(cc.vcmPriceUsd, 2)}/tCO₂e</strong> (৳ \${formatNum(cc.vcmPriceUsd * cc.usdToBdtRate, 0)}/ক্রেডিট)।<br/>
          • <strong>পোশাক ক্রেতাদের জন্য অবসরপ্রাপ্ত ক্রেডিট:</strong> <strong>\${formatNum(cc.retired, 2)} tCO₂e</strong> (H&amp;M Group, Inditex/Zara, M&amp;S-এর জন্য প্রত্যয়িত)।<br/>
          • <strong>সিমুলেশন সহ মোট সম্ভাব্য ব্যালেন্স:</strong> <strong>\${formatNum(cc.available + simYieldTons, 2)} tCO₂e</strong>। কার্বনআইকিউ প্যানেলে 'Mint Sim Credits' ক্লিক করে মিন্ট করা যাবে।\`
          : \`<strong>Voluntary Carbon Credit System &amp; MRV Registry [VERRA VCS VM0008]:</strong><br/>
          • <strong>Available Verified Credit Balance:</strong> <strong>\${formatNum(cc.available, 2)} tCO₂e</strong> (Portfolio Value: <strong>$\${formatNum(availUsd, 2)} USD</strong> / <strong>৳ \${formatNum(availBdt, 0)} BDT</strong>).<br/>
          • <strong>Live Simulation Carbon Yield:</strong> <strong>+\${formatNum(simYieldTons, 2)} tCO₂e</strong> (Active Scenario: <em>\${AppState.activeScenario.toUpperCase().replace(/_/g, ' ')}</em>, Tick #\${AppState.simTickCount}).<br/>
          • <strong>Simulated Revenue Forecast:</strong> <strong>+$\${formatNum(simYieldUsd, 2)} USD</strong> (<strong>৳ \${formatNum(simYieldBdt, 0)} BDT</strong>) under VCM Spot Index ($21.50/credit).<br/>
          • <strong>Combined Portfolio Potential:</strong> <strong>\${formatNum(cc.available + simYieldTons, 2)} tCO₂e</strong> (Base: \${formatNum(cc.available, 2)} t + Sim: \${formatNum(simYieldTons, 2)} t).<br/>
          • <strong>Scope 3 Buyer Retirements:</strong> <strong>\${formatNum(cc.retired, 2)} tCO₂e</strong> retired for H&amp;M, Inditex/Zara, and Marks &amp; Spencer compliance.\`;`;

if (html.includes(targetCopilotOld)) {
  html = html.replace(targetCopilotOld, () => newCopilotRefined);
  console.log('✓ Refined Copilot Carbon Credit responses to quote live simulation yield');
}

// Add suggested prompt
const targetSuggestedPrompts = 'const SUGGESTED_PROMPTS = [';
const newSuggestedPrompt = `const SUGGESTED_PROMPTS = [
      { en: 'How do simulation changes affect our carbon credits?', bn: 'সিমুলেশন পরিবর্তন কীভাবে আমাদের কার্বন ক্রেডিট প্রভাবিত করে?' },`;

if (!html.includes('সিমুলেশন পরিবর্তন কীভাবে আমাদের কার্বন ক্রেডিট')) {
  if (html.includes(targetSuggestedPrompts)) {
    html = html.replace(targetSuggestedPrompts, () => newSuggestedPrompt);
    console.log('✓ Added simulation carbon credit prompt to SUGGESTED_PROMPTS');
  }
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('✓ preview/index.html updated successfully');
