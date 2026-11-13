import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: { 50: "#FCFAF6", 100: "#F6EFE2", 200: "#EEDFC8", 300: "#E1C9A6", 400: "#D2AE7C" },
        brand: { 50: "#F5EDE3", 100: "#E7D2B6", 200: "#D3B78C", 300: "#B98F5E", 400: "#93693E", 500: "#6E4A2E", 600: "#5B3D26", 700: "#48311E", 800: "#362417", 900: "#241810" },
      },
      boxShadow: { card: "0 1px 2px rgba(36,24,16,.07), 0 4px 16px rgba(36,24,16,.06)" },
    },
  },
  plugins: [],
};
export default config;
