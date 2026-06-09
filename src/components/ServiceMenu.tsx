/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { SERVICES } from "../data/services";
import { Service, AddOn } from "../types";
import { Clock, Check, Sparkles, Sparkle, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ServiceMenuProps {
  onSelectService: (service: Service, selectedAddOns: AddOn[]) => void;
}

export default function ServiceMenu({ onSelectService }: ServiceMenuProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeAddOns, setActiveAddOns] = useState<AddOn[]>([]);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setActiveAddOns([]); // Reset add-ons when switching service
  };

  const handleToggleAddOn = (addOn: AddOn) => {
    if (activeAddOns.some((item) => item.id === addOn.id)) {
      setActiveAddOns(activeAddOns.filter((item) => item.id !== addOn.id));
    } else {
      setActiveAddOns([...activeAddOns, addOn]);
    }
  };

  const calculateTotal = () => {
    if (!selectedService) return 0;
    const addOnsTotal = activeAddOns.reduce((sum, item) => sum + item.price, 0);
    return selectedService.basePrice + addOnsTotal;
  };

  return (
    <section id="services" className="py-20 bg-[#fbfbe2]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="font-serif italic text-primary text-lg md:text-xl block mb-2">
            Our Signature Curations
          </span>
          <h3 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight text-primary mb-4">
            Atelier Beauty Menu
          </h3>
          <div className="w-16 h-[1px] bg-accent-gold mx-auto mb-6"></div>
          <p className="font-sans text-lux-muted max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Meticulously crafted services designed to reveal your inner luminescence through premium professional artistry.
          </p>
        </div>

        {/* Featured Service Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group rounded-2xl overflow-hidden shadow-xl aspect-[4/5] cursor-pointer"
              onClick={() => handleServiceSelect(service)}
            >
              {/* Backing Image */}
              <img
                src={service.image}
                alt={service.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Sophisticated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent flex flex-col justify-end p-6 transition-all duration-300">
                <span className="font-serif italic text-[#ffe088] text-sm mb-1 block">
                  {service.category === "makeup" ? "Makeup" : service.category === "hair" ? "Hair" : "Spa"} Specialty
                </span>
                <h4 className="font-serif text-2xl text-white font-medium mb-2 group-hover:text-[#ffe088] transition-colors">
                  {service.name}
                </h4>
                <p className="text-white/80 font-sans text-xs md:text-sm mb-4 line-clamp-2 md:opacity-0 group-hover:opacity-100 md:group-hover:translate-y-0 md:translate-y-2 transition-all duration-300">
                  {service.description}
                </p>
                <div className="flex justify-between items-center border-t border-white/20 pt-3">
                  <span className="font-sans font-bold text-white text-sm md:text-base tracking-wider uppercase">
                    From PKR {service.basePrice.toLocaleString()}
                  </span>
                  <span className="font-sans text-[10px] text-white/50 flex items-center gap-1">
                    <Clock size={12} /> {service.duration}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Custom Package Builder */}
        <AnimatePresence mode="wait">
          {selectedService ? (
            <motion.div
              key={selectedService.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card rounded-2xl p-6 md:p-10 shadow-xl border border-primary/20"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Visual Half */}
                <div className="lg:w-2/5 relative rounded-xl overflow-hidden aspect-[4/3] lg:aspect-auto">
                  <img
                    src={selectedService.image}
                    alt={selectedService.name}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.85]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                    <span className="text-accent-gold font-sans text-xs uppercase tracking-widest font-semibold mb-1 flex items-center gap-1">
                      <Sparkles size={14} /> Live Customizer
                    </span>
                    <h5 className="font-serif text-2xl text-white font-medium">
                      Configure Your {selectedService.name} Look
                    </h5>
                  </div>
                </div>

                {/* Customizer Panel */}
                <div className="lg:w-3/5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-serif text-2xl font-bold text-primary">
                          {selectedService.name}
                        </h4>
                        <p className="font-sans text-xs text-lux-muted mt-1 uppercase tracking-widest flex items-center gap-1">
                          <Clock size={14} className="text-accent-gold" /> Estimated: {selectedService.duration}
                        </p>
                      </div>
                      <span className="font-serif text-2xl text-primary font-semibold">
                        PKR {selectedService.basePrice.toLocaleString()}
                      </span>
                    </div>

                    <p className="font-sans text-sm text-lux-muted mb-6 leading-relaxed">
                      {selectedService.description}
                    </p>

                    {/* Addon Choice */}
                    {selectedService.addOns && selectedService.addOns.length > 0 && (
                      <div className="mb-6">
                        <h5 className="font-sans text-xs uppercase tracking-[0.14em] font-semibold text-primary mb-3 flex items-center gap-1">
                          <Sparkle size={14} className="text-accent-gold" /> Select Glow Add-Ons
                        </h5>
                        <div className="space-y-3">
                          {selectedService.addOns.map((addOn) => {
                            const isSelected = activeAddOns.some((item) => item.id === addOn.id);
                            return (
                              <button
                                key={addOn.id}
                                onClick={() => handleToggleAddOn(addOn)}
                                className={`w-full text-left p-3 rounded-lg border transition-all duration-300 flex justify-between items-center ${
                                  isSelected
                                    ? "bg-primary/5 border-primary shadow-sm"
                                    : "bg-white/50 border-primary/10 hover:border-primary/30"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-300 ${
                                      isSelected
                                        ? "bg-primary border-primary text-white"
                                        : "border-primary/25 bg-white"
                                    }`}
                                  >
                                    {isSelected && <Check size={12} />}
                                  </div>
                                  <div>
                                    <span className="font-sans text-sm font-semibold text-lux-dark">
                                      {addOn.name}
                                    </span>
                                    {addOn.description && (
                                      <p className="font-sans text-xs text-lux-muted mt-0.5">
                                        {addOn.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <span className="font-sans text-xs font-bold text-primary">
                                  + PKR {addOn.price.toLocaleString()}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Summary / Total panel */}
                  <div className="border-t border-primary/10 pt-6 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-center sm:text-left">
                      <span className="font-sans text-xs uppercase tracking-widest text-lux-muted">
                        Total Customized Price
                      </span>
                      <p className="font-serif text-3xl font-bold text-primary mt-1">
                        PKR {calculateTotal().toLocaleString()}
                      </p>
                    </div>

                    <div className="flex gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => setSelectedService(null)}
                        className="flex-1 sm:flex-initial px-4 py-3 border border-primary/20 text-primary font-sans text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-primary/5 transition-all"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => onSelectService(selectedService, activeAddOns)}
                        className="flex-1 sm:flex-initial px-6 py-3 bg-primary text-white font-sans text-xs uppercase tracking-[0.14em] font-semibold rounded-full hover:bg-primary-light shadow-md hover:translate-y-[-1px] transition-all flex items-center justify-center gap-2"
                      >
                        <ShoppingBag size={14} /> Book Custom Look
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-6 text-xs text-lux-muted font-sans uppercase tracking-[0.15em]">
              💡 Click any signature service card above to initialize custom beauty customization!
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
