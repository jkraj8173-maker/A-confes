# Confession Site

A beautiful, interactive confession website with romantic animations and effects.

## Features

- **Music Prompt**: Asks user to play music before starting the experience
- **Loading Screen**: Animated loader with progress bar
- **Secret Code**: Interactive keypad to unlock the surprise
- **Heart Reveal**: Big heart opens with 30 falling small hearts
- **Rose Bloom**: Beautiful SVG rose with 24 animated petals that bloom on tap
- **Special Message**: Romantic message reveal
- **Photo Gallery**: Swipeable photo memories with flip effect
- **Auto-Replay**: Restarts after 25 seconds of inactivity on the gallery

## Project Structure

```
src/
├── app/
│   └── page.jsx          # Main app with screen flow logic
├── components/
│   ├── MusicPrompt.jsx   # Initial music choice screen
│   ├── Loader.jsx        # Loading animation
│   ├── SecretCode.jsx    # Secret code entry
│   ├── HeartReveal.jsx   # Heart opening animation
│   ├── ConfessionIntro.jsx # Rose bloom screen
│   ├── SpecialMessage.jsx  # Message reveal
│   └── PhotoGallery.jsx  # Photo memories gallery
public/
├── images/               # Memory photos (1.jpg - 4.jpg)
└── audio/               # Background music (romantic.mp3)
```

## Setup

1. Run `npm install` to install dependencies
2. Add your music file to `public/audio/romantic.mp3`
3. Replace photos in `public/images/` with your own
4. Run `npm run dev` for development

## GitHub Hosting

This project is configured for static export:

1. Run `npm run build` to create the static export
2. The `out/` folder contains the static site
3. Deploy to GitHub Pages, Netlify, or Vercel

## Customization

- **Secret Code**: Edit `SecretCode.jsx` to change the unlock code
- **Photos**: Replace images in `public/images/` (1.jpg, 2.jpg, 3.jpg, 4.jpg)
- **Music**: Add your romantic.mp3 to `public/audio/`
- **Messages**: Edit text in `SpecialMessage.jsx` and `ConfessionIntro.jsx`
- **Watermark**: Change "Made with love by Jeet" in `page.jsx`

## Technologies

- Next.js 15
- React
- Framer Motion
- Tailwind CSS
- Swiper.js
- Lucide Icons
