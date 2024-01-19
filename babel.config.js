module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/preset-env', '@babel/preset-typescript'],
    env: {
      production: {
        plugins: ['react-native-paper/babel',
         "@babel/plugin-transform-private-property-in-object", { "loose": true },
          "@babel/plugin-transform-private-methods", { "loose": true }],
      },
    },
  };
};