const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      montserrat: ['Montserrat'],
      roboto: ['Roboto'],
    },
    extend: {
      colors: 
      {
        colormain: '#39b5ff',
        coloralt: '#004aac'
      },
      backgroundImage:
      {
        headerbg: "url('./public/assets/img/portfolio/wpp_main.webp')"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: 
  [
    plugin(function({ addComponents }) 
    {
      addComponents({
        '.navBrandDesk': {
          'transition': 'height 0.3s ease-in-out',
          'height': '5rem'
        },
        '.brand-shrink': {
          'height': '4rem'
        },
      })
    }),
    require('tw-elements/dist/plugin')
  ],
}
