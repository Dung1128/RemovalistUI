import React, { Component } from 'react'
import { Text, Button, Spinner } from 'native-base'
import { TouchableOpacity, View } from 'react-native'
import Icon from '~/ui/components/Icon';
import styles from './styles'

import material from '~/theme/variables/material'

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = ({
    })
  }

  render() {
    const { children, onPress, loading = false, text, textStyle, iconRight = false, full = false, color = material.redColor, ...props } = this.props;
    return (
      <TouchableOpacity
        { ...props }
        onPress={onPress}
        style={full ? {
          ...styles.paymentButton,
          backgroundColor: color,
          width: '100%', height: 60, flexDirection: 'row', justifyContent: iconRight
            ? 'space-between' : 'center', padding: 10, ...this.props.style
        }
          : { ...styles.paymentButton, ...this.props.style, backgroundColor: color, }}
      >
        {full && iconRight && <View style={{ width: '15%' }}></View>}
        {loading && <Spinner color='#fff' />}
        {!loading && text && <Text style={{ color: '#fff', fontSize: 20 }}>{text}</Text>}
        {full && iconRight && <Icon name={iconRight} size={18} color='#fff' />}
        {children}
      </TouchableOpacity>
    )
  }
}