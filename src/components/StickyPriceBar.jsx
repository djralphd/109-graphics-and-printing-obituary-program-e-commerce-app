import React, { useEffect, useState } from 'react'
import { Phone } from 'lucide-react'

export default function StickyPriceBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0E1626]/95 backdrop-blur-md transition-transform duration-300 lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5">
        <a
          href="tel:+13235261346"
          className="flex items-center gap-2 text-sm font-semibold text-white"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#C9A227]/15 text-[#E8D48B]">
            <Phone className="h-4 w-4" />
          </span>
          (323) 526-1346
        </a>
        <a
          href="#configurator"
          className="rounded-full bg-gradient-to-r from-[#C9A227] to-[#A8861B] px-5 py-2.5 text-sm font-semibold text-[#0B1120] shadow-lg shadow-[#C9A227]/25"
        >
          Get a price
        </a>
      </div>
    </div>
  )
}
