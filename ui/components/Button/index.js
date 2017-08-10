import React, { Component } from 'react'
import { Text, Button } from 'native-base'
import { TouchableOpacity } from 'react-native'
import styles from './styles'

export default class extends Component {
  render() {
    const { onPress, children, text, textStyle, ...props } = this.props;
    return (
      <TouchableOpacity
        { ...props }
        onPress={onPress}
        style={{ ...styles.paymentButton, ...this.props.style }}>
        {children}
        {text && <Text style={{ color: '#fff' }}>{text}</Text>}
      </TouchableOpacity>
    )
  }
}