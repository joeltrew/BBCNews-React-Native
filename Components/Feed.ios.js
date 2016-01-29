 var React = require('react-native');
 var {
  StyleSheet,
  View,
  ListView,
  TimerMixin,
  RefreshControl
} = React;

var Loader = require('react-native-angular-activity-indicator');
var Story = require('./Story');

var Feed = React.createClass({


  getInitialState() {
    return {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        loaded: false,
        isAnimating: true,
        isRefreshing: false,
      };
    },

    componentDidMount() {
      this.fetchData()
    },

    fetchData() {
      this.setState({isRefreshing: true});

      fetch('http://trevor-producer-cdn.api.bbci.co.uk/content/cps/news/world')
      .then((response) => response.json())
      .then((responseData) => {

        this.setState({isAnimating: false})
        
        setTimeout(() => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.relations),
            loaded: true,
            isRefreshing: false

          });
        },200)
      })
      .done();
    },

    renderLoading() {
      return (
        <View style={{flexDirection: 'row', justifyContent: 'center', flex: 1}}>
        <Loader isAnimating={this.state.isAnimating} lineWidth={10} color={'#ff00ff'} style={styles.loadingView}/>
        </View>
        );
    },

    renderStories(story) {
      return (
        <Story story={story} navigator={this.props.navigator}></Story>
        );
    },

    handleScroll(event) {
      if(event.nativeEvent.contentOffset.y > 40) {
        this.props.changeNavBarHeight(true);
      } else {
        this.props.changeNavBarHeight(false);
      }
    },

    render: function() {

      if (!this.state.loaded) {
        return this.renderLoading();
      }

      return (
        <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderStories}
        style={styles.listView}
        contentInset={{top:60,left:0,right:0,bottom:0}}
        contentOffset={{x:0, y:-60}}
 
        scrollEventThrottle={200}
        {...this.props}
        refreshControl={
          <RefreshControl
          refreshing={this.state.isRefreshing}
          onRefresh={this.fetchData}
          tintColor="#ff0000"
          title="Loading..."
          colors={['#ff0000', '#00ff00', '#0000ff']}
          progressBackgroundColor="#ffff00"

          />
        }
        />
        )
    }
  });

 var styles = StyleSheet.create({

  loadingView: {
    marginTop: 30,
    marginRight:50,
    backgroundColor: '#ff00ff',
  },

  listView: {
    backgroundColor: '#eee'
  },

});

module.exports = Feed;