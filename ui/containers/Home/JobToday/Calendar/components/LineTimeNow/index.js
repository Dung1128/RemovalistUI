import React, { Component } from 'react'
import { View, Text } from 'native-base'
import material from '~/theme/variables/material'
export default class extends Component {

    constructor(props) {
        super(props);

        this.state = {
            top: 20
        };
    }

    componentWillMount() {
        setInterval(() => this.getTop())
    }

    getTop() {
        const top = Math.round((new Date().getHours() + new Date().getMinutes() / 60) * 80) + 20
        this.setState({
            top
        })
    }
    render() {
        return (
            <View style={{
                position: 'absolute',
                height: 10,
                width: '100%',
                left: 0,
                top: this.state.top
            }} >

                <View style={{
                    height: 1,
                    backgroundColor: 'red',
                    width: '100%'
                }} />
                <Text style={{ fontSize: 12, color: material.redColor, marginTop: -20, backgroundColor: 'transparent' }}>
                    {new Date().getHours() + ":" + new Date().getMinutes()}
                </Text>
            </View>
        )
    }
}