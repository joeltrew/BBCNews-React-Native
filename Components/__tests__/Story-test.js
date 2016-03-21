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
    console.log('Story', Story)
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
  it('should have correct story headline', () => {

    const component = renderStory({story: mockStory, navigator: { push: ()=>{}}});
    console.log('component', component)
    const {output} = component;
    expect(output.type.displayName).toEqual('TouchableHighlight');
    expect(output.props.children.props.children[1].props.children[0].props.children).toBe('Test Story')
  });

});