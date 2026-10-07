/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030305",
        surface: {
          DEFAULT: "#09090E",
          elevated: "#101018",
          card: "#0C0C12",
          border: "#1E1E2A",
          hover: "#171722"
        },
        brand: {
          purple: {
            DEFAULT: "#8B5CF6",
            light: "#C084FC",
            dark: "#6D28D9",
            electric: "#9333EA",
            neon: "#A855F7",
            glow: "rgba(139, 92, 246, 0.4)",
            subtle: "rgba(139, 92, 246, 0.08)"
          },
          cyan: "#06B6D4",
          pink: "#EC4899"
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'purple-glow': '0 0 35px -5px rgba(139, 92, 246, 0.35)',
        'purple-glow-sm': '0 0 15px -3px rgba(139, 92, 246, 0.25)',
        'purple-glow-lg': '0 0 70px -10px rgba(139, 92, 246, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
        'subtle-grid': 'linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'shimmer': 'shimmer 2s infinite',
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

