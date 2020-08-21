import nodeResolve from 'rollup-plugin-node-resolve';
//import copy from 'rollup-plugin-copy';


export default {
  input: 'dist/esm/electron/src/index.js',
  output: {
    file: 'dist/plugin.js',
    format: 'iife',
    name: 'capacitorPlugin',
    sourcemap: true
  },
  plugins: [
    nodeResolve()
  ]
};

