/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00d4ff",
        secondary: "#7000ff",
        success: "#00ff88",
        warning: "#ffaa00",
        danger: "#ff4444",
        dark: "#050510",
      },
    },
  },
  plugins: [],
}