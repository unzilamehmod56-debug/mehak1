/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { INITIAL_REVIEWS } from "../data/services";
import { Review } from "../types";
import { Star, MessageSquarePlus, Check, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
    category: "Bridal Couture",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const calculateAverageRating = () => {
    const total = reviews.reduce((sum, item) => sum + item.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const review: Review = {
      id: `rev-${Date.now()}`,
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split("T")[0],
      verified: true, // Auto-verify within salon context
      serviceCategory: newReview.category,
    };

    setReviews([review, ...reviews]);
    setNewReview({ name: "", rating: 5, comment: "", category: "Bridal Couture" });
    setIsFormOpen(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <section id="reviews" className="py-20 bg-[#fbfbe2]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Summary Half */}
          <div className="lg:w-1/3">
            <span className="font-serif italic text-primary text-lg block mb-2">Guest Testimonial Ledger</span>
            <h3 className="font-serif text-3xl md:text-5xl font-semibold tracking-tight text-primary mb-4">
              Praising Our Artistry
            </h3>
            <div className="w-16 h-[1px] bg-accent-gold mb-6"></div>
            
            <div className="bg-[#f5f5dc] p-6 rounded-2xl border border-primary/10">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-serif text-5xl font-bold text-primary">
                  {calculateAverageRating()}
                </span>
                <div>
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={16}
                        fill={Number(calculateAverageRating()) >= s ? "currentColor" : "none"}
                        className={Number(calculateAverageRating()) >= s ? "fill-current" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="font-sans text-xs text-lux-muted mt-1 block uppercase tracking-widest">
                    Based on {reviews.length} Verified Reviews
                  </span>
                </div>
              </div>
              <p className="font-sans text-xs text-lux-muted leading-relaxed">
                Our reviews are authentic testimonials from lovely brides and guests who experienced first-hand the Mehak transformation.
              </p>

              <button
                onClick={() => setIsFormOpen(!isFormOpen)}
                className="w-full mt-6 py-3 bg-primary text-white font-sans text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-primary-light transition-all flex items-center justify-center gap-2 shadow-md hover:translate-y-[-1px]"
              >
                <MessageSquarePlus size={15} /> Write Masterpiece Review
              </button>
            </div>
          </div>

          {/* Testimonials List Half */}
          <div className="lg:w-2/3 w-full">
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-6 p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-sans font-semibold flex items-center gap-2 border border-emerald-100 uppercase tracking-wider"
                >
                  <Award size={18} className="text-emerald-700" />
                  Your beautiful review was added successfully! Thank you for the praise.
                </motion.div>
              )}
            </AnimatePresence>

            {/* Slide Down Guest Review Form */}
            <AnimatePresence>
              {isFormOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mb-8"
                >
                  <form
                    onSubmit={handleCreateReview}
                    className="p-6 bg-white/60 border border-primary/20 rounded-2xl space-y-4 shadow-inner"
                  >
                    <h4 className="font-serif text-lg text-primary font-bold">
                      Add Your Reflection
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-sans uppercase tracking-widest font-semibold text-primary mb-1">
                          Your Lovely Name
                        </label>
                        <input
                          type="text"
                          required
                          value={newReview.name}
                          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                          placeholder="Laiba Irfan"
                          className="w-full p-2.5 bg-white border border-primary/10 rounded-lg text-sm font-sans focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-sans uppercase tracking-widest font-semibold text-primary mb-1">
                          Atelier Specialty Received
                        </label>
                        <select
                          value={newReview.category}
                          onChange={(e) => setNewReview({ ...newReview, category: e.target.value })}
                          className="w-full p-2.5 bg-white border border-primary/10 rounded-lg text-sm font-sans focus:outline-none focus:border-primary"
                        >
                          <option>Bridal Couture</option>
                          <option>Editorial Hair</option>
                          <option>Glow Spa</option>
                          <option>Signature Lash Treatment</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-widest font-semibold text-primary mb-2">
                        Rating Assessment
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                            className="text-amber-500 focus:outline-none hover:scale-110 transition-transform"
                          >
                            <Star
                              size={24}
                              fill={newReview.rating >= star ? "currentColor" : "none"}
                              className={newReview.rating >= star ? "" : "text-gray-300"}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans uppercase tracking-widest font-semibold text-primary mb-1">
                        Your Praise & Reflection
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        placeholder="Detail your special moments experience..."
                        className="w-full p-2.5 bg-white border border-primary/10 rounded-lg text-sm font-sans focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="px-4 py-2 border border-primary/15 rounded-lg text-xs font-semibold text-primary uppercase tracking-widest hover:bg-primary/5"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-primary text-white rounded-lg text-xs font-semibold uppercase tracking-widest hover:bg-primary-light shadow-sm"
                      >
                        Submit reflection
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* List */}
            <div className="space-y-6">
              {reviews.map((rev) => (
                <motion.div
                  layout
                  key={rev.id}
                  className="bg-[#f5f5dc]/50 backdrop-blur-md p-6 rounded-2xl border border-primary/5 flex flex-col md:flex-row gap-4 justify-between items-start"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex text-amber-500">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={14}
                            fill={rev.rating >= s ? "currentColor" : "none"}
                            className={rev.rating >= s ? "" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      {rev.serviceCategory && (
                        <span className="bg-primary/5 text-primary text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-bold font-sans">
                          {rev.serviceCategory}
                        </span>
                      )}
                    </div>

                    <p className="font-serif italic text-base md:text-lg text-lux-dark mb-4">
                      "{rev.comment}"
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="font-sans text-xs font-semibold text-primary">
                        {rev.name}
                      </span>
                      {rev.verified && (
                        <span className="text-emerald-700 text-[10px] font-sans flex items-center gap-0.5 uppercase tracking-wider font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                          <Check size={10} strokeWidth={3} /> Verified Bride
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right whitespace-nowrap text-[11px] text-lux-muted font-sans font-medium uppercase tracking-widest min-w-[80px]">
                    {rev.date}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
