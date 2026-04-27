/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        vanilla: {
          50:  '#fdf8f0',
          100: '#faefd8',
          200: '#f3d9a8',
          300: '#e9be71',
          400: '#dd9e3e',
          500: '#d4861f',
          600: '#b86b15',
          700: '#974f14',
          800: '#7a4017',
          900: '#643617',
          950: '#371a09',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
