import React, { Component } from 'react';
import { areRequestsPending } from '~/store/selectors/common'
import { List, ListItem, Spinner, Button, Icon, Text, View } from 'native-base';
import { connect } from 'react-redux'
import material from '~/theme/variables/material'

@connect(state => ({
    isPending: areRequestsPending(state),
}))
export default class extends Component {
    render() {
        return (
            this.props.isPending ? <Spinner style={{ position: 'absolute', top: '50%', left: '50%' }} color={material.redColor} /> : null
        )
    }
}