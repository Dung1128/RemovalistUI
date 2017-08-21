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

    // if(this.selectedRoute == route)
    //     return 

    this.selectedRoute = route    
    this.componentDidUpdate()
    // if(!this.children[route]){
    //   switch(route){
    //     case 'calendar':
    //       this.children[route] = this.renderChart() 
    //       break;
    //     default:
    //       this.children[route] = <List navigation={this.props.navigation} dataSource={this.dataSource} />
    //       break;
    //   }           
    //   this.forceUpdate()      
    // } else {
    //   this.componentDidUpdate()
    // }
    
    // set Transition
    // update

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
              borderColor: 'white',
              borderRadius: 5,
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