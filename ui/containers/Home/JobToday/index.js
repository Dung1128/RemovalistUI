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

export default class AnatomyExample extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      calendar: true,
      basic: true,
    };
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
            : <List navigation={this.props.navigation} />
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
// this.props.navigation.navigate('createnewjob')