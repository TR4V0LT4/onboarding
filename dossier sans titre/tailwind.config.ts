import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      boxShadow: {
        "navigationbar": "0px 2px 5px 0px rgba(38, 51, 77, 0.03)",
        "header": "0px 3px 8px 0px rgba(28, 39, 49, 0.1)",
        "heading": "0px 10px 22px 0px #00000024",
        "product": "0px 5px 10px 0px #F0EDF680",
        "product0": "0px 5px 16px 0px #00000014",
        "product1": "0px 3px 8px 0px #1C27311A",
        "medindexcard0": "0px 5px 10px 0px #0000002B",
        "post": "0px 5px 16px 0px #00000017",
        "post0": "0px 10px 30px 0px #F0EDF6",
        "orders": "0px 10px 40px 0px #1C27310D"
      },
      backgroundImage: {
        "medindexcard": "url('/Rectangle.svg')",
        "post": "linear-gradient(47.22deg, #007FFF1A 5.72%, #0072E61A 94.27%)",
        "post0": "linear-gradient(47.22deg, #007FFF 5.72%, #0072E6 94.27%)"
      },
      screens: {
        "header": "1400px"
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config