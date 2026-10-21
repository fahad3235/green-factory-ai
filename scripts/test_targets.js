const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const target1 = "close: (cls = 'w-4 h-4') => `<svg class=\"${cls}\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"18\" x2=\"6\" y1=\"6\" y2=\"18\"/><line x1=\"6\" x2=\"18\" y1=\"6\" y2=\"18\"/></svg>`";

const target2 = `{ id: 'RPT-2026-10-F', title: 'Data Quality, Boundaries & Simulation Assumptions Disclosure', type: 'Data Quality & Assumptions', period: 'v2026.1', generatedAt: '2026-10-18 04:30', author: 'System Governance', dataClass: 'SIMULATION', summary: 'Full disclosure of BPDB tariff schedule, DoE Bangladesh grid emission factor v2025.2, Scope 3 exclusions, and non-certified simulation status.' }
      ],`.replace(/\r\n/g, '\n');

const target3 = `              }).join('')}
            </div>
          </div>
        </div>
      \`;
    }

    // ----------------------------------------------------------------------------
    // VIEW 8: SUSTAINABILITY REPORTS (Master Prompt Section 14)`.replace(/\r\n/g, '\n');

const target4 = 'function downloadCarbonIqReportCsv() {';

const target5 = "if (q.includes('carbon') || q.includes('assumption') || q.includes('কার্বন')) {";

const target6 = "const SUGGESTED_PROMPTS = [";

console.log('Target 1 (AppIcons):', html.indexOf(target1));
console.log('Target 2 (AppState reports):', html.indexOf(target2));
console.log('Target 3 (CarbonIQ Grid close):', html.indexOf(target3));
console.log('Target 4 (downloadCsv):', html.indexOf(target4));
console.log('Target 5 (Copilot branch):', html.indexOf(target5));
console.log('Target 6 (SUGGESTED_PROMPTS):', html.indexOf(target6));
