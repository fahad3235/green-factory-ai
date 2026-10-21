const fs = require('fs');

const filePath = 'preview/simulation.html';
let html = fs.readFileSync(filePath, 'utf8');

const banSvg = `<svg class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" x2="19.07" y1="4.93" y2="19.07"/></svg>`;
const warnSvg = `<svg class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>`;
const infoSvg = `<svg class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`;
const boltSvg = `<svg class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`;
const moneySvg = `<svg class="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/></svg>`;

html = html.replace(
  'logEvent("ev","📉 Surge ended — loads back to normal pattern");',
  'logEvent("ev","Surge ended — loads back to normal pattern");'
);

html = html.replace(
  'd.innerHTML = \'<span class="a-ico">\' + (a.sev==="crit"?"⛔":a.sev==="warn"?"⚠️":"ℹ️") + \'</span><div><b>\' +',
  `d.innerHTML = '<span class="a-ico">' + (a.sev==="crit"?'${banSvg}':a.sev==="warn"?'${warnSvg}':'${infoSvg}') + '</span><div><b>' +`
);

html = html.replace(
  '(isFault ? " ⚠" : "")',
  '(isFault ? " [FAULT]" : "")'
);

html = html.replace(
  "'<div class=\"f-nums\"><span>⚡ ' + f.saveLabel + '</span><span>💰 ' + bdt(f.money) + '/month</span><span>↩ Payback: ' + f.payback + '</span></div>' +",
  `'<div class="f-nums"><span>${boltSvg} ' + f.saveLabel + '</span><span>${moneySvg} ' + bdt(f.money) + '/month</span><span>Payback: ' + f.payback + '</span></div>' +`
);

html = html.replace(
  'logEvent("ev","✋ Story interrupted — manual control");',
  'logEvent("ev","Story interrupted — manual control");'
);

fs.writeFileSync(filePath, html, 'utf8');
console.log('Finished updating preview/simulation.html!');
