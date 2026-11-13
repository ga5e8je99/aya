# 🌸 Aya Adel – Senior Graphic Designer & Visual Identity Portfolio

A modern, high-aesthetic **Light Mode** portfolio website built for **Aya Adel (آية عادل)**, Senior Graphic Designer and Brand Identity Specialist. Designed with soft feminine color palettes (blush rose, pastel lavender, and champagne peach), delicate section wave transitions, bilingual support (English & Arabic), and interactive feline companions inspired by her three beloved cats (Milo, Oliver, and Luna).

---

## ✨ Features & Highlights

- **🌸 Girly Light Mode Aesthetic:** Clean, airy, and high-fashion visual design with soft rose (`#FFF8FA`), blush cream, and pastel gradients.
- **🐱 Interactive Cat Mascot Companion (`CatCompanion.js`):**
  - An animated feline companion that sits at the screen corner with ear twitches, blinking eyes, and tail swishes.
  - Interactive speech bubbles with funny/sweet studio dialogue.
  - Synthesized Web Audio kitten meow on click.
  - "Take a Cat Walk 🐾" feature: sends an animated kitten strolling across the bottom of the screen.
- **🐾 Furry Co-Designers Section (`CatCoDesigners.js`):**
  - Dedicated showcase for the 3 cats from Aya's real photo:
    - **Milo (Orange Tabby):** Chief Color Strategist & Warmth Inspector.
    - **Oliver (Sleeping Tabby):** Head of Zen & Ergonomics.
    - **Luna (Shoulder Tabby):** Executive Art Director & Pixel Guardian.
  - Interactive lightbox modal displaying the original portrait of Aya with her three cats.
- **🐾 Floating Paw Cursor Trail (`PawCursorTrail.js`):** Subtle, delicate sparkles and paw prints that fade gracefully behind mouse movements.
- **🌐 Full Bilingual Support (EN / AR):** Seamless language switching with automatic RTL layout formatting.
- **💼 Rich Graphic Design Case Studies:** Dedicated case study pages (`/projects/[id]`) for luxury branding, packaging die-lines, social campaigns, editorial layout, and UI/UX.
- **📅 Interactive Discovery Call Booking (`Picker.js`):** Light-mode styled calendar & time picker for client consultations with direct WhatsApp confirmation.
- **💌 Direct Message & Contact Hub:** Contact form, one-click WhatsApp chat, email copy, and portfolio links (Behance, Dribbble, Instagram, LinkedIn).
- **🌊 Seamless Wavy Section Dividers:** Smooth pastel curves connecting each section.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the active port) with your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
├── app/
│   ├── components/
│   │   ├── Navbar.js             # Sticky frosted navbar with language toggle & CV download
│   │   ├── Hero.js               # Arched portrait of Aya & cats, specialties, stats
│   │   ├── About.js              # Creative pillars, bio story, tools & details
│   │   ├── Skills.js             # Categorized design skills & proficiency bars
│   │   ├── CatCoDesigners.js     # Milo, Oliver & Luna showcase + photo modal
│   │   ├── CatCompanion.js       # Animated interactive corner cat mascot
│   │   ├── PawCursorTrail.js     # Interactive floating paw prints trail
│   │   ├── Portfolio.js          # Filterable design project showcase
│   │   ├── Services.js           # 6 tailored graphic design offerings
│   │   ├── ExperienceEducation.js# Career timeline, academic honors & certifications
│   │   ├── Contact.js            # Message form, direct channels & socials
│   │   ├── Picker.js             # Appointment calendar & time booking modal
│   │   ├── Wave.js               # Fluid SVG wave dividers between sections
│   │   └── WelcomeAnimation.js   # Chic cursive welcome intro
│   ├── projects/[id]/            # Dynamic case study detail pages
│   ├── globals.css               # Light mode variables, animations & floating particles
│   ├── layout.js                 # SEO metadata, Schema.org Person JSON-LD, fonts
│   └── page.js                   # Landing page layout with coordinated wave sequence
├── lib/
│   ├── siteData.js               # Centralized portfolio data (profile, projects, skills, cats)
│   ├── translations.js           # Complete English & Arabic translation dictionaries
│   ├── LanguageContext.js        # Bilingual state provider & RTL handler
│   └── useSiteData.js            # React state & LocalStorage synchronization
└── public/
    ├── aya-adel.png              # Transparent cutout of Aya Adel with her 3 cats
    ├── aya-original.jpg          # Original high-res photo with her cats
    ├── projectImage/             # Showcase mockup graphics for design case studies
    └── fonts/                    # Geist and script typography
```
