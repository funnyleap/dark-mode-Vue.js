module.exports = {
  banner: true,
  input: "index.js",
  output: {
    extractCSS: false,
    format: ["cjs-min", "esm-min", "umd-min"],
    moduleName: "index"
  },
  plugins: {
    vue: {
      css: true
    },
    copy: {
      targets: [{ src: "assets/settings/_settings.colors.scss", dest: "dist" }]
    }
  }
};
