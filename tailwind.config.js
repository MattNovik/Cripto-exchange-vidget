module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minWidth: {
      '150': '150px',
    },
   maxWidth: {
      '960': '960px',
    },
    extend: {
      fontFamily: {
        'volkorn': ['Volkorn', 'Arial', 'sans-serif']
      },
      colors: {
        'deep-sky-blue': '#11B3FE',
        'nero': '#282828',
        'alice-blue': '#F6F7F8',
        'pattens-blue': '#E3EBEF',
        'bali-hai': '#80A2B6',
        
      },
    },
  },
  variants: {
    extend: {},
  }
}
