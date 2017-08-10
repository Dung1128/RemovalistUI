import React, { Component } from 'react';
import {
  View,
  Alert,
  ListView,
    RefreshControl
} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
// import System from './ListSystem'
// import Admin from './ListAdmin'
import material from '~/theme/variables/material'
import {
  Container,
  Button,
  Text,
  List,

} from 'native-base';
import styles from './styles';

import TabBar from '~/ui/components/TabBar';
import Icon from '~/ui/components/Icon';
import Header from '~/ui/components/Header';

import ListSystem from './ListSystem'
import ListAdmin from './ListAdmin'

const dataNoti = [
    {
        content: 'notification',
        status: '1',
        time: '3 mins ago'
    },
    {
        content: 'notification',
        status: '1',
        time: '3 mins ago'
    },
    {
        content: 'notification',
        status: '1',
        time: '3 mins ago'
    },
    {
        content: 'notification',
        status: '1',
        time: '3 mins ago'
    },
    {
        content: 'notification',
        status: '1',
        time: '3 mins ago'
    }
]
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendar: true,
      basic: true,
    //   dataSource: dataNoti,
    //   isRefreshing: false
    };
  }

  /*renderRow(data) {
        return (
            <View style={styles.itemList}>
                <Text>{data.content}</Text>
                <View style={styles.bottom}>
                    <Text style={styles.textbottom}>{data.status}</Text>
                    <Text style={styles.textbottom}>{data.time}</Text>
                </View>
            </View>
        ); 
    }*/

  render() {
    return (
      <Container>
        <Header
          title='Notification'
          iconLeft='back'
          onPress={() => this.props.navigation.goBack()}
        />
        <View style={{ backgroundColor: material.redColor }}>
          <TabBar
            style={{ marginHorizontal: 20, marginBottom: 10 }}
            titleActive="System"
            titleNonActive="Admin"
            onPressActive={() => { this.setState({ calendar: !this.state.calendar }); }}
            onPressNonActive={() => { this.setState({ calendar: !this.state.calendar }); }}
          />

        </View>
        {
          this.state.calendar
            ? <ListSystem navigation={this.props.navigation} />
            : <ListAdmin navigation={this.props.navigation} />
        }
        
      </Container>
    );
  }
}
// this.props.navigation.navigate('createnewjob')

/*{
          this.state.calendar
            ? <ListSystem navigation={this.props.navigation} />
            : <ListAdmin navigation={this.props.navigation} />
        }*/