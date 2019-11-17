const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./**/*.html"],
  defaultExtractor: content => content.match(/[\w-/:]*[\w-/:]/g) || []
});

module.exports = ctx => {
  return {
    plugins: [
      require("postcss-import"),
      require("postcss-preset-env"),
      require("tailwindcss"),
      require("autoprefixer"),
      ...(ctx.webpack.mode === "production" ? [purgecss] : []),
      ...(ctx.webpack.mode === "production"
        ? [require("cssnano")({ preset: "default" })]
        : [])
    ]
  };
};
