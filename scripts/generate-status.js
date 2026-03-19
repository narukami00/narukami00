const fs = require('fs');
const path = require('path');

// Read status.json
const status = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../status.json'), 'utf8')
);

const building = status.building || '—';
const learning = status.learning || '—';

// Truncate long strings so they don't overflow the card
const truncate = (str, max = 28) =>
  str.length > max ? str.slice(0, max - 1) + '…' : str;

const svg = `<svg width="380" height="80" viewBox="0 0 380 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="380" height="80" rx="8" fill="#111111"/>
  <rect x="0.5" y="0.5" width="379" height="79" rx="7.5" stroke="#1e1e1e"/>

  <!-- Row 1 — Building -->
  <circle cx="24" cy="26" r="4" fill="#B8D4E8" opacity="0.9"/>
  <text x="38" y="30" font-family="monospace" font-size="10" fill="#555555" letter-spacing="0.08em">BUILDING</text>
  <text x="120" y="30" font-family="monospace" font-size="10" fill="#F5F5F5">${truncate(building)}</text>

  <!-- Divider -->
  <line x1="16" y1="44" x2="364" y2="44" stroke="#1e1e1e" stroke-width="1"/>

  <!-- Row 2 — Learning -->
  <circle cx="24" cy="58" r="4" fill="#B8D4E8" opacity="0.4"/>
  <text x="38" y="62" font-family="monospace" font-size="10" fill="#555555" letter-spacing="0.08em">LEARNING</text>
  <text x="120" y="62" font-family="monospace" font-size="10" fill="#F5F5F5">${truncate(learning)}</text>
</svg>`;

// Write output
fs.writeFileSync(path.join(__dirname, '../status-card.svg'), svg, 'utf8');
console.log('✓ status-card.svg generated');
console.log(`  Building: ${building}`);
console.log(`  Learning: ${learning}`);
