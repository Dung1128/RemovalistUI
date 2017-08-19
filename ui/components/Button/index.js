import React, { Component } from 'react'
import { Text, Button, Spinner } from 'native-base'
import { TouchableOpacity, View } from 'react-native'
import Icon from '~/ui/components/Icon';
import styles from './styles'

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      loading: false,
    })
    this.isFirst = true;
    this.lastPress = 0
  }

  onTap() {
    this.setState({
      loading: true,
    })
    const { onPress } = this.props;
    let delta = new Date().getTime() - this.lastPress;
    if (this.isFirst || delta > 1000) {
      onPress && onPress()
      setTimeout(() => {
        this.setState({
          loading: false,
        })
      }, 1000)
      this.isFirst = false;
    }
    this.lastPress = new Date().getTime()
  }

  render() {
    const { loading } = this.state;
    const { children, text, textStyle, iconRight = false, full = false, ...props } = this.props;
    return (
      <TouchableOpacity
        { ...props }
        onPress={() => this.onTap()}
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