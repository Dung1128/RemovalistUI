import React, { Component } from 'react'
import { Text, Button, Spinner } from 'native-base'
import { TouchableOpacity, View } from 'react-native'
import Icon from '~/ui/components/Icon';
import styles from './styles'

export default class extends Component {
  render() {
    const { onPress, children, loading = false, text, textStyle, iconRight = false, full = false, ...props } = this.props;
    return (
      <TouchableOpacity
        { ...props }
        onPress={onPress && !loading ? onPress : null}
        style={full ? { ...styles.paymentButton, width: '100%', height: 60, flexDirection: 'row', justifyContent: iconRight ? 'space-between' : 'center', padding: 10, ...this.props.style } : { ...styles.paymentButton, ...this.props.style }}
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