import React, { Component } from 'react';
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
export default class extends Component {
    render() {
        const { title, icon, size = 22, right, color = material.grayIconColor, ...props } = this.props;
        return (

            <View rowpadding full style={{ backgroundColor: '#fff' }} {...props }>
                <View row>
                    <Icon name={icon} size={size} color={color} />
                    <Text style={{ marginLeft: 10 }}>{title}</Text>
                </View>
                {
                    right && right
                }
            </View>
        )
    }
}