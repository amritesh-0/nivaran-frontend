/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: {
          DEFAULT: '#FFFFFF',
          muted: '#F5F7FA',
        },
        text: {
          primary: '#222222',
          muted: '#888888',
        },
        brand: {
          violet: '#A9BFFF',
          blue: {
            500: '#5B9DFF',
            400: '#7CCBFF',
          },
        },
      },
      backgroundImage: {
        'gradient-brand-primary': 'linear-gradient(135deg, #5B9DFF, #7CCBFF)',
        'gradient-brand-secondary': 'linear-gradient(135deg, #5B9DFF, #A9BFFF)',
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};