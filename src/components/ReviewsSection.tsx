import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/products';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Proof Claim */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#EAE0D2]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B5761E] mb-2">
              <span>Verified Patron Acclaim</span>
              <span aria-hidden="true">·</span>
              <span>1,280+ 5-Star Reviews</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1511]">
              The Connoisseur’s Verdict
            </h2>
          </div>

          {/* Aggregate Rating Pill-less block */}
          <div className="flex items-center gap-4 bg-[#F2E8D8] px-5 py-3 rounded-xl border border-[#DFCBB5]">
            <div className="font-serif text-3xl font-bold text-[#1E1511] tabular-nums">
              4.97
            </div>
            <div>
              <div className="flex items-center text-[#C68A29] mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <div className="text-[11px] text-[#785E4D]">
                Based on verified bakery & shipping orders
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CUSTOMER_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-[#FFFDF9] border border-[#EAE0D2] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs transition-all hover:shadow-md hover:border-[#D5C2AA]"
            >
              <div>
                {/* Rating & Favorite Cheesecake Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center text-[#C68A29]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#8C6D58] uppercase tracking-wider">
                    {review.cheesecake}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-sm sm:text-base text-[#4A382A] italic leading-relaxed mb-6 font-serif">
                  "{review.comment}"
                </p>
              </div>

              {/* Author & Verification */}
              <div className="pt-4 border-t border-[#F0E6D8] flex items-center justify-between text-xs text-[#7A6351]">
                <div>
                  <span className="font-bold text-[#1E1511] block text-sm">
                    {review.author}
                  </span>
                  <span>{review.location} · {review.date}</span>
                </div>

                {review.verifiedBuyer && (
                  <div className="flex items-center gap-1 text-[#2E5E32] font-medium text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Buyer</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
