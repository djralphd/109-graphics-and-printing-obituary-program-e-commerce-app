import React, { useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import TrustBar from './components/TrustBar.jsx'
import Process from './components/Process.jsx'
import Configurator from './components/Configurator.jsx'
import FAQ from './components/FAQ.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import CheckoutModal from './components/CheckoutModal.jsx'
import StickyPriceBar from './components/StickyPriceBar.jsx'

export default function App() {
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [order, setOrder] = useState(null)

  const handleCheckout = (orderData) => {
    setOrder(orderData)
    setCheckoutOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-white antialiased">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Process />
        <Configurator onCheckout={handleCheckout} />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <StickyPriceBar />
      <CheckoutModal
        open={checkoutOpen}
        order={order}
        onClose={() => setCheckoutOpen(false)}
      />
    </div>
  )
}
