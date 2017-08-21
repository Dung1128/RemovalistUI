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
        const { ...props } = this.props;
        return (
                <View
                    style={{
                        backgroundColor: material.grayTitle,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                    collapsable={false} {...props}>
                    <View style={styles.ItemInfo}>
                        <View style={{ flexDirection: 'row', alignContent: 'center'}}>
                            <Icon name='truck' size={16}/>
                        </View>
                    </View>
                    <View style={styles.ItemInfo}>
                        <Text>1</Text>
                    </View>
                    <View style={styles.ItemInfo}>
                        <Text>1</Text>
                    </View>   
                </View>
               
           

        );
    }
} 
