// tailwind.config.js

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust this line to point to your source files
    './public/index.html',        // Include this if you are using a static index.html
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        customGray: '#f0f4f8',  // Custom color if needed
      },
    },
  },
  variants: {},
  plugins: [],
};
