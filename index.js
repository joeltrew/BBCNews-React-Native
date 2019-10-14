/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
 'use strict';

 var React = require('react-native');
 var {
  AppRegistry,
  StyleSheet,
  View,
  NavigatorIOS,
  Text,
  StatusBarIOS,
  TouchableOpacity
} = React;

import Feed from './Components/Feed';

var BBCNews = React.createClass({

    _renderScene(route, navigator) {
      var Component = route.component;
      StatusBarIOS.setStyle('light-content');
      return (
        <Component {...route.props} changeNavBarHeight={this.changeNavBarHeight} navigator={navigator} route={route} />
      );
  },

  componentWillMount() {
    StatusBarIOS.setStyle('light-content');
  },

  render() {
    return (
      <NavigatorIOS
      style={{flex: 1}}
      translucent={false}
      barTintColor={'#bb1919'}
      titleTextColor={'white'}
      tintColor={'white'}
      initialRoute={{
          component: Feed,
          title: "Feed",
          passProps: {}
      }}
      />
    );
    }
  });



AppRegistry.registerComponent('BBCNews', () => BBCNews);
