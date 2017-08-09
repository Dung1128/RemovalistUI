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
        const { title, onPress, iconLeft, right, ...props } = this.props;
        return (
            <Header
                noShadow={true}
                style={{ backgroundColor: material.redColor, borderBottomColor: material.redColor }}>
                <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Button onPress={onPress} transparent>
                        <Icon name={iconLeft} color='#fff' size={24} />
                    </Button>
                    <Title style={{ fontSize: 18, marginLeft: 10 }}>{title}</Title>
                </Left>
                <Right>
                    {
                        right ? right : <View></View>
                    }
                </Right>

            </Header>
        )
    }
}