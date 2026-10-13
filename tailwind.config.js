/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        ink: '#172635',
        accent: '#8b7042',
        surface: {
          DEFAULT: '#f7f8fa',
          hover: '#eef1f4',
        },
        primary: {
          DEFAULT: '#1b2938', // Navy controls on white surfaces
          hover: '#304254',
        },
        slate: {
          muted: '#637180',
          light: '#475768',
        },
        border: '#dce1e6',
        charcoal: {
          deep: '#f7f7f7',
          light: '#ededed',
        }
      },
      fontFamily: {
        sans: ['"Stack Sans Notch"', 'sans-serif'],
        display: ['Georgia', 'Times New Roman', 'serif'],
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
