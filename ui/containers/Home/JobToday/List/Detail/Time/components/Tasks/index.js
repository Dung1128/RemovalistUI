import React, { Component } from 'react';
import {
    Header,
    Left,
    Right,
    Text,
    View,
    Title,
    Button,
    Input
} from 'native-base';
import material from '~/theme/variables/material'
import Icon from '~/ui/components/Icon';
import ButtonIcon from '~/ui/components/ButtonIcon';
export default class extends Component {
    render() {
        return (
            <View  style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10}}>
                <Icon name='note' size={20} color={material.grayIconColor} />
                <Input placeholder='Tasks description' />
            </View>
        )
    }
}