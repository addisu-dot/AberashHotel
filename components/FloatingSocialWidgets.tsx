'use client';

import { motion } from 'framer-motion';
import { Facebook, Music } from 'lucide-react';

export function FloatingSocialWidgets() {
  const socialLinks = [
    {
      id: 'facebook',
      icon: Facebook,
      href: 'https://www.facebook.com/profile.php?id=61570831670914',
      label: 'Facebook',
      color: '#1877F2',
    },
    {
      id: 'tiktok',
      icon: Music,
      href: 'https://www.tiktok.com/@aberash.hotel',
      label: 'TikTok',
      color: '#000000',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 sm:bottom-8 sm:right-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <motion.a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            variants={iconVariants}
            whileHover={{
              scale: 1.15,
              boxShadow: `0 0 20px ${social.color}40`,
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-white hover:border-[#d4af37] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Icon size={24} className="sm:w-6 sm:h-6 group-hover:text-[#d4af37] transition-colors" />
            <motion.div
              className="absolute -left-20 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap"
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
            >
              {social.label}
            </motion.div>
          </motion.a>
        );
      })}
    </motion.div>
  );
}
