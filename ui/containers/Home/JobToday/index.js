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
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
// import { Agenda } from 'react-native-calendars';

import { Container, 
  Header, Title, 
  Content, Footer, FooterTab,
   Button, Left, Right, Body, Icon, Text, List, ListItem, Fab } from 'native-base';

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
          <Left>
            <Button onPress={() => this.props.navigation.navigate('DrawerOpen')} transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title style={{ fontSize: 18 }}>Job - Today</Title>
          </Body>
          <Right />
          <Right>
            <IconFontAwesome name="bell" style={{ color: "white", fontSize: 22, paddingLeft: 20 }}></IconFontAwesome>
            <IconFontAwesome name="filter" style={{ color: "white", fontSize: 22, paddingLeft: 20 }}></IconFontAwesome>
            <IconFontAwesome name="search" style={{ color: "white", fontSize: 22, paddingLeft: 20 }}></IconFontAwesome>
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
        <View style={{ paddingTop: 20 }}>
          <List
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem style={{ backgroundColor: '#fff', width: '100%' }}>
                <Text> {data} </Text>
              </ListItem>}
            renderLeftHiddenRow={data => console.log('data')}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button style={{ alignItems: 'center', width: '100%' }} danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                <View style={{ position: 'absolute', right: 10 }}>
                  <Icon active name="remove-circle" style={{ color: '#fff' }} />
                </View>
              </Button>}
            rightOpenValue={-75}
          />
        </View>
        <Fab
            onPress={()=> this.props.navigation.navigate('general_screen')}
            style={{ backgroundColor: '#ed502b' }}
            position="bottomRight">
            <IconIonicons name="md-add" style={{ color: "white", fontSize: 30}}/>

          </Fab>
      </Container>
    );
  }
}
// this.props.navigation.navigate('createnewjob')