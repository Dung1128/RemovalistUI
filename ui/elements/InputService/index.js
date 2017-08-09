import React, { Component } from 'react';
import { Text, TextInput } from 'react-native';
import { View, Input } from 'native-base';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'

import IconEvilIcons from 'react-native-vector-icons/EvilIcons'
import styles from './styles';
import material from '~/theme/variables/material';
import Icon from '~/ui/components/Icon';
export default class extends Component {

    render() {
        const { text, nameIcon, add, measure, ...props } = this.props;
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    borderBottomWidth: 1,
                    borderBottomColor: material.grayTitle
                }}
                collapsable={false} {...props}>
                <View style={styles.Item}>
                    <Icon name={nameIcon} size={20} style={styles.colorIcon} />
                    <Text style={styles.content}> Type 1</Text>
                    <Icon name='arrown-drop' size={12} />
                </View>

                <View style={styles.Item}>
                    <Icon name='quantity' size={20} style={styles.colorIcon} />
                    <TextInput
                        placeholder='0'
                        underlineColorAndroid="transparent"
                        style={{ width: '60%' }}
                    />
                    <Text>{measure}</Text>
                </View>

                <View style={styles.Item}>
                    <Text style={styles.content}> $50</Text>
                </View>

            </View>
        );
    }
} 
