 var React = require('react-native');
 var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  LinkingIOS
} = React;

var moment = require('moment');
var Link = require('./Link');
var htmlparser = require('htmlparser');
var XMLToReactMap = require('../XMLToReactMap');

export default class StoryDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      paragraph: "",
      loading: true,
      elements: null
    }
  }

  parseXMLBody(body,cb) {
      var handler = new Tautologistics.NodeHtmlParser.DefaultHandler(function (error, dom) {
        cb(dom)
      }, {enforceEmptyTags: false, ignoreWhitespace: true});
      var parser = new Tautologistics.NodeHtmlParser.Parser(handler);
      parser.parseComplete(body);

  }


  fetchStoryData(cb) {
    fetch(`http://trevor-producer-cdn.api.bbci.co.uk/content${this.props.story.content.id}`)
      .then((response) => response.json())
      .then((responseData) => {

        const images = responseData.relations.filter( item => {
          return item.primaryType === 'bbc.mobile.news.image';
        })

        const videos = responseData.relations.filter( item => {
          return item.primaryType === 'bbc.mobile.news.video';
        })

        const relations = {images, videos}

        this.parseXMLBody(responseData.body, (result) => {

          cb(result, relations)
        })
      })
      .done();
  }

  componentDidMount() {
    this.fetchStoryData((result, media) => {
      const rootElement = result.find(item => {
        return item.name === 'body'
      })

      XMLToReactMap.createReactElementsWithXMLRoot(rootElement, media).then(array => {
        var scroll = React.createElement(ScrollView, {contentInset:{top: 0, left: 0, bottom: 64, right: 0}, style:{flex: 1, flexDirection: 'column', backgroundColor: 'white'}, accessibilityLabel:"Story Detail"}, array)

      this.setState({loading: false, elements:scroll})
      })
    })
  }

  render() {
    if (this.state.loading) {
        return (
            <Text>Loading</Text>
          )
    }
    return this.state.elements

  }
}

 var styles = StyleSheet.create({

    container: {
   },

    paragraph: {
      padding: 40,
      fontSize: 16,
      lineHeight: 20*1.2
    },

    headline: {
      position: 'absolute',
      bottom: 10,
      left: 0,
      paddingLeft: 30,
      paddingRight: 30,
      fontSize: 26,
      fontWeight: 'bold',
      color: 'white'

    },

    overlay: {
      flex:1,
      backgroundColor: 'transparent',
      height:200
    },

    thumbnail: {
      flex: 1,
    },
    
    imageContainer: {
      flex:1,
      height: 300,
      alignItems: 'stretch'
    }
 })

module.exports = StoryDetail;
