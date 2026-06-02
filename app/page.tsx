'use client';

import { HeroSection } from '@/components/HeroSection';
import { InteractiveSection } from '@/components/InteractiveSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { BookingModalProvider } from '@/lib/BookingContext';
import { BookingModalRoot } from '@/components/BookingModalRoot';

export default function Home() {
  return (
    <BookingModalProvider>
      <BookingModalRoot />
      <main>
        <HeroSection />

      {/* Dining & Coffee Section */}
      <InteractiveSection
        id="coffee"
        title="Authentic Coffee & Fine Dining"
        description="Savor the rich, bold flavors of traditional Ethiopian coffee rituals alongside premium culinary masterpieces crafted by our top chefs."
        image="/image/coffee.jpg"
        isDark={false}
        cta="Book Your Stay"
      />

      {/* Premium Rooms Section */}
      <InteractiveSection
        id="rooms"
        title="Exquisite Spaces"
        description="Step into pure comfort. Our meticulously styled bedroom suites and modern corridors offer the perfect luxury escape for your stay."
        image="/image/Bedroom.jpg"
        reverse={true}
        isDark={true}
        cta="Book Your Stay"
      />

      {/* Restaurant/Dining Section */}
      <InteractiveSection
        id="restaurant"
        title="Authentic Coffee & Fine Dining"
        description="Savor the rich, bold flavors of traditional Ethiopian coffee rituals alongside premium culinary masterpieces crafted by our top chefs."
        image="/image/restaurant.jpg"
        reverse={false}
        isDark={false}
        cta="Book Your Stay"
      />

      {/* Interior Ambiance/Corridor Section */}
      <InteractiveSection
        id="ambiance"
        title="Exquisite Spaces"
        description="Step into pure comfort. Our meticulously styled bedroom suites and modern corridors offer the perfect luxury escape for your stay."
        image="/image/Corridor.jpg"
        reverse={true}
        isDark={true}
        cta="Book Your Stay"
      />

      {/* Garden Section */}
      <InteractiveSection
        id="garden"
        title="The Green Terrace Oasis"
        description="Unwind and catch premium vibes in our lush outdoor garden. Perfect for serene afternoons and chill evening hangouts."
        image="/image/garden.jpg"
        isDark={false}
        cta="Book Your Stay"
      />

      {/* Testimonials Section */}
      <TestimonialsSection />
    </main>
    </BookingModalProvider>
  );
}

