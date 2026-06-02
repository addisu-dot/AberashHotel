'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useBookingModal } from '@/lib/BookingContext';

interface SectionProps {
  id: string;
  title: string;
  description: string;
  image: string;
  cta?: string;
  reverse?: boolean;
  isDark?: boolean;
}

export function InteractiveSection({
  id,
  title,
  description,
  image,
  cta,
  reverse = false,
  isDark = false,
}: SectionProps) {
  const { openBooking } = useBookingModal();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      id={id}
      className={`relative min-h-auto py-16 sm:py-20 px-4 sm:px-6 lg:px-8 ${
        isDark ? 'bg-gray-900 dark:bg-[#1a1a1a]' : 'bg-white dark:bg-[#0a0a0a]'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-start lg:items-center`}
        >
          {/* Content - Flexible height container */}
          <motion.div
            className="flex flex-col justify-center w-full lg:w-1/2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight leading-relaxed"
            >
              {title}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-light mb-8 leading-relaxed"
            >
              {description}
            </motion.p>

            {cta && (
              <motion.button
                onClick={openBooking}
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4af37] hover:bg-[#e5c158] text-black font-semibold rounded-lg transition-all duration-300 w-fit"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                {cta}
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            )}
          </motion.div>

          {/* Image - Flexible but contained */}
          <motion.div
            className="relative w-full lg:w-1/2 h-auto min-h-96 rounded-2xl overflow-hidden shadow-2xl"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${image})`,
                minHeight: '400px',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300"
              whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

