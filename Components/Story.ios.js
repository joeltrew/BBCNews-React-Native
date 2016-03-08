 var React = require('react-native');
 var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} = React;

import Feed from './Feed';
var StoryDetail = require('./StoryDetail');

var moment = require('moment');

export default class Story extends React.Component {
  
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  getCollectionForStory(story) {
    console.log('STORY', story)
    if (story.content.relations && story.content.relations.length) {

      return story.content.relations.find( item => {
        return item.primaryType === 'bbc.mobile.news.collection'
      })

    } else {
      throw "No collection found"
    }
  }

  pressedCollection(collection) {
    this.props.navigator.push({
      component: Feed,
      title: collection.content.name,
      passProps: {collection: collection.content.id, navigator: this.props.navigator}
    })
  }

  truncateTitle(title) {
    if (title.length > 15) {
      return `${title.substring(0, 15)}...`
    } else {
      return title;
    }
  }

  pressedStory(story) {
    this.props.navigator.push({
      component: StoryDetail,
      title: this.truncateTitle(story.content.name),
      passProps: {story, navigator: this.props.navigator}
    });
  }

  render() {
  	var story = this.props.story;
    var time = moment.unix((story.content.lastUpdated / 1000 )).fromNow();
    var collection = this.getCollectionForStory(story) || {}

    console.log(collection)

    return (
      <TouchableHighlight underlayColor={'white'} onPress={() => this.pressedStory(story)}>
        <View testID={"Story"}>
            <View style={styles.container}>
              <View style={styles.imageContainer}>
                <Image source={{uri: story.content.relations[0].content.href}} style={styles.thumbnail} />
              </View>
            </View>

            <View style={styles.textView}>
              <Text style={styles.headline}>{story.content.name}</Text>
              <View style={styles.details}>
                <Text style={styles.timeStamp}>{time}</Text>
                <Text style={styles.border}>|</Text>
                <TouchableHighlight onPress={() => this.pressedCollection(collection)} >
                  <Text style={styles.collection}>{collection.content ? collection.content.name : ""}</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',

  },

  textView: {
    flex: 1,
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: 'white',
    marginBottom: 5,
  },

  details: {
    flex:1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },

  headline: {
    flex: 0,
    fontWeight: 'bold',
    fontSize: 20,
    margin: 3,

  },

  timeStamp: {
    flex: 0,
    margin: 3,
  },

  collection: {
    flex: 0,
    color: '#9d0a0e',
    margin: 3,
  },

  border: {
    padding: 3,
    borderLeftWidth: 1,
    borderLeftColor: 'black',
    borderStyle: 'solid'
  },

  imageContainer: {
    flex:1,
    height: 200,
    alignItems: 'stretch'
  },

  thumbnail: {
    flex:1
  }

});

module.exports = Story;
