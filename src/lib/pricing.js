export const SIZES = [
  { id: 'letter', label: '8.5 × 11 in.', desc: 'Standard letter', multiplier: 1 },
  { id: 'half', label: '5.5 × 8.5 in.', desc: 'Half-fold booklet', multiplier: 0.82 },
]

export const PAGE_OPTIONS = [
  { id: '8', label: '8 pages', pages: 8, base: 2.65 },
  { id: '12', label: '12 pages', pages: 12, base: 3.45 },
  { id: '16', label: '16 pages', pages: 16, base: 4.25 },
  { id: '20', label: '20 pages', pages: 20, base: 5.05 },
]

export const QUANTITY_TIERS = [
  { min: 100, max: 199, rate: 0.84 },
  { min: 200, max: 299, rate: 0.76 },
  { min: 300, max: Infinity, rate: 0.68 },
]

export const TAX_RATE = 0.1025 // California sales tax

export function getTierRate(quantity) {
  const tier = QUANTITY_TIERS.find((t) => quantity >= t.min && quantity <= t.max)
  return tier ? tier.rate : 0.84
}

export function calculatePrice({ sizeId, pageId, quantity, rush = false }) {
  const size = SIZES.find((s) => s.id === sizeId) || SIZES[0]
  const page = PAGE_OPTIONS.find((p) => p.id === pageId) || PAGE_OPTIONS[0]
  const qty = Math.max(100, Number(quantity) || 100)

  const unitBase = page.base * size.multiplier
  const tierRate = getTierRate(qty)
  const unitPrice = unitBase * tierRate
  const subtotal = unitPrice * qty
  const rushFee = rush ? subtotal * 0.25 : 0
  const taxable = subtotal + rushFee
  const tax = taxable * TAX_RATE
  const total = taxable + tax

  return {
    size,
    page,
    quantity: qty,
    unitPrice: round(unitPrice),
    subtotal: round(subtotal),
    rushFee: round(rushFee),
    tax: round(tax),
    total: round(total),
    tierRate,
  }
}

function round(n) {
  return Math.round(n * 100) / 100
}

export function formatUSD(n) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(n)
}
