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

    getHoursMinutes() {
        const hours = new Date().getHours()
        const minutes = new Date().getMinutes()
        return { hours, minutes }
    }

    getTop() {
        const { hours, minutes } = this.getHoursMinutes()
        const top = Math.round((hours + minutes / 60) * 80) + 20
        setTimeout(() => {
            this.setState({
                top
            })
        }, 0)
    }
    render() {
        const { hours, minutes } = this.getHoursMinutes()
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
                    {hours}:{minutes < 9 ? "0" + minutes : minutes}
                </Text>
            </View>
        )
    }
}