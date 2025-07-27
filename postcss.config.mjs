/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // Cambiado de 'tailwindcss' a '@tailwindcss/postcss'
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
}

export default config
