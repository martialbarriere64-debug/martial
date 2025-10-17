/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1E3A8A', // bleu profond, premium
          light: '#3B82F6',
        },
        surface: '#F5F7FA', // fond gris très clair
      },
      boxShadow: {
        soft: '0 10px 25px rgba(0,0,0,0.05)',
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
}
