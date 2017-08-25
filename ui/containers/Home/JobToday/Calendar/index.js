import React, { Component } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
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
import moment from 'moment'
import LineTimeNow from './components/LineTimeNow'
import Loading from '~/ui/components/Loading';
@connect(
  state => ({
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



  componentWillReceiveProps({ listJobByDate }) {
    this.getData(listJobByDate)
  }


  componentDidMount() {
    this.getData(this.props.listJobByDate)
  }

  getData(data) {
    const items = {};
    if (data && data.length == 0) {
      this.setState({ items })
      return;
    }

    let left = 30;

    if (data) {
      for (const i = 0; i < data.length; i++) {
        let HourTimeStart = moment(data[i].TimeStart).get('hour');
        let MinuteTimeStart = moment(data[i].TimeStart).get('minute');
        let HourTimeEnd = moment(data[i].TimeEnd).get('hour');
        let MinuteTimeEnd = moment(data[i].TimeEnd).get('minute');
        const top = Math.round((HourTimeStart + MinuteTimeStart / 60) * 80) + 20
        const bottom = Math.round((HourTimeEnd + MinuteTimeEnd / 60) * 80) + 20
        const height = bottom - top
        const name = data[i].Name
        const StatusColor = data[i].StatusColor
        const id = data[i].JobDetailsId
        const obj = data[i]
        const valueCheck = data[i].StatusId < 2 ? data[i].StatusName : data[i].TruckName
        items[top + ':' + left] = { top, left, hours: HourTimeStart, minutes: MinuteTimeStart, name, StatusColor, height, obj, valueCheck }
        left += 90
      }
      this.setState({ items })
    }



  }


  drawBar(i, { nativeEvent }) {
    const { locationX: x, locationY: y } = nativeEvent
    const offset = (y - 20)
    const plusMinute = Math.round(30 * offset / 40)
    const realMinute = i * 30 + plusMinute
    let hours = Math.floor(realMinute / 60)
    let minutes = realMinute - hours * 60
    this.props.navigation && this.props.navigation.navigate('general_screen', { hours, minutes })
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
      <View>
        <Loading />
        <ScrollView contentContainerStyle={{
          flexDirection: 'row',
        }}>
          <View style={{
            width: 60,
            marginTop: material.platform == 'ios' ? 0 : -10
          }}>
            {labels}
          </View>
          <ScrollView horizontal contentContainerStyle={{
            flexDirection: 'column',
            width: Math.max(1000, 60 * 100),
          }}>
            {timeline}
            <LineTimeNow />
            {Object.values(items).map(({ top, left, hours, minutes, name, StatusColor, height, obj, valueCheck }) =>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('detail_screen', obj)}
                key={top + ':' + left} style={{
                  backgroundColor: `#${StatusColor}`,
                  height: height,
                  width: 80,
                  top,
                  left,
                  position: 'absolute',
                  borderRadius: 10,
                  alignItems: 'center',
                  padding: 10
                }}>
                <Text white style={{ fontSize: 14 }}>{name.toUpperCase()}</Text>
                <Text white style={{ fontSize: 11 }}>{valueCheck}</Text>
              </TouchableOpacity>
            )}
          </ScrollView>

        </ScrollView>
      </View>
    )

  }
}