/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jetbrains: ['"JetBrains Mono"', 'monospace'],
      },
      colors:{
        gray:{
          69:"#2b2b2a",
          70:"#252626"
        }
      }
    }
  },
  plugins: [],
}

