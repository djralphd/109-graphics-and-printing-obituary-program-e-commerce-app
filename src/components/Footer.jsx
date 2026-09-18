import React from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'

const LINKS = [
  { label: 'How it works', href: '#process' },
  { label: 'Price', href: '#configurator' },
  { label: 'Questions', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#0A0F1C]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#C9A227] to-[#A8861B] font-serif text-lg font-bold text-[#0B1120]">
                109
              </span>
              <span className="font-serif text-xl font-semibold text-white">
                109 Graphics &amp; Printing
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              Obituary programs and memorial booklets,
              designed and printed with care in Los Angeles.
            </p>
            <a
              href="tel:+13235261346"
              className="mt-6 inline-flex items-center gap-2 font-serif text-2xl font-semibold text-[#E8D48B] transition-colors hover:text-[#C9A227]"
            >
              <Phone className="h-5 w-5" />
              (323) 526-1346
            </a>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
              Explore
            </h4>
            <ul className="mt-5 space-y-3">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-white/65 transition-colors hover:text-[#E8D48B]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
              Reach us
            </h4>
            <ul className="mt-5 space-y-4 text-sm text-white/65">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#E8D48B]" />
                <a
                  href="mailto:print@109graphics.com"
                  className="transition-colors hover:text-[#E8D48B]"
                >
                  print@109graphics.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E8D48B]" />
                <span>Los Angeles, California</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} 109 Graphics &amp; Printing. All
            rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Standard turnaround 3-5 business days &middot; Rush available
          </p>
        </div>
      </div>
    </footer>
  )
}
