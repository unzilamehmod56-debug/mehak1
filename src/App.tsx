/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import {
  Star,
  MessageSquare,
  Instagram,
  Heart,
  MapPin,
  Phone,
  Mail,
  Sparkles,
  Send,
  Quote,
  Share2,
  Tv,
  Camera,
  ChevronRight,
  Map,
} from "lucide-react";
import Header from "./components/Header";
import ServiceMenu from "./components/ServiceMenu";
import Portfolio from "./components/Portfolio";
import BookingForm from "./components/BookingForm";
import ReviewsSection from "./components/ReviewsSection";
import ChatAssistant from "./components/ChatAssistant";
import { Service, AddOn } from "./types";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [shareToast, setShareToast] = useState(false);

  // Monitor scrolling to highlight correct navigation section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "portfolio", "booking", "reviews", "contact"];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  const handleSelectServiceFromMenu = (service: Service, addOns: AddOn[]) => {
    setSelectedService(service);
    setSelectedAddOns(addOns);
    // Smooth scroll to booking form immediately so they can reserve
    setTimeout(() => {
      handleNavigate("booking");
    }, 100);
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: "Makeover by Mehak",
        text: "Luxury Bridal & Beauty Atelier in Gulberg, Lahore",
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#fbfbe2] selection:bg-primary/25 selection:text-primary">
      {/* Header Bar */}
      <Header onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      >
        {/* Soft background fade-in plate */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbfbe2] via-[#fbfbe2]/60 to-transparent z-10"></div>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDG5tCxKibIvN1K2UjqCyp3_A_wWoyxrsm6plTtnS8LudGlxqSnlD8B2UAP-dVVq8ykAFNHxmy1y9oI1NHdRRJaeIVllx9icB9QFeJT4DcZf_DnpcpB2Fe2GLodCaC3Qfx2AHm_k-VcKIpIAIGbV26Qye8ZSYeb2qtVob765SYmJxyeFmiVuc77IdVHh34WI8OmCoxXMlizLqVTPqw7-nEvzh86JhtbriWgRIQc0YptX7b-lALz0M8_V03rNf6pTJ09tCEB-k1KrBFo"
            alt="Makeover by Mehak boutique luxury interior"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter saturate-[0.95]"
          />
        </div>

        {/* Content container */}
        <div className="relative z-15 max-w-7xl mx-auto px-4 md:px-8 w-full py-16">
          <div className="max-w-2xl text-left">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-6 bg-primary/10 text-primary font-sans text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase rounded-full border border-primary/20"
            >
              <Sparkles size={12} className="text-accent-gold" /> The Art of Transformation
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-3.5xl sm:text-5xl md:text-6xl font-bold text-primary leading-[1.1] mb-6 tracking-tight"
            >
              Transforming Your Special Moments Into Timeless Beauty
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-sans text-sm md:text-md text-lux-muted leading-relaxed mb-8 max-w-lg"
            >
              Exquisite styling and flawless glowing skin tailored for the modern bride. Elevate your natural essence with Mehak's signature luxury beauty experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => handleNavigate("booking")}
                className="px-8 py-4 bg-primary text-white font-sans text-xs uppercase tracking-widest font-semibold rounded-full shadow-lg hover:shadow-xl hover:bg-primary-light transition-all text-center"
              >
                Book Your Glow
              </button>
              <button
                onClick={() => handleNavigate("portfolio")}
                className="px-8 py-4 border border-primary/35 text-primary font-sans text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-primary/5 transition-all text-center"
              >
                Explore Lookbook
              </button>
            </motion.div>

            {/* Bottom Specialities category list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-primary/10 flex items-center gap-6 sm:gap-8"
            >
              <div className="font-serif text-lg md:text-xl font-bold tracking-tight text-primary uppercase">
                Makeup
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-primary/25"></div>
              <div className="font-serif text-lg md:text-xl font-bold tracking-tight text-primary uppercase">
                Hair
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-primary/25"></div>
              <div className="font-serif text-lg md:text-xl font-bold tracking-tight text-primary uppercase">
                Spa
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Board (Bento Grid) */}
      <section className="py-12 bg-[#f5f5dc]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <motion.div
              whileHover={{ y: -3 }}
              className="glass-card p-6 rounded-2xl text-center flex flex-col items-center justify-center border border-primary/10"
            >
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mb-2">
                <Star size={20} fill="currentColor" />
              </div>
              <span className="font-serif text-2.5xl font-bold text-primary block">
                4.6
              </span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-lux-muted mt-1">
                Google Rating
              </span>
            </motion.div>

            <motion.button
              whileHover={{ y: -3 }}
              onClick={() => handleNavigate("reviews")}
              className="glass-card p-6 rounded-2xl text-center flex flex-col items-center justify-center border border-primary/10 transition-all focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-2">
                <MessageSquare size={18} />
              </div>
              <span className="font-serif text-2.5xl font-bold text-primary block">
                36+
              </span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-lux-muted mt-1">
                Verified Reviews
              </span>
            </motion.button>

            <motion.a
              whileHover={{ y: -3 }}
              href="https://instagram.com/makeoverbymehak_"
              target="_blank"
              rel="noopener"
              className="glass-card p-6 rounded-2xl text-center flex flex-col items-center justify-center border border-primary/10 transition-all select-none"
            >
              <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 mb-2">
                <Instagram size={18} />
              </div>
              <span className="font-serif text-2.5xl font-bold text-primary block">
                30K
              </span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-lux-muted mt-1">
                Instagram Lovers
              </span>
            </motion.a>

            <motion.div
              whileHover={{ y: -3 }}
              className="glass-card p-6 rounded-2xl text-center flex flex-col items-center justify-center border border-primary/10"
            >
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-2 animate-pulse">
                <Heart size={18} fill="currentColor" />
              </div>
              <span className="font-serif text-2.5xl font-bold text-primary block">
                100s
              </span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-lux-muted mt-1">
                Happy Clients
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Service Customizer Menu */}
      <ServiceMenu onSelectService={handleSelectServiceFromMenu} />

      {/* Lookbook Gallery Portfolio */}
      <Portfolio />

      {/* Reviews and client ledger list */}
      <ReviewsSection />

      {/* Booking Form and Map Visit Section */}
      <section id="contact" className="py-20 bg-[#fbfbe2]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="glass-card rounded-3xl overflow-hidden shadow-2xl border border-primary/10 bg-white/70">
            <div className="flex flex-col lg:flex-row">
              {/* Address detail layout */}
              <div className="lg:w-1/2 p-8 md:p-12 space-y-8 bg-primary/5 flex flex-col justify-between">
                <div>
                  <span className="text-primary font-serif italic text-base block mb-2">Visit Our Atelier</span>
                  <h4 className="font-serif text-3xl md:text-4.5xl text-primary font-bold tracking-tight">
                    Welcome to the Studio
                  </h4>
                  <p className="font-sans text-sm text-lux-muted mt-3 leading-relaxed">
                    We would love to host you for a styling consultation, preview trials, or a magnificent day of pampering. Simply reach out to our concierge.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h5 className="font-sans text-xs uppercase tracking-widest font-bold text-primary">
                        Atelier Location
                      </h5>
                      <p className="font-sans text-sm text-lux-dark mt-1 leading-relaxed">
                        22-A2 gurumangat road, gulberg 3, Lahore, Pakistan, 54000
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Phone size={18} />
                    </div>
                    <div>
                      <h5 className="font-sans text-xs uppercase tracking-widest font-bold text-primary">
                        Direct Line & Mobile
                      </h5>
                      <p className="font-sans text-sm text-lux-dark mt-1">0320 4123381</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Mail size={18} />
                    </div>
                    <div>
                      <h5 className="font-sans text-xs uppercase tracking-widest font-bold text-primary">
                        Concierge Email
                      </h5>
                      <p className="font-sans text-sm text-lux-dark mt-1">laibairfan831@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-primary/10">
                  <span className="font-serif italic text-primary block text-sm">
                    "Every bride carries an unmatched light; our art simply helps her glow." — Mehak
                  </span>
                </div>
              </div>

              {/* Wide visual atelier photo styling station */}
              <div className="lg:w-1/2 relative min-h-[350px] md:min-h-[450px]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-qMzd0XQNqzAnxpZenLEVK2bNCOfFH6sLJpnM7w5ZqGppK6d43HJ5SM3EVHUY3tFNYfwOZ8r1IvSISXQyEsCYr9h5rgR0sThhtijsuegbUbgKOYwAA2eqpZRgGHqfj4U6ksi7FFN7FgJ7pNH4hTh448fM4_qk5F03Y06GxBmZqgY_P-V-SQAP3SOkbiI0psg6O8Nw0wfAcgM5o9cI8XBJB7p5MBqYEgtfAfe9JyChU2c3BqOTQIVclYgGDg6_8hoQnGWuJgFCAklY"
                  alt="Makeover by Mehak gold mirror styling station"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover filter saturate-[0.8]"
                />
                <div className="absolute inset-0 bg-primary/10 backdrop-grayscale-[0.35]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Reservation embed */}
      <BookingForm
        preselectedService={selectedService}
        preselectedAddOns={selectedAddOns}
      />

      {/* Journey Gallery Social Feeds */}
      <section className="py-20 bg-[#fbfbe2]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="font-serif italic text-primary text-md block mb-1">Follow Our Journey</span>
            <h3 className="font-serif text-3xl font-bold text-primary">Atelier Instagram Dispatch</h3>
            <div className="w-12 h-[1px] bg-accent-gold mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-3 rounded-2xl flex flex-col justify-between">
              <div className="aspect-square rounded-xl overflow-hidden mb-4">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSQlnIKkRvdlsHdhq2su9TeV-eDwiL4HaYfsFozrM9w22gU4GewbLXn98iskPbdIeCRv3rk1lVIk3l5JbXH_i0Qmq7scIdiiW_LdbcGaVM7GH0nOGdVwzVvVcCffrVacf-SC5YoG9BRzBx2STYGsNrh-H_piwezXl9K5TNSEFLYk7DsXXJPfYCCfrj2hrdCk-XzSYVSvvljIlIo1X2WQD9evJrm5Dv_ZkWP1O8jD8C4PLee4yPgO11kxDT03bD7DKsyJJ02bX2Cilr"
                  alt="Bride close-up rose gold shimmer eyes"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-1">
                <span className="font-sans text-[10px] text-primary/60 font-semibold flex items-center gap-1 uppercase tracking-widest mb-1.5">
                  <Instagram size={12} /> @makeoverbymehak_
                </span>
                <p className="font-sans text-xs text-lux-muted leading-relaxed mb-4">
                  "Traditional rose gold shimmer lids for this grand wedding. Perfectly matched curls."
                </p>
                <div className="flex justify-between items-center text-[10px] text-lux-muted font-bold font-sans uppercase">
                  <span>1,240 likes</span>
                  <a
                    href="https://instagram.com/makeoverbymehak_"
                    target="_blank"
                    className="hover:text-primary transition-colors flex items-center gap-0.5"
                  >
                    View <ChevronRight size={10} />
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card p-3 rounded-2xl flex flex-col justify-between">
              <div className="aspect-square rounded-xl overflow-hidden mb-4">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUVN3tSRtx6t4MiIxCYg2poHvol4TxMc-k8ynPdNbG0C9jzmsT1Udg3UkRVfItkA5Ekh9_Zn9PlUmYuXp0iix9PYAb_UpvPaBU9xqyrGjZnhgXLRMAaRF0jGZo42rfBNCmqRXjr9Gi27gpSO0tDsal2JbSjFxEzaNX2MWFecBhWdydB80QlnfPhRgYivEfd5xSplzRujcYzdf6Ku1pvejRrf-Z0dK2uG2fmwi4DO8uHe5ooQ5I8Hr1ZTfzURYvn7hBT_9-jGqWmp9J"
                  alt="Luxury cosmetics layout"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-1">
                <span className="font-sans text-[10px] text-primary/60 font-semibold flex items-center gap-1 uppercase tracking-widest mb-1.5">
                  <Instagram size={12} /> @Makeupstudiobymehak
                </span>
                <p className="font-sans text-xs text-lux-muted leading-relaxed mb-4">
                  "Only using absolute high-end formulations for the wedding. Long lasting radiant glow."
                </p>
                <div className="flex justify-between items-center text-[10px] text-lux-muted font-bold font-sans uppercase">
                  <span>942 likes</span>
                  <a
                    href="https://instagram.com/Makeupstudiobymehak"
                    target="_blank"
                    className="hover:text-primary transition-colors flex items-center gap-0.5"
                  >
                    View <ChevronRight size={10} />
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card p-3 rounded-2xl flex flex-col justify-between">
              <div className="aspect-square rounded-xl overflow-hidden mb-4">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqDwXtiHl2sawmKaCX0HSjPBU6mgNDNXUbhM1P40PP4ICGffYViZTZWBuN_UvejQblUcGIrEdPtua1n82wXVZ4VslcXGyKDqM9OaWeYq8jo4agSRG_KxsnG8UjM0zt49li1AfaOKl8KgDXTAK6JtsHGVBUHe6jANMpaer1dWYxH6XryWVFZCZDFnRaduxR-6p5u39ISoYH6z0KCAgGSiUbVe0xeTYNcUs5BYf9IbaEWbsW5NiGTkgDyr5QTUyLZjdKwcsi44MFV0fd"
                  alt="Bridal portrait photoshoot layout"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-1">
                <span className="font-sans text-[10px] text-primary/60 font-semibold flex items-center gap-1 uppercase tracking-widest mb-1.5">
                  <Instagram size={12} /> @makeoverbymehak_
                </span>
                <p className="font-sans text-xs text-lux-muted leading-relaxed mb-4">
                  "Simplicity meets magnificent gold accents. Flawlessly captured in Gulberg Lahore."
                </p>
                <div className="flex justify-between items-center text-[10px] text-lux-muted font-bold font-sans uppercase">
                  <span>2,050 likes</span>
                  <a
                    href="https://instagram.com/makeoverbymehak_"
                    target="_blank"
                    className="hover:text-primary transition-colors flex items-center gap-0.5"
                  >
                    View <ChevronRight size={10} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Share Toast */}
      <AnimatePresence>
        {shareToast && (
          <div className="fixed bottom-6 left-6 z-50 p-4 bg-primary text-white font-sans text-xs uppercase tracking-widest font-semibold rounded-2xl shadow-xl border border-white/20 select-none animate-bounce">
            ✔ Lookbook link copied to clipboard!
          </div>
        )}
      </AnimatePresence>

      {/* Footer Area */}
      <footer className="bg-[#f5f5dc] border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            <div className="md:col-span-2">
              <h4 className="font-serif text-2xl font-bold text-primary mb-3">
                Makeover by Mehak
              </h4>
              <p className="font-sans text-xs md:text-sm text-lux-muted max-w-sm leading-relaxed">
                Curating timeless beauty and bespoke bridal transformations in the heart of Lahore. Experience unmatched luxury and beauty concierge.
              </p>
            </div>

            <div>
              <h5 className="font-sans text-[10px] uppercase tracking-widest font-bold text-primary mb-4">
                Atelier Quick Links
              </h5>
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => handleNavigate("services")}
                  className="text-left font-sans text-xs text-lux-muted hover:text-primary transition-colors"
                >
                  Beauty Menu
                </button>
                <button
                  onClick={() => handleNavigate("portfolio")}
                  className="text-left font-sans text-xs text-lux-muted hover:text-primary transition-colors"
                >
                  Lookbook Showcase
                </button>
                <button
                  onClick={() => handleNavigate("booking")}
                  className="text-left font-sans text-xs text-lux-muted hover:text-primary transition-colors"
                >
                  Appointment Scheduler
                </button>
                <button
                  onClick={() => handleNavigate("reviews")}
                  className="text-left font-sans text-xs text-lux-muted hover:text-primary transition-colors"
                >
                  Guest Reviews
                </button>
              </div>
            </div>

            <div>
              <h5 className="font-sans text-[10px] uppercase tracking-widest font-bold text-primary mb-4">
                Legal & Atelier info
              </h5>
              <p className="font-sans text-xs text-lux-muted leading-relaxed">
                © 2026 Makeover by Mehak. All rights reserved.
              </p>
              <div className="flex gap-4 mt-4 text-lux-muted">
                <a
                  href="https://instagram.com/makeoverbymehak_"
                  target="_blank"
                  className="hover:text-primary transition-colors"
                  aria-label="Instagram Page"
                >
                  <Camera size={18} />
                </a>
                <button
                  onClick={handleShareClick}
                  className="hover:text-primary transition-colors"
                  aria-label="Share workspace link"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            <span className="font-sans text-[9px] text-lux-muted uppercase tracking-widest">
              Atelier: 22-A2 Gurumangat Road, Gulberg III, Lahore, Pakistan
            </span>
            <span className="font-sans text-[9px] text-lux-muted uppercase tracking-widest">
              Crafted with Aura of Elegance design patterns
            </span>
          </div>
        </div>
      </footer>

      {/* Floating Interactive Chat Assistant */}
      <ChatAssistant />
    </div>
  );
}
