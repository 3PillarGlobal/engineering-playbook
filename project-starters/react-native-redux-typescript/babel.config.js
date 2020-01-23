module.exports = api => {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      'module:react-native-dotenv',
      'module:metro-react-native-babel-preset'
    ],
    // plugins: [
    //   [
    //     require.resolve('babel-plugin-module-resolver'),
    //     {
    //       extensions: ['.js', '.ios.js', '.android.js', '.json', '.tsx'],
    //       root: ['.'],
    //       alias: {
    //         '@assets': './assets',
    //         '@components': './src/components',
    //         '@navigations': './src/navigations',
    //         '@services': './src/services',
    //         '@styles': './src/styles',
    //         '@utils': './src/utils',
    //         '@constants': './src/constants',
    //         '@store': './src/store'
    //       }
    //     } 
    //   ]
    // ]
  };
};
