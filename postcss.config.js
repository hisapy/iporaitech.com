module.exports = ({ env }) => ({
  plugins: [
    require("postcss-import"),
    require("postcss-preset-env"),
    require("tailwindcss"),
    require("autoprefixer"),
    env === "production"
      ? require("@fullhuman/postcss-purgecss")({ content: ["./**/*.html"] })
      : false,
    env === "production" ? require("cssnano")({ preset: "default" }) : false
  ]
});
