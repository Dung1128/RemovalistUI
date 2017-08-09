import React, { Component } from 'react';
import { Text, TextInput } from 'react-native';
import { View, Input } from 'native-base';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import styles from './styles';
import Icon from '~/ui/components/Icon';
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
                    backgroundColor: '#fff',
                    alignItems: 'center'
                    }} 
                collapsable={false} {...props}>
                <Icon name ={nameIcon} size={20} style={{ color: 'gray' }}/>
                <TextInput
                    underlineColorAndroid="transparent"
                    placeholder={hint}
                 style={{ height: 50, width: '100%'}}/>
                 { add && <Icon name='add' size={20} style={styles.iconsAdd} /> }
                 
            </View>
        );
    }
} 
