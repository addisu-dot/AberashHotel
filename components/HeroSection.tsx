'use client';

import { motion } from 'framer-motion';
import { useBookingModal } from '@/lib/BookingContext';

export function HeroSection() {
  const { openBooking } = useBookingModal();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
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

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url(/image/name.jpg)',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 dark:from-black/70 dark:via-black/60 dark:to-black/80"></div>
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl w-full py-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg leading-relaxed"
          >
            CRAFTING PREMIUM LUXURY
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl lg:text-2xl text-gray-100 mb-10 font-light drop-shadow-md leading-relaxed px-2 sm:px-0"
          >
            Welcome to Aberash Hotel. Where modern comfort seamlessly blends with timeless Ethiopian hospitality.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap"
          >
            <motion.button
              onClick={openBooking}
              className="px-8 py-4 bg-[#d4af37] hover:bg-[#e5c158] text-black font-semibold rounded-lg text-lg shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(212, 175, 55, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              Book Your Stay
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="text-white opacity-70">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>
    );
  }

