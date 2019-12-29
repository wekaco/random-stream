import riot from 'rollup-plugin-riot';
import nodeResolve from 'rollup-plugin-node-resolve';

import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

import commonjs from 'rollup-plugin-commonjs';

import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/app.js',
  output: [
    {
      file: 'dist/app.js',
      format: 'iife',
      sourcemap: 'inline'
    },
    {
      file: 'dist/app.min.js',
      format: 'iife'
    },
  ],
  plugins: [
    riot({
      ext: 'riot'
    }),
    builtins(),
    globals(),
    nodeResolve(),
    commonjs(),
    terser({
      include:  [/^.+\.min\.js$/]
    })
  ]
}
