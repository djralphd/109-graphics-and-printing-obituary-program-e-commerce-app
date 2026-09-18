import React from 'react'
import { ShieldCheck, Truck, HeartHandshake, Palette } from 'lucide-react'

const ITEMS = [
  {
    icon: Palette,
    title: 'Design',
    body: 'You can upload your own design for faster printing.',
  },
  {
    icon: ShieldCheck,
    title: 'Proof before print',
    body: 'You approve a digital proof. Nothing goes to press until it is right.',
  },
  {
    icon: Truck,
    title: '3–5 day turnaround',
    body: 'Rush service available. Local pickup in Los Angeles or nationwide shipping.',
  },
  {
    icon: HeartHandshake,
    title: 'Family-first care',
    body: 'Compassionate, patient support by phone from start to finish.',
  },
]

export default function TrustBar() {
  return (
    <section className="relative border-y border-white/10 bg-[#0E1626]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="group">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[#C9A227]/25 bg-[#C9A227]/10 text-[#E8D48B] transition-all group-hover:border-[#C9A227]/60 group-hover:bg-[#C9A227]/20">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-serif text-xl font-semibold text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
