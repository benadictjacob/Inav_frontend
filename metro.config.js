const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Force Metro to resolve the 'browser' or 'react-native' version of packages
// This prevents axios from attempting to use Node-only modules like 'crypto'
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

module.exports = config;
