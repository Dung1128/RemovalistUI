import React, { Component } from 'react'
import { Container, Spinner, Text, View } from 'native-base'
import material from '~/theme/variables/material'
import styles from './styles'

export default class extends Component {

    render() {
        return (
            <View center style={{ flex: 1 }}>
                <Spinner color={material.redColor} />
                <Text style={{ color: material.redColor }}>Building...</Text>
            </View>
        )
    }
}