/** @type {import('tailwindcss').Config} */

// Приложение и линтер настроены на esm, а в файле используется cjs.
// Либо добавить в игнор линтера, либо исправить

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
