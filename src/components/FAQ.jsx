import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { Reveal } from './Reveal.jsx'

const FAQS = [
  {
    q: 'How quickly can I receive my programs?',
    a: 'Standard turnaround is 3-5 business days after you approve your proof. Rush service is available for 24-48 hour delivery. Local pickup is available in Los Angeles, and we ship nationwide.',
  },
  {
    q: 'What paper and binding do you use?',
    a: 'Every program is printed full-color on premium 100 lb. gloss book and saddle-stitched for a clean finish that holds up beautifully.',
  },
  {
    q: 'Can you design the program for me?',
    a: 'Yes. Our designers compose the entire layout - cover, order of service, tributes, and acknowledgements - using the photos and text you provide. You approve a digital proof before anything is printed.',
  },
  {
    q: 'How many programs should I order?',
    a: 'Most families order 100-200 programs. We recommend ordering slightly more than your expected guest count so no one is left without one. Additional copies can be printed later if needed.',
  },
  {
    q: 'How should I prepare my files and photos?',
    a: 'Send high-resolution images (300 DPI or higher) in JPG, PNG, or PDF format. If you are supplying your own print-ready artwork, include a 0.125 in. bleed on all sides and keep important text at least 0.25 in. from the trim edge. Not sure? Send us what you have and we will prepare it for print.',
  },
  {
    q: 'Will I see a proof before printing?',
    a: 'Always. You receive a digital proof by email. Nothing goes to press until you give your final approval.',
  },
  {
    q: 'Can I request a rush order?',
    a: 'Yes. Rush service is available for 24-48 hour turnaround for an additional 25% fee. Call us at (323) 526-1346 and we will confirm availability for your date.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards securely online, as well as cash. We will not start printing until cash (Full Payment) is given first.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="relative border-t border-white/10 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#C9A227]">
                Questions
              </span>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Everything you need to know.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/60">
                Still unsure about something? Call us at{' '}
                <a
                  href="tel:+13235261346"
                  className="font-semibold text-[#E8D48B] underline decoration-[#C9A227]/40 underline-offset-4 transition-colors hover:text-[#C9A227]"
                >
                  (323) 526-1346
                </a>{' '}
                and we will walk you through it.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-[#111A2E]">
              {FAQS.map((item, i) => {
                const isOpen = open === i
                return (
                  <div key={item.q}>
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left transition-colors hover:bg-white/[0.03] sm:px-8"
                    >
                      <span
                        className={`font-serif text-lg font-semibold transition-colors sm:text-xl ${
                          isOpen ? 'text-[#E8D48B]' : 'text-white'
                        }`}
                      >
                        {item.q}
                      </span>
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? 'rotate-45 border-[#C9A227] bg-[#C9A227] text-[#0B1120]'
                            : 'border-white/20 text-white/70'
                        }`}
                      >
                        <Plus className="h-4 w-4" strokeWidth={2.5} />
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen
                          ? 'grid-rows-[1fr] opacity-100'
                          : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-7 text-base leading-relaxed text-white/60 sm:px-8">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
