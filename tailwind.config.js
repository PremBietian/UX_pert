/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: {
          DEFAULT: "#0D0D11",
          elevated: "#13131A",
          card: "#0F0F14",
          border: "#1E1E28",
          hover: "#1A1A24"
        },
        brand: {
          purple: {
            DEFAULT: "#8B5CF6",
            light: "#A78BFA",
            dark: "#6D28D9",
            electric: "#9333EA",
            neon: "#A855F7",
            glow: "rgba(139, 92, 246, 0.4)",
            subtle: "rgba(139, 92, 246, 0.08)"
          }
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'purple-glow': '0 0 35px -5px rgba(139, 92, 246, 0.3)',
        'purple-glow-sm': '0 0 15px -3px rgba(139, 92, 246, 0.25)',
        'purple-glow-lg': '0 0 60px -10px rgba(139, 92, 246, 0.4)',
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 60%)',
        'subtle-grid': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
}
