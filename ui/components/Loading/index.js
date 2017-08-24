import React, { Component } from 'react';
import { areRequestsPending } from '~/store/selectors/common'
import { List, ListItem, Spinner, Button, Icon, Text, View } from 'native-base';
import { connect } from 'react-redux'
import material from '~/theme/variables/material'
import styles from './styles'
@connect(state => ({
    isPending: areRequestsPending(state),
}))
export default class extends Component {
    render() {
        return (
            this.props.isPending ?
                <View style={styles.container}>
                    <Spinner color={material.redColor} />
                </View>
                : null
        )
    }
}