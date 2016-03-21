'use strict';
/**
 * ## Imports
 * 
 * ReactNative is actually React
 */ 
const React = require('react');
const ReactNative = React;
const Mocks = require('react-native-mock/build/react-native');


module.exports = Object.assign({}, Mocks, ReactNative);