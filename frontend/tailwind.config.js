/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    extend: {
      accent: {
        DEFAULT: "#272f29",
        hover: "#fa6b6b",
      },
      colors: {
        "custom-red": "#dd2c2c",
        "custom-black": "#272f29",
        "custom-red-hover": "#fc4e4e",
        "custom-white": "#e8e7ee",
      },
      fontFamily: {
        "signika-negative": ["var(--font-signikaNegative)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
