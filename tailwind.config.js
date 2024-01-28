module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue_400: '#4C7BFE',
        orange_300: '#F86E42',
        orange_200: '#F49577',
        neutral_300: '#ABB0C2',
      },
      fontSize: {
        '2xs': '0.65rem',
        '3xs': '0.5rem',
      }
    },
  },
  plugins: [],
  prefix: 'tw-',
}