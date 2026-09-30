/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        jarvis: {
          dark: '#0B0F19',
          navy: '#111827',
          card: '#1F2937',
          border: '#374151',
          accent: '#06B6D4', // cyan-500
          accentHover: '#0891B2',
          blue: '#3B82F6',
          purple: '#8B5CF6',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(6, 182, 212, 0.15)',
        'glow-lg': '0 0 30px rgba(6, 182, 212, 0.25)',
      }
    },
  },
  plugins: [],
}
