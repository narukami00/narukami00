const fs = require('fs');
const path = require('path');

const status = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../status.json'), 'utf8')
);

const truncate = (str, max = 34) =>
  str && str.length > max ? str.slice(0, max - 1) + '…' : (str || '—');

const escapeXml = (str) =>
  String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const academic = escapeXml(truncate(status.academic || '3rd Year, 2nd Sem @ KUET'));
const building = escapeXml(truncate(status.building || 'None (queue open)'));
const exploring = escapeXml(truncate(status.exploring || status.learning || '—'));
const updated = escapeXml(status.updated || new Date().toISOString().split('T')[0]);

const svg = `<svg width="490" height="150" viewBox="0 0 490 150" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    .terminal-title { font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace; font-size: 11px; fill: #6e7681; font-weight: 500; }
    .label { font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace; font-size: 11px; fill: #7d8590; letter-spacing: 0.06em; font-weight: 600; }
    .val { font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace; font-size: 11px; fill: #e6edf3; }
    .val-dim { font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace; font-size: 11px; fill: #8b949e; font-style: italic; }
    .time { font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace; font-size: 10px; fill: #484f58; }
  </style>

  <!-- Container Box -->
  <rect x="0.5" y="0.5" width="489" height="149" rx="10" fill="#0d1117" stroke="#30363d"/>

  <!-- Terminal Header Bar -->
  <path d="M0.5 10C0.5 4.75329 4.75329 0.5 10 0.5H480C485.247 0.5 489.5 4.75329 489.5 10V28.5H0.5V10Z" fill="#161b22"/>
  <line x1="0.5" y1="28.5" x2="489.5" y2="28.5" stroke="#30363d"/>

  <!-- Window Buttons -->
  <circle cx="16" cy="14.5" r="4.5" fill="#ff5f56"/>
  <circle cx="30" cy="14.5" r="4.5" fill="#ffbd2e"/>
  <circle cx="44" cy="14.5" r="4.5" fill="#27c93f"/>

  <!-- Header Title / Date -->
  <text x="64" y="18" class="terminal-title">status@narukami00:~</text>
  <text x="474" y="18" text-anchor="end" class="time">UPDATED: ${updated}</text>

  <!-- Row 1: STATUS / ACADEMIC -->
  <circle cx="20" cy="50" r="3.5" fill="#58a6ff" opacity="0.9"/>
  <text x="34" y="54" class="label">STATUS</text>
  <text x="116" y="54" class="val">${academic}</text>

  <line x1="16" y1="67" x2="474" y2="67" stroke="#21262d" stroke-width="1"/>

  <!-- Row 2: FOCUS / BUILDING -->
  <circle cx="20" cy="84" r="3.5" fill="#B8D4E8" opacity="0.8"/>
  <text x="34" y="88" class="label">BUILDING</text>
  <text x="116" y="88" class="${building.toLowerCase().includes('none') ? 'val-dim' : 'val'}">${building}</text>

  <line x1="16" y1="101" x2="474" y2="101" stroke="#21262d" stroke-width="1"/>

  <!-- Row 3: EXPLORING -->
  <circle cx="20" cy="118" r="3.5" fill="#a371f7" opacity="0.85"/>
  <text x="34" y="122" class="label">EXPLORING</text>
  <text x="116" y="122" class="val">${exploring}</text>
</svg>`;

fs.writeFileSync(path.join(__dirname, '../status-card.svg'), svg, 'utf8');
console.log('✓ status-card.svg generated successfully');

