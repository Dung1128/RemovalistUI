import React, { Component } from 'react';
import {
  View,
  Alert,
  ListView,
  TouchableOpacity,
  ScrollView,
  // LayoutAnimation,
} from 'react-native';
import { connect } from 'react-redux'
import IconIonicons from 'react-native-vector-icons/Ionicons';
import List from './List'
import CalendarView from './Calendar'
import material from '~/theme/variables/material'
import {
  Container,
  Button,
  Text,
  ListItem,
  Content,
  Fab
} from 'native-base';
import moment from 'moment'
import Calendar from '~/ui/components/Calendar';
import TabBar from '~/ui/components/TabBar';
import Icon from '~/ui/components/Icon';
import Header from '~/ui/components/Header';
import LoadingModal from '~/ui/components/LoadingModal';
import api from '~/store/api';
import * as jobActions from '~/store/actions/job'
import { areRequestsPending } from '~/store/selectors/common'
import { accessToken } from '~/store/constants/api'

@connect(
  // state => ({
  //   isPending: areRequestsPending(state)
  // }),
  null,
  { ...jobActions }
)
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendar: true,
      basic: true,
      date: new Date(),
      dataSource: {},
    };
    this.dataSource = {};
    this.navigated = false
    this.selectedRoute = props.navigation.state.params ? props.navigation.state.params.defaultRoute : 'calendar'
    this.refChildren = {}
    this.selectedRefPage = null
    this.children = {
      'calendar': <CalendarView navigation={this.props.navigation} items={{}} />,
      'list': <List navigation={this.props.navigation} onItemRef={ref => this.list = ref} />
    }

    this.tabbarData = [
      { key: 'calendar', title: 'Calendar' },
      { key: 'list', title: 'List' },
    ]
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.props.getStatusJobList(accessToken, (error, data) => { })
    this.props.getMaterialList(accessToken, (error, data) => { })
    this.props.getMaterialCategoryList(accessToken, (error, data) => { })
    this.props.getTruckList(accessToken, (error, data) => { })
    this.props.getReferenceContactList(accessToken, (error, data) => { })
    this.props.getJobByDate(this.renderDate(this.state.date) + "/1", accessToken, (error, data) => { console.log(data) })
    this.navigateTab(this.selectedRoute)
  }


  renderDate(day) {
    return moment(day).format("YYYYMMDD")
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

    this.selectedRefPage = this.refChildren[this.selectedRoute]
    this.selectedRefPage && this.selectedRefPage.setNativeProps({
      style: {
        opacity: 1,
        zIndex: 1,
      }
    })
    this.needUpdate = false
  }


  onDateSelect(date) {
    if (this.date && date.toString() === this.date.toString())
      return

    this.list.date = date
    // later
    this.props.getJobByDate(this.renderDate(date) + "/1", accessToken, (error, data) => { })
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
            selected={this.selectedRoute}
            dataArray={this.tabbarData}
            onPress={(item) => { this.navigateTab(item.key) }}
          />

          <Calendar style={{ width: '100%', marginHorizontal: 10 }}
            currentMonth={this.state.date}
            scrollEnabled={true}
            onDateSelect={date => this.onDateSelect(date)} />
        </View>
        <View style={{ flex: 1, zIndex: 0 }}>
          {
            Object.keys(this.children).map(key => (
              <View style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, opacity: 0, zIndex: 0 }} key={key} ref={ref => this.refChildren[key] = ref}>
                {this.children[key]}
              </View>
            ))
          }
        </View>
        <Button
          onPress={() => {
            this.props.navigation.navigate('general_screen')
          }}
          style={{ backgroundColor: material.redColor, position: 'absolute', bottom: 20, right: 20, borderRadius: 50 / 2, width: 50, height: 50 }}>
          <Icon name="add" color='#fff' size={20} />
        </Button>
      </Container>
    );
  }
}