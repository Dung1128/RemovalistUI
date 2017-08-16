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
    Button,
} from 'native-base';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import material from '~/theme/variables/material'
import Icon from '~/ui/components/Icon';
import styles from './styles'
export default class extends Component {
    render() {
        const { title, icon, iconRemove, size = 22, right, color = material.grayIconColor, onPress, ...props } = this.props;
        return (
            <View {...props}>
                <TouchableOpacity onPress={onPress} style={styles.button} >
                    {iconRemove
                        ? <IconIonicons name='md-remove' style={{ paddingHorizontal: 2, height: 16 }} size={size} color={color} />
                        : <Icon name={icon} size={size} color={color} />
                    }
                </TouchableOpacity>
            </View>
        )
    }
}