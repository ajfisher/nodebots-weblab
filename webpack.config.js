import path from 'path';
import webpack from 'webpack';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const not_implemented = path.resolve(__dirname, 'src/not_implemented.js');


const config = {
  entry: {
    'webj5': './src/webj5.js',
  },
  // very handy here to resolve process issue:
  // https://github.com/microsoft/PowerBI-visuals-tools/issues/365#issuecomment-1099716186
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        },
      },
    ],
  },
  mode: 'development',
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webj5.js',
    library: {
      type: 'module',
    },
    libraryTarget: 'module',
  },
  resolve: {
    alias: {
      bindings: not_implemented,
      fs: not_implemented,
      process: 'process/browser',
      repl: not_implemented,
      serialport: not_implemented,
    },
    fallback: {
      'browser-serialport': false,
      buffer: 'buffer',
    },
  },
  experiments: {
    outputModule: true,
  },
};

export default config;
