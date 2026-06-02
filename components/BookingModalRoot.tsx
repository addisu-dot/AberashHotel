'use client';

import { BookingModal } from './BookingModal';
import { useBookingModal } from '@/lib/BookingContext';

export function BookingModalRoot() {
  const { isOpen, closeBooking } = useBookingModal();
  return <BookingModal isOpen={isOpen} onClose={closeBooking} />;
}
