import React, { Component } from 'react';
import { Text, TextInput } from 'react-native';
import { View, Input, Icon } from 'native-base';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import styles from './styles';
export default class extends Component {

    render() {
        const { hint, nameIcon, add,  ...props } = this.props;
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
                <IconFontAwesome name ={nameIcon} style={{ color: 'gray', fontSize:20, paddingTop: 15 }}/>
                <TextInput
                    underlineColorAndroid="transparent"
                    placeholder={hint}
                 style={{ height: 50, width: '100%'}}/>
                 { add && <IconMaterialIcons name='add-box' style={styles.iconsAdd} /> }
                 
            </View>
        );
    }
} 
