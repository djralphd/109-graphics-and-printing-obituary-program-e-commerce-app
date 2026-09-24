// src/lib/pricing.js

export const SIZES = [
  { id: 'letter', label: 'Standard (8.5" x 5.5")', desc: 'Folds from 8.5" x 11"' },
  { id: 'tabloid', label: 'Large (8.5" x 11")', desc: 'Folds from 11" x 17"' }
];

export const PAGE_OPTIONS = [
  { id: '8', label: '8 Pages', base: 3.48 },
  { id: '12', label: '12 Pages', base: 4.48 },
  { id: '16', label: '16 Pages', base: 5.48 },
  { id: '20', label: '20 Pages', base: 6.48 }
];

// Quantity is fixed to these preset tiers only — no manual entry.
export const QUANTITY_OPTIONS = [100, 200, 300];

export const DESIGN_OPTIONS = [
  { id: 'none', label: 'No design needed', desc: 'I have print-ready artwork' },
  { id: 'yes', label: 'Yes, please design it for me', desc: 'Our team designs your program' }
];

const PRICING_MATRIX = {
  'letter': {
    '8': { 100: 348, 200: 582, 300: 805 },
    '12': { 100: 448, 200: 771, 300: 1084 },
    '16': { 100: 548, 200: 956, 300: 1348 },
    '20': { 100: 648, 200: 1148, 300: 1645 }
  },
  'tabloid': {
    '8': { 100: 519, 200: 807, 300: 1075 },
    '12': { 100: 649, 200: 1059, 300: 1445 },
    '16': { 100: 784, 200: 1307, 300: 1787 },
    '20': { 100: 917, 200: 1565, 300: 2207 }
  }
};

// Design service charge — flat fee based on size + page count.
// 8.5" x 5.5"  → $250 / $350 / $450 / $550  (8 / 12 / 16 / 20 pages)
// 8.5" x 11"   → $450 / $650 / $850 / $950  (8 / 12 / 16 / 20 pages)
const DESIGN_MATRIX = {
  'letter': {
    '8': 250,
    '12': 350,
    '16': 450,
    '20': 550
  },
  'tabloid': {
    '8': 450,
    '12': 650,
    '16': 850,
    '20': 950
  }
};

export function getDesignFee({ sizeId, pageId }) {
  return DESIGN_MATRIX[sizeId]?.[pageId] ?? 0;
}

export function calculatePrice({ sizeId, pageId, quantity, rush, designId = 'none' }) {
  const size = SIZES.find((s) => s.id === sizeId) || SIZES[0];
  const page = PAGE_OPTIONS.find((p) => p.id === pageId) || PAGE_OPTIONS[0];

  // Exact printing price from matrix
  const subtotal = PRICING_MATRIX[sizeId][pageId][quantity];
  const unitPrice = subtotal / quantity;

  // 25% rush fee on printing
  const rushFee = rush ? subtotal * 0.25 : 0;

  // Design service charge (flat, only when requested)
  const designFee = designId === 'yes' ? getDesignFee({ sizeId, pageId }) : 0;

  // CA Sales Tax (10.25%) applies to printing + rush + design
  const taxRate = 0.1025;
  const tax = (subtotal + rushFee + designFee) * taxRate;

  const total = subtotal + rushFee + designFee + tax;

  return {
    size,
    page,
    quantity,
    unitPrice,
    subtotal,
    rushFee,
    designFee,
    designId,
    tax,
    total
  };
}

export function formatUSD(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}
