/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        page: "#F9F9F9",
        card: "#EFEFEF",
        primary: "#FFD643",
        text: "#161616",
        muted: "#727272",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "12px",
        md: "8px",
      },
      boxShadow: {
        card: "0 2px 16px 0 rgba(0,0,0,0.1)",
      },
      borderRadius: { xl: "12px", md: "8px" },
      maxWidth: {
        layout: "1440px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
