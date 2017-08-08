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
import DeliverInfo from '~/ui/elements/DeliverInfo';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import CheckDate from '~/ui/elements/CheckDate';

const dataPick = [];
const dataDrop = [];
dataPick.push({
    hintTime: '9:00',
    hintAddress:'CT5',
    hintPick:'Address 1',
    hintNote:'Note',
    iconTime:'clock-o',
    iconAddress:'building-o',
    iconPick:'map-marker',
    iconNote:'pencil-square-o',
})

dataDrop.push({
    hintTime: '9:00',
    hintAddress:'CT5',
    hintPick:'Address 1',
    hintNote:'Note',
    iconTime:'clock-o',
    iconAddress:'building-o',
    iconPick:'map-marker',
    iconNote:'pencil-square-o',
})
// for(let i = 0; i < 5; i++) {
//   data.push({
//     hintTime: '9:00',
//     hintAddress:'CT5',
//     hintPick:'Address 1',
//     hintNote:'Note',
//     iconTime:'clock-o',
//     iconAddress:'building-o',
//     iconPick:'map-marker',
//     iconNote:'pencil-square-o',
//   })
// }

export default class extends Component {
  renderRow(data, index) {
    return(
      <View key={index} style={{ marginBottom: 10}}>
        <DeliverInfo 
            hintTime={data.hintTime}
            hintAddress={data.hintAddress}
            hintPick={data.hintPick}
            hintNote={data.hintNote}
            iconTime={data.iconTime}
            iconAddress={data.iconAddress}
            iconPick={data.iconPick}
            iconNote={data.iconNote}
          />
      </View>
    )
  }

  addPickUp() {
      dataPick.push({
      hintTime: '9:00',
      hintAddress:'CT5',
      hintPick:'Address 1',
      hintNote:'Note',
      iconTime:'clock-o',
      iconAddress:'building-o',
      iconPick:'map-marker',
      iconNote:'pencil-square-o',
    })
  }

  addDropOff() {
    dataDrop.push({
      hintTime: '9:00',
      hintAddress:'CT5',
      hintPick:'Address 1',
      hintNote:'Note',
      iconTime:'clock-o',
      iconAddress:'building-o',
      iconPick:'map-marker',
      iconNote:'pencil-square-o',
    })
  }

  render() {
    return (
      <Container>
          <Header
          noShadow={true}
          style={styles.container}>
            <Left style={{ flexDirection: 'row', alignItems: 'center'}}>
                <Button onPress={() => this.props.navigation.goBack()} transparent>
                    <IconIonicons name='ios-arrow-back-outline' style={{ color: '#fff', fontSize: 30}} />
                </Button>
                <Text style={styles.textHeader}>Delivery Information</Text>
            </Left>  
          </Header>
          <Content style={styles.content}>

              <View style={styles.titGeneral}>
                  <Text style={styles.titBold}>Pick Up</Text>
                  <Button transparent style={styles.buttonAdd} onPress={() => this.addPickUp()}>
                    <IconMaterialIcons style={styles.iconAdd}
                      name='add-box'/>  
                  </Button>
                   
              </View>
              {
                dataPick.map((item, index) => this.renderRow(item, index))
              }

              <View style={styles.titGeneral}>
                  <Text style={styles.titBold}>Drop Off</Text>
                  <Button transparent style={styles.buttonAdd} onPress={() => this.addDropOffrr()}>
                    <IconMaterialIcons style={styles.iconAdd}
                      name='add-box'/>  
                  </Button>  
              </View>
              {
                dataDrop.map((item, index) => this.renderRow(item, index))
              }
          </Content>
          <Footer style={styles.footer}>
            <FooterTab>
                <Button full onPress={()=> this.props.navigation.navigate('tally_screen')}>
                <Text style={styles.txtFooter}>TALLY SERVICE INFO</Text>
                </Button>
                <IconMaterialIcons name='navigate-next' style={styles.iconFooter}/>
            </FooterTab>
        </Footer>
      </Container>
    );
  }
}
