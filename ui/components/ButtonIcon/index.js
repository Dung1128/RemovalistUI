import React, { Component } from 'react';
import {
    TouchableOpacity
} from 'react-native';
import {
    Header,
    Left,
    Right,
    Text,
    View,
    Title,
    Button
} from 'native-base';
import material from '~/theme/variables/material'
import Icon from '~/ui/components/Icon';
import styles from './styles'
export default class extends Component {
    render() {
        const { title, icon, size = 22, right, color = material.grayIconColor, onPress, ...props } = this.props;
        return (
            <View {...props}>
                <TouchableOpacity onPress={onPress} style={styles.button} >
                    <Icon name={icon} size={size} color={color} />
                </TouchableOpacity>
            </View>
        )
    }
}