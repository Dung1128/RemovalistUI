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
import { Container, Header, Left, Body, Right, Button, Title, Content, Footer, FooterTab, List, ListItem } from 'native-base';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import InputRow from '~/ui/elements/InputRow';
import DeliverInfo from '~/ui/elements/DeliverInfo';
import CheckDate from '~/ui/elements/CheckDate';
import Icon from '~/ui/components/Icon';

const dataPick = [];
const dataDrop = [];
dataPick.push({
    hintTime: '9:00',
      hintAddress:'CT5',
      hintPick:'Address 1',
      hintNote:'Note',
      iconTime:'time',
      iconAddress:'building',
      iconPick:'map',
      iconNote:'note',
})

dataDrop.push({
    hintTime: '9:00',
      hintAddress:'CT5',
      hintPick:'Address 1',
      hintNote:'Note',
      iconTime:'time',
      iconAddress:'building',
      iconPick:'map',
      iconNote:'note',
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

  constructor(props){
    super(props);
    this.state = ({
      listPickUp: dataPick,
      listDropOff: dataDrop
    });

  }

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
    let newListPick = this.state.listPickUp

      newListPick.push({
      hintTime: '9:00',
      hintAddress:'CT5',
      hintPick:'Address 1',
      hintNote:'Note',
      iconTime:'time',
      iconAddress:'building',
      iconPick:'map',
      iconNote:'note',
    })

    this.setState({
      listPickUp: newListPick
    })
  }

  addDropOff() {
    let newListDrop = this.state.listDropOff

    newListDrop.push({
      hintTime: '9:00',
      hintAddress:'CT5',
      hintPick:'Address 1',
      hintNote:'Note',
      iconTime:'time',
      iconAddress:'building',
      iconPick:'map',
      iconNote:'note',
    })

     this.setState({
      listDropOff: newListDrop
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
                    <Icon name='back' size={20} style={{ color: '#fff'}} />
                </Button>
                <Text style={styles.textHeader}>Delivery Information</Text>
            </Left>  
          </Header>
          <Content style={styles.content}>

              <View style={styles.titGeneral}>
                  <Text style={styles.titBold}>Pick Up</Text>
                  <Button transparent style={styles.buttonAdd} onPress={() => this.addPickUp()}>
                    <Icon size={22} style={styles.iconAdd}
                      name='add'/>  
                  </Button> 
                   
              </View>
              {
                this.state.listPickUp.map((item, index) => this.renderRow(item, index))
              }

              <View style={styles.titGeneral}>
                  <Text style={styles.titBold}>Drop Off</Text>
                  <Button transparent style={styles.buttonAdd} onPress={() => this.addDropOff()}>
                    <Icon size={20} style={styles.iconAdd}
                      name='add'/>  
                  </Button> 
              </View>
              {
                this.state.listDropOff.map((item, index) => this.renderRow(item, index))
              }
          </Content>
          <Footer style={styles.footer}>
            <FooterTab style={{ alignItems: 'center'}}>
                <Button full onPress={()=> this.props.navigation.navigate('tally_screen')}>
                <Text style={styles.txtFooter}>TALLY SERVICE INFO</Text>
                </Button>
                <Icon name='arrow-right' size={20} style={styles.iconFooter}/>
            </FooterTab>
        </Footer>
      </Container>
    );
  }
}
