 var React = require('react-native');
 var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView
} = React;

var moment = require('moment');
var LinearGradient = require('react-native-linear-gradient');
var xml = require('../Libraries/XMLParser/XMLParser').parseXMLtoObject;
// var htmlparser = require('react-htmlparser2');
 // var parse = require('htmlparser2');


export default class StoryDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      paragraph: "",
      loading: true,
      name: "hi"
    }
  }

  parseXMLBody(body,cb) {
    xml(body, (result) => {
      console.log(result)
        cb(result)  
    })
  }


  fetchStoryData(cb) {
    fetch(`http://trevor-producer-cdn.api.bbci.co.uk/content${this.props.story.content.id}`)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.parseXMLBody(responseData.body, (result) => {

          cb(result)
        })
      })
      .done();
  }

  componentDidMount() {
    this.fetchStoryData((result) => {

      var data = result.paragraph.filter(i => {return typeof i === 'string'});
      var string = data.join(" \n \n")
      this.setState({loading: false, paragraph: string, name:result.__name})

    })

  }

  render() {
    if (this.state.loading) {
        return (
          <Text>Loading</Text>
          )
    }
    return (
      
      <ScrollView style={styles.container}>
      <Text style={{marginTop: 300}}>Hello</Text>
  	 <View style={{flex: 1, backgroundColor: 'white'}} >
     <View style={styles.imageContainer}>

        <Image source={{uri: this.props.story.content.relations[0].content.href}} style={styles.thumbnail}>
            <LinearGradient colors={['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0.4)', 'black']} style={styles.overlay}>
                <Text style={styles.headline}>{this.props.story.content.name}</Text>
            </LinearGradient>  
        </Image>
        </View>

        <Text style={styles.paragraph}>{this.state.paragraph}</Text>
        <Text style={{marginTop: 100}}>{this.props.story.content.name}</Text>
        
     </View>
     </ScrollView>
    );
  }
}

 var styles = StyleSheet.create({
  container: {
    marginTop:60,
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
