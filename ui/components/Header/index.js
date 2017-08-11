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
        const { title, onPress, iconLeft, right, size = 24, textright, ...props } = this.props;
        return (
            <Header
                noShadow={true}
                style={{ backgroundColor: material.redColor, borderBottomColor: material.redColor, alignItems: 'center' }}>
                <Left style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                    <Button onPress={onPress} transparent>
                        <Icon name={iconLeft} color='#fff' size={size} />
                    </Button>
                    <Title style={{ fontSize: 18, width: '100%', textAlign: 'left', marginLeft: 10 }}>{title}</Title>
                </Left>
                {
                    right &&
                    <Right>
                        {right}
                    </Right>
                }
                <Text style={{ color: '#fff' }}>{textright}</Text>

            </Header>
        )
    }
}