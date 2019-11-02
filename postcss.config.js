module.exports = ({ env }) => ({
  plugins: [
    require("postcss-import"),
    require("postcss-preset-env"),
    require("tailwindcss"),
    require("autoprefixer"),
    require("cssnano")({ preset: "default" })
    // env === "production" ? require("cssnano")({ preset: "default" })() : false
    // env === "production" ? require("cssnano")({ preset: "default" })() : false
  ]
});
