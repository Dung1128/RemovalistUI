import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Modal,
  Alert,
  ListView
} from 'react-native';
import styles from './styles';
import material from '~/theme/variables/material';
import { Container, Header, Icon, Left, Body, Right, Button, Title, Content, Footer, FooterTab, List, ListItem } from 'native-base';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import InputRow from '~/ui/elements/InputRow';
import CustomerInfo from '~/ui/elements/CustomerInfo';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckDate from '~/ui/elements/CheckDate';
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

export default class extends Component {
    
    constructor(props){
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = ({
      modalVisible_Truck: false,
      modalVisible_Status: false,
      listViewData: datas,
      truck: 'Truck 1',
      status: 'Enquery'
    });

  }

setModalVisible_truck() {
    if(this.state.modalVisible_Truck){
        this.setState({modalVisible_Truck: false});
    }else{
        this.setState({modalVisible_Truck: true});
    }
  }
  setModalVisible_status() {
    if(this.state.modalVisible_Status){
        this.setState({modalVisible_Status: false});
    }else{
        this.setState({modalVisible_Status: true});
    }
  }

  render() {
      var items = ['Simon Mignolet','Nathaniel Clyne','Dejan Lovren','Mama Sakho','Emre Can','Simon Mignolet','Nathaniel Clyne','Dejan Lovren','Mama Sakho','Emre Can'];
      var itemsStatus = ['Enquery','To be comfirmed','Booked',];
    return (
      <Container>
          <Header
          noShadow={true}
          style={styles.container}>
            <Left>
                <Button onPress={() => this.props.navigation.goBack()} transparent>
                <IconEvilIcons name='close' style={{ color: '#fff', fontSize: 30}} />
                </Button>
            </Left>  
            <Left>
                <Text style={styles.textHeader}>General Information</Text>
            </Left>
          </Header>
          <Content style={styles.content}>
              <View style={styles.titGeneral}>
                  <Text>Status</Text>
              </View>
              <TouchableOpacity onPress={()=> this.setModalVisible_status()}>
                <View style={{ flexDirection: 'row'}}>
                    <View style={styles.statusColor}/>
                    <View style={{...styles.Items, padding: 10}}>
                            <Text style={styles.txtForm}>{this.state.status}</Text>
                            <IconMaterialIcons name='arrow-drop-down' style={styles.down}/>   
                    </View>
                </View>
            </TouchableOpacity>

              <View style={styles.titGeneral}>
                  <Text>Customer Info</Text>
                  <IconMaterialIcons name='add-box' style={styles.iconsAdd} />   
              </View>
              <CustomerInfo 
                hintuser='Username'
                iconUser='user'
                hintphone='Phone 1'
                iconPhone='phone'
                hintemail='Email'
                iconEmail='phone'
              />

              <View style={styles.titGeneral}>
                  <Text>Start time</Text>
              </View>
              <CheckDate />

              <View style={styles.titGeneral}>
                  <Text>Truck</Text>
              </View>
              <TouchableOpacity onPress={()=> this.setModalVisible_truck()}>
              <View 
                style={{...styles.Items, padding: 10}}>
                  <IconMaterialCommunityIcons name='truck' style={styles.iconsTruck} />
                  <Text style={styles.txtForm}>{this.state.truck}</Text>
                  <IconMaterialIcons name='arrow-drop-down' style={styles.down}/>
              </View>
              </TouchableOpacity>

          </Content>
          <Footer style={styles.footer}>
            <FooterTab>
                <Button full>
                <Text style={styles.txtFooter}>DELIVERY INFO</Text>
                </Button>
                <IconMaterialIcons name='navigate-next' style={styles.iconFooter}/>
            </FooterTab>
        </Footer>

        <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible_Truck}
        onRequestClose={()=>this.setModalVisible_truck()}>
        <TouchableOpacity activeOpacity={1}
              onPress={() => {
                    this.setModalVisible_truck()
                  }}
              style={{backgroundColor: 'rgba(0,0,0,.8)',flex:1,justifyContent:'center',alignItems:'center'}} >
          <TouchableOpacity activeOpacity={1} style={{
            width:300,
            height: 300,
            backgroundColor:'white',
          }}>

           <List dataArray={items}
            renderRow={(item) =>
                <ListItem>
                    <TouchableOpacity onPress={() => {this.setState({truck: item}); this.setModalVisible_truck()}}>
                    <Text>{item}</Text>
                        </TouchableOpacity>
                </ListItem> 
            }>
          </List>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible_Status}
        onRequestClose={()=>this.setModalVisible_status()}>
        <TouchableOpacity activeOpacity={1}
              onPress={() => {
                    this.setModalVisible_status()
                  }}
              style={{backgroundColor: 'rgba(0,0,0,.8)',flex:1,justifyContent:'center',alignItems:'center'}} >
          <TouchableOpacity activeOpacity={1} style={{
            width:300,
            backgroundColor:'white',
          }}>

           <List dataArray={itemsStatus}
            renderRow={(item) =>
                <ListItem>
                    <TouchableOpacity onPress={() => {this.setState({status: item}); this.setModalVisible_status()}}>
                    <Text>{item}</Text>
                        </TouchableOpacity>
                </ListItem> 
            }>
          </List>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      </Container>
    );
  }
}
