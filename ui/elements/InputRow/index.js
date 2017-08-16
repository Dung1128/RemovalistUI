import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { View, Input } from 'native-base';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import styles from './styles';
import Icon from '~/ui/components/Icon';
import material from '~/theme/variables/material'
export default class extends Component {

    render() {
        const { hint, nameIcon, add, iconRemove, size=18, addIcon, onPress, onChangeText, ...props } = this.props;
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
                    autoCapitalize='none'
                    placeholderTextColor={material.grayColor}
                    underlineColorAndroid="transparent"
                    placeholder={hint}
                    onChangeText={onChangeText}
                    style={{ height: 50, width: '100%', marginHorizontal: 10 }} />
                {add && <TouchableOpacity style={styles.buttonAdd}
                    onPress={onPress} {...props}>
                        {addIcon == 'delete'
                        ? <IconIonicons name='md-remove' style={{ paddingHorizontal: 4, height: 20 }} size={size} color='#fff' />
                        : <Icon size={16} style={styles.iconAdd} name={addIcon} />
                    }
                </TouchableOpacity>}

            </View>
        );
    }
} 
