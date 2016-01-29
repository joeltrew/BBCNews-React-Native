/**
 * @providesModule XMLParser
 * @flow
 */
'use strict';

var NativeXMLParser = require('NativeModules').XMLParser;

/**
 * High-level docs for the XMLParser iOS API can be written here.
 */

var XMLParser = {
  parseXMLtoObject: function(body, cb) {
    NativeXMLParser.parseXMLtoObject(body, (xmlObj) => {
    	cb(xmlObj)
    });
  }
};

module.exports = XMLParser;
