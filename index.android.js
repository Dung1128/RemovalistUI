import React, { Component } from 'react';
import {
  AppRegistry,
  StatusBar
} from 'react-native';

import Removalist from './ui';

StatusBar.setBarStyle('default');

AppRegistry.registerComponent('Removalist', () => Removalist);
