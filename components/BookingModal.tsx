'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Home, Loader } from 'lucide-react';
import { SuccessScreen } from './SuccessScreen';

interface BookingFormData {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomType: string;
  fullName: string;
  phone: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<BookingFormData>({
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0,
    roomType: 'deluxe-suite',
    fullName: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const roomTypes = [
    { id: 'deluxe-suite', name: 'Deluxe Suite' },
    { id: 'executive-corridor', name: 'Executive Corridor Room' },
    { id: 'garden-villa', name: 'Garden Villa' },
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.checkIn) newErrors.checkIn = 'Check-in date is required';
    if (!formData.checkOut) newErrors.checkOut = 'Check-out date is required';
    if (formData.checkIn && formData.checkOut && formData.checkIn >= formData.checkOut) {
      newErrors.checkOut = 'Check-out must be after check-in';
    }
    if (formData.adults + formData.children === 0) {
      newErrors.guests = 'At least one guest is required';
    }
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!/^\d{10,}/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitError(data.error || 'Failed to send booking request');
        setIsLoading(false);
        return;
      }

      setShowSuccess(true);
      setIsLoading(false);

      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 4000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Network error. Please try again.';
      setSubmitError(errorMessage);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShowSuccess(false);
    setIsLoading(false);
    setSubmitError(null);
    setFormData({
      checkIn: '',
      checkOut: '',
      adults: 1,
      children: 0,
      roomType: 'deluxe-suite',
      fullName: '',
      phone: '',
    });
    setErrors({});
    onClose();
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 400, damping: 30 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  if (showSuccess) {
    return <SuccessScreen />;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-6 sm:p-8 w-screen max-w-2xl mx-4 border border-gray-200 dark:border-gray-800">
              {/* Close Button */}
              <motion.button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close modal"
              >
                <X size={24} className="text-gray-600 dark:text-gray-400" />
              </motion.button>

              {/* Header */}
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  Book Your Stay
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Experience luxury at Aberash Hotel
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Check-in Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        Check-in Date
                      </div>
                    </label>
                    <input
                      type="date"
                      value={formData.checkIn}
                      onChange={(e) =>
                        setFormData({ ...formData, checkIn: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] dark:focus:ring-[#e5c158] text-gray-900 dark:text-white transition-all"
                    />
                    {errors.checkIn && (
                      <p className="text-red-500 text-sm mt-1">{errors.checkIn}</p>
                    )}
                  </div>

                  {/* Check-out Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        Check-out Date
                      </div>
                    </label>
                    <input
                      type="date"
                      value={formData.checkOut}
                      onChange={(e) =>
                        setFormData({ ...formData, checkOut: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] dark:focus:ring-[#e5c158] text-gray-900 dark:text-white transition-all"
                    />
                    {errors.checkOut && (
                      <p className="text-red-500 text-sm mt-1">{errors.checkOut}</p>
                    )}
                  </div>
                </div>

                {/* Guests Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Adults */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      <div className="flex items-center gap-2">
                        <Users size={16} />
                        Adults
                      </div>
                    </label>
                    <select
                      value={formData.adults}
                      onChange={(e) =>
                        setFormData({ ...formData, adults: parseInt(e.target.value) })
                      }
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] dark:focus:ring-[#e5c158] text-gray-900 dark:text-white transition-all"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Adult' : 'Adults'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Children */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      <div className="flex items-center gap-2">
                        <Users size={16} />
                        Children
                      </div>
                    </label>
                    <select
                      value={formData.children}
                      onChange={(e) =>
                        setFormData({ ...formData, children: parseInt(e.target.value) })
                      }
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] dark:focus:ring-[#e5c158] text-gray-900 dark:text-white transition-all"
                    >
                      {[0, 1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Child' : 'Children'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {errors.guests && (
                  <p className="text-red-500 text-sm">{errors.guests}</p>
                )}

                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                  >
                    <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                      ⚠️ {submitError}
                    </p>
                  </motion.div>
                )}

                {/* Room Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    <div className="flex items-center gap-2">
                      <Home size={16} />
                      Room Type
                    </div>
                  </label>
                  <select
                    value={formData.roomType}
                    onChange={(e) =>
                      setFormData({ ...formData, roomType: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] dark:focus:ring-[#e5c158] text-gray-900 dark:text-white transition-all"
                  >
                    {roomTypes.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Contact Info Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] dark:focus:ring-[#e5c158] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] dark:focus:ring-[#e5c158] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 font-bold rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#d4af37] to-[#e5c158] hover:from-[#e5c158] hover:to-[#f5d876] text-black'
                  }`}
                  whileHover={!isLoading ? { scale: 1.02 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                >
                  {isLoading ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    'Confirm Booking Reservation'
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
