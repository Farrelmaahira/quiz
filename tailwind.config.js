/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.{ejs,html,js}", // Include your EJS files here
    "./node_modules/flowbite/**/*.js",
    "./flipcard.html"
  ],
  theme: {
    extend: {
      colors : {
        'primary' : {
          500 : '#8174A0',
          400 : '#8F80B9',
          300 : '#A89CCF',
          200 : '#C3BBE0',
          100 : '#E3E0F0'
        },
        'secondary' : {
          500 : '#FFD2A0',
          400 : '#FFC091',
          300 : '#FFD1A8',
          200 : '#FFE3C2',
          100 : '#FFF3E0'
        }
      }
    },
  },
  plugins: [require('flowbite/plugin')],
};


