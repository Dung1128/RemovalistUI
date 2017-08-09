import React, { Component } from 'react';
import {
    Container,
    Left,
    Right,
    Text,
    View,
    Title,
    Button
} from 'native-base';
import material from '~/theme/variables/material'
import Icon from '~/ui/components/Icon';
import Header from '~/ui/components/Header';
export default class extends Component {
    render() {

        return (
            <Container>
                <Header title='Job details' iconLeft='back' onPress={() => this.props.navigation.goBack()} />
                <Text>OK</Text>
            </Container>
        )
    }
}