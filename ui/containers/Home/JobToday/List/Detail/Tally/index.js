import React, { Component } from 'react'
import { Container, Spinner, Text, View } from 'native-base'
import material from '~/theme/variables/material'
import styles from './styles'

import Header from '~/ui/components/Header';

export default class extends Component {

    render() {
        return (
            <Container>
                <Header title='Tally' size={20} iconLeft='close' onPress={() => this.props.navigation.goBack()} />
                <Text style={{ color: material.redColor }}>Building</Text>
            </Container>
        )
    }
}