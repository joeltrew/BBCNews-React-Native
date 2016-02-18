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


var Video = require('react-native-video');
var Link = require('./Components/Link');
var VideoPlaceHolder = require('./Components/VideoPlaceHolder');

module.exports = {

	media: null,

	createReactElementsWithXMLRoot(xmlRootElement, media) {
		this.media = media;
		return new Promise((resolve, reject) => {
			this.mapToReact(xmlRootElement, (reactElementsArray, error) => {
				if (error) {
					reject(error);
				} else {
					resolve(reactElementsArray);
				}
			});
		})
	},


	mapToReact(rootElement, completion) {
		Promise.all(rootElement.children.map( (tag, index) => {

			return this.createReactElementForTag(tag, index)
			.then((result) => {
					return result;
				});
			})).then( results => {
				completion(results, false)
			})
		},

	createReactElementForTag(tag, index) {
		return new Promise((resolve, reject) => {

			if (tag.type === 'text') {
				resolve(tag.raw)
			}
			switch(tag.name) {

				case 'image': {
					this.createImageElement(tag, index, ( element ) => {
						resolve(element)
					})
				}
				break;

				case 'paragraph': {
					this.createParagraphElement(tag, index, ( element ) => {
						resolve(element)
					})
				}
				break;

				case 'bold': {
					this.createBoldTextElement(tag, index, ( element ) => {
						resolve(element)
					})
				}
				break;

				case 'italic': {
					this.createItalicTextElement(tag, index, ( element ) => {
						resolve(element)
					})
				}
				break;

				case 'crosshead': {
					this.createCrossheadTextElement(tag, index, ( element ) => {
						resolve(element)
					})
				}
				break;

				case 'link': {
					this.createLinkElement(tag, index, ( element ) => {
						resolve(element)
					})
				}
				break;

				case 'list': {
					this.createListElement(tag, index, ( element )=> {
						resolve(element)
					})
				}
				break;

				case 'listItem': {
					this.createListItemElement(tag, index, ( element )=> {
						resolve(element)
					})
				}
				break;

				case 'video': {
					this.createVideoElement(tag, index, ( element )=> {
						resolve(element)
					})
				}
				break;

				default: 

				resolve(React.createElement(Text, {style:[styles.text, styles.paragraph] , key: index}, "ELEMENT NOT FOUND"));
			}
		})
	},

	createImageElement(tag, index, completion) {
			
			const image = this.imageForId(tag.attribs.id);
			const height = image.content.height < 200 ? image.content.height : 200

			const imageElement = React.createElement(Image, 
				{ 
			 	 style: {flex: 1, backgroundColor: '#eeeeee'},
			 	 source:{uri: image.content.href},
			 	 key: index 
			 	}, []);

			completion(React.createElement(View,
			 { 
				style: [styles.image, {height}],
				key: index
			}, imageElement));
	},

	createParagraphElement(tag, index, completion) {
		this.mapToReact(tag, (childElements => {
			completion(React.createElement(Text, {style:[styles.text, styles.paragraph] , key: index}, childElements));
		}));
		
	},

	createBoldTextElement(tag, index, completion) {
		this.mapToReact(tag, (childElements => {
			completion(React.createElement(Text, {style:[styles.text, styles.bold] , key: index}, childElements));
		}));
		
	},

	createItalicTextElement(tag, index, completion) {
		this.mapToReact(tag, (childElements => {
			completion(React.createElement(Text, {style: [styles.text, styles.italic], key: index}, childElements));
		}));
	},

	createCrossheadTextElement(tag, index, completion) {
		this.mapToReact(tag, (childElements => {
			completion(React.createElement(Text, {style: [styles.crosshead], key: index}, childElements));
		}));
	},

	createLinkElement(tag, index, completion) {
		const caption = tag.children.find( child => {
			return child.name === 'caption';
		})

		const url = tag.children.find( child => {
			return child.name === 'url';
		})

		const text = React.createElement(Text, {}, caption.children[0].raw);

		completion(React.createElement(Link, {url:url.attribs.href, key: index}, text));
	},

	createListElement(tag, index, completion) {
		this.mapToReact(tag, (childElements => {
			completion(React.createElement(View, {style: [styles.list], key: index}, childElements));
		}));		
		
	},

	createListItemElement(tag, index, completion) {
		const bulletPoint = React.createElement(Text, {style: [styles.text], key: 'bullet'+index}, ["• "])

		this.mapToReact(tag, (childElements => {
			const text = React.createElement(Text, {style: [styles.text, {flex: 1}], key: index}, childElements);
			completion(React.createElement(View, {style: [styles.listItem], key: index}, [bulletPoint, text]));
		}));		
	},

	createVideoElement(tag, index, completion) {

		const foundVideo = this.media.videos.find(video => {
			return video.content.id === tag.attribs.id
		});

		const videoPlaceHolder = React.createElement(VideoPlaceHolder, {video: foundVideo}, []);

		completion(React.createElement(View, { style: [styles.video], key: index }, videoPlaceHolder));
	},




/*** Util Functions ***/

	imageForId(imageId) {
		return this.media.images.find(image => {
			return image.content.id === imageId
		});
	},


	handleImageUrl(id) {
		if (id.indexOf('/cpsprodpb/') > -1) {
			return `http://c.files.bbci.co.uk/${id.substring('/cpsprodpb/'.length)}`
		} else {
			return 'http://c.files.bbci.co.uk/C8EE/production/_87983415_464x2.jpg'
		}
		
	},

	fetchVideoInfo(videoId, completion) {
      fetch(`http://open.live.bbc.co.uk/mediaselector/5/select/version/2.0/format/json/mediaset/journalism-http-tablet/vpid/${videoId}/proto/http/transferformat/hls/`)
      .then((response) => response.json())
      .then((responseData) => {
      	completion(responseData.media[0].connection[0].href);
      })
      .done();
    },
}



var styles = StyleSheet.create({
		text: {
			color: 'black',
			fontSize: 16,
		},

		paragraph: {
			flex: 1,
			marginVertical: 10,
			marginHorizontal: 15
		},

		bold: {
			fontWeight: 'bold'
		},

		italic: {
			fontStyle: 'italic',
		},

		crosshead: {
			fontWeight: 'bold',
			fontSize: 22,
			marginVertical: 10,
			marginHorizontal: 15
		},

		list: {
			flex: 1,
			flexDirection: 'column',
			marginVertical: 10,
			marginHorizontal: 15
		},

		listItem: {
			flex: 1,
			flexDirection: 'row',
			marginVertical: 10,
			marginHorizontal: 15
		},

		video: {
			 flex:1,
	       height: 200,
		},

		image: {
			flex:2,
			marginVertical: 10,
		}


	})