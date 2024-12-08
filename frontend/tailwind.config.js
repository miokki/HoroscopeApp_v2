/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          background: 'var(--background)',
          text: 'var(--text)',
          primary: {
            DEFAULT: '#6366f1',
            dark: '#4f46e5'
          }
        },
        backgroundImage: {
          'cosmos': 'radial-gradient(circle at center, #1a1b3c 0%, #0a0a1a 100%)'
        },
        boxShadow: {
          'glow': '0 0 15px rgba(142, 124, 195, 0.5)',
          'gold': '0 0 10px rgba(255, 215, 0, 0.3)'
        }
      }
    },
    plugins: [],
  }