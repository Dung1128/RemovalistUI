import React, { Component } from 'react';
import {
  View,
  Alert,
  ListView,
  TouchableOpacity
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
  Fab
} from 'native-base';


import TabBar from '~/ui/components/TabBar';
import Icon from '~/ui/components/Icon';
import Header from '~/ui/components/Header';
import api from '~/store/api';
import * as jobActions from '~/store/actions/job'

const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9EZzFPVVF4UmpZelJEZzVSakUzT0RBME5UUkZRa1pHUkRJd016ZERPRFl4TmpRd09UaEdSUSJ9.eyJpc3MiOiJodHRwczovL3R1YW5wbDEuYXUuYXV0aDAuY29tLyIsInN1YiI6ImVvc29UR3FCMHZwNWlsS1dWMGcxclZmaVBFMGRaWnVGQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3R1YW5wbDF0ZXN0IiwiZXhwIjoxNTExMDg3NDQ0LCJpYXQiOjE1MDI0NDc0NDQsInNjb3BlIjoiIn0.U3xQQLeGTFuzr-37PXefhZnynHWYUx7Ow_SuBfb8FM2S3cxAQdk6WN14bPKqSKaAsbMU7Sd6VsvTFDtlSRrkDmghfNNIQ7eTD8qECZ6N94XePH-oggOM7PDUVsWzTT5t5279w-8PFc5NjByPiptu-hvAV2JAR0tJd_UDJHF-tArnYeq99v_bftkdhngd_JblRJBC6oDqaAGPaAQa4SCL0aG3WxUXVz1CeLywyKUBYVE88RWC-GWlnwozBcegqku5BRP4zzlJmY3Xw73Bdj8zEt5aQtl_rc3EaG2mwFtUMokBNxUAqzHtG3WCFgCxb2463EvyCqJQHlwAFnzGYFwqDg'

@connect(
  state => ({

  }), { ...jobActions }
)
export default class extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      calendar: true,
      basic: true,
      dataSource: {},
    };
    this.dataSource = {};
  }

  componentWillMount() {
    this.getData();
  }

  async getData() {
    try {
      const res = await api.job.getListJob(11, accessToken)
      this.dataSource = res;

      console.log(this.dataSource);
      // const dataSource = this.page != 1 ? [...this.state.dataSource, ...res.results] : res.results;
      if (res != null) {
        this.setState({
          status: false,
          loading: false,
          dataSource: JSON.stringify(res),
          hasMore: res.results.length,
          offline: false,
        });
      }
    } catch (error) {
      this.setState({
        status: false,
        loading: false,
        offline: true,
      });
      // console.log(error);
    }
  }

  componentDidMount() {
    this.props.getStatusJobList(accessToken, (error, data) => {
      console.log(error)
      // console.log(data)
    })
  }


  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
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
            ? <Calendar navigation={this.props.navigation} />
            : <List navigation={this.props.navigation} dataSource={this.dataSource} />
        }
        <Button
          onPress={() => this.props.navigation.navigate('general_screen')}
          style={{ backgroundColor: material.redColor, position: 'absolute', bottom: 20, right: 20, borderRadius: 50 / 2, width: 50, height: 50 }}
          position="bottomRight">
          <Icon name="add" color='#fff' size={20} />
        </Button>
      </Container>
    );
  }
}