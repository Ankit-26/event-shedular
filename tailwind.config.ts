import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(99.54deg, #095AD3 0.47%, #166FF4 98.19%)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        loco: {
          black: {
            DEFAULT: "#383D44",
            foreground: "#A3A7AF",
          },
          blue: {
            DEFAULT: "#095AD3",
            foreground: "#CEDEF6",
          },

          warn: {
            DEFAULT: "#DB0437",
            foreground: "#FDF2F5",
          },
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
