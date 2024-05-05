/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx,jsx,js}',
    './components/**/*.{ts,tsx,jsx,js}',
    './app/**/*.{ts,tsx,jsx,js}',
    './src/**/*.{ts,tsx,jsx,js}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        color: {
          1: "#AC6AFF",
          2: "#FFC876",
          3: "#FF776F",
          4: "#7ADB78",
          5: "#858DFF",
          6: "#FF98E2",
        },
        stroke: {
          1: "#26242C",
        },
        n: {
          1: "#FFFFFF",
          2: "#CAC6DD",
          3: "#ADA8C3",
          4: "#757185",
          5: "#3F3A52",
          6: "#252134",
          7: "#15131D",
          8: "#0E0C15",
          9: "#474060",
          10: "#43435C",
          11: "#1B1B2E",
          12: "#2E2A41",
          13: "#6C7275",
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        'washed-blue-50': '#f0f3ff',
        'washed-blue-100': '#d0daff',
        'washed-blue-200': '#bac9ff',
        'washed-blue-300': '#9ab0ff',
        'washed-blue-400': '#86a1ff',
        'washed-blue-500': '#6889ff',
        'washed-blue-600': '#5f7de8',
        'washed-blue-700': '#4a61b5',
        'washed-blue-800': '#394b8c',
        'washed-blue-900': '#2c3a6b',
        'washed-purple-50': '#f8f7ff',
        'washed-purple-100': '#e8e7ff',
        'washed-purple-200': '#dddcff',
        'washed-purple-300': '#cecbff',
        'washed-purple-400': '#c5c1ff',
        'washed-purple-500': '#b6b2ff',
        'washed-purple-600': '#a6a2e8',
        'washed-purple-700': '#817eb5',
        'washed-purple-800': '#64628c',
        'washed-purple-900': '#4c4b6b',
        'primary-blue-50': '#e6f0ff',
        'primary-blue-100': '#b2d1ff',
        'primary-blue-200': '#8cbaff',
        'primary-blue-300': '#589bff',
        'primary-blue-400': '#3787ff',
        'primary-blue-500': '#0569ff',
        'primary-blue-600': '#0560e8',
        'primary-blue-700': '#044bb5',
        'primary-blue-800': '#033a8c',
        'primary-blue-900': '#022c6b',
        'primary-purple-50': '#f1e6ff',
        'primary-purple-100': '#d3b0ff',
        'primary-purple-200': '#bd8aff',
        'primary-purple-300': '#9f54ff',
        'primary-purple-400': '#8d33ff',
        'primary-purple-500': '#7000ff',
        'primary-purple-600': '#6600e8',
        'primary-purple-700': '#5000b5',
        'primary-purple-800': '#3e008c',
        'primary-purple-900': '#2f006b',
        'Neutrals/neutrals-1': '#ffffff',
        'Neutrals/neutrals-2': '#fcfcfd',
        'Neutrals/neutrals-3': '#f5f5f6',
        'Neutrals/neutrals-4': '#f0f0f1',
        'Neutrals/neutrals-5': '#d9d9dc',
        'Neutrals/neutrals-6': '#c0bfc4',
        'Neutrals/neutrals-7': '#8d8c95',
        'Neutrals/neutrals-8': '#5b5966',
        'Neutrals/neutrals-9': '#464553',
        'Neutrals/neutrals-10': '#282637',
        'Neutrals/neutrals-11': '#201f30',
        'Neutrals/neutrals-12': '#161427',
        'Neutrals/neutrals-13': '#020014',
        'brand-washedPurple': '#b5b2ff',
        'brand-washedBlue': '#6889ff',
        'brand-primaryBlue': '#0469ff',
        'brand-primaryPurple': '#7000ff',
        'brand-dark': '#030014',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      fontFamily: {
        sans: ["var(--font-sora)", ...fontFamily.sans],
        code: "var(--font-code)",
        grotesk: "var(--font-grotesk)",
      },
      letterSpacing: {
        tagline: ".15em",
      },
      spacing: {
        0.25: "0.0625rem",
        7.5: "1.875rem",
        15: "3.75rem",
      },
      opacity: {
        15: ".15",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      transitionTimingFunction: {
        DEFAULT: "linear",
      },
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
      },
      borderWidth: {
        DEFAULT: "0.0625rem",
      },
      backgroundImage: {
        "radial-gradient": "radial-gradient(var(--tw-gradient-stops))",
        "conic-gradient":
          "conic-gradient(from 225deg, #FFC876, #79FFF7, #9F53FF, #FF98E2, #FFC876)",
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [plugin(function ({ addBase, addComponents, addUtilities }) {
    addBase({});
    addComponents({
      ".container": {
        "@apply max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem]":
          {},
      },
      ".h1": {
        "@apply font-semibold text-[2.5rem] leading-[3.25rem] md:text-[2.75rem] md:leading-[3.75rem] lg:text-[3.25rem] lg:leading-[4.0625rem] xl:text-[3.75rem] xl:leading-[4.5rem]":
          {},
      },
      ".h2": {
        "@apply text-[1.75rem] leading-[2.5rem] md:text-[2rem] md:leading-[2.5rem] lg:text-[2.5rem] lg:leading-[3.5rem] xl:text-[3rem] xl:leading-tight":
          {},
      },
      ".h3": {
        "@apply text-[2rem] leading-normal md:text-[2.5rem]": {},
      },
      ".h4": {
        "@apply text-[2rem] leading-normal": {},
      },
      ".h5": {
        "@apply text-2xl leading-normal": {},
      },
      ".h6": {
        "@apply font-semibold text-lg leading-8": {},
      },
      ".body-1": {
        "@apply text-[0.875rem] leading-[1.5rem] md:text-[1rem] md:leading-[1.75rem] lg:text-[1.25rem] lg:leading-8":
          {},
      },
      ".body-2": {
        "@apply font-light text-[0.875rem] leading-6 md:text-base": {},
      },
      ".caption": {
        "@apply text-sm": {},
      },
      ".tagline": {
        "@apply font-grotesk font-light text-xs tracking-tagline uppercase":
          {},
      },
      ".quote": {
        "@apply font-code text-lg leading-normal": {},
      },
      ".button": {
        "@apply font-code text-xs font-bold uppercase tracking-wider": {},
      },
    });
    addUtilities({
      ".tap-highlight-color": {
        "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
      },
    });
  }),],
};