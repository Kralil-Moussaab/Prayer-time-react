/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          800: "#22313F",
          700: "#34495E",
          400: "#8DC6FF",
          200: "#E4F1FE",
        },
      },
      fontFamily: {
        cairo: ["Cairo", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        slideDown: "slideDown 0.9s ease-out forwards",
      },
    },
  },
  plugins: [],
};
