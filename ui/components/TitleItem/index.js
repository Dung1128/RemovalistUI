import React, { Component } from 'react';
import { View, Text } from 'native-base';
import styles from './styles'
export default class extends Component {
    render() {
        const { title, right, padding = 10, ...props } = this.props;
        return (

            <View full style={{ ...styles.titGeneral, padding }} {...props} >
                <Text bold>{title}</Text>
                {
                    right && right
                }
            </View>
        )
    }
}