import React, { Component } from 'react';
import { View, Text } from 'native-base';
import styles from './styles'
export default class extends Component {
    render() {
        const { title, ...props } = this.props;
        return (
            
              <View {...props} style={styles.titGeneral}>
                  <Text bold>{title}</Text>
              </View>
        )
    }
}