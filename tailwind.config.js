/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#5F4E41',
        primary: '#3B230E',
        'cream-light': '#FEF9ED',
        'cream': '#EFE2D1',
        'cream-dark': '#E1DBC6',
        'warm-gray': '#72675B',
        'brown': '#5F4E41',
        'dark-brown': '#3B230E',
        neutral: {
          50: '#FEF9ED',
          100: '#EFE2D1',
          200: '#E1DBC6',
          300: '#D4CFC0',
          400: '#A39A8E',
          500: '#72675B',
          600: '#5F4E41',
          700: '#4A3D33',
          800: '#3B230E',
          900: '#2A1A0A',
        },
      },
      fontFamily: {
        sans: ['Segoe Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Bradford', 'Times New Roman', 'Georgia', 'serif'],
        mono: ['Red Hat Mono', 'Courier New', 'monospace'],
        'zh-display': ['Noto Serif SC', 'Source Han Serif SC', 'Songti SC', 'serif'],
        'zh-title': ['Noto Sans SC', 'Source Han Sans SC', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        'zh-body': ['Noto Sans SC', 'Source Han Sans SC', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        'zh-micro': ['Noto Sans SC', 'Source Han Sans SC', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #5F4E41 0%, #72675B 50%, #8C5462 100%)',
        'gradient-primary': 'linear-gradient(135deg, #3B230E 0%, #5F4E41 50%, #72675B 100%)',
        'gradient-glass': 'linear-gradient(145deg, rgba(254,249,237,0.6) 0%, rgba(239,226,209,0.2) 50%, rgba(254,249,237,0.4) 100%)',
        'gradient-mesh': 'radial-gradient(at 40% 20%, rgba(95, 78, 65, 0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(140, 84, 98, 0.06) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(114, 103, 91, 0.06) 0px, transparent 50%), radial-gradient(at 80% 80%, rgba(225, 219, 198, 0.1) 0px, transparent 50%)',
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
