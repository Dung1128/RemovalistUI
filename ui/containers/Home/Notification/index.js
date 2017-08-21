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
    this.refChildren = {}
    this.selectedRoute = props.navigation.state.params ? props.navigation.state.params.defaultRoute : 'system'
    this.selectedRefPage = null
    this.children = {
      'system': <ListSystem items={{}} />,
      'admin': <ListAdmin navigation={this.props.navigation} dataSource={this.dataSource} />
    }
    this.tabbarData = [
      { key: 'system', title: 'System' },
      { key: 'admin', title: 'Admin' },
    ]
  }

  componentDidMount() {
    this.navigateTab(this.selectedRoute)
  }

  navigateTab(route) {
    this.selectedRoute = route
    this.componentDidUpdate()
  }


  componentDidUpdate() {

    // animate here
    this.selectedRefPage && this.selectedRefPage.setNativeProps({
      style: {
        opacity: 0,
        zIndex: 0,
      }
    })

    // this.refChildren[key]
    this.selectedRefPage = this.refChildren[this.selectedRoute]
    // console.log(this.selectedRoute)
    this.selectedRefPage && this.selectedRefPage.setNativeProps({
      style: {
        opacity: 1,
        zIndex: 1,
      }
    })

    this.needUpdate = false
  }



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
            selected={this.selectedRoute}
            dataArray={this.tabbarData}
            onPress={(item) => { this.navigateTab(item.key) }}
          />
        </View>
        <View style={{ flex: 1 }}>
          {
            Object.keys(this.children).map(key => (
              <View style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, opacity: 0, zIndex: 0 }} key={key} ref={ref => this.refChildren[key] = ref}>
                {this.children[key]}
              </View>
            ))
          }
        </View>
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