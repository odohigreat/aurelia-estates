/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0b',
        surface: {
          DEFAULT: '#141517',
          hover: '#1c1d21',
        },
        primary: {
          DEFAULT: '#d4af37', // Soft Gold
          hover: '#e8c558',
        },
        slate: {
          muted: '#80848f',
          light: '#b0b4bd',
        },
        border: '#2a2b30',
        charcoal: {
          deep: '#121214',
          light: '#1f2024',
        }
      },
      fontFamily: {
        sans: ['"Stack Sans Notch"', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
