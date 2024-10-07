module.exports = {
  presets: [
    "@vue/cli-plugin-babel/preset",
    [
      "@babel/preset-env",
      {
        corejs: "3.26",
        useBuiltIns: "usage",
      },
    ],
  ],
};
