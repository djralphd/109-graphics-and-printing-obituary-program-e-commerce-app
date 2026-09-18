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

export function calculatePrice({ sizeId, pageId, quantity, rush }) {
  const size = SIZES.find((s) => s.id === sizeId) || SIZES[0];
  const page = PAGE_OPTIONS.find((p) => p.id === pageId) || PAGE_OPTIONS[0];

  // Get exact price from matrix
  const subtotal = PRICING_MATRIX[sizeId][pageId][quantity];
  const unitPrice = subtotal / quantity;

  // 25% rush fee
  const rushFee = rush ? subtotal * 0.25 : 0;

  // CA Sales Tax (10.25%)
  const taxRate = 0.1025;
  const tax = (subtotal + rushFee) * taxRate;

  const total = subtotal + rushFee + tax;

  return { size, page, quantity, unitPrice, subtotal, rushFee, tax, total };
}

export function formatUSD(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}