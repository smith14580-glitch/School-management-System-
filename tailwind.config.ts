import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  "#EAF0F7",
          100: "#D9E4F0",
          200: "#B7C9DE",
          300: "#8FAECA",
          400: "#5C8AB4",
          500: "#3D6B96",
          600: "#2C5A86",
          700: "#1B3A5C",
          800: "#122A44",
          900: "#0F2138",
          950: "#0A1728",
        },
        gold: {
          50:  "#FBF3E2",
          100: "#F6E3BE",
          200: "#F0CE96",
          300: "#E8B86C",
          400: "#DE9E48",
          500: "#D9A441",
          600: "#BE8A2E",
          700: "#9A6B24",
          800: "#77551C",
          900: "#54401E",
        },
        slate: {
          50:  "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
        surface: "#FFFFFF",
        page: "#F2F5F8",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,33,56,0.05), 0 4px 16px rgba(15,33,56,0.06)",
        cardHover: "0 2px 4px rgba(15,33,56,0.08), 0 8px 24px rgba(15,33,56,0.10)",
        navy: "0 4px 16px rgba(27,58,92,0.18)",
      },
      borderRadius: {
        xl: "10px",
        lg: "8px",
      },
    },
  },
  plugins: [],
};
export default config;
