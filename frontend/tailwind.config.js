/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-600": "var(--gray-600)",
        "gray-900": "var(--gray-900)",
        "primary-500": "var(--primary-500)",
        graywhite: "var(--graywhite)",
        "primary-100": "var(--primary-100)",
        "primary-200": "var(--primary-200)",
        "primary-300": "var(--primary-300)",
        "primary-50": "var(--primary-50)",
        "primary-500": "var(--primary-500)",
        "primary-600": "var(--primary-600)",
      },
    },
  },
  plugins: [],
};
