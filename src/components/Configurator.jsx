import React, { useMemo, useState } from 'react'
import { Upload, Check, Zap, FileText, Layers, Hash, Palette, ChevronDown } from 'lucide-react'
import {
  SIZES,
  PAGE_OPTIONS,
  QUANTITY_OPTIONS,
  DESIGN_OPTIONS,
  calculatePrice,
  getDesignFee,
  formatUSD,
} from '../lib/pricing.js'
import { Reveal } from './Reveal.jsx'

export default function Configurator({ onCheckout }) {
  const [sizeId, setSizeId] = useState('letter')
  const [pageId, setPageId] = useState('8')
  const [quantity, setQuantity] = useState(QUANTITY_OPTIONS[0])
  const [rush, setRush] = useState(false)
  const [designId, setDesignId] = useState('none')
  const [fileName, setFileName] = useState('')

  const price = useMemo(
    () => calculatePrice({ sizeId, pageId, quantity, rush, designId }),
    [sizeId, pageId, quantity, rush, designId]
  )

  const designFee = useMemo(
    () => getDesignFee({ sizeId, pageId }),
    [sizeId, pageId]
  )

  const handleFile = (e) => {
    const f = e.target.files?.[0]
    if (f) setFileName(f.name)
  }

  return (
    <section id="configurator" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#C9A227]/5 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#C9A227]">
              Printing Price
            </span>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Build your program in a moment.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/60">
              Choose a size, page count, and quantity. Your printing price updates
              instantly — no hidden fees.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="space-y-8 rounded-3xl border border-white/10 bg-[#111A2E] p-7 sm:p-9">
              <Field icon={FileText} label="Program size">
                <div className="grid gap-3 sm:grid-cols-3">
                  {SIZES.map((s) => (
                    <OptionCard
                      key={s.id}
                      active={sizeId === s.id}
                      onClick={() => setSizeId(s.id)}
                      title={s.label}
                      subtitle={s.desc}
                    />
                  ))}
                </div>
              </Field>

              <Field icon={Layers} label="Page count">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {PAGE_OPTIONS.map((p) => (
                    <OptionCard
                      key={p.id}
                      active={pageId === p.id}
                      onClick={() => setPageId(p.id)}
                      title={p.label}
                      subtitle={`from ${formatUSD(p.base)}`}
                    />
                  ))}
                </div>
              </Field>

              <Field icon={Palette} label="Design services">
                <div className="relative">
                  <select
                    value={designId}
                    onChange={(e) => setDesignId(e.target.value)}
                    className="w-full appearance-none rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 pr-12 text-sm font-semibold text-white outline-none transition-colors focus:border-[#C9A227] focus:bg-white/[0.05]"
                    aria-label="Design services"
                  >
                    {DESIGN_OPTIONS.map((d) => (
                      <option key={d.id} value={d.id} className="bg-[#111A2E] text-white">
                        {d.label} — {d.id === 'yes' ? formatUSD(designFee) : '$0'}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C9A227]" />
                </div>
                <p className="mt-3 text-xs leading-relaxed text-white/45">
                  {DESIGN_OPTIONS.find((d) => d.id === designId)?.desc}
                  {designId === 'yes' &&
                    ` · ${formatUSD(designFee)} flat for this size & page count.`}
                </p>
              </Field>

              <Field icon={Hash} label="Quantity">
                <div className="flex flex-wrap items-center gap-3">
                  {QUANTITY_OPTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setQuantity(q)}
                      className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                        quantity === q
                          ? 'bg-[#C9A227] text-[#0B1120] shadow-lg shadow-[#C9A227]/25'
                          : 'border border-white/10 bg-white/5 text-white/70 hover:border-white/25 hover:text-white'
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                  <span className="text-xs text-white/40">
                    If you need more then call.
                  </span>
                </div>
              </Field>

              <Field icon={Upload} label="Upload photos & text (optional)">
                <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-dashed border-white/20 bg-white/[0.03] px-5 py-5 transition-colors hover:border-[#C9A227]/50 hover:bg-[#C9A227]/5">
                  <span className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#C9A227]/15 text-[#E8D48B]">
                      <Upload className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-white/70">
                      {fileName || 'Choose a file — JPG, PNG, PDF, DOCX'}
                    </span>
                  </span>
                  <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white">
                    Browse
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                    onChange={handleFile}
                  />
                </label>
              </Field>

              <button
                type="button"
                onClick={() => setRush((v) => !v)}
                className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all ${
                  rush
                    ? 'border-[#C9A227]/60 bg-[#C9A227]/10'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/25'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#C9A227]/15 text-[#E8D48B]">
                    <Zap className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">
                      Rush service
                    </span>
                    <span className="block text-xs text-white/50">
                      Priority print · 24–48 hour turnaround
                    </span>
                  </span>
                </span>
                <span
                  className={`grid h-6 w-6 place-items-center rounded-full border transition-all ${
                    rush
                      ? 'border-[#C9A227] bg-[#C9A227] text-[#0B1120]'
                      : 'border-white/25'
                  }`}
                >
                  {rush && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                </span>
              </button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="sticky top-28 rounded-3xl border border-[#C9A227]/25 bg-gradient-to-b from-[#141F38] to-[#0E1626] p-7 shadow-2xl shadow-black/40 sm:p-8">
              <h3 className="font-serif text-2xl font-semibold text-white">
                Your estimate
              </h3>
              <p className="mt-1 text-sm text-white/50">
                {price.page.label} · {price.size.label} · {price.quantity} copies
              </p>

              <div className="mt-7 space-y-3.5 text-sm">
                <Row label="Unit price" value={formatUSD(price.unitPrice)} />
                <Row label="Printing subtotal" value={formatUSD(price.subtotal)} />
                {rush && (
                  <Row
                    label="Rush service (25%)"
                    value={formatUSD(price.rushFee)}
                  />
                )}
                {price.designFee > 0 && (
                  <Row
                    label="Design services"
                    value={formatUSD(price.designFee)}
                  />
                )}
                <Row label="Sales Tax" value={formatUSD(price.tax)} />
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-base font-semibold text-white">
                      Total
                    </span>
                    <span className="font-serif text-4xl font-semibold text-[#E8D48B]">
                      {formatUSD(price.total)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onCheckout({ ...price, rush, designId, fileName })}
                className="mt-8 w-full rounded-full bg-gradient-to-r from-[#C9A227] to-[#A8861B] px-6 py-4 text-base font-semibold text-[#0B1120] shadow-xl shadow-[#C9A227]/25 transition-all hover:brightness-110"
              >
                Continue to checkout
              </button>
              <p className="mt-4 text-center text-xs text-white/40">
                {price.designId === 'yes'
                  ? 'Design service included in your total above.'
                  : 'Additional payment is required if you need a design.'}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({ icon: Icon, label, children }) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2.5">
        <Icon className="h-4 w-4 text-[#C9A227]" />
        <span className="text-sm font-semibold uppercase tracking-wider text-white/70">
          {label}
        </span>
      </div>
      {children}
    </div>
  )
}

function OptionCard({ active, onClick, title, subtitle }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border px-4 py-4 text-left transition-all ${
        active
          ? 'border-[#C9A227] bg-[#C9A227]/10 shadow-lg shadow-[#C9A227]/10'
          : 'border-white/10 bg-white/[0.03] hover:border-white/25'
      }`}
    >
      <span
        className={`block text-sm font-semibold ${
          active ? 'text-[#E8D48B]' : 'text-white'
        }`}
      >
        {title}
      </span>
      <span className="mt-0.5 block text-xs text-white/45">{subtitle}</span>
    </button>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/55">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  )
}
