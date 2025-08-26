/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#571AE5",
        secondary: "#EBE8F2",
        text: "#FFF",
        text2: "#120D1C",
        text3: "#634F96"
      }
    },
  },
  plugins: [],
};
