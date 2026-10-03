# Aberash Hotel Website

A responsive website for Aberash Hotel in Durame, Ethiopia, built with **Next.js**, **Tailwind CSS**, and **Framer Motion**.

## 🎨 Design Philosophy

- **Minimal & Fast**: Clean design focused on user experience
- **Dark/Light Mode**: Seamless theme switching with localStorage persistence
- **Responsive**: Fully responsive design from mobile to desktop
- **Smooth Animations**: Framer Motion for elegant transitions
- **Accessible basics**: semantic HTML, labelled buttons and keyboard-friendly forms

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
aberash-hotel/
├── app/
│   ├── layout.tsx          # Root layout with Navigation & Footer
│   ├── page.tsx            # Home page with HeroSection
│   └── globals.css         # Global styles
├── components/
│   ├── Navigation.tsx      # Header with mobile menu
│   ├── HeroSection.tsx     # Hero with animations
│   ├── Footer.tsx          # Footer with contact info
│   ├── ThemeToggle.tsx     # Dark/Light mode toggle
│   └── LanguageSwitcher.tsx # Amharic/English switcher
├── image/                  # Image assets
├── tailwind.config.js      # Tailwind configuration
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── package.json
```

## 🎯 Features (Phase 1 - Complete)

✅ **Dark/Light Mode Toggle**
- Persistent theme with localStorage
- System preference detection

✅ **Language Switcher**
- Amharic (አማ) / English (EN)
- Placeholder ready for full i18n integration

✅ **Responsive Navigation**
- Desktop & mobile menus
- Smooth mobile hamburger toggle
- Sticky header with backdrop blur

✅ **Hero Section**
- Full-screen hero with background image
- Smooth Framer Motion animations
- CTA buttons (Book Now / Explore)
- Animated scroll indicator

✅ **Modern Footer**
- Contact info with phone links
- Social media links (Facebook, TikTok)
- Year-auto-updating copyright

## 🎨 Color System

- **Accent Gold**: `#d4af37` - Premium feel
- **Light Mode**: White (`#ffffff`) with gray tones
- **Dark Mode**: Deep black (`#0a0a0a`) with dark grays
- **Text**: High contrast for accessibility

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔗 Contact Integration

- **Phone**: +251 965 481 717, +251 934 575 243
- **Email**: aberashhotel@gmail.com
- **Facebook**: [Aberash Hotel](https://www.facebook.com/profile.php?id=61570831670914)
- **TikTok**: [@aberash.hotel](https://www.tiktok.com/@aberash.hotel)

## 📝 Next Steps

Phase 2 plans:
- [ ] Full i18n implementation (Amharic language)
- [ ] Rooms & Suites showcase
- [ ] Dining menu section
- [ ] Booking system integration
- [ ] Photo gallery with lightbox
- [ ] Reviews/testimonials section
- [ ] Contact form
- [ ] SEO optimization

## 🛠️ Technologies

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion 11
- **Icons**: Lucide React
- **Language**: TypeScript
- **Linting**: ESLint

## 📄 License

Private project for Aberash Hotel.

## Booking requests
The booking form sends an email to the hotel through `/api/booking`. Set `EMAIL_USER` and `EMAIL_PASS` (a Gmail app password) in your Vercel project settings, or the form will ask guests to call instead. See `EMAIL_SETUP.md`.

## Author
Built by Addisu Legese Meharu ([github.com/addisu-dot](https://github.com/addisu-dot)).
