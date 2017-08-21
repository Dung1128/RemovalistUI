import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import {
  Container, Spinner, Text, View,
  ListItem,
} from 'native-base'
import material from '~/theme/variables/material'
import styles from './styles'
import * as jobActions from '~/store/actions/job'
import { areRequestsPending } from '~/store/selectors/common'
import { accessToken } from '~/store/constants/api'
import * as jobSelectors from '~/store/selectors/job'
import { connect } from 'react-redux'
@connect(
  state => ({
    isPending: areRequestsPending(state),
    listJobByDate: jobSelectors.getJobByDate(state)
  }), { ...jobActions }
)
export default class extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: props.items || {}
    };
  }

  drawBar(i, { nativeEvent }) {
    const { locationX: x, locationY: y } = nativeEvent
    let top = 40 * i + y
    let left = x

    const offset = (y - 20)
    const plusMinute = Math.round(30 * offset / 40)
    const realMinute = i * 30 + plusMinute
    let hours = Math.floor(realMinute / 60)
    let minutes = realMinute - hours * 60
    const items = {
      ...this.state.items,
      [x + ':' + y]: (
        <View key={x + ':' + y} style={{
          backgroundColor: 'red',
          height: 50,
          width: 40,
          top,
          left,
          position: 'absolute',
          zIndex: 2,
        }}>
          <Text>{hours}:{minutes}</Text>
        </View>
      )
    }

    // console.log(this.items)
    this.props.onPress && this.props.onPress(hours, minutes)
    // this.forceUpdate()
    this.setState({ items })

  }


  render() {
    const { onPress } = this.props
    const { items } = this.state
    const timeline = []
    const labels = []
    for (let i = 0; i <= 48; i++) {
      let hours = Math.floor(i / 2);
      // if(hours > 12) hours = hours - 12    
      var minutes = (i % 2) === 0 ? '00' : '30';

      labels.push(
        <Text key={i} style={{
          textAlign: 'right',
          lineHeight: 40,
          paddingRight: 10,
        }}>{hours}:{minutes}</Text>
      )

      timeline.push(
        <ListItem onPress={e => this.drawBar(i, e)} style={{
          marginLeft: 0,
          borderBottomWidth: 0,
          paddingLeft: 0,
          height: 40,
          width: '100%',
        }} key={i}>
          <View style={{
            height: 1,
            width: '100%',
            backgroundColor: 'black'
          }} />
        </ListItem>
      )
    }

    return (
      <ScrollView contentContainerStyle={{
        flexDirection: 'row',
      }}>
        <View style={{
          width: 60,
        }}>
          {labels}
        </View>
        <ScrollView horizontal contentContainerStyle={{
          flexDirection: 'column',
          width: Math.max(1000, 60 * 100),
        }}>
          {timeline}
          {Object.values(items)}
        </ScrollView>
      </ScrollView>
    )

  }
}