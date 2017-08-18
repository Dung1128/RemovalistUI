import React, { Component } from 'react';
import { TextInput, TouchableOpacity, Platform } from 'react-native';
import { View, Text, Input } from 'native-base';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import styles from './styles';
import Icon from '~/ui/components/Icon';
import material from '~/theme/variables/material'
export default class extends Component {

    render() {
        const { hint, nameIcon, add, iconRemove, error, size = 18, addIcon, onPress, right, onChangeText, ...props } = this.props;
        return (
            <View white>
                <View
                    style={{
                        ...styles.wrapContent,
                        borderBottomColor: error ? material.redColor : '#e9edf0',
                        paddingRight: add ? 50 : 20,
                    }}
                    collapsable={false} {...props}>
                    <Icon name={nameIcon} size={20} style={{ color: 'gray', paddingHorizontal: 0 }} />
                    <Input
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholderTextColor={material.grayColor}
                        underlineColorAndroid="transparent"
                        placeholder={hint}
                        onChangeText={onChangeText}
                        style={styles.noerror} />
                    {add && <TouchableOpacity style={styles.buttonAdd}
                        onPress={onPress} {...props}>
                        {addIcon == 'delete'
                            ? <IconIonicons name='md-remove' style={{ paddingHorizontal: 4, height: 20 }} size={size} color='#fff' />
                            : <Icon size={16} style={styles.iconAdd} name={addIcon} />
                        }
                    </TouchableOpacity>}
                    {error && <Icon size={16} color={material.grayIconColor} name='info' />}

                    {right}

                </View>
                {error && <Text wraning padding>{error}</Text>}
            </View>

        );
    }
} 
