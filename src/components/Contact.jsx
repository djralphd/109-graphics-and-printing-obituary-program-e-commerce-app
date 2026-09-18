import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-slate-950 text-slate-100 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">
            Compassionate & Reliable Service
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-2">
            Get in Touch
          </h2>
          <div className="w-16 h-0.5 bg-amber-500/60 mx-auto my-4" />
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            We understand the time-sensitive nature of memorial programs. Call us directly or send a message below for immediate assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Contact Details Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm space-y-6 shadow-xl">
            <h3 className="text-xl font-serif font-bold text-white border-b border-slate-800 pb-4">
              Direct Contact & Hours
            </h3>
            
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Direct Phone</p>
                <a 
                  href="tel:3235261346" 
                  className="text-lg sm:text-xl font-semibold text-white hover:text-amber-400 transition-colors"
                >
                  (323) 526-1346
                </a>
                <p className="text-xs text-slate-500 mt-0.5">Available for rush orders & walk-in inquiries</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Print Shop Location</p>
                <p className="text-slate-200 text-sm font-medium">109 Graphics & Printing</p>
                <p className="text-slate-400 text-xs mt-0.5">Los Angeles, CA</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Hours of Operation</p>
                <p className="text-slate-200 text-sm">Monday – Friday: 9:00 AM – 6:00 PM</p>
                <p className="text-slate-200 text-sm">Saturday: 10:00 AM – 3:00 PM</p>
                <div className="inline-block mt-2 px-2.5 py-1 rounded bg-amber-400/10 border border-amber-400/20 text-[11px] text-amber-300 font-medium">
                  ⚡ Same-Day & 24hr Rush Available
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
                <h4 className="text-xl font-serif font-bold text-white">Inquiry Received</h4>
                <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Thank you. Our team will reach out promptly to verify your booklet details and delivery timeline.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 text-xs font-medium text-amber-400 hover:text-amber-300 underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-white border-b border-slate-800 pb-4 mb-4">
                  Send a Message
                </h3>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-colors"
                    placeholder="Jane Doe"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-colors"
                      placeholder="(323) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-colors"
                      placeholder="name@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
                    Memorial Details / Special Instructions
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-colors resize-none"
                    placeholder="Include service date, requested booklet size, page count, or delivery deadline..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold rounded-lg shadow-lg shadow-amber-500/10 transition-all flex items-center justify-center gap-2 text-sm mt-2"
                >
                  <Send className="w-4 h-4" /> Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
