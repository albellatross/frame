/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#EC4899',
        primary: '#2563EB',
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Crimson Pro', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #EC4899 0%, #F97316 50%, #FB923C 100%)',
        'gradient-primary': 'linear-gradient(135deg, #2563EB 0%, #3B82F6 50%, #60A5FA 100%)',
        'gradient-glass': 'linear-gradient(145deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.4) 100%)',
        'gradient-mesh': 'radial-gradient(at 40% 20%, rgba(37, 99, 235, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(236, 72, 153, 0.12) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(37, 99, 235, 0.1) 0px, transparent 50%), radial-gradient(at 80% 80%, rgba(236, 72, 153, 0.08) 0px, transparent 50%)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.8)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 6px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 12px 48px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)',
        'button': '0 2px 12px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)',
        'button-hover': '0 4px 20px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 20s ease-in-out infinite',
        'float-delayed': 'float 18s ease-in-out infinite 2s',
        'float-slow': 'float 25s ease-in-out infinite 5s',
        'gradient': 'gradient 8s ease infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'tilt': 'tilt 10s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': {
            transform: 'translate(0%, 0%) scale(1)',
          },
          '25%': {
            transform: 'translate(30%, 20%) scale(1.3)',
          },
          '50%': {
            transform: 'translate(15%, 35%) scale(1.1)',
          },
          '75%': {
            transform: 'translate(40%, 15%) scale(1.25)',
          },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        shimmer: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        glow: {
          '0%, 100%': {
            opacity: '0.5',
            filter: 'blur(20px)',
          },
          '50%': {
            opacity: '0.8',
            filter: 'blur(30px)',
          },
        },
        tilt: {
          '0%, 50%, 100%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(1deg)',
          },
          '75%': {
            transform: 'rotate(-1deg)',
          },
        },
      },
    },
  },
  plugins: [],
}
