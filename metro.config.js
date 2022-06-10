/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async() => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires:            true
      }
    })
  },
  // see https://github.com/react-navigation/react-navigation/issues/8855
  resolver: {
    sourceExts: [ 'jsx', 'js', 'ts', 'tsx' ]
  }
};
