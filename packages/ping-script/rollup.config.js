import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import filesize from 'rollup-plugin-filesize';
import cleanup from 'rollup-plugin-cleanup';
import { terser } from "rollup-plugin-terser";

const pkg = require('./package.json');

const config = {
  input: "src/ping.js",
  plugins: [
    resolve(),
    commonjs(),
    filesize(),
    cleanup(),
  ],
  output: [
    {
      file: "dist/ping.js",
      format: "iife",
      strict: false,
      plugins: [],
    },
    {
      file: "dist/ping.min.js",
      format: "iife",
      strict: false,
      plugins: [
        terser(),
      ],
    }
  ],
};

for (const output of config.output) {
  console.log(`https://unpkg.com/${pkg["name"]}/${output.file}`);
  console.log(`https://unpkg.com/${pkg["name"]}@${pkg["version"]}/${output.file}`);
}

export default config;
