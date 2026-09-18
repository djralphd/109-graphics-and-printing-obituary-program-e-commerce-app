/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f4f6fa',
          100: '#e6ebf3',
          200: '#c8d3e5',
          300: '#9db0cf',
          400: '#6b85b3',
          500: '#4a6699',
          600: '#3a517d',
          700: '#2f4166',
          800: '#1e2a45',
          900: '#141d33',
          950: '#0b1220',
        },
        gold: {
          50: '#fbf8f1',
          100: '#f5eeda',
          200: '#ead9b0',
          300: '#ddc07f',
          400: '#d0a854',
          500: '#c4913a',
          600: '#a8742e',
          700: '#875a28',
          800: '#6f4926',
          900: '#5d3d23',
        },
        cream: {
          50: '#fdfcfa',
          100: '#faf7f2',
          200: '#f4efe6',
          300: '#ebe3d5',
          400: '#ddd0bb',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 24px -8px rgba(20, 29, 51, 0.12)',
        'elevated': '0 12px 40px -12px rgba(20, 29, 51, 0.22)',
        'gold': '0 8px 32px -8px rgba(196, 145, 58, 0.35)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
