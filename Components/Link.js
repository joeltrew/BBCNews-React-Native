 var React = require('react-native');
 var {
  AppRegistry,
  StyleSheet,
  Text,
  LinkingIOS
} = React;

var StoryDetail = require('./StoryDetail');

var moment = require('moment');

export default class Story extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  pressedURL() {
  	console.log('hi', this.props.url)

  	LinkingIOS.openURL(this.props.url)
  }

  render() {

    return (
    	<Text style={styles.hyperlink} onPress={this.pressedURL.bind(this)}>{this.props.children}</Text>
    );
  }
}

var styles = StyleSheet.create({
	hyperlink: {
		color: 'black',
		fontWeight: 'bold',
		textDecorationLine: 'underline'
	}
});

module.exports = Story;
