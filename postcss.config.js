// import { purgeCSSPlugin } from "@fullhuman/postcss-purgecss";

// const purgecss = require("@fullhuman/postcss-purgecss")({
//   content: ["./**/*.html"],
//   defaultExtractor: (content) => content.match(/[\w-/:]*[\w-/:]/g) || [],
//   // Whitelist .medium-widget styles because the corresponding
//   // markup is added dynamically by the widget's JavaScript
//   whitelistPatterns: [/^medium\-widget/],
//   whitelistPatternsChildren: [/^medium\-widget/],
// });

/** @type {import('postcss-load-config').Config} */
const { purgeCSSPlugin } = require("@fullhuman/postcss-purgecss");
const cssNanoPlugin = require("cssnano");

module.exports = (ctx) => {
  return {
    plugins: [
      require("postcss-preset-env"),
      require("@tailwindcss/postcss"),
      ...(ctx.mode === "production"
        ? [
            purgeCSSPlugin({ content: ["./**/*.html"] }),
            cssNanoPlugin({ preset: "default" }),
          ]
        : []),
    ],
  };
};
