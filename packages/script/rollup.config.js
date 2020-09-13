import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import filesize from 'rollup-plugin-filesize';
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/ping.js",
  plugins: [
    resolve(),
    commonjs(),
    filesize(),
  ],
  output: [
    {
      file: "dist/ping.js",
      format: "iife",
      strict: false,
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

