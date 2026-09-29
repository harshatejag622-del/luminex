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
        intel: {
          dark: '#090D16',
          panel: '#0F172A',
          card: '#162035',
          border: '#1E293B',
          accent: '#38BDF8',
          purple: '#818CF8',
          rose: '#F43F5E',
          emerald: '#10B981',
          amber: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace']
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(56, 189, 248, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(56, 189, 248, 0.6)' }
        }
      }
    },
  },
  plugins: [],
}
