import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  WebView,
  TouchableOpacity,
  Alert,
  ListView
} from 'react-native';
import TabBar from '~/ui/components/TabBar';
import Icon from '~/ui/components/Icon';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import List from './List'
import {
  Container,
  Header, Title,
  Content, Footer, FooterTab,
  Button, Left, Right, Body, Text, ListItem, Fab
} from 'native-base';

const datas = [
  'Simon Mignolet',
  'Nathaniel Clyne',
  'Dejan Lovren',
  'Mama Sakho',
  'Alberto Moreno',
  'Emre Can',
  'Joe Allen',
  'Phil Coutinho',
];

export default class AnatomyExample extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      calenderr: true,
      listt: false,
      basic: true,
      listViewData: datas,
    };
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }


  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Container>
        <Header
          noShadow={true}
          style={{ backgroundColor: '#ed502b', borderBottomColor: '#ed502b' }}>
          <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Button onPress={() => this.props.navigation.navigate('DrawerOpen')} transparent>
              <Icon name='hamburger' color='#fff' size={24} />
            </Button>
            <Title style={{ fontSize: 18, marginLeft: 10 }}>Job - Today</Title>
          </Left>
          <Right>
            <View  style={{ justifyContent: 'space-between', width: '60%', flexDirection: 'row' }}>
            <Icon name='chat' color='#fff' size={22}/>
            <Icon name='notify' color='#fff' size={22}/>
            <Icon name='filter' color='#fff' size={22}/>
            <Icon name='search' color='#fff' size={22}/>
            </View>
          </Right>

        </Header>
        <View style={{ backgroundColor: '#ed502b' }}>
          <TabBar
            style={{ marginHorizontal: 20, marginBottom: 10 }}
            titleActive="Calender"
            titleNonActive="List"
            onPressActive={() => { this.setState({ info: !this.state.calenderr }); }}
            onPressNonActive={() => { this.setState({ info: !this.state.calenderr }); }}
          />

        </View>
        <List />
        <Fab
          onPress={() => this.props.navigation.navigate('general_screen')}
          style={{ backgroundColor: '#ed502b' }}
          position="bottomRight">
          <IconIonicons name="md-add" style={{ color: "white", fontSize: 30 }} />

        </Fab>
      </Container>
    );
  }
}
// this.props.navigation.navigate('createnewjob')