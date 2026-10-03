'use client';

import Image from 'next/image';
import { Facebook, Phone, Mail, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import { ContactCards } from './ContactCards';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer id="contact" className="bg-gray-950 dark:bg-black text-white py-16 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Cards Section */}
        <ContactCards />

        {/* Divider */}
        <div className="border-t border-gray-800/50 my-12" />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-2">
              <Image
                src="/image/Logo.jpg"
                alt="Aberash Hotel"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <h3 className="text-2xl font-bold leading-relaxed">ABERASH Hotel</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your home away from home. Experience luxury hospitality with authentic warmth.
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4 text-[#d4af37]">Contact</h4>
            <div className="space-y-3">
              <a
                href="tel:+2510965481717"
                className="flex items-center gap-3 text-gray-300 hover:text-[#d4af37] transition-colors group"
              >
                <Phone size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm">+251 965 481 717</span>
              </a>
              <a
                href="tel:+2510934575243"
                className="flex items-center gap-3 text-gray-300 hover:text-[#d4af37] transition-colors group"
              >
                <Phone size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm">+251 934 575 243</span>
              </a>
              <a
                href="mailto:aberashhotel@gmail.com"
                className="flex items-center gap-3 text-gray-300 hover:text-[#d4af37] transition-colors group"
              >
                <Mail size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm">aberashhotel@gmail.com</span>
              </a>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4 text-[#d4af37]">Follow Us</h4>
            <div className="flex gap-4">
              <motion.a
                href="https://www.facebook.com/profile.php?id=61570831670914"
                aria-label="Aberash Hotel on Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 hover:bg-[#d4af37] text-gray-300 hover:text-black rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a
                href="https://www.tiktok.com/@aberash.hotel"
                aria-label="Aberash Hotel on TikTok"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 hover:bg-[#d4af37] text-gray-300 hover:text-black rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Music size={20} />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs gap-4">
            <p>© 2026 Aberash Hotel. All rights reserved.</p>
            <p>Website designed &amp; built by Addisu Legese Meharu</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
