/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Primary brand colour – deep navy
        navy: {
          DEFAULT: '#0B2540',
          950: '#06182B',
          900: '#0B2540',
          800: '#14365A',
          700: '#1E4A75',
          100: '#DCE6EF',
          50: '#EEF3F7',
        },
        // Light gray-blue background
        mist: '#F4F7F9',
        // Warm accent – primary buttons and key highlights only
        accent: {
          DEFAULT: '#C2410C',
          hover: '#9A3412',
          light: '#FFEDD5',
        },
      },
      fontFamily: {
        heading: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
      },
      maxWidth: {
        content: '72rem',
      },
    },
  },
  plugins: [],
};
