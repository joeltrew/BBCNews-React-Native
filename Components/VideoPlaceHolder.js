 var React = require('react-native');
 var {
  AppRegistry,
  StyleSheet,
  View,
  TouchableHighlight,
  Image
} = React;

var Video = require('react-native-video');

export default class VideoPlaceHolder extends React.Component {
  static propTypes = {
    video: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loadVideo: false,
      imageUrl: ''
    }
  }

  componentWillMount() {
    if (this.props.video.content.relations.length > 0) {
      const image = this.props.video.content.relations.find(video => {
        return video.primaryType === 'bbc.mobile.news.image';
      })

      if (image) {
        console.log('image tag', image);
        this.setState({imageUrl:image.content.href, image: image});
      }
    }
  }

  pressedPlaceholder() {
    this.fetchVideoInfo(this.props.video.content.externalId, (url) => {
        this.setState({loadVideo: true, videoUrl: url})
    })
  }


  fetchVideoInfo(videoId, completion) {
      fetch(`http://open.live.bbc.co.uk/mediaselector/5/select/version/2.0/format/json/mediaset/journalism-http-tablet/vpid/${videoId}/proto/http/transferformat/hls/`)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData)
        completion(responseData.media[0].connection[0].href);
      })
      .done();
  }

  render() {
    if (this.state.loadVideo) {
        return (
          <Video source={{uri: this.state.videoUrl}}
                  rate={1.0}
                  volume={1.0}
                  muted={false}
                  paused={false}
                  controls={true}
                  style={{flex: 1, height: 300}}
                  />
        );
    } 

    return (
          <Image source={{uri: this.state.imageUrl}} style={styles.placeholder} >
          <TouchableHighlight style={{borderRadius: 50}} onPress={this.pressedPlaceholder.bind(this)}>
            <View style={styles.buttonCircle}>
              <View style={styles.playButton}></View>
            </View>
            </TouchableHighlight>
          </Image>
        
      );
  }
}

var styles = StyleSheet.create({
	placeholder: {
    flex: 1,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
	},

  playButton:{
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 25,
    borderRightWidth: 25,
    borderBottomWidth: 40,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    transform: [ {rotate: '90deg'}],
    marginLeft: 10
  },

  buttonCircle: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#bb1919',
      alignItems: 'center',
      justifyContent: 'center'
     }
});

module.exports = VideoPlaceHolder;
