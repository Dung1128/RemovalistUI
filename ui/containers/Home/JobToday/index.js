import React, { Component } from 'react';
import {
  View,
  Alert,
  ListView,
  TouchableOpacity
} from 'react-native';
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

const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9EZzFPVVF4UmpZelJEZzVSakUzT0RBME5UUkZRa1pHUkRJd016ZERPRFl4TmpRd09UaEdSUSJ9.eyJpc3MiOiJodHRwczovL3R1YW5wbDEuYXUuYXV0aDAuY29tLyIsInN1YiI6ImVvc29UR3FCMHZwNWlsS1dWMGcxclZmaVBFMGRaWnVGQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3R1YW5wbDF0ZXN0IiwiZXhwIjoxNTAyNTA2MTM1LCJpYXQiOjE1MDI0MTk3MzUsInNjb3BlIjoiIn0.ReSNkSK_qln2Ose80tBJL11Y8A_-v4tlgHE3SUgqOUAdwh_9zcnO-YvYCSGlmy7MSUp7EbbmAAec6se5Rq6hl_sdC2oTaHod9qlR_pNy4Ht6AUcYGkBj2LUYNEADlynFEfqRAaPj0QOu23fKsm-keqxG-EGkzkGuLm2_6tXk5ILUzKLLsTXeN44z_pimmrbsmi3mlkAusDHBy7PcUeAHo6dhPHpkqM7u1bIbkh0JgMqkdUeNV0D6OdM_XMhCApWhJBBa8aqVUHPlDDSich9vMq7WUFHydpC30JwtT7ajVq0490Y8TvJjWksW-9CuL32n84frMr5M-lOggA9kNNEhLw'

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
      const res = await api.job.getListJob(3, accessToken)
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