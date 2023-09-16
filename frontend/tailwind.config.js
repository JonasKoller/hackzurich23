/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        traffixTheme: {
          "primary": "#312e81",
          "secondary": "#4f46e5",
          "accent": "#fbbf24",
          "neutral": "#111827",
          "base-100": "#f3f4f6",
          "info": "#bfdbfe",
          "success": "#16a34a",
          "warning": "#facc15",
          "error": "#ef4444",
        },
      },
    ],
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
}
