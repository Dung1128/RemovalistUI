import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './styles'
export default class extends Component {
    render() {
        const { color, ...props } = this.props;
        return (
            <View {...props} style={{ ...styles.statusColor, backgroundColor: color }} />
        )
    }
}