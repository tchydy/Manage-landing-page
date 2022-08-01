/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,js}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        BrightRed: 'hsl(12, 88%, 59%)',
        BrightRedLight: 'hsl(12, 88%, 69%)',
        BrightRedSupLight: 'hsl(12, 88%, 95%)',
        DarkBlue: 'hsl(228, 39%, 23%)',
        DarkGrayishBlue: 'hsl(227, 12%, 61%)',
        VaryLightGray: 'hsl(0, 0%, 98%)',
        VeryDarkBlue: 'hsl(233, 12%, 13%)',
        VeryPaleRed: 'hsl(13, 100%, 96%)',
      },
      fontFamily: {
        BeVietnam: ['Be Vietnam Pro', 'sans-serif'],
      },
      dropShadow: {
        '4xl': '0px 9px 5px rgba(249, 143, 117, 0.34)',
        '5xl': '0px 3px 12px rgba(0, 0, 0, 0.16)',
      },
    },
  },
  plugins: [
    // scrollbar
    require('tailwind-scrollbar'),
  ],
};
