/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      textGray: "#5B5B5E",
      orangeMain: "#FE724C",
      orangeHover: "#f05930",
      gray: "#9796A1",
      lightGray: "#F1F2F3",
      white: "#FFF",
      black: "#000000",
    },
    fontFamily: {
      openSans: "Open Sans",
    },
  },
  plugins: [],
};
