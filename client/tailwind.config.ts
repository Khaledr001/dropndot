import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navColor: "#86937F",
        borderColor: "#4D5746",
        levelFont: "#4D5746",
        tableBg: "#86937F33",
        addUserButton: "#729E5A",
      },
    },
  },
  plugins: [],
};
export default config;
