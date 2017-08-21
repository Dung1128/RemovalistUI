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
import { accessToken } from '~/store/constants/api'

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
    this.selectedRoute = props.navigation.state.params ? props.navigation.state.params.defaultRoute : 'calendar'
    this.refChildren={}
    this.selectedRefPage = null    
    this.children = {
      'calendar': <Calendar items={{}}  />,
      'list': <List navigation={this.props.navigation} dataSource={this.dataSource} />      
    }    

    this.tabbarData = [
      { key: 'calendar', title: 'Calendar'}, 
      { key: 'list', title: 'List'},      
    ]
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

    this.navigateTab(this.selectedRoute)
  }  


  navigateTab(route){
    this.selectedRoute = route    
    this.componentDidUpdate()
  }

  componentDidUpdate(){

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
            style={{ 
              marginHorizontal: 20, 
              marginBottom: 10, 
              flexDirection:'row', 
              justifyContent:'space-between',
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 6
            }}
            selected={this.selectedRoute}
            dataArray={this.tabbarData}
            onPress={(item) => { this.navigateTab(item.key) }}            
          />

        </View>
        <View style={{flex:1,zIndex:0}}>
        {
          Object.keys(this.children).map(key=>(
            <View style={{position: 'absolute', top: 0, right:0, left:0,bottom:0, opacity: 0, zIndex:0}} key={key} ref={ref=>this.refChildren[key]=ref}>
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