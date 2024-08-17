/** @type {import('tailwindcss').Config} */

const { transform } = require("next/dist/build/swc");
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
      keyframes: {
        // Floating animation for signup and login shapes (background of shoe animation)
        float1: {
          "0%": {
            transform: "translate(0px, 0px)",
          },
          "25%": {
            transform: "translate(-20px, -45px)",
          },
          "50%": {
            transform: "translate(15px, -20px)",
          },
          "75%": {
            transform: "translate(-15px, 30px)",
          },
          "100%": {
            transform: "translate(0px, 0px)",
          },
        },
        float2: {
          "0%": {
            transform: "translate(0px, 0px)",
          },
          "25%": {
            transform: "translate(-70px, -45px)",
          },
          "50%": {
            transform: "translate(-50px, 80px)",
          },
          "75%": {
            transform: "translate(10px, -30px)",
          },
          "100%": {
            transform: "translate(0px, 0px)",
          },
        },
        float3: {
          "0%": {
            transform: "translate(-50px, -50px)",
          },
          "25%": {
            transform: "translate(70px, 70px)",
          },
          "50%": {
            transform: "translate(-90px, -30px)",
          },
          "75%": {
            transform: "translate(80px, 50px)",
          },
          "100%": {
            transform: "translate(-50px, -50px)",
          },
        },
      },
      animation: {
        float1: "float1 8s ease-in-out infinite",
        float2: "float2 8s ease-in-out infinite",
        float3: "float3 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
