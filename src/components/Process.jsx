import React from 'react'
import { Reveal } from './Reveal.jsx'

const STEPS = [
  {
    n: '01',
    title: 'Upload your design',
    body: 'Upload a finished design for faster printing, or send us your photos, dates, and any verse or passage.',
  },
  {
    n: '02',
    title: 'Approve your proof',
    body: 'Review your digital proof and approve it.',
  },
  {
    n: '03',
    title: 'Print and delivered',
    body: 'Full-color on 100 lb. gloss book, saddle-stitched, and delivered in 3–5 business days.',
  },
]

export default function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#C9A227]">
              The Process
            </span>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Thoughtful from first call to final print.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/60">
              We handle the details so your family can focus on what matters —
              gathering, remembering, and honoring.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#111A2E] to-[#0E1626] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C9A227]/40">
                <div className="absolute -right-6 -top-8 font-serif text-[7rem] font-bold leading-none text-white/[0.04] transition-colors group-hover:text-[#C9A227]/10">
                  {s.n}
                </div>
                <span className="relative font-serif text-2xl font-semibold text-[#E8D48B]">
                  {s.n}
                </span>
                <h3 className="relative mt-5 font-serif text-xl font-semibold text-white">
                  {s.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-white/55">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
