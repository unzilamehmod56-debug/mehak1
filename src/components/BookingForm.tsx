/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { SERVICES } from "../data/services";
import { Service, AddOn } from "../types";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  ExternalLink,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BookingFormProps {
  preselectedService: Service | null;
  preselectedAddOns: AddOn[];
}

export default function BookingForm({
  preselectedService,
  preselectedAddOns,
}: BookingFormProps) {
  const [activeService, setActiveService] = useState<Service>(
    preselectedService || SERVICES[0]
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync state if preselected service shifts
  React.useEffect(() => {
    if (preselectedService) {
      setActiveService(preselectedService);
    }
  }, [preselectedService]);

  const [chosenAddOnIds, setChosenAddOnIds] = useState<string[]>(
    preselectedAddOns.map((item) => item.id)
  );

  React.useEffect(() => {
    setChosenAddOnIds(preselectedAddOns.map((item) => item.id));
  }, [preselectedAddOns]);

  const handleToggleAddOn = (id: string) => {
    if (chosenAddOnIds.includes(id)) {
      setChosenAddOnIds(chosenAddOnIds.filter((item) => item !== id));
    } else {
      setChosenAddOnIds([...chosenAddOnIds, id]);
    }
  };

  const getPrice = () => {
    const base = activeService.basePrice;
    const addOnsCost =
      activeService.addOns
        ?.filter((item) => chosenAddOnIds.includes(item.id))
        .reduce((sum, item) => sum + item.price, 0) || 0;
    return base + addOnsCost;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !date || !time) return;
    setIsSuccess(true);
  };

  const getWhatsAppLink = () => {
    const selectedAddOnNames = activeService.addOns
      ?.filter((item) => chosenAddOnIds.includes(item.id))
      .map((item) => item.name)
      .join(", ") || "None";

    const text = `Hello Makeover by Mehak! I would like to book a luxury session:%0A%0A` +
      `*Name:* ${name}%0A` +
      `*Service:* ${activeService.name}%0A` +
      `*Date:* ${date}%0A` +
      `*Time Slot:* ${time}%0A` +
      `*Selected Add-Ons:* ${selectedAddOnNames}%0A` +
      `*Custom Requests:* ${notes || "None"}%0A` +
      `*Estimated Price:* PKR ${getPrice().toLocaleString()}%0A%0A` +
      `Please let me know if this slot is available. Thank you!`;

    return `https://wa.me/923204123381?text=${text}`;
  };

  return (
    <section id="booking" className="py-20 bg-lux-soft-nude/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="font-serif italic text-primary text-lg block mb-2">Reserve Your Glow</span>
          <h3 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight text-primary mb-4">
            Concierge Appointment Booking
          </h3>
          <div className="w-16 h-[1px] bg-accent-gold mx-auto mb-6"></div>
          <p className="font-sans text-xs md:text-sm text-lux-muted uppercase tracking-widest max-w-xl mx-auto">
            Book your bridal transformation or pampering session with our expert artists at Mehak's Atelier.
          </p>
        </div>

        <div className="glass-card max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-primary/20">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                key="booking-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-primary/10"
              >
                {/* Inputs half */}
                <div className="md:w-3/5 p-6 md:p-10 space-y-5">
                  <h4 className="font-serif text-xl font-bold text-primary flex items-center gap-2">
                    <Sparkles size={20} className="text-accent-gold" /> Atelier Reservation Details
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-widest font-semibold text-primary mb-1.5">
                        Your Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-primary/40" size={16} />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Laiba Irfan"
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-primary/10 rounded-xl text-sm font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-widest font-semibold text-primary mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 text-primary/40" size={16} />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="laibairfan831@gmail.com"
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-primary/10 rounded-xl text-sm font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-widest font-semibold text-primary mb-1.5">
                        Phone (WhatsApp Preferred)
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 text-primary/40" size={16} />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 0320 4123381"
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-primary/10 rounded-xl text-sm font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-widest font-semibold text-primary mb-1.5">
                        Select Core Service
                      </label>
                      <select
                        value={activeService.id}
                        onChange={(e) => {
                          const matched = SERVICES.find((s) => s.id === e.target.value);
                          if (matched) {
                            setActiveService(matched);
                            setChosenAddOnIds([]); // Reset addons
                          }
                        }}
                        className="w-full p-2.5 bg-white border border-primary/10 rounded-xl text-sm font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} (PKR {s.basePrice.toLocaleString()})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-widest font-semibold text-primary mb-1.5">
                        Desired Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 text-primary/40" size={16} />
                        <input
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-primary/10 rounded-xl text-sm font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-widest font-semibold text-primary mb-1.5">
                        Time Slot
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 text-primary/40" size={16} />
                        <select
                          required
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-primary/10 rounded-xl text-sm font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                        >
                          <option value="">Select slot time</option>
                          <option value="10:00 AM">10:00 AM </option>
                          <option value="12:30 PM">12:30 PM </option>
                          <option value="03:00 PM">03:00 PM </option>
                          <option value="05:30 PM">05:30 PM </option>
                          <option value="08:00 PM">08:00 PM </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans uppercase tracking-widest font-semibold text-primary mb-1.5">
                      Styling Notes & Special Requests
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 text-primary/40" size={16} />
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. Traditional sheer look, matching deep red velvet lehenga dupatta styling options..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-primary/10 rounded-xl text-sm font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-primary text-white font-sans text-xs uppercase tracking-[0.15em] font-semibold rounded-xl hover:bg-primary-light transition-all shadow-md active:scale-[0.99]"
                  >
                    Proceed to Reserve & Pre-fill WhatsApp
                  </button>
                </div>

                {/* Receipt breakdown summary half */}
                <div className="md:w-2/5 p-6 md:p-10 bg-primary/5 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="border-b border-primary/10 pb-4">
                      <span className="font-sans text-[10px] uppercase tracking-widest text-lux-muted">
                        Selected Look Summary
                      </span>
                      <h4 className="font-serif text-2xl font-bold text-primary mt-1">
                        {activeService.name}
                      </h4>
                      <p className="font-sans text-xs text-lux-muted uppercase mt-0.5 tracking-wider">
                        Atelier Base Pack • PKR {activeService.basePrice.toLocaleString()}
                      </p>
                    </div>

                    {activeService.addOns && activeService.addOns.length > 0 && (
                      <div>
                        <h5 className="font-sans text-[10px] uppercase tracking-widest font-bold text-primary mb-3">
                          Select/Toggle Add-Ons
                        </h5>
                        <div className="space-y-2">
                          {activeService.addOns.map((addOn) => {
                            const isSelected = chosenAddOnIds.includes(addOn.id);
                            return (
                              <button
                                type="button"
                                key={addOn.id}
                                onClick={() => handleToggleAddOn(addOn.id)}
                                className={`w-full flex justify-between items-center p-2 rounded-lg text-left text-xs font-sans transition-all ${
                                  isSelected
                                    ? "bg-white text-primary font-semibold border-l-4 border-primary"
                                    : "text-lux-muted hover:bg-white/50"
                                }`}
                              >
                                <span>{addOn.name}</span>
                                <span className="font-bold whitespace-nowrap ml-2">
                                  + PKR {addOn.price.toLocaleString()}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-primary/10 pt-6 mt-6 md:mt-0 text-center md:text-left">
                    <span className="font-sans text-[10px] uppercase tracking-widest text-lux-muted">
                      Total Reserved Pricing
                    </span>
                    <p className="font-serif text-3.5xl font-bold text-primary mt-1">
                      PKR {getPrice().toLocaleString()}
                    </p>
                    <p className="font-sans text-[9px] text-lux-muted mt-2 uppercase tracking-wide leading-relaxed">
                      Pricing is an estimated total. Standard Trial deposits and confirmations are discussed via direct WhatsApp concave.
                    </p>
                  </div>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="booking-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="p-8 md:p-12 text-center max-w-xl mx-auto space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={40} />
                </div>
                
                <h4 className="font-serif text-2xl md:text-3.5xl text-primary font-bold">
                  Pre-filled Look Reserved!
                </h4>
                
                <p className="font-sans text-sm text-lux-muted leading-relaxed">
                  Excellent, <strong className="text-primary">{name}</strong>! We have customized your <strong className="text-primary">{activeService.name}</strong> package details.
                </p>

                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 text-left space-y-2">
                  <p className="text-xs font-sans text-lux-muted">
                    📆 <strong>Desired Date:</strong> {date}
                  </p>
                  <p className="text-xs font-sans text-lux-muted">
                    ⏰ <strong>Desired Slot Time:</strong> {time}
                  </p>
                  <p className="text-xs font-sans text-lux-muted">
                    🌟 <strong>Estimated Total:</strong> PKR {getPrice().toLocaleString()}
                  </p>
                </div>

                <p className="font-sans text-xs text-lux-muted leading-relaxed">
                  To finalize trial booking slots, lock timings, and share outfit colors with Mehak, click the direct WhatsApp link below to immediately send this pre-filled ticket:
                </p>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="flex-1 py-3 border border-primary/20 text-primary font-sans text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-primary/5 transition-all"
                  >
                    Edit Details
                  </button>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-[#25d366] text-white font-sans text-xs uppercase tracking-[0.14em] font-semibold rounded-full flex items-center justify-center gap-1.5 hover:shadow-lg transition-all active:scale-[0.98]"
                  >
                    Open WhatsApp <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
