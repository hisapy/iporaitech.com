module.exports = () => {
  return {
    plugins: [require("postcss-preset-env"), require("@tailwindcss/postcss")],
  };
};
