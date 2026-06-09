/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Eye, Heart, Sparkles, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PortfolioItem {
  id: string;
  category: "bridal" | "hair" | "editorial";
  title: string;
  subtitle: string;
  image: string;
  details: string[];
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "look1",
    category: "bridal",
    title: "Classic Rose Shimmer",
    subtitle: "Rose-gold glittering bridal lids with elegant defined lashlines",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSQlnIKkRvdlsHdhq2su9TeV-eDwiL4HaYfsFozrM9w22gU4GewbLXn98iskPbdIeCRv3rk1lVIk3l5JbXH_i0Qmq7scIdiiW_LdbcGaVM7GH0nOGdVwzVvVcCffrVacf-SC5YoG9BRzBx2STYGsNrh-H_piwezXl9K5TNSEFLYk7DsXXJPfYCCfrj2hrdCk-XzSYVSvvljIlIo1X2WQD9evJrm5Dv_ZkWP1O8jD8C4PLee4yPgO11kxDT03bD7DKsyJJ02bX2Cilr",
    details: ["Dior Skin Glow Base", "Huda Rosegold Palette", "Mac Mehr Crimson Lips"]
  },
  {
    id: "look2",
    category: "editorial",
    title: "Vogue Premium Essentials",
    subtitle: "High-key luxury product layout showing premium details used",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUVN3tSRtx6t4MiIxCYg2poHvol4TxMc-k8ynPdNbG0C9jzmsT1Udg3UkRVfItkA5Ekh9_Zn9PlUmYuXp0iix9PYAb_UpvPaBU9xqyrGjZnhgXLRMAaRF0jGZo42rfBNCmqRXjr9Gi27gpSO0tDsal2JbSjFxEzaNX2MWFecBhWdydB80QlnfPhRgYivEfd5xSplzRujcYzdf6Ku1pvejRrf-Z0dK2uG2fmwi4DO8uHe5ooQ5I8Hr1ZTfzURYvn7hBT_9-jGqWmp9J",
    details: ["Chanel Velvet Lip Lacquers", "Huda Beauty Foundation", "Estee Lauder Serum Prep"]
  },
  {
    id: "look3",
    category: "bridal",
    title: "Sunehri Traditional Glow",
    subtitle: "Traditional gold jewelry pairing with warm bronze lids & soft skin",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqDwXtiHl2sawmKaCX0HSjPBU6mgNDNXUbhM1P40PP4ICGffYViZTZWBuN_UvejQblUcGIrEdPtua1n82wXVZ4VslcXGyKDqM9OaWeYq8jo4agSRG_KxsnG8UjM0zt49li1AfaOKl8KgDXTAK6JtsHGVBUHe6jANMpaer1dWYxH6XryWVFZCZDFnRaduxR-6p5u39ISoYH6z0KCAgGSiUbVe0xeTYNcUs5BYf9IbaEWbsW5NiGTkgDyr5QTUyLZjdKwcsi44MFV0fd",
    details: ["Shari's Gold Pigment", "Nars Radiant Creamy Concealer", "Charlotte Tilbury Setting Spray"]
  },
  {
    id: "look4",
    category: "hair",
    title: "Romantic Pearl Updo",
    subtitle: "Intricate textured bun accented with premium gold & pearl beads",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOOBsoCl7h-l1TA5wLSPX6SMOYoR7eSHksfqt5gDYjvs6LOmfDXgFChv2V5dHmxVcT2yzzDJQwnu3m2IAfFUGn8eLnNv3ymo1CAQSvvN2Cfc_IbW-hqH4mefTlotn9OLL-WKbAqivg75h98C4PhopJy4lVilL8cL2kWPcMltkasrb32kg3ZmC4LIfBr7uIDAaz-EnZj0OpC-Y4a9peY8l4iRSRoMFRWNZhZaqY3xjtByyKJgsSyxvzptTR31-y3qdRWrDHIyyGYVRv",
    details: ["Gisou Shine Drops", "Got2b Volumizer", "Fresh Jasmine Gajaray Styling"]
  },
  {
    id: "look5",
    category: "bridal",
    title: "The Atelier Studio Ingress",
    subtitle: "Wide architectural view of mirrors and styling stations in Gulberg",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-qMzd0XQNqzAnxpZenLEVK2bNCOfFH6sLJpnM7w5ZqGppK6d43HJ5SM3EVHUY3tFNYfwOZ8r1IvSISXQyEsCYr9h5rgR0sThhtijsuegbUbgKOYwAA2eqpZRgGHqfj4U6ksi7FFN7FgJ7pNH4hTh448fM4_qk5F03Y06GxBmZqgY_P-V-SQAP3SOkbiI0psg6O8Nw0wfAcgM5o9cI8XBJB7p5MBqYEgtfAfe9JyChU2c3BqOTQIVclYgGDg6_8hoQnGWuJgFCAklY",
    details: ["Professional Lighting Rings", "Gold Accent Mirrors", "Plush Ivory Swivel Chairs"]
  }
];

export default function Portfolio() {
  const [filter, setFilter] = useState<"all" | "bridal" | "hair" | "editorial">("all");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(item => item !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredItems = PORTFOLIO_ITEMS.filter(item => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  return (
    <section id="portfolio" className="py-20 bg-lux-soft-nude/40">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="font-serif italic text-primary text-lg block mb-2">Lookbook Gallery</span>
          <h3 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight text-primary mb-4">
            Mehak's Showcase of Creations
          </h3>
          <div className="w-16 h-[1px] bg-accent-gold mx-auto mb-6"></div>
          <p className="font-sans text-xs md:text-sm text-lux-muted uppercase tracking-widest max-w-md mx-auto">
            Experience the exquisite visual storytelling of timeless beauty and confidence.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {(["all", "bridal", "hair", "editorial"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                filter === cat
                  ? "bg-primary text-white shadow-md scale-105"
                  : "bg-white/70 text-lux-muted hover:bg-white border border-primary/5"
              }`}
            >
              {cat === "all" ? "Reveal All" : `${cat} Artistry`}
            </button>
          ))}
        </div>

        {/* Portfolio Grid Layout */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const isFav = favorites.includes(item.id);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group relative bg-[#fbfbe2] p-3 rounded-2xl cursor-pointer hover:shadow-2xl transition-all duration-300 border border-primary/5"
                >
                  <div className="aspect-square rounded-xl overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Hover Glow Plate overlay */}
                    <div className="absolute inset-0 bg-primary/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-[#fbfbe2] flex items-center justify-center text-primary shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <Eye size={18} />
                      </div>
                    </div>

                    {/* Left corner Category tags */}
                    <div className="absolute top-3 left-3 bg-[#fbfbe2]/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-primary font-semibold uppercase tracking-widest flex items-center gap-1 shadow">
                      <Sparkles size={10} className="text-secondary" /> {item.category}
                    </div>

                    {/* Right corner Heart favorite */}
                    <button
                      onClick={(e) => toggleFavorite(item.id, e)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center text-primary hover:bg-white hover:text-red-500 transition-all active:scale-90"
                      aria-label="Heart Favorite look"
                    >
                      <Heart size={15} fill={isFav ? "#dc2626" : "none"} className={isFav ? "text-red-600" : ""} />
                    </button>
                  </div>

                  <div className="pt-4 px-1 pb-2">
                    <h5 className="font-serif text-lg text-primary font-medium">
                      {item.title}
                    </h5>
                    <p className="font-sans text-xs text-lux-muted mt-1 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Detailed Lightbox Modal */}
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#fbfbe2] rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl border border-primary/20"
              >
                <div className="aspect-[4/3] relative">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#fbfbe2] to-transparent"></div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center font-bold"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="p-6 md:p-8">
                  <span className="text-accent-gold font-sans text-xs font-bold uppercase tracking-widest">
                    {selectedItem.category} Masterpiece
                  </span>
                  <h4 className="font-serif text-2xl text-primary font-bold mt-1">
                    {selectedItem.title}
                  </h4>
                  <p className="font-sans text-sm text-lux-muted mt-3 leading-relaxed">
                    {selectedItem.subtitle}
                  </p>

                  <div className="mt-6">
                    <h5 className="font-sans text-xs uppercase tracking-widest font-bold text-primary mb-3">
                      Products & Prep details used
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.details.map((detail, idx) => (
                        <span
                          key={idx}
                          className="bg-primary/5 border border-primary/10 text-primary font-sans text-xs px-3 py-1.5 rounded-lg"
                        >
                          ✔ {detail}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="w-full py-3 bg-primary text-white font-sans text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-primary-light transition-all"
                    >
                      Close Lookbook
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
