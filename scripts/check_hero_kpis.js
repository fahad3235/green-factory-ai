const fs = require('fs');
const html = fs.readFileSync('preview/index.html', 'utf8');

const dashIdx = 632551;
const nextFn = 879098;
const sub = html.substring(dashIdx, nextFn).replace(/data:image\/[^;]+;base64,[a-zA-Z0-9+/=]+/g, '[IMG]');

const kpiIdx = sub.indexOf('<!-- Right Image & Floating Glass KPI Overlays -->');
const chartIdx = sub.indexOf('<!-- Card 1: Energy Usage Overview Chart');
console.log(sub.substring(kpiIdx, chartIdx));
