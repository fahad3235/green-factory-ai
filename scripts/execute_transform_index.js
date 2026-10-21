const fs = require('fs');

const filePath = 'preview/index.html';
let html = fs.readFileSync(filePath, 'utf8');

console.log('Original length:', html.length);

const ICONS = {
  factory: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>`,
  pin: (cls = 'w-3.5 h-3.5') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  leaf: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 4 13C4 9.5 7 4 13 3c5.5 0 8 2.5 8 8 0 5-4.5 9-10 9Z"/><path d="M11 20c0-6 4-10 10-10"/></svg>`,
  bolt: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  tree: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2-7 10h4l-5 8h16l-5-8h4Z"/><path d="M12 20v2"/></svg>`,
  menu: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
  globe: (cls = 'w-3.5 h-3.5') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  moon: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
  sun: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
  camera: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`,
  bot: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="12" x="3" y="8" rx="2"/><path d="M12 2v6"/><circle cx="9" cy="14" r="1.5" fill="currentColor"/><circle cx="15" cy="14" r="1.5" fill="currentColor"/><path d="M8 18h8"/></svg>`,
  telemetry: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/></svg>`,
  target: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  chat: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  thought: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A6.5 6.5 0 0 0 3 8.5c0 1.64.6 3.14 1.6 4.3A5.5 5.5 0 0 0 9 20h2.5a6.5 6.5 0 0 0 6.5-6.5c0-1.24-.35-2.4-1-3.37A6.5 6.5 0 0 0 9.5 2Z"/></svg>`,
  lock: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  key: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>`,
  check: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  checkCircle: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  eye: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  shield: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  cube: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 16-9 5-9-5V8l9-5 9 5v8Z"/><path d="m3.27 6.96 8.73 4.89 8.73-4.89"/><path d="M12 22V12"/></svg>`,
  cloud: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
  gear: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
  sprout: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4.1 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4.2.9-4.9 2z"/></svg>`,
  compass: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  refresh: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></svg>`,
  chartUp: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
  barChart: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>`,
  wrench: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  alert: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
  alertTriangle: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>`,
  ban: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" x2="19.07" y1="4.93" y2="19.07"/></svg>`,
  clock: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  bulb: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`,
  search: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>`,
  money: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>`,
  printer: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>`,
  fileText: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>`,
  expand: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>`,
  sparkles: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`,
  volume: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
  volumeMute: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>`,
  mic: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>`,
  home: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  package: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12.67 20.71 7"/><line x1="12" x2="12" y1="22" y2="12.67"/></svg>`,
  user: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  logout: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>`,
  sliders: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="1" x2="7" y1="14" y2="14"/><line x1="9" x2="15" y1="8" y2="8"/><line x1="17" x2="23" y1="16" y2="16"/></svg>`,
  play: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  pause: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`,
  stop: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="5" width="14" height="14" rx="2"/></svg>`,
  close: (cls = 'w-4 h-4') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>`
};

// 1. Inject AppIcons into script 6 if not already present
if (!html.includes('const AppIcons = {')) {
  const scriptAnchor = '    // ============================================================================\n    // 1. CENTRALIZED DOMAIN CALCULATIONS';
  const appIconsJsCode = `    // ============================================================================
    // PREMIUM CUSTOM SVG ICON SYSTEM (Zero Emoji Policy)
    // ============================================================================
    const AppIcons = {
      factory: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>\`,
      pin: (cls = 'w-3.5 h-3.5') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>\`,
      leaf: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 4 13C4 9.5 7 4 13 3c5.5 0 8 2.5 8 8 0 5-4.5 9-10 9Z"/><path d="M11 20c0-6 4-10 10-10"/></svg>\`,
      bolt: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>\`,
      tree: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2-7 10h4l-5 8h16l-5-8h4Z"/><path d="M12 20v2"/></svg>\`,
      menu: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>\`,
      globe: (cls = 'w-3.5 h-3.5') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>\`,
      moon: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>\`,
      sun: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>\`,
      camera: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>\`,
      bot: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="12" x="3" y="8" rx="2"/><path d="M12 2v6"/><circle cx="9" cy="14" r="1.5" fill="currentColor"/><circle cx="15" cy="14" r="1.5" fill="currentColor"/><path d="M8 18h8"/></svg>\`,
      telemetry: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/></svg>\`,
      target: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>\`,
      chat: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>\`,
      thought: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A6.5 6.5 0 0 0 3 8.5c0 1.64.6 3.14 1.6 4.3A5.5 5.5 0 0 0 9 20h2.5a6.5 6.5 0 0 0 6.5-6.5c0-1.24-.35-2.4-1-3.37A6.5 6.5 0 0 0 9.5 2Z"/></svg>\`,
      lock: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>\`,
      key: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>\`,
      check: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>\`,
      checkCircle: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>\`,
      eye: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>\`,
      shield: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>\`,
      cube: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 16-9 5-9-5V8l9-5 9 5v8Z"/><path d="m3.27 6.96 8.73 4.89 8.73-4.89"/><path d="M12 22V12"/></svg>\`,
      cloud: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>\`,
      gear: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>\`,
      sprout: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4.1 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4.2.9-4.9 2z"/></svg>\`,
      compass: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>\`,
      refresh: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></svg>\`,
      chartUp: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>\`,
      barChart: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>\`,
      wrench: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>\`,
      alert: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>\`,
      alertTriangle: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>\`,
      ban: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" x2="19.07" y1="4.93" y2="19.07"/></svg>\`,
      clock: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>\`,
      bulb: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>\`,
      search: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>\`,
      money: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>\`,
      printer: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>\`,
      fileText: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>\`,
      expand: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>\`,
      sparkles: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>\`,
      volume: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>\`,
      volumeMute: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>\`,
      mic: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>\`,
      home: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>\`,
      package: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12.67 20.71 7"/><line x1="12" x2="12" y1="22" y2="12.67"/></svg>\`,
      user: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>\`,
      logout: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>\`,
      sliders: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="1" x2="7" y1="14" y2="14"/><line x1="9" x2="15" y1="8" y2="8"/><line x1="17" x2="23" y1="16" y2="16"/></svg>\`,
      play: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>\`,
      pause: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>\`,
      stop: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="5" width="14" height="14" rx="2"/></svg>\`,
      close: (cls = 'w-4 h-4') => \`<svg class="\${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>\`
    };
    window.AppIcons = AppIcons;\n`;
  html = html.replace(scriptAnchor, appIconsJsCode + scriptAnchor);
}

// 2. Fix bug 1: openComparableWindowVerificationModal
html = html.replace(/openComparableWindowVerificationModal\(\)/g, 'runComparableWindowVerificationModal()');
if (!html.includes('window.openComparableWindowVerificationModal = runComparableWindowVerificationModal;')) {
  html = html.replace('function runComparableWindowVerificationModal() {', 'function runComparableWindowVerificationModal() {\n      window.openComparableWindowVerificationModal = runComparableWindowVerificationModal;');
}

// 3. Fix bug 2: copilot input and submit
html = html.replace(
  "const inp = document.getElementById('copilot-user-input');\n          if (inp) {\n            inp.value = transcript;\n            submitCopilotQuery();\n          }",
  "const inp = document.getElementById('copilot-input') || document.getElementById('copilot-user-input');\n          if (inp) {\n            inp.value = transcript;\n          }\n          if (transcript) {\n            askCopilotDirect(transcript);\n          }"
);

if (!html.includes('id="btn-copilot-mic"')) {
  const micBtn = '          <button type="button" id="btn-copilot-mic" onclick="toggleCopilotVoiceInput()" class="p-1.5 text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition shrink-0 mr-1" title="Voice Input / মাইক্রোফোন">\n            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>\n          </button>\n';
  html = html.replace('<button type="submit" class="w-8 h-8 shrink-0', micBtn + '          <button type="submit" class="w-8 h-8 shrink-0');
}

// 4. Fix bug 3: simulation sync play & clock
html = html.replace(
  "const playIcon = document.getElementById('sim-play-icon');\n      const playText = document.getElementById('sim-play-text');\n      if (playIcon) playIcon.textContent = AppState.simRunning ? '⏸' : '▶';",
  "const playIcon = document.getElementById('sim-play-icon') || document.getElementById('demo-play-icon');\n      const playText = document.getElementById('sim-play-text') || document.getElementById('demo-play-text');\n      if (playIcon) playIcon.innerHTML = AppState.simRunning ? AppIcons.pause('w-3.5 h-3.5 inline-block') : AppIcons.play('w-3.5 h-3.5 inline-block');"
);
html = html.replace(
  "const clk = document.getElementById('last-update-clock');\n      if (clk) clk.textContent = AppState.lastUpdateTimestamp;",
  "const clk = document.getElementById('last-update-clock') || document.getElementById('demo-clock');\n      if (clk) clk.textContent = AppState.lastUpdateTimestamp;"
);
html = html.replace(
  "const clk = document.getElementById('last-update-clock');\n        if (clk) clk.textContent = `Oct 18, ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} BST`;",
  "const clk = document.getElementById('last-update-clock') || document.getElementById('demo-clock');\n        if (clk) clk.textContent = `Oct 18, ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} BST`;"
);

// 5. Fix bug 4: login error banner
if (!html.includes('id="login-error-banner"')) {
  const loginFormAnchor = '<form id="hardened-login-form" onsubmit="event.preventDefault(); simulatePasskeyDemoSignIn();" class="space-y-3 pt-1">';
  const loginBannerHtml = `<form id="hardened-login-form" onsubmit="event.preventDefault(); simulatePasskeyDemoSignIn();" class="space-y-3 pt-1">
              <div id="login-error-banner" class="hidden p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-medium flex items-center gap-2"></div>`;
  html = html.replace(loginFormAnchor, loginBannerHtml);
}

// 6. Fix bug 5: showToast upgrade
const oldToastPattern = /function showToast\(msg, type = 'info'\) \{[\s\S]*?setTimeout\(\(\) => \{ try \{ el\.remove\(\); \} catch \(e\) \{\} \}, 3600\);\s*\}/;
const newToastCode = `function showToast(msg, type = 'info') {
      const box = document.getElementById('toast-container');
      if (!box) return;
      // Strip leading emoji icons from msg
      const cleanMsg = msg.replace(/^[\\u{1F300}-\\u{1F9FF}\\u{2600}-\\u{26FF}\\u{2700}-\\u{27BF}\\u{1F1E6}-\\u{1F1FF}\\u{1F600}-\\u{1F64F}\\u{1F680}-\\u{1F6FF}\\s]+/gu, '');
      let iconHtml = AppIcons.alert('w-4 h-4 text-sky-400 shrink-0');
      let bg = 'bg-slate-900/95 border-slate-700 text-slate-100';

      if (type === 'success' || msg.includes('Verified') || msg.includes('Welcome') || msg.includes('Active') || msg.includes('updated')) {
        iconHtml = AppIcons.checkCircle('w-4 h-4 text-emerald-400 shrink-0');
        bg = 'bg-emerald-950/95 border-emerald-500/50 text-emerald-100';
      } else if (msg.includes('Denied') || msg.includes('Invalid') || type === 'error') {
        iconHtml = AppIcons.ban('w-4 h-4 text-rose-400 shrink-0');
        bg = 'bg-rose-950/95 border-rose-500/50 text-rose-100';
      } else if (msg.includes('Signed out') || msg.includes('Security Gate') || msg.includes('sign in') || msg.includes('locked')) {
        iconHtml = AppIcons.lock('w-4 h-4 text-amber-400 shrink-0');
        bg = 'bg-slate-900/95 border-amber-500/40 text-amber-100';
      } else if (msg.includes('Voice') || msg.includes('Listening') || msg.includes('audio') || msg.includes('Mic')) {
        iconHtml = AppIcons.mic('w-4 h-4 text-teal-400 shrink-0');
        bg = 'bg-slate-900/95 border-teal-500/40 text-teal-100';
      } else if (msg.includes('Photo') || msg.includes('photo')) {
        iconHtml = AppIcons.camera('w-4 h-4 text-emerald-400 shrink-0');
        bg = 'bg-slate-900/95 border-emerald-500/40 text-emerald-100';
      } else if (msg.includes('Token') || msg.includes('token') || msg.includes('Passkey')) {
        iconHtml = AppIcons.key('w-4 h-4 text-amber-400 shrink-0');
        bg = 'bg-slate-900/95 border-amber-500/40 text-amber-100';
      }

      const el = document.createElement('div');
      el.className = \`pointer-events-auto px-3.5 py-2.5 rounded-xl border shadow-xl text-xs flex items-center gap-2.5 backdrop-blur-md \${bg}\`;
      el.innerHTML = \`\${iconHtml}<span class="font-medium">\${cleanMsg}</span>\`;
      box.appendChild(el);
      setTimeout(() => { try { el.remove(); } catch (e) {} }, 3800);
    }`;

html = html.replace(oldToastPattern, newToastCode);

// 7. Fix theme toggle icon update
html = html.replace(
  "if (icon) icon.textContent = isDark ? '☀️' : '🌙';",
  "if (icon) icon.innerHTML = isDark ? AppIcons.sun('w-4 h-4 text-amber-300') : AppIcons.moon('w-4 h-4 text-slate-300');"
);

// 8. Replace Command palette icons
const oldPaletteAnchor = "['dashboard', '🏠 Dashboard'],";
if (html.includes(oldPaletteAnchor)) {
  const oldChunk = `            \${[
              ['dashboard', '🏠 Dashboard'],
              ['energy-analytics', '⚡ Energy Analytics'],
              ['factory-operations', '🏭 Factory Operations'],
              ['bill-carbon-forecast', '📈 Bill & Carbon Forecast'],
              ['ai-recommendations', '💡 AI Recommendations'],
              ['savings-tracker', '💰 Savings Tracker'],
              ['carboniq-report', '🌿 CarbonIQ Report'],
              ['sustainability-reports', '📄 Sustainability Reports'],
              ['machine-monitoring', '⚙️ Machine Monitoring'],
              ['digital-twin', '🧊 3D EPMS Digital Twin'],
              ['inventory-production', '📦 Inventory & Production'],
              ['settings', '🔧 Settings'],
              ['agent-console', '🤖 AI Agent Console']
            ].map(([route, label]) => \`
              <button type="button" onclick="closeAppModal();navigateTo('\${route}')" class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-left text-xs font-semibold">\${label}</button>
            \`).join('')}`;

  const newChunk = `            \${[
              ['dashboard', 'Dashboard', 'home', 'text-emerald-500'],
              ['energy-analytics', 'Energy Analytics', 'bolt', 'text-amber-500'],
              ['factory-operations', 'Factory Operations', 'factory', 'text-sky-500'],
              ['bill-carbon-forecast', 'Bill & Carbon Forecast', 'chartUp', 'text-teal-500'],
              ['ai-recommendations', 'AI Recommendations', 'bulb', 'text-amber-400'],
              ['savings-tracker', 'Savings Tracker', 'money', 'text-emerald-500'],
              ['carboniq-report', 'CarbonIQ Report', 'leaf', 'text-emerald-500'],
              ['sustainability-reports', 'Sustainability Reports', 'fileText', 'text-indigo-500'],
              ['machine-monitoring', 'Machine Monitoring', 'gear', 'text-amber-500'],
              ['digital-twin', '3D EPMS Digital Twin', 'cube', 'text-sky-500'],
              ['inventory-production', 'Inventory & Production', 'package', 'text-teal-500'],
              ['settings', 'Settings', 'wrench', 'text-slate-400'],
              ['agent-console', 'AI Agent Console', 'bot', 'text-emerald-500']
            ].map(([route, label, iconKey, iconColor]) => \`
              <button type="button" onclick="closeAppModal();navigateTo('\${route}')" class="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-left text-xs font-semibold flex items-center gap-2">
                <span class="\${iconColor}">\${AppIcons[iconKey] ? AppIcons[iconKey]('w-4 h-4') : ''}</span>
                <span>\${label}</span>
              </button>
            \`).join('')}`;
  html = html.replace(oldChunk, newChunk);
  console.log('Replaced command palette entries.');
}

// 9. Replace search suggestions
html = html.replace(
  "items.push({ label: `⚙️ ${u.id} — ${u.name} (${u.currentKw} kW)`, action: () => { box.classList.add('hidden'); inspectMachineDetail(u.id); } });",
  "items.push({ label: `${u.id} — ${u.name} (${u.currentKw} kW)`, icon: 'gear', action: () => { box.classList.add('hidden'); inspectMachineDetail(u.id); } });"
);
html = html.replace(
  "items.push({ label: '🧊 Open 3D EPMS Digital Twin (BREAKER_CBX-305)', action: () => { box.classList.add('hidden'); navigateTo('digital-twin'); } });",
  "items.push({ label: 'Open 3D EPMS Digital Twin (BREAKER_CBX-305)', icon: 'cube', action: () => { box.classList.add('hidden'); navigateTo('digital-twin'); } });"
);
html = html.replace(
  "items.push({ label: `💡 ${r.id}: ${r.title}`, action: () => { box.classList.add('hidden'); navigateTo('ai-recommendations'); } });",
  "items.push({ label: `${r.id}: ${r.title}`, icon: 'bulb', action: () => { box.classList.add('hidden'); navigateTo('ai-recommendations'); } });"
);
html = html.replace(
  "btn.className = 'w-full text-left px-3 py-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800 last:border-0 truncate';\n        btn.textContent = it.label;",
  "btn.className = 'w-full text-left px-3 py-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800 last:border-0 truncate flex items-center gap-2';\n        const iconSvg = it.icon && AppIcons[it.icon] ? AppIcons[it.icon]('w-3.5 h-3.5 text-emerald-400 shrink-0') : '';\n        btn.innerHTML = `${iconSvg}<span>${it.label}</span>`;"
);

// 10. Replace static HTML emojis:
html = html.replace('<button type="button" onclick="toggleMobileSidebar(false)" class="p-1 rounded-lg text-slate-400 hover:text-white" aria-label="Close menu">✕</button>',
  `<button type="button" onclick="toggleMobileSidebar(false)" class="p-1 rounded-lg text-slate-400 hover:text-white flex items-center justify-center" aria-label="Close menu">${ICONS.close('w-4 h-4')}</button>`);

html = html.replace('<button type="button" onclick="closeAppModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white" aria-label="Close modal">✕</button>',
  `<button type="button" onclick="closeAppModal()" class="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white flex items-center justify-center" aria-label="Close modal">${ICONS.close('w-4 h-4')}</button>`);

html = html.replace('<span>📍 Gazipur, Dhaka</span>', `<span class="inline-flex items-center gap-1.5"><span class="text-emerald-400">${ICONS.pin('w-3.5 h-3.5')}</span><span>Gazipur, Dhaka</span></span>`);
html = html.replace('<span class="text-sm">🏭</span>', `<span class="text-emerald-400">${ICONS.factory('w-4 h-4')}</span>`);
html = html.replace('alt="🏭"', 'alt="Factory Facility"');

html = html.replace('🌐 EN', `<span class="inline-flex items-center gap-1"><span class="text-emerald-400">${ICONS.globe('w-3.5 h-3.5')}</span><span>EN</span></span>`);
html = html.replace('<span id="theme-toggle-icon">🌙</span>', `<span id="theme-toggle-icon" class="flex items-center justify-center">${ICONS.moon('w-4 h-4 text-amber-300')}</span>`);
html = html.replace('<div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs">📷</div>',
  `<div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs">${ICONS.camera('w-4 h-4 text-white')}</div>`);

html = html.replace('<div class="text-slate-400 flex items-center justify-center gap-1"><span>🍃</span><span>CO₂ Saved</span></div>',
  `<div class="text-slate-400 flex items-center justify-center gap-1"><span class="text-emerald-400">${ICONS.leaf('w-3.5 h-3.5 inline-block')}</span><span>CO₂ Saved</span></div>`);
html = html.replace('<div class="text-slate-400 flex items-center justify-center gap-1"><span>⚡</span><span>Energy Saved</span></div>',
  `<div class="text-slate-400 flex items-center justify-center gap-1"><span class="text-amber-400">${ICONS.bolt('w-3.5 h-3.5 inline-block')}</span><span>Energy Saved</span></div>`);
html = html.replace('<div class="text-slate-400 flex items-center justify-center gap-1"><span>🌲</span><span>Trees Equiv.</span></div>',
  `<div class="text-slate-400 flex items-center justify-center gap-1"><span class="text-emerald-400">${ICONS.tree('w-3.5 h-3.5 inline-block')}</span><span>Trees Equiv.</span></div>`);

html = html.replace(
  '<button type="button" onclick="toggleMobileSidebar(true)" class="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition text-lg leading-none">☰</button>',
  `<button type="button" onclick="toggleMobileSidebar(true)" class="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition flex items-center justify-center" aria-label="Toggle Navigation">${ICONS.menu('w-5 h-5')}</button>`
);

html = html.replace('<span>🤖</span><span>6 Agents</span>', `<span class="text-emerald-500">${ICONS.bot('w-3.5 h-3.5 inline-block')}</span><span>6 Agents</span>`);
html = html.replace('<span>📡</span>', `<span class="text-emerald-500">${ICONS.telemetry('w-3.5 h-3.5 inline-block animate-pulse')}</span>`);
html = html.replace('title="Reset Copilot Chat">↻</button>', `title="Reset Copilot Chat" class="text-[#15803d] dark:text-emerald-300 hover:bg-[#d8f3e2] dark:hover:bg-slate-800 w-6 h-6 rounded-full flex items-center justify-center transition">${ICONS.refresh('w-3.5 h-3.5')}</button>`);
html = html.replace('aria-label="Close Ask Green AI">×</button>', `aria-label="Close Ask Green AI" class="text-[#15803d] dark:text-emerald-300 hover:bg-[#d8f3e2] dark:hover:bg-slate-800 w-6 h-6 rounded-full flex items-center justify-center transition">${ICONS.close('w-4 h-4')}</button>`);
html = html.replace('<span class="text-sm shrink-0">🎯</span>', `<span class="text-emerald-500 shrink-0">${ICONS.target('w-4 h-4 inline-block')}</span>`);
html = html.replace('<span class="text-sm">🎯</span>', `<span class="text-emerald-500 shrink-0">${ICONS.target('w-4 h-4 inline-block')}</span>`);

html = html.replace('<button type="button" id="btn-copilot-voice-stop" onclick="stopCopilotSpeaking()" class="hidden px-2 py-0.5 rounded-full text-[9px] font-bold text-rose-400 hover:text-rose-300 transition" title="Stop Reading">⏹️</button>',
  `<button type="button" id="btn-copilot-voice-stop" onclick="stopCopilotSpeaking()" class="hidden px-2 py-0.5 rounded-full text-[9px] font-bold text-rose-400 hover:text-rose-300 transition flex items-center gap-1" title="Stop Reading">${ICONS.stop('w-3 h-3')} Stop</button>`);

html = html.replace('<span>🍃 AI POWERED SUSTAINABILITY PLATFORM</span>', `<span class="inline-flex items-center gap-1.5"><span class="text-emerald-400">${ICONS.leaf('w-3.5 h-3.5')}</span><span>AI POWERED SUSTAINABILITY PLATFORM</span></span>`);
html = html.replace('Transforming Factories<br/>into a <span class="text-emerald-400">Greener Future</span> 🍃', `Transforming Factories<br/>into a <span class="text-emerald-400">Greener Future</span> <span class="inline-block text-emerald-400 align-middle ml-1">${ICONS.leaf('w-6 h-6 inline-block')}</span>`);
html = html.replace('<span>💬</span>\n              <span>Sign in to Launch</span>', `<span class="text-slate-950">${ICONS.chat('w-4 h-4')}</span>\n              <span>Sign in to Launch</span>`);
html = html.replace('<span>🍃</span><span>Sustainable • Smart • Compliant</span>', `<span class="text-emerald-400">${ICONS.leaf('w-3.5 h-3.5')}</span><span>Sustainable • Smart • Compliant</span>`);
html = html.replace('<span>🔒</span>\n                <span>Sign in to Green Factory Brain AI</span>', `<span class="text-emerald-400">${ICONS.lock('w-4 h-4')}</span>\n                <span>Sign in to Green Factory Brain AI</span>`);

html = html.replace('<span id="persona-check-manager" class="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[10px] font-black">✓</span>',
  `<span id="persona-check-manager" class="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[10px] font-black">${ICONS.check('w-3 h-3')}</span>`);
html = html.replace('<span id="persona-check-owner" class="hidden w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[10px] font-black">✓</span>',
  `<span id="persona-check-owner" class="hidden w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[10px] font-black">${ICONS.check('w-3 h-3')}</span>`);

html = html.replace('<button type="button" onclick="togglePasswordVisibility()" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white" title="Toggle password visibility">👁️</button>',
  `<button type="button" id="btn-toggle-password" onclick="togglePasswordVisibility()" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white" title="Toggle password visibility">${ICONS.eye('w-4 h-4')}</button>`);

html = html.replace('<span>🛡️ Manager &amp; Owner Only</span>', `<span class="inline-flex items-center gap-1"><span class="text-emerald-400">${ICONS.shield('w-3.5 h-3.5')}</span> Manager &amp; Owner Only</span>`);
html = html.replace('<span>🛡️ Mandatory Auth Gate</span>', `<span class="inline-flex items-center gap-1"><span class="text-emerald-400">${ICONS.shield('w-3.5 h-3.5')}</span> Mandatory Auth Gate</span>`);
html = html.replace('<span>🔒 Password + Passkey</span>', `<span class="inline-flex items-center gap-1"><span class="text-emerald-400">${ICONS.lock('w-3.5 h-3.5')}</span> Password + Passkey</span>`);

// JS Template emojis:
html = html.replace('<span>🧊 3D EPMS Digital Twin</span>', `<span class="inline-flex items-center gap-1.5"><span class="text-sky-400">\${AppIcons.cube('w-3.5 h-3.5')}</span><span>3D EPMS Digital Twin</span></span>`);
html = html.replace('⚡ Run Scenario', `<span class="inline-flex items-center gap-1"><span class="text-amber-300">\${AppIcons.bolt('w-3.5 h-3.5')}</span> Run Scenario</span>`);

html = html.replace('⚡ Save: 18,500 kWh/mo', `<span class="inline-flex items-center gap-1"><span class="text-amber-500">\${AppIcons.bolt('w-3 h-3')}</span> Save: 18,500 kWh/mo</span>`);
html = html.replace('⚡ Save: 12,400 kWh/mo', `<span class="inline-flex items-center gap-1"><span class="text-amber-500">\${AppIcons.bolt('w-3 h-3')}</span> Save: 12,400 kWh/mo</span>`);
html = html.replace('⚡ Save: 8,600 kWh/mo', `<span class="inline-flex items-center gap-1"><span class="text-amber-500">\${AppIcons.bolt('w-3 h-3')}</span> Save: 8,600 kWh/mo</span>`);

html = html.replace('<h1 class="text-xl font-extrabold text-slate-900 dark:text-white">⚡ Energy Analytics</h1>',
  `<h1 class="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2"><span class="text-amber-500">\${AppIcons.bolt('w-5 h-5')}</span><span>Energy Analytics</span></h1>`);

html = html.replace('<h1 class="text-xl font-extrabold text-slate-900 dark:text-white">🏭 Factory Operations</h1>',
  `<h1 class="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2"><span class="text-sky-500">\${AppIcons.factory('w-5 h-5')}</span><span>Factory Operations</span></h1>`);

html = html.replace('<h1 class="text-xl font-extrabold text-slate-900 dark:text-white">📈 Bill &amp; Carbon Forecast</h1>',
  `<h1 class="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2"><span class="text-teal-500">\${AppIcons.chartUp('w-5 h-5')}</span><span>Bill &amp; Carbon Forecast</span></h1>`);

html = html.replace('<h1 class="text-xl font-extrabold text-slate-900 dark:text-white">💡 AI Recommendations</h1>',
  `<h1 class="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2"><span class="text-amber-400">\${AppIcons.bulb('w-5 h-5')}</span><span>AI Recommendations</span></h1>`);

html = html.replace('<h1 class="text-xl font-extrabold text-slate-900 dark:text-white">💰 Savings Tracker &amp; M&amp;V Ledger</h1>',
  `<h1 class="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2"><span class="text-emerald-500">\${AppIcons.money('w-5 h-5')}</span><span>Savings Tracker &amp; M&amp;V Ledger</span></h1>`);

html = html.replace('<h1 class="text-xl font-extrabold text-slate-900 dark:text-white">📄 Sustainability Reports Library</h1>',
  `<h1 class="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2"><span class="text-indigo-500">\${AppIcons.fileText('w-5 h-5')}</span><span>Sustainability Reports Library</span></h1>`);

html = html.replace('<h1 class="text-xl font-extrabold text-slate-900 dark:text-white">⚙️ Machine Monitoring Fleet (18 Units)</h1>',
  `<h1 class="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2"><span class="text-amber-500">\${AppIcons.gear('w-5 h-5')}</span><span>Machine Monitoring Fleet (18 Units)</span></h1>`);

html = html.replace('<h1 class="text-xl font-extrabold text-slate-900 dark:text-white">📦 Inventory &amp; Production Management</h1>',
  `<h1 class="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2"><span class="text-teal-500">\${AppIcons.package('w-5 h-5')}</span><span>Inventory &amp; Production Management</span></h1>`);

html = html.replace('<h1 class="text-xl font-extrabold text-slate-900 dark:text-white">⚙️ Settings, Orchestration &amp; Auth</h1>',
  `<h1 class="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2"><span class="text-slate-400">\${AppIcons.gear('w-5 h-5')}</span><span>Settings, Orchestration &amp; Auth</span></h1>`);

html = html.replace('<h2 class="text-sm font-bold text-slate-900 dark:text-white">🚨 Operational Alerts (Simulation Only)</h2>',
  `<h2 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5"><span class="text-rose-500">\${AppIcons.alertTriangle('w-4 h-4')}</span><span>Operational Alerts (Simulation Only)</span></h2>`);

html = html.replace('<h2 class="text-sm font-bold text-slate-900 dark:text-white">🕒 Operational Event &amp; Audit Timeline</h2>',
  `<h2 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5"><span class="text-sky-500">\${AppIcons.clock('w-4 h-4')}</span><span>Operational Event &amp; Audit Timeline</span></h2>`);

html = html.replace('<h2 class="text-sm font-bold text-slate-900 dark:text-white">⚙️ Configurable Forecast Assumptions</h2>',
  `<h2 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5"><span class="text-slate-400">\${AppIcons.sliders('w-4 h-4')}</span><span>Configurable Forecast Assumptions</span></h2>`);

html = html.replace('<span class="text-xs font-bold text-slate-900 dark:text-white">☀️ Day Shift (08:00–18:00 BST)</span>',
  `<span class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5"><span class="text-amber-400">\${AppIcons.sun('w-3.5 h-3.5')}</span><span>Day Shift (08:00–18:00 BST)</span></span>`);

html = html.replace('<span class="text-xs font-bold text-slate-900 dark:text-white">🌙 Night Shift (18:00–02:00 BST)</span>',
  `<span class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5"><span class="text-indigo-400">\${AppIcons.moon('w-3.5 h-3.5')}</span><span>Night Shift (18:00–02:00 BST)</span></span>`);

html = html.replace('<span class="text-xs font-bold text-slate-900 dark:text-white">⚙️ Fleet Status Breakdown (18 Units)</span>',
  `<span class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5"><span class="text-amber-400">\${AppIcons.gear('w-3.5 h-3.5')}</span><span>Fleet Status Breakdown (18 Units)</span></span>`);

html = html.replace('🔍 Inspect &amp; Compare', `<span class="inline-flex items-center gap-1">\${AppIcons.search('w-3.5 h-3.5')} Inspect &amp; Compare</span>`);
html = html.replace('✓ Approve for Sim', `<span class="inline-flex items-center gap-1">\${AppIcons.check('w-3.5 h-3.5')} Approve for Sim</span>`);
html = html.replace('⚡ Apply in Simulation', `<span class="inline-flex items-center gap-1">\${AppIcons.bolt('w-3.5 h-3.5')} Apply in Simulation</span>`);
html = html.replace('🛡️ Verify vs. Baseline', `<span class="inline-flex items-center gap-1">\${AppIcons.shield('w-3.5 h-3.5')} Verify vs. Baseline</span>`);
html = html.replace('✕ Reject', `<span class="inline-flex items-center gap-1">\${AppIcons.close('w-3.5 h-3.5')} Reject</span>`);
html = html.replace('🛡️ Verify Comparable Savings Windows', `<span class="inline-flex items-center gap-1.5">\${AppIcons.shield('w-3.5 h-3.5')} Verify Comparable Savings Windows</span>`);
html = html.replace('<span class="text-lg">⚠️</span>', `<span class="text-amber-500">\${AppIcons.alertTriangle('w-5 h-5')}</span>`);

html = html.replace(/⛶ Fullscreen/g, `<span class="inline-flex items-center gap-1.5">\${AppIcons.expand('w-3.5 h-3.5')} Fullscreen</span>`);

html = html.replace('Night-Shift Waste Reduction &amp; ৳ 68,000/mo Savings Plan Ready ✅',
  `Night-Shift Waste Reduction &amp; ৳ 68,000/mo Savings Plan Ready <span class="text-emerald-400 inline-block align-middle ml-1">\${AppIcons.checkCircle('w-4 h-4 inline-block')}</span>`);

html = html.replace('<span>✨ AI Copilot Thinking...</span>',
  `<span class="inline-flex items-center gap-1.5"><span class="text-emerald-400 animate-spin">\${AppIcons.sparkles('w-3.5 h-3.5')}</span><span>AI Copilot Thinking...</span></span>`);

html = html.replace('<span>💭</span>', `<span class="text-emerald-400">\${AppIcons.thought('w-4 h-4')}</span>`);
html = html.replace('<span>🔊</span><span>Listen</span>', `<span class="inline-flex items-center gap-1"><span class="text-emerald-400">\${AppIcons.volume('w-3.5 h-3.5')}</span><span>Listen</span></span>`);

html = html.replace('✓ Connected Factory Telemetry', `<span class="inline-flex items-center gap-1">\${AppIcons.checkCircle('w-3 h-3 text-emerald-300')} Connected Factory Telemetry</span>`);
html = html.replace('🌿 CarbonIQ', `<span class="inline-flex items-center gap-1">\${AppIcons.leaf('w-3 h-3 text-emerald-400')} CarbonIQ</span>`);
html = html.replace('🤖 6 Agents', `<span class="inline-flex items-center gap-1">\${AppIcons.bot('w-3 h-3 text-emerald-400')} 6 Agents</span>`);
html = html.replace('⚡ Scenarios', `<span class="inline-flex items-center gap-1">\${AppIcons.bolt('w-3 h-3 text-amber-400')} Scenarios</span>`);

html = html.replace("title: '👤 Executive Operator Profile & Security Clearance',",
  "title: '<span class=\"inline-flex items-center gap-2\">' + AppIcons.user('w-5 h-5 text-emerald-400') + ' Executive Operator Profile & Security Clearance</span>',");

html = html.replace("confirmLabel: '🚪 Sign Out of Platform',",
  "confirmLabel: 'Sign Out of Platform',");

html = html.replace('<span class="text-sm">🔒</span><span>Password + Passkey Verified</span>',
  `<span class="text-emerald-400">\${AppIcons.lock('w-3.5 h-3.5')}</span><span>Password + Passkey Verified</span>`);

html = html.replace('<div class="text-3xl">🧭</div>',
  `<div class="w-12 h-12 mx-auto text-emerald-400 flex items-center justify-center">\${AppIcons.compass('w-12 h-12')}</div>`);

html = html.replace('Adjust Stock ⚙️', `<span class="inline-flex items-center gap-1.5">Adjust Stock \${AppIcons.sliders('w-3.5 h-3.5')}</span>`);
html = html.replace('<div id="sim-kpi-carbon" class="text-base font-extrabold text-teal-600 mt-0.5">🌱 ${formatNum(m.totalRecSavedCo2, 2)} t</div>',
  `<div id="sim-kpi-carbon" class="text-base font-extrabold text-teal-600 mt-0.5 flex items-center gap-1"><span class="text-teal-500">\${AppIcons.leaf('w-3.5 h-3.5')}</span> \${formatNum(m.totalRecSavedCo2, 2)} t</div>`);
html = html.replace('if (elCarb) elCarb.textContent = `🌱 ${formatNum(m.totalRecSavedCo2, 2)} t`;',
  'if (elCarb) elCarb.innerHTML = `<span class="text-teal-500 inline-block align-middle mr-1">${AppIcons.leaf("w-3.5 h-3.5 inline-block")}</span>${formatNum(m.totalRecSavedCo2, 2)} t`;');

html = html.replace('🔄 Reload Engine', `<span class="inline-flex items-center gap-1.5">\${AppIcons.refresh('w-3.5 h-3.5')} Reload Engine</span>`);
html = html.replace('🔄 Reset', `<span class="inline-flex items-center gap-1.5">\${AppIcons.refresh('w-3.5 h-3.5')} Reset</span>`);
html = html.replace("isActive ? '✓ Active Scenario' : 'Click to Activate'",
  "isActive ? ('<span class=\"inline-flex items-center gap-1\">' + AppIcons.checkCircle('w-3.5 h-3.5 text-emerald-400') + ' Active Scenario</span>') : 'Click to Activate'");
html = html.replace('<span class="text-xs">⚡</span>', `<span class="text-amber-400">\${AppIcons.bolt('w-3.5 h-3.5')}</span>`);

html = html.replace('<span>📷 Upload Profile Photo</span>', `<span class="inline-flex items-center gap-1.5">\${AppIcons.camera('w-3.5 h-3.5')} Upload Profile Photo</span>`);
html = html.replace('<span>🚪 Sign Out &amp; Lock Session</span>', `<span class="inline-flex items-center gap-1.5">\${AppIcons.logout('w-3.5 h-3.5')} Sign Out &amp; Lock Session</span>`);
html = html.replace('<span class="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm font-bold">👤</span>',
  `<span class="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">\${AppIcons.user('w-4 h-4 text-white')}</span>`);
html = html.replace('<button type="button" onclick="triggerProfilePhotoInput()" class="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition">📷 Upload Photo</button>',
  `<button type="button" onclick="triggerProfilePhotoInput()" class="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition flex items-center gap-1.5">\${AppIcons.camera('w-3.5 h-3.5')} Upload Photo</button>`);
html = html.replace('<button type="button" onclick="handleSignOut()" class="px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 font-bold text-[11px] border border-rose-300/60 transition">🚪 Sign Out</button>',
  `<button type="button" onclick="handleSignOut()" class="px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 font-bold text-[11px] border border-rose-300/60 transition flex items-center gap-1.5">\${AppIcons.logout('w-3.5 h-3.5')} Sign Out</button>`);

html = html.replace('<span class="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center text-sm font-bold">⚡</span>',
  `<span class="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center">\${AppIcons.bolt('w-4 h-4 text-white')}</span>`);
html = html.replace('<span class="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center text-sm font-bold">🧊</span>',
  `<span class="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center">\${AppIcons.cube('w-4 h-4 text-white')}</span>`);
html = html.replace('Toggle Light / Dark ☀️', `<span class="inline-flex items-center gap-1.5">Toggle Light / Dark \${AppIcons.sun('w-3.5 h-3.5 text-amber-400')}</span>`);
html = html.replace('<span class="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">📜</span>',
  `<span class="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">\${AppIcons.fileText('w-4 h-4 text-white')}</span>`);

html = html.replace('🎯 4-Mo Savings &amp; Night Shift Plan', `<span class="inline-flex items-center gap-1.5"><span class="text-emerald-600">\${AppIcons.target('w-3.5 h-3.5')}</span> 4-Mo Savings &amp; Night Shift Plan</span>`);
html = html.replace('💬 Open Copilot Chat', `<span class="inline-flex items-center gap-1.5">\${AppIcons.chat('w-3.5 h-3.5 text-white')} Open Copilot Chat</span>`);
html = html.replace('Run ${ag.name} Individually ⚡', `Run \${ag.name} Individually <span class="text-amber-400 inline-block align-middle ml-1">\${AppIcons.bolt('w-3.5 h-3.5 inline-block')}</span>`);

fs.writeFileSync(filePath, html, 'utf8');
console.log('Done! New index.html length:', html.length);
