const fs = require('fs');
const path = require('path');

const filePath = path.resolve('preview/index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. Refine openTradeCarbonCreditsModal onConfirm
const oldTradeConfirm = `        onConfirm: () => {
          const qtyInput = document.getElementById('trade-credits-qty-input');
          const qty = Number(qtyInput ? qtyInput.value : 10);
          if (qty > 0 && qty <= cc.available) {
            const usdGross = qty * cc.vcmPriceUsd;
            const bdtGross = usdGross * cc.usdToBdtRate;
            cc.available = Number((cc.available - qty).toFixed(2));
            cc.cumulativeEarningsBdt = Number((cc.cumulativeEarningsBdt + bdtGross).toFixed(0));
            
            logActivity(AppState.currentUser.name, \`Liquidated \${qty} carbon credits on VCM for $\${usdGross.toFixed(2)} USD (৳ \${bdtGross.toLocaleString()} BDT).\`);
            closeAppModal();
            renderActiveView();
            showToast(\`Liquidated \${qty} credits! ৳ \${bdtGross.toLocaleString()} BDT credited to factory operational account.\`, 'success');
          } else {
            showToast('Invalid credit quantity specified.', 'error');
          }
        },`;

const newTradeConfirm = `        onConfirm: () => {
          const qtyInput = document.getElementById('trade-credits-qty-input');
          const qty = Number(qtyInput ? qtyInput.value : 10);
          if (qty > 0 && qty <= liveAvailable) {
            const usdGross = qty * cc.vcmPriceUsd;
            const bdtGross = usdGross * cc.usdToBdtRate;
            if (qty <= cc.available) {
              cc.available = Number((cc.available - qty).toFixed(2));
            } else {
              const fromSim = Number((qty - cc.available).toFixed(2));
              cc.available = 0;
              cc.totalMinted = Number((cc.totalMinted + fromSim).toFixed(2));
              const simSerial = \`VCS-BD-2026-SIM-0\${48300 + AppState.carbonCredits.ledger.length}\`;
              AppState.carbonCredits.ledger.unshift({
                serial: simSerial,
                vintage: '2026-Q4',
                source: \`Liquidated Live Simulation Yield (\${AppState.activeScenario.toUpperCase().replace(/_/g, ' ')})\`,
                amountTons: fromSim,
                status: 'Retired',
                registry: 'Climate Impact X (CIX Liquidation)',
                methodology: 'VM0008 Grid Displaced Generation',
                verifier: 'ACX Clearing House',
                txHash: '0x' + Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join(''),
                beneficiary: 'Liquidated on VCM Spot Market (Proceeds to Rupsha Garments Ltd)',
                retiredAt: new Date().toISOString().split('T')[0]
              });
              cc.retired = Number((cc.retired + fromSim).toFixed(2));
            }
            cc.cumulativeEarningsBdt = Number((cc.cumulativeEarningsBdt + bdtGross).toFixed(0));
            
            logActivity(AppState.currentUser.name, \`Liquidated \${qty} carbon credits on VCM for $\${usdGross.toFixed(2)} USD (৳ \${bdtGross.toLocaleString()} BDT).\`);
            closeAppModal();
            renderActiveView();
            showToast(\`Liquidated \${qty} credits! ৳ \${bdtGross.toLocaleString()} BDT credited to factory operational account.\`, 'success');
          } else {
            showToast('Invalid credit quantity specified.', 'error');
          }
        },`;

// 2. Refine openRetireCarbonCreditModal onConfirm
const oldRetireConfirm = `          const credit = AppState.carbonCredits.ledger.find(it => it.serial === chosenSerial);
          if (credit && credit.status === 'Active') {
            credit.status = 'Retired';
            credit.beneficiary = chosenBrand;
            credit.retiredAt = new Date().toISOString().split('T')[0];
            AppState.carbonCredits.available = Math.max(0, Number((AppState.carbonCredits.available - credit.amountTons).toFixed(2)));
            AppState.carbonCredits.retired = Number((AppState.carbonCredits.retired + credit.amountTons).toFixed(2));
            
            logActivity(AppState.currentUser.name, \`Retired \${credit.amountTons} tCO₂e (\${credit.serial}) for \${chosenBrand}.\`);
            closeAppModal();
            renderActiveView();
            showToast(\`Successfully retired \${credit.amountTons} tCO₂e for \${chosenBrand}!\`, 'success');
            setTimeout(() => {
              openCarbonCreditCertificateModal(credit.serial);
            }, 300);
          }`;

const newRetireConfirm = `          let credit = AppState.carbonCredits.ledger.find(it => it.serial === chosenSerial);
          if (!credit && chosenSerial === 'VCS-BD-2026-SIM-LIVE') {
            const newSerialNum = 48300 + AppState.carbonCredits.ledger.length;
            const newSerial = \`VCS-BD-2026-SIM-0\${newSerialNum}\`;
            const newTxHash = '0x' + Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('');
            credit = {
              serial: newSerial,
              vintage: '2026-Q4',
              source: \`Simulation Interventions (\${AppState.activeScenario.toUpperCase().replace(/_/g, ' ')} • Tick #\${AppState.simTickCount})\`,
              amountTons: simYield > 0 ? simYield : 4.72,
              status: 'Active',
              registry: 'Verra VCS (Simulated)',
              methodology: 'VM0008 Grid Displaced Generation',
              verifier: 'Bureau Veritas India (Simulated)',
              txHash: newTxHash,
              beneficiary: null,
              retiredAt: null
            };
            AppState.carbonCredits.ledger.unshift(credit);
            AppState.carbonCredits.totalMinted = Number((AppState.carbonCredits.totalMinted + credit.amountTons).toFixed(2));
          }
          if (credit && credit.status === 'Active') {
            credit.status = 'Retired';
            credit.beneficiary = chosenBrand;
            credit.retiredAt = new Date().toISOString().split('T')[0];
            AppState.carbonCredits.available = Math.max(0, Number((AppState.carbonCredits.available - credit.amountTons).toFixed(2)));
            AppState.carbonCredits.retired = Number((AppState.carbonCredits.retired + credit.amountTons).toFixed(2));
            
            logActivity(AppState.currentUser.name, \`Retired \${credit.amountTons} tCO₂e (\${credit.serial}) for \${chosenBrand}.\`);
            closeAppModal();
            renderActiveView();
            showToast(\`Successfully retired \${credit.amountTons} tCO₂e for \${chosenBrand}!\`, 'success');
            setTimeout(() => {
              openCarbonCreditCertificateModal(credit.serial);
            }, 300);
          }`;

// Check and replace
let updated = 0;
if (html.includes(oldTradeConfirm)) {
  html = html.replace(oldTradeConfirm, newTradeConfirm);
  updated++;
  console.log('✓ Updated trade onConfirm to support liveAvailable');
} else {
  console.log('Notice: oldTradeConfirm not found or already updated');
}

if (html.includes(oldRetireConfirm)) {
  html = html.replace(oldRetireConfirm, newRetireConfirm);
  updated++;
  console.log('✓ Updated retire onConfirm to support VCS-BD-2026-SIM-LIVE');
} else {
  console.log('Notice: oldRetireConfirm not found or already updated');
}

if (updated > 0) {
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✓ Successfully updated ${updated} blocks in preview/index.html`);
}
