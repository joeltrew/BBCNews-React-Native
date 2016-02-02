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

module.exports = {

	createReactElementsWithXMLRoot(xmlRootElement) {

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
			console.log(tag.name)
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

				default: 

				resolve(React.createElement(Text, {style:[styles.text, styles.paragraph] , key: index}, "ELEMENT NOT FOUND"));
			}
		})
	},

	createImageElement(tag, index, completion) {
		this.getImageSize(tag.attribs.id).then( height => {
			const image = React.createElement(Image, { 
													 	 style: {flex: 1},
													 	 source:{uri: this.handleImageUrl(tag.attribs.id)},
													 	 key: index 
													 	}, []);
			completion(React.createElement(View, { 
			  											style: [styles.image, {height}],
			  											key: index
			  										}, image));
		})
	},

	getImageSize(imageUrl) {
		return new Promise((resolve, reject) => {
			Image.getSize(this.handleImageUrl(imageUrl), (width, height) => {
				var imageHeight;
				if (height < 200) {
					imageHeight = height
				} else {
					imageHeight = 200;
				}
				resolve(imageHeight);
			})
		})
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

	reactElementForTagName(name, attrs, index, children) {
		let element;

		switch(name) {
			case 'paragraph':
				element = React.createElement(Text, {style:[styles.text, styles.paragraph] , key: index}, children);
			break;

			case 'image':

			break;

			case 'bold':
				element = React.createElement(Text, {style: [styles.text, styles.bold], key: index }, children);
			break;

			case 'italic':
				element = React.createElement(Text, {style: [styles.text, styles.italic], key: index}, children);
			break;

			case 'crosshead':
				element = React.createElement(Text, {style: [styles.crosshead], key: index}, children);
			break;

			case 'list':
				element = React.createElement(View, {style: [styles.list], key: index}, children);
			break;

			case 'listItem':
				var bulletPoint = React.createElement(Text, {style: [styles.text], key: 'bullet'+index}, ["• "])
				
				var text = React.createElement(Text, {style: [styles.text, {flex: 1}], key: index}, children);
				element = React.createElement(View, {style: [styles.listItem], key: index}, [bulletPoint, text]);

			break;



			case 'video':
			let rr;
			let video;
					 video = React.createElement(Video, {
								style:{flex:1}
								,source: {uri: 'http://hello.com'}
								,rate: 1.0                // 0 is paused, 1 is normal.
					       	,volume: 1.0                 // 0 is muted, 1 is normal.
					       	,muted: false                // Mutes the audio entirely.
					       	,paused: false   
					       	,controls: true
					       });
			

			return React.createElement(View, 
					{ 
					  style: [styles.video],
	           key: index
	        		}, video);

			break;

			default:
			console.log(name)
				element = React.createElement(Text, {style: {color: 'black'}, key: index}, 'hu');
		}

		return element;
	},

	reactElementForTagNameAsync(element, completion) {

		if (!this.handleImageUrl(element.attribs.id)) {
				completion(React.createElement(View, { style:{flex: 1, height: 3, backgroundColor: '#eeeeee', marginVertical: 10, marginHorizontal:15}, key: element.index }));
		} else {

			Image.getSize(this.handleImageUrl(element.attribs.id), (width, height) => {
				var imageHeight;
				if (height < 200) {
					imageHeight = height
				} else {
					imageHeight = 200;
				}
				completion(this.createImageElement(element.attribs, element.index, imageHeight));
			})

		}
	},

	createReactLinkElement(element, index) {
		var caption = element.children.find( child => {
			return child.name === 'caption';
		})

		var url = element.children.find( child => {
			return child.name === 'url';
		})

		var text = React.createElement(Text, {}, caption.children[0].raw);

		return React.createElement(Link, {url:url.attribs.href, key: index}, text);
	},

	handleImageUrl(id) {
		if (id.indexOf('/cpsprodpb/') > -1) {
			return `http://c.files.bbci.co.uk/${id.substring('/cpsprodpb/'.length)}`
		} else {
			return 'http://c.files.bbci.co.uk/C8EE/production/_87983415_464x2.jpg'
		}
		
	},

	fetchVideoInfo(videoId, completion) {
		const strippedId = videoId.substring('/video/'.length);
      fetch(`http://open.live.bbc.co.uk/mediaselector/5/select/version/2.0/format/json/mediaset/journalism-http-tablet/vpid/${strippedId}/proto/http/transferformat/hls/`)
      .then((response) => response.json())
      .then((responseData) => {
      	console.log('complete network')
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
			flex:1,
			marginVertical: 10,
			alignItems: 'stretch'
		}


	})