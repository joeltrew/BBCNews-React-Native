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
  Navigator,
  Text,
  StatusBarIOS,
  TouchableOpacity
} = React;

var Feed = require('./Components/Feed');





const NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={{ fontSize: 18,   fontWeight: '500', color: 'white',
    marginVertical: 9, marginHorizontal:9}}>
          {`< ${previousRoute.title.length > 8 ? 'Back' : previousRoute.title}`}
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    return (
      <View></View>
    );
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={{ fontSize: 18,   fontWeight: '500', color: 'white',
    marginVertical: 9, marginHorizontal:9}}>
        {route.title} [{index}]
      </Text>
    );
  },

};



var BBCNews = React.createClass({

  getInitialState() {
    return {
        navHeight: 60
      };
    },


    _renderScene(route, navigator) {
      var Component = route.component;
      StatusBarIOS.setStyle('light-content');
      return (
        <Component {...route.props} changeNavBarHeight={this.changeNavBarHeight} navigator={navigator} route={route} />
      );
  },

  changeNavBarHeight(bool) {
    if (bool) {
    this.setState({navHeight: 20})
    } else {
      this.setState({navHeight: 60})
    }
  },

  render() {

    return (
      <Navigator
        initialRoute={{
          component: Feed,
          title: "BBCNews",
          type: "right"
        }}
        renderScene={this._renderScene}
        navigationBar={
            <Navigator.NavigationBar
              style={{backgroundColor: '#bb1919', height: this.state.navHeight}}
              routeMapper={NavigationBarRouteMapper}
          />
        }
      />
    );
    }
  });

var styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'white',
  }
})


AppRegistry.registerComponent('BBCNews', () => BBCNews);
