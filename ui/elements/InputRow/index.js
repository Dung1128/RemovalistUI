import React, { Component } from 'react';
import { Text, TextInput } from 'react-native';
import { View, Input, Icon } from 'native-base';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome'

export default class extends Component {

    render() {
        const { hint, nameIcon, ...props } = this.props;
        return (
            <View 
                style={{ 
                    flexDirection: 'row', 
                    borderBottomWidth: 1, 
                    borderBottomColor: '#e9edf0',
                    paddingLeft: 20,
                    paddingRight: 20,
                    justifyContent: 'center',
                    backgroundColor: '#fff'
                    }} 
                collapsable={false} {...props}>
                <IconFontAwesome name ={nameIcon} style={{ color: 'gray', fontSize:25, paddingTop: 10 }}/>
                <TextInput
                    underlineColorAndroid="transparent"
                    placeholder={hint}
                 style={{ height: 50, width: '100%'}}/>
            </View>
        );
    }
} 
