'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Review {
  id: number;
  text: string;
  author: string;
  rating: number;
}

const reviews: Review[] = [
  {
    id: 1,
    text: "The perfect fusion of modern aesthetic and raw Ethiopian warmth. The green oasis is unmatched!",
    author: "Nathan T.",
    rating: 5,
  },
  {
    id: 2,
    text: "Absolute luxury. The interiors and the traditional coffee experience gave me a whole new perspective on hospitality.",
    author: "Sophia M.",
    rating: 5,
  },
  {
    id: 3,
    text: "Sleek dark mode website, even better real-life experience. 10/10 recommendation for anyone visiting.",
    author: "Abel K.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setAutoPlay(false);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setAutoPlay(false);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(rating)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className="fill-[#d4af37] text-[#d4af37]"
          />
        ))}
      </div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const slideVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <section className="bg-white dark:bg-[#0a0a0a] py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
              What Our Guests Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto">
              Discover why guests from around the world choose Aberash Hotel for their unforgettable stays
            </p>
          </motion.div>

          {/* Carousel Container */}
          <motion.div
            variants={itemVariants}
            className="relative"
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            {/* Main Carousel */}
            <div className="relative h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="w-full"
                >
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-[#1a1a1a] border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-8 sm:p-12 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    {/* Rating Stars */}
                    <div className="mb-6 flex gap-1">
                      {renderStars(reviews[currentIndex].rating)}
                    </div>

                    {/* Review Text */}
                    <blockquote className="mb-8">
                      <p className="text-2xl sm:text-3xl font-light text-gray-800 dark:text-gray-100 leading-relaxed italic">
                        &ldquo;{reviews[currentIndex].text}&rdquo;
                      </p>
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37] to-[#a68c28] flex items-center justify-center">
                        <span className="text-lg font-bold text-black">
                          {reviews[currentIndex].author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-lg">
                          {reviews[currentIndex].author}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Verified Guest
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8 justify-center sm:justify-end">
                <motion.button
                  onClick={prev}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-[#d4af37] dark:hover:bg-[#d4af37] text-gray-900 dark:text-white hover:text-black transition-colors duration-300 border border-gray-300 dark:border-gray-700"
                  aria-label="Previous review"
                >
                  <ChevronLeft size={20} />
                </motion.button>
                <motion.button
                  onClick={next}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-[#d4af37] dark:hover:bg-[#d4af37] text-gray-900 dark:text-white hover:text-black transition-colors duration-300 border border-gray-300 dark:border-gray-700"
                  aria-label="Next review"
                >
                  <ChevronRight size={20} />
                </motion.button>
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex gap-2 justify-center mt-8">
              {reviews.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setAutoPlay(false);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-[#d4af37] w-8'
                      : 'bg-gray-300 dark:bg-gray-700 w-2 hover:bg-gray-400 dark:hover:bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Grid View - Mobile Alternative */}
          <motion.div
            variants={itemVariants}
            className="block sm:hidden space-y-6 mt-12"
          >
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              All Reviews
            </p>
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-[#1a1a1a] border-2 border-gray-200 dark:border-gray-800 rounded-xl p-6"
              >
                <div className="mb-4 flex gap-1">
                  {renderStars(review.rating)}
                </div>
                <p className="text-lg font-light text-gray-800 dark:text-gray-100 mb-4 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#a68c28] flex items-center justify-center">
                    <span className="text-sm font-bold text-black">
                      {review.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {review.author}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Verified Guest
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
