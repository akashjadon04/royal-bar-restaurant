import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          900: "#0a0a0f",
          800: "#12121a",
          700: "#1c1c2e",
          600: "#2a2a3d",
          500: "#3d3d56",
          gold: "#c5a47e",
          "gold-light": "#d4bc9a",
          "gold-dark": "#9e7d56",
          cream: "#f5f0e8",
          "cream-dark": "#e8e0d4",
        },
        zomato: {
          red: "#e23744",
          "red-dark": "#c51e2b",
          orange: "#ff7e8b",
          bg: "#ffffff",
          surface: "#f8f8f8",
          text: "#1c1c1c",
          muted: "#828282",
          border: "#e8e8e8",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Outfit", "sans-serif"],
        cinzel: ["Cinzel", "serif"],
      },
      borderRadius: {
        sharp: "0px",
        "sharp-sm": "4px",
        "zomato": "12px",
        "zomato-lg": "24px",
      },
      boxShadow: {
        "gold-glow": "0 0 20px rgba(197, 164, 126, 0.3)",
        "premium-light": "0 10px 40px -10px rgba(0,0,0,0.08)",
        "card-hover": "0 20px 40px -15px rgba(0,0,0,0.15)",
        "zomato-subtle": "0 2px 8px rgba(28, 28, 28, 0.08)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #c5a47e 0%, #d4bc9a 50%, #9e7d56 100%)",
        "mesh-light": "radial-gradient(at 0% 0%, hsla(354,80%,85%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(34,80%,85%,1) 0, transparent 50%)",
        "dark-overlay": "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.1) 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-in-right": "slideInRight 0.4s ease-out",
        "pulse-gold": "pulseGold 2s infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(197, 164, 126, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(197, 164, 126, 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [forms, typography, tailwindcssAnimate],
};

export default config;
