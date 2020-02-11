module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },

  parser: "babel-eslint",

  extends: ["react-app", "plugin:jsx-a11y/recommended"],
  plugins: ["jsx-a11y"],

  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {

  }
};
