/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'void-black': 'var(--void-black)',
        'deep-earth': 'var(--deep-earth)',
        'mystic-charcoal': 'var(--mystic-charcoal)',
        'forest-shadow': 'var(--forest-shadow)',
        'amber-glow': 'var(--amber-glow)',
        'sage-mist': 'var(--sage-mist)',
        'ethereal-gold': 'var(--ethereal-gold)',
        'moonlight': 'var(--moonlight)',
        'astral-blue': 'var(--astral-blue)',
        'manifestation-green': 'var(--manifestation-green)',
        'warning-amber': 'var(--warning-amber)',
        'error-crimson': 'var(--error-crimson)'
      },
      fontFamily: {
        primary: ['var(--font-primary)'],
        accent: ['var(--font-accent)']
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideInFromLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        mysticalGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212,165,116,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212,165,116,0.6)' }
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out both',
        slideInFromLeft: 'slideInFromLeft 0.6s ease-out both',
        mysticalGlow: 'mysticalGlow 3s ease-in-out infinite'
      }
    }
  },
  plugins: []
};