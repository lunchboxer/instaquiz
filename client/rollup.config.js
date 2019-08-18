import svelte from 'rollup-plugin-svelte'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import image from 'rollup-plugin-image'
require('dotenv').config()

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'client/src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'client/public/bundle.js'
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        css.write('client/public/bundle.css')
      }
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development'),
      'process.env.API_ENDPOINT': JSON.stringify(process.env.API_ENDPOINT),
      'process.env.SUBSCRIPTION_ENDPOINT': JSON.stringify(process.env.SUBSCRIPTION_ENDPOINT)
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    postcss({
      extensions: ['.css']
    }),
    resolve({
      browser: true,
      dedupe: importee =>
        importee === 'svelte' || importee.startsWith('svelte/')
    }),
    commonjs(),
    image(),
    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('client/public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
}
