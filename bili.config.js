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
      css: true,
      template: {
        optimizeSSR: true
      }
    },
    copy: {
      targets: [
        {
          src: "assets/stylesheets/settings/_settings.colors.scss",
          dest: "dist"
        }
      ]
    }
  }
};
