/**
 * # CharityKitEventRow-test.js
*/
'use strict';

jest.autoMockOff();

/**
* ## Imports
*/
import React, { View } from 'react-native';
import utils from 'react-addons-test-utils';

/**
 * ## Under test
 * class under test
 */
var Story = require('../Story')
var mockStory = require('./mockStory.json');
jest.autoMockOn();

/**
 * ## Test
 */
describe('Story', () => {  

  /**
   * ### renderStory
   * display component and return 
   * @returns {Object} with props, output and renderer
   */ 

  function renderStory(props) {
    const renderer = utils.createRenderer();
    renderer.render(<Story {...props}/>);
    const output = renderer.getRenderOutput();
    return {
      props,
      output,
      renderer
    };
  }

  /**
   * ### it should display the event name of the event its given
   */    
  it('should display the story title', () => {
    const f = (item)=> {
      console.log(item) 
      return () => {return item}
    }

    const component = renderStory({story: mockStory, navigator: { push: f()}});
    const {output} = component;

    const hello = output.props.onPress()
    console.log('hi', hello)
    console.log(Story.toString())
    console.log(output.type)
    expect(output.type.displayName).toEqual('TouchableHighlight');
  });

});