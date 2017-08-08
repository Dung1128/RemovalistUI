import React, { Component } from 'react';
import { Text, TextInput } from 'react-native';
import { View, Input, Icon } from 'native-base';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'

import IconEvilIcons from 'react-native-vector-icons/EvilIcons'
import styles from './styles';
import material from '~/theme/variables/material';
export default class extends Component {

    render() {
        const { text, nameIcon, add,  ...props } = this.props;
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
                    <IconFontAwesome name ='clock-o' style={{ color: 'gray', fontSize:20}}/>
                    <Text style={styles.content}> Type 1</Text>
                    <IconMaterialIcons name='arrow-drop-down' style={styles.down}/>
                </View>

                <View style={styles.Item}>
                    <IconEvilIcons name='close' style={{ color: 'gray', fontSize: 20}} />
                    <Text style={styles.content}> Type 1</Text>
                </View>

                <View style={styles.Item}>
                    <Text style={styles.content}> $50</Text>
                </View>
                 
            </View>
        );
    }
} 
