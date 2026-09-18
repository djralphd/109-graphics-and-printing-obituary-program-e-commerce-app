import { Phone, ArrowRight, ShieldCheck, Clock, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy-950 pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Layered ambient background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 -right-32 h-[36rem] w-[36rem] rounded-full bg-gold-500/10 blur-[120px]" />
        <div className="absolute -bottom-48 -left-32 h-[32rem] w-[32rem] rounded-full bg-navy-500/20 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="container-x relative">
        {/* Centered Copy */}
        <div className="mx-auto max-w-4xl text-center animate-fade-up">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
            <Sparkles className="h-3.5 w-3.5" />
            Serving Los Angeles Families Since 2008
          </span>

          <h1 className="mt-7 font-serif text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-cream-50 sm:text-6xl lg:text-[4.25rem]">
            A dignified tribute,
            <span className="block bg-gradient-to-r from-gold-300 via-gold-400 to-gold-200 bg-clip-text text-transparent mt-2">
              beautifully printed.
            </span>
          </h1>

          <p className="mt-7 mx-auto max-w-2xl text-lg leading-relaxed text-navy-200">
            Custom full-color obituary programs and memorial booklets, crafted with care on
            premium 100&nbsp;lb. gloss book and saddle-stitched for a lasting keepsake.
            Delivered in <strong className="font-semibold text-cream-100">3 to 5 business days</strong>.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
            <a href="#configurator" className="btn-gold group">
              Order Your Program
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="tel:+13235261346"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-navy-600 px-7 py-3.5 text-sm font-semibold text-cream-100 transition-all duration-300 hover:border-gold-400 hover:bg-navy-900"
            >
              <Phone className="h-4 w-4 text-gold-400" />
              (323) 526-1346
            </a>
          </div>

          <dl className="mt-14 mx-auto grid max-w-2xl grid-cols-3 gap-6 border-t border-navy-800 pt-8 text-center">
            {[
              { icon: Clock, label: 'Turnaround', value: '3–5 Days' },
              { icon: ShieldCheck, label: 'Stock', value: '100 lb. Gloss' },
              { icon: Sparkles, label: 'Binding', value: 'Saddle-Stitch' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center">
                <Icon className="h-5 w-5 text-gold-400" strokeWidth={1.75} />
                <dt className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-400">
                  {label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-cream-100">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
