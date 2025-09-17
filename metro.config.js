// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);
// Add Hermes parser
config.transformer.hermesParser = true;

// npm v7+ will install ../node_modules/react and ../node_modules/react-native because of peerDependencies.
// To prevent the incompatible react-native between ./node_modules/react-native and ../node_modules/react-native,
// excludes the one from the parent folder when bundling.
// config.resolver.blockList = [
//   ...Array.from(config.resolver.blockList ?? []),
//   new RegExp(path.resolve('./modules/expo-neomediatv', 'node_modules', 'react')),
//   new RegExp(path.resolve('./modules/expo-neomediatv', 'node_modules', 'react-native')),
// ];

// config.resolver.nodeModulesPaths = [
//   path.resolve(__dirname, './node_modules'),
//   path.resolve(__dirname, '../node_modules'),
// ];

// config.resolver.extraNodeModules = {
//   'expo-neomediatv': './modules',
//   // 'expo-neomediatv': './modules/expo-neomediatv',
// };

// config.watchFolders = [path.resolve(__dirname, './modules/expo-neomediatv')];

// config.transformer.getTransformOptions = async () => ({
//   transform: {
//     experimentalImportSupport: false,
//     inlineRequires: true,
//   },
// });

// When enabled, the optional code below will allow Metro to resolve
// and bundle source files with TV-specific extensions
// (e.g., *.ios.tv.tsx, *.android.tv.tsx, *.tv.tsx)
//
// Metro will still resolve source files with standard extensions
// as usual if TV-specific files are not found for a module.
//
if (process.env?.EXPO_TV === '1') {
  const originalSourceExts = config.resolver.sourceExts;
  const tvSourceExts = [
    ...originalSourceExts.map((e) => `tv.${e}`),
    ...originalSourceExts,
  ];
  config.resolver.sourceExts = tvSourceExts;
}

module.exports = config;
