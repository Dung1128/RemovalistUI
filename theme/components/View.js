import { Platform } from 'react-native';
import _ from 'lodash';

import variable from './../variables/platform';
import material from './../variables/material';

export default (variables = variable) => {
  const viewTheme = {
    '.padder': {
      padding: variables.contentPadding / 2,
    },
    '.rounded': {
      borderRadius: 4,
    },
    '.row': {
      flexDirection: 'row',
      alignItems: 'center',
    },
    '.full': {
      justifyContent: 'space-between',
      width: '100%',
    },
    '.container': {
      height: '100%',
      width: '100%',
    },
    '.phonect': {
      overflow: 'hidden',
      'NativeBase.ListItem': {
        borderColor: variables.listBorderColor,
        justifyContent: 'space-between',
        height: null,
        marginLeft: 0,
        marginRight: 0,
        paddingLeft: 15,
        paddingRight: 15,
        borderBottomWidth: 1,

        'NativeBase.Icon': {
          marginRight: -10,
        },
        'NativeBase.Text': {
          // width: variable.deviceWidth - 140,            
          fontSize: 16,
        },
        '.last': {
          borderBottomWidth: null,
        }
      },
      borderColor: variables.listBorderColor,
      borderWidth: 1,
      backgroundColor: '#fff',
      borderRadius: 10,
    },
    '.center': {
      justifyContent: 'center',
      alignItems: 'center',
    },
    '.centerVertical': {
      justifyContent: 'center',
    },
    '.rowpadding': {
      padding: 10,
      flexDirection: 'row',
    },
    '.gray': {
      backgroundColor: material.grayBackgroundColor
    },
    '.white': {
      backgroundColor: '#fff'
    },
  };


  return viewTheme;
};
