import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity } from 'react-native';
import { View, Input } from 'native-base';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import styles from './styles';
import Icon from '~/ui/components/Icon';
import material from '~/theme/variables/material'
export default class extends Component {

    render() {
        const { hint, nameIcon, add, ...props } = this.props;
        return (
            <View
                style={{
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderBottomColor: '#e9edf0',
                    paddingLeft: 20,
                    paddingRight: 20,
                    justifyContent: 'space-between',
                    backgroundColor: '#fff',
                    alignItems: 'center',

                }}
                collapsable={false} {...props}>
                <Icon name={nameIcon} size={20} style={{ color: 'gray', paddingHorizontal: 0 }} />
                <Input
                    left
                    placeholderTextColor={material.grayColor}
                    underlineColorAndroid="transparent"
                    placeholder={hint}
                    style={{ height: 50, width: '100%' }} />
                {add && <TouchableOpacity style={styles.buttonAdd}
                    onPress={() => this.addCustomer()}>
                    <Icon size={18} style={styles.iconAdd}
                        name='add' />
                </TouchableOpacity>}

            </View>
        );
    }
} 
