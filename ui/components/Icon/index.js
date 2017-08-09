import React, { Component, PropTypes } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

// Create icon from json
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import fontelloConfig from '~/assets/selection.json';

const Icon = createIconSetFromIcoMoon(fontelloConfig);

export default class extends Component {

  static propTypes = {               
      name: PropTypes.string.isRequired,                   
  }
  renderIcon() {
    const { size, name, ...props } = this.props;    
    return (
      <Icon size={size} name={name} style={{ backgroundColor: 'transparent' }} {...props}/>
    );
  }

  render() {
    const { onPress, ...props } = this.props;   
    // if do not have onPress, should make clickable from parent 
    return (onPress
      ? <TouchableWithoutFeedback {...props} onPress={onPress} >
          {this.renderIcon()}
        </TouchableWithoutFeedback>
      : this.renderIcon()
    );
  }
} 

