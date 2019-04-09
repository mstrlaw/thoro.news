module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  },
  extends: [
    // "plugin:prettier/recommended",
    "plugin:vue/recommended",
    "prettier/vue",
    "@nuxtjs"
  ],
  // required to lint *.vue files
  plugins: [
    "vue"
  ],
  // add your custom rules here
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",

    "semi": [2, "never"],
    "quotes": [ "error", "single" ],
    "arrow-parens": [ "error", "as-needed"],

    // "prettier/prettier": [
    //   "error", {
    //     "semi": false,
    //     "selfClosing": false
    //   },
    // ],
    
    // "vue/max-attributes-per-line": "off",
    // "vue/html-closing-bracket-newline": "off",

    // "standard/computed-property-even-spacing": "off",
    "vue/html-self-closing": "off",
    
    "vue/multiline-html-element-content-newline": "off",
    "vue/singleline-html-element-content-newline": "off",
  }
}
