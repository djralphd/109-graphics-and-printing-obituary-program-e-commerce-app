import { Check } from 'lucide-react'

export default function OptionCard({ selected, onClick, label, sublabel, description, price }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group relative flex w-full flex-col rounded-2xl border p-5 text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 ${
        selected
          ? 'border-gold-400 bg-white shadow-gold'
          : 'border-cream-300 bg-white/60 hover:border-navy-300 hover:bg-white hover:shadow-soft'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-serif text-xl font-semibold text-navy-900">{label}</p>
          {sublabel && (
            <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.12em] text-navy-400">
              {sublabel}
            </p>
          )}
        </div>
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            selected ? 'border-gold-500 bg-gold-500 text-white' : 'border-cream-400 bg-white text-transparent'
          }`}
        >
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
      </div>
      {description && <p className="mt-3 text-sm leading-relaxed text-navy-500">{description}</p>}
      {price != null && (
        <p className="mt-3 text-sm font-semibold text-gold-600">{price}</p>
      )}
    </button>
  )
}
