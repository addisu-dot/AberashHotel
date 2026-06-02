'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export function SuccessScreen() {
  const checkmarkVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  const circleVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 20,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6,
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-center justify-center"
    >
      <motion.div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 sm:p-12 max-w-md mx-4 border border-gray-200 dark:border-gray-800 text-center">
        {/* Checkmark Circle */}
        <motion.div
          variants={circleVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center mb-6"
        >
          <div className="relative w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
            <motion.div
              variants={checkmarkVariants}
              initial="hidden"
              animate="visible"
            >
              <Check size={56} className="text-white" strokeWidth={3} />
            </motion.div>
          </div>
        </motion.div>

        {/* Success Text */}
        <motion.div variants={textVariants} initial="hidden" animate="visible">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Reservation Request Sent!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Thank you! Aberash Hotel management will contact you shortly to confirm your room.
          </p>
        </motion.div>

        {/* Floating animation */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
        />
      </motion.div>
    </motion.div>
  );
}
