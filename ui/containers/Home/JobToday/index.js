import React, { Component } from 'react';
import {
  View,
  Alert,
  ListView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux'
import IconIonicons from 'react-native-vector-icons/Ionicons';
import List from './List'
import Calendar from './Calendar'
import material from '~/theme/variables/material'
import {
  Container,
  Button,
  Text,
  ListItem,
  Content,
  Fab
} from 'native-base';


import TabBar from '~/ui/components/TabBar';
import Icon from '~/ui/components/Icon';
import Header from '~/ui/components/Header';
import LoadingModal from '~/ui/components/LoadingModal';
import api from '~/store/api';
import * as jobActions from '~/store/actions/job'
import { areRequestsPending } from '~/store/selectors/common'

const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9EZzFPVVF4UmpZelJEZzVSakUzT0RBME5UUkZRa1pHUkRJd016ZERPRFl4TmpRd09UaEdSUSJ9.eyJpc3MiOiJodHRwczovL3R1YW5wbDEuYXUuYXV0aDAuY29tLyIsInN1YiI6InJRcXY0UTBRQXdnQkJwM0k2TlM0NTBhcFh1UWhwN3hHQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3R1YW5wbDF0ZXN0IiwiZXhwIjoxNTAzMjI5MTI4LCJpYXQiOjE1MDMxNDI3MjgsInNjb3BlIjoiIn0.lJK0SvaoViNdldy8Nx3YS1tOfb4knza41OrpNiSQB_x9fYxnk2gf7UpT8bmjIzT6VP7D-zZ0psdpwCyLaZj-5aYM5pv80C1vo756w_MO8ZHSURIp4ZCDe2ANIOzTPYCpCeab1J2JqQl6amzNoRW05FsHpuC6cjOGKw2ftbgnczaD6bU8Uc3ualofXNCgG9tsNE4yqtfaR-xiAVlh15-dMSksEC-AZOLuoGLHhq_4TEI8X1mozOlPrBXrcLq3ggYbh2LYSOG7bGuAz-76wPvm8OO_oIGSOlHubqLY4habTRmZX63ch_EGoNsKS0vMqeujzOxK-BGvxIDMPKST377mAg'

// import accessToken from '~/store/api'

@connect(
  state => ({
    isPending: areRequestsPending(state)
  }), { ...jobActions }
)
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendar: true,
      basic: true,
      dataSource: {},
    };
    this.dataSource = {};
    this.navigated = false
    this.items = {}
  }

  componentWillMount() {
    // this.getData();
  }

  async getData() {
    try {
      const res = await api.job.getListJob(11, accessToken)
      this.dataSource = res;
      if (res != null) {
        this.setState({
          status: false,
          loading: false,
          dataSource: JSON.stringify(res),
          offline: false,
        });
      }
    } catch (error) {
      this.setState({
        status: false,
        loading: false,
        offline: true,
      });
    }
  }

  componentDidMount() {
    this.props.getStatusJobList(accessToken, (error, data) => { });
    this.props.getMaterialList(accessToken, (error, data) => { })
    this.props.getMaterialCategoryList(accessToken, (error, data) => { })
    this.props.getTruckList(accessToken, (error, data) => { })
    this.props.getReferenceContactList(accessToken, (error, data) => { })
  }


  drawBar(i, { nativeEvent }) {
    const { locationX: x, locationY: y } = nativeEvent
    let top = 40 * i + y
    let left = x
    console.log(i, y)
    const offset = (y - 20)
    const plusMinute = Math.round(30 * offset / 40)
    const realMinute = i * 30 + plusMinute
    let hours = Math.floor(realMinute / 60)
    let minutes = realMinute - hours * 60
    this.items[x + ':' + y] = (
      <View key={x + ':' + y} style={{
        backgroundColor: 'red',
        height: 50,
        width: 40,
        top,
        left,
        position: 'absolute',
        zIndex: 1,
      }}>
        <Text>{hours}:{minutes}</Text>
      </View>
    )

    this.forceUpdate()

  }

  renderChart() {
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
          {Object.values(this.items)}
        </ScrollView>
      </ScrollView>
    )
  }



  render() {

    return (
      <Container>
        <Header
          title='Job - Today'
          iconLeft='hamburger'
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
          right={
            <View style={{ justifyContent: 'space-between', width: '60%', flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('listchat_screen')}>
                <Icon name='chat' color='#fff' size={22} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('notification_screen')}>
                <Icon name='notify' color='#fff' size={22} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('filter_screen')}>
                <Icon name='filter' color='#fff' size={22} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name='search' color='#fff' size={22} />
              </TouchableOpacity>
            </View>
          }
        />
        <View style={{ backgroundColor: material.redColor }}>
          <TabBar
            style={{ marginHorizontal: 20, marginBottom: 10 }}
            titleActive="Calendar"
            titleNonActive="List"
            onPressActive={() => { this.setState({ calendar: !this.state.calendar }); }}
            onPressNonActive={() => { this.setState({ calendar: !this.state.calendar }); }}
          />

        </View>
        {
          this.state.calendar
            // ? <Calendar navigation={this.props.navigation} />
            ? this.renderChart()
            : <List navigation={this.props.navigation} dataSource={this.dataSource} />
        }
        <Button
          onPress={() => {
            if(!this.navigated) {
              this.props.navigation.navigate('general_screen')
              this.navigated = true
              setTimeout(()=>{
                this.navigated = false
              },2000)
            }
          }}
          style={{ backgroundColor: material.redColor, position: 'absolute', bottom: 20, right: 20, borderRadius: 50 / 2, width: 50, height: 50 }}>
          <Icon name="add" color='#fff' size={20} />
        </Button>
      </Container>
    );
  }
}