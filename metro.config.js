// const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

// /**
//  * Metro configuration
//  * https://facebook.github.io/metro/docs/configuration
//  *
//  * @type {import('metro-config').MetroConfig}
//  */
// const config = {};

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);


const path = require("path");
const { FileStore } = require("metro-cache");
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const localCacheConfig = {
  cacheStores: [
    new FileStore({
      root: path.join(__dirname, "metro-cache"), // local writable directory
    }),
  ],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), localCacheConfig);
