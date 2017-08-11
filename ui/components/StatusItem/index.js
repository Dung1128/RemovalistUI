import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './styles'
export default class extends Component {
    render() {
        const { color, width = 5, style, ...props } = this.props;
        return (
            <View {...props} style={{ ...styles.statusColor, backgroundColor: color, width, ...style }} />
        )
    }
}