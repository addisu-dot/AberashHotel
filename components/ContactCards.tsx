'use client';

import { Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export function ContactCards() {
  const contacts = [
    {
      id: 'phone-1',
      icon: Phone,
      title: 'Phone',
      items: [
        { label: '0965481717', href: 'tel:+2510965481717' },
        { label: '0934575243', href: 'tel:+2510934575243' },
      ],
    },
    {
      id: 'email',
      icon: Mail,
      title: 'Email',
      items: [{ label: 'aberashhotel@gmail.com', href: 'mailto:aberashhotel@gmail.com' }],
    },
    {
      id: 'location',
      icon: MapPin,
      title: 'Location',
      items: [{ label: '6WV4+FV, Durame', href: 'https://www.google.com/maps/search/?api=1&query=6WV4%2BFV+Durame' }],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {contacts.map((contact) => {
        const Icon = contact.icon;
        return (
          <motion.div
            key={contact.id}
            variants={cardVariants}
            whileHover={{ y: -5 }}
            className="relative group p-6 bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/50 rounded-lg backdrop-blur-sm hover:border-[#d4af37]/50 transition-all duration-300"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Icon */}
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="p-2 bg-[#d4af37]/10 rounded-lg group-hover:bg-[#d4af37]/20 transition-colors"
              >
                <Icon size={24} className="text-[#d4af37]" />
              </motion.div>
              <h3 className="text-lg font-semibold text-white">{contact.title}</h3>
            </div>

            {/* Contact items */}
            <div className="space-y-2">
              {contact.items.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  {...(item.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                  className="flex items-center text-gray-300 hover:text-[#d4af37] transition-colors text-sm group/item"
                >
                  <span className="text-[#d4af37] mr-2 opacity-0 group-hover/item:opacity-100 transition-opacity">→</span>
                  <span className="group-hover/item:translate-x-1 transition-transform">{item.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
