import { Platform } from 'react-native';
import _ from 'lodash';

import variable from './../variables/platform';
import material from './../variables/material';

export default (variables = variable) => {
  const textTheme = {
    fontSize: variables.DefaultFontSize - 1,
    fontFamily: variables.fontFamily,
    color: variables.textColor,
    '.bold': {
      fontWeight: 'bold',
    },
    '.active': {
      color: variables.tabBarActiveTextColor,
    },
    '.link': {
      color: variables.linkTextColor,
    },
    '.note': {
      color: variables.noteTextColor,
      // fontSize: variables.noteFontSize
    },
    '.small': {
      fontSize: variables.btnTextSizeSmall
    },
    '.large': {
      fontSize: variables.btnTextSizeLarge
    },
    '.left': {
      alignSelf: 'flex-start',
    },
    '.white': {
      color: '#fff',
    },
    '.primary': {
      fontSize: 18,
      fontWeight: 'bold'
    },
    '.secondary': {
      fontSize: 14,
      color: material.grayColor,
    },
    '.wraning': {
      fontSize: 11,
      color: material.redColor,
    },
    '.padding': {
      paddingHorizontal: 20
    }


  };

  return textTheme;
};
