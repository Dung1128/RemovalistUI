import { Platform } from 'react-native';
import _ from 'lodash';

import variable from './../variables/platform';

export default (variables = variable) => {
  const iconTheme = {
    fontSize: variables.iconFontSize,
    color: '#000',
    backgroundColor:'transparent',
    '.large': {
      fontSize:28,
    },
    '.gray': {        
      color: variables.grayColor,
    },
    '.red': {
      color: variables.redColor,
    },
    '.green': {
      color: variables.greenColor,
    },
    '.active': {
      color: variables.tabBarActiveTextColor,
    },
    '.small': {
      fontSize: 10,
    },
  };


  return iconTheme;
};
