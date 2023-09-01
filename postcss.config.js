module.exports = {
  plugins:
    process.env.NODE_ENV === 'production'
      ? [
        "postcss-nested",
        "postcss-flexbugs-fixes",
        [
          "postcss-preset-env",
          {
            autoprefixer: {
              flexbox: "no-2009"
            },
            stage: 3,
            features: {
              "custom-properties": false
            }
          }
        ]
      ]
      : [
        "postcss-nested",
        [
          "postcss-preset-env",
          {
            autoprefixer: {
              flexbox: "no-2009"
            },
            stage: 3,
            features: {
              "custom-properties": false
            }
          }
        ]
      ]
}


