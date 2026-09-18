import { useState, useEffect } from 'react'
import { Phone, Menu, X, ArrowRight } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Process', href: '#process' },
  { label: 'Price', href: '#configurator' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-navy-800/80 bg-navy-950/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        {/* Brand */}
        <a href="#top" className="group flex items-center gap-3" aria-label="109 Graphics and Printing home">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold-500/40 bg-gradient-to-br from-gold-500/20 to-gold-500/5 font-serif text-lg font-semibold text-gold-300 transition-transform duration-300 group-hover:scale-105">
            109
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-lg font-semibold tracking-tight text-cream-50">
              109 Obituary
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-navy-400">
              A 109 Graphics Company
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-navy-200 transition-colors duration-200 hover:text-cream-50 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:+13235261346"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cream-100 transition-colors duration-200 hover:text-gold-300"
          >
            <Phone className="h-4 w-4 text-gold-400" />
            (323) 526-1346
          </a>
          <a href="#configurator" className="btn-gold group !px-6 !py-3 text-sm">
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-navy-700 text-cream-100 transition-colors duration-200 hover:border-gold-400 hover:text-gold-300 lg:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-navy-800 bg-navy-950/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container-x flex flex-col gap-1 py-6" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3.5 text-base font-medium text-navy-100 transition-colors duration-200 hover:bg-navy-900 hover:text-cream-50"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 flex flex-col gap-3 border-t border-navy-800 pt-5">
            <a
              href="tel:+13235261346"
              className="inline-flex items-center gap-2.5 px-4 text-sm font-semibold text-cream-100"
            >
              <Phone className="h-4 w-4 text-gold-400" />
              (323) 526-1346
            </a>
            <a
              href="#configurator"
              onClick={() => setMenuOpen(false)}
              className="btn-gold w-full justify-center"
            >
              Configure Your Program
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
