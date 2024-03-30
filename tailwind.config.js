/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.{js,ts,tsx}', './app/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        um: ['urbanist-medium'],
        usb: ['urbanist-semibold'],
        ir: ['inter-regular'],
        im: ['inter-medium'],
      },
    },
  },
  plugins: [],
};
