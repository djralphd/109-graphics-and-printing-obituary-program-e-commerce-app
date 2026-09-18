import React, { useEffect, useState } from 'react'
import { X, CheckCircle, ShieldCheck, Lock } from 'lucide-react'
import { formatUSD } from '../lib/pricing.js'

const EMPTY_FORM = {
  fullName: '',
  memorialName: '',
  phone: '',
  email: '',
  address: '',
}

export default function CheckoutModal({ isOpen, onClose, orderData }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)

  // Reset internal state whenever the modal is (re)opened
  useEffect(() => {
    if (isOpen) {
      setForm(EMPTY_FORM)
      setProcessing(false)
      setSuccess(false)
    }
  }, [isOpen])

  // Lock body scroll + close on Escape while open
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setProcessing(true)
    // Simulated payment processing
    setTimeout(() => {
      setProcessing(false)
      setSuccess(true)
    }, 1600)
  }

  const order = orderData || {}
  const sizeLabel = order.size?.label || '8.5 x 11 in.'
  const pageLabel = order.page?.label || '8 pages'
  const quantity = order.quantity || 0
  const subtotal = order.subtotal || 0
  const rushFee = order.rushFee || 0
  const tax = order.tax || 0
  const total = order.total || 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Checkout"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
    >
      <div className="relative my-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[#0E1626] shadow-2xl shadow-black/60">
        <button
          onClick={onClose}
          aria-label="Close checkout"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {success ? (
          <SuccessScreen
            form={form}
            total={total}
            quantity={quantity}
            onClose={onClose}
          />
        ) : (
          <div className="grid lg:grid-cols-[1.15fr_1fr]">
            {/* Customer details */}
            <form
              onSubmit={handleSubmit}
              className="order-2 space-y-5 p-7 sm:p-9 lg:order-1"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C9A227]">
                  Secure checkout
                </span>
                <h2 className="mt-2 font-serif text-3xl font-semibold text-white">
                  Your details
                </h2>
                <p className="mt-2 text-sm text-white/55">
                  We use these details to prepare your proof and deliver your
                  order.
                </p>
              </div>

              <Input
                label="Full name"
                value={form.fullName}
                onChange={update('fullName')}
                placeholder="Jane Doe"
                required
              />
              <Input
                label="Memorial / deceased name"
                value={form.memorialName}
                onChange={update('memorialName')}
                placeholder="In loving memory of..."
                required
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  label="Phone number"
                  type="tel"
                  value={form.phone}
                  onChange={update('phone')}
                  placeholder="(323) 000-0000"
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-white/70">
                  Shipping address
                </label>
                <textarea
                  value={form.address}
                  onChange={update('address')}
                  rows={3}
                  required
                  placeholder="Street, city, state, ZIP"
                  className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#C9A227] focus:bg-white/[0.05]"
                />
              </div>

              <button
                type="submit"
                disabled={processing}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C9A227] to-[#A8861B] px-6 py-4 text-base font-semibold text-[#0B1120] shadow-xl shadow-[#C9A227]/25 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {processing ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0B1120]/40 border-t-[#0B1120]" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Pay with Card &middot; {formatUSD(total)}
                  </>
                )}
              </button>

              <p className="flex items-center justify-center gap-2 text-center text-xs text-white/40">
                <ShieldCheck className="h-3.5 w-3.5 text-[#E8D48B]" />
                Encrypted &amp; secure. No charge until you approve your proof.
              </p>
            </form>

            {/* Order summary */}
            <aside className="order-1 border-b border-white/10 bg-gradient-to-b from-[#141F38] to-[#0E1626] p-7 sm:p-9 lg:order-2 lg:border-b-0 lg:border-l">
              <h3 className="font-serif text-2xl font-semibold text-white">
                Order summary
              </h3>

              <dl className="mt-6 space-y-3.5 text-sm">
                <Row label="Program size" value={sizeLabel} />
                <Row label="Page count" value={pageLabel} />
                <Row label="Quantity" value={`${quantity} copies`} />
                <Row label="Base price" value={formatUSD(subtotal)} />
                {rushFee > 0 && (
                  <Row label="Rush service" value={formatUSD(rushFee)} />
                )}
                <Row
                  label="CA sales tax (10.25%)"
                  value={formatUSD(tax)}
                />
              </dl>

              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-base font-semibold text-white">
                    Total
                  </span>
                  <span className="font-serif text-3xl font-semibold text-[#E8D48B]">
                    {formatUSD(total)}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#E8D48B]" />
                <p className="text-xs leading-relaxed text-white/55">
                  Your payment is processed securely. You will receive a digital
                  proof by email before anything is printed.
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}

function SuccessScreen({ form, total, quantity, onClose }) {
  return (
    <div className="flex flex-col items-center px-7 py-16 text-center sm:px-12">
      <span className="grid h-20 w-20 place-items-center rounded-full bg-[#C9A227]/15 text-[#E8D48B]">
        <CheckCircle className="h-10 w-10" strokeWidth={2} />
      </span>
      <h2 className="mt-7 font-serif text-3xl font-semibold text-white sm:text-4xl">
        Order confirmed
      </h2>
      <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
        Thank you, {form.fullName || 'friend'}. Your order for{' '}
        <span className="font-semibold text-white">{quantity} programs</span> has
        been received. A confirmation has been sent to{' '}
        <span className="font-semibold text-white">
          {form.email || 'your email'}
        </span>
        .
      </p>

      <div className="mt-8 w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/55">Amount charged</span>
          <span className="font-serif text-xl font-semibold text-[#E8D48B]">
            {formatUSD(total)}
          </span>
        </div>
      </div>

      <p className="mt-6 max-w-md text-sm text-white/50">
        Our design team will email your digital proof within a few hours. Reply
        with any changes and we will print once you approve.
      </p>

      <button
        onClick={onClose}
        className="mt-8 rounded-full bg-gradient-to-r from-[#C9A227] to-[#A8861B] px-8 py-3.5 text-base font-semibold text-[#0B1120] shadow-xl shadow-[#C9A227]/25 transition-all hover:brightness-110"
      >
        Done
      </button>
    </div>
  )
}

function Input({ label, type = 'text', value, onChange, placeholder, required }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white/70">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#C9A227] focus:bg-white/[0.05]"
      />
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-white/55">{label}</dt>
      <dd className="font-medium text-white">{value}</dd>
    </div>
  )
}
