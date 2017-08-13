import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  Linking,
  Modal,
  Alert,
  ListView
} from 'react-native';
import styles from './styles';
import material from '~/theme/variables/material';
import { Container, Left, Body, Right, Title, Content, Footer, FooterTab, List, ListItem, Text } from 'native-base';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import InputRow from '~/ui/elements/InputRow';
import DeliverInfo from '~/ui/elements/DeliverInfo';
import CheckDate from '~/ui/elements/CheckDate';
import Icon from '~/ui/components/Icon';
import Button from '~/ui/components/Button';
import Header from '~/ui/components/Header';

const dataPick = [];
const dataDrop = [];
dataPick.push({
  hintTime: '9:00',
  hintAddress: 'CT5',
  hintPick: 'Address 1',
  hintNote: 'Note',
  iconTime: 'time',
  iconAddress: 'building',
  iconPick: 'map',
  iconNote: 'note',
})

dataDrop.push({
  hintTime: '9:00',
  hintAddress: 'CT5',
  hintPick: 'Address 1',
  hintNote: 'Note',
  iconTime: 'time',
  iconAddress: 'building',
  iconPick: 'map',
  iconNote: 'note',
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

  constructor(props) {
    super(props);
    this.state = ({
      listPickUp: dataPick,
      listDropOff: dataDrop
    });

  }

  renderRow(data, index) {
    return (
      <View key={index} style={{ marginBottom: 10 }}>
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
      hintAddress: 'CT5',
      hintPick: 'Address 1',
      hintNote: 'Note',
      iconTime: 'time',
      iconAddress: 'building',
      iconPick: 'map',
      iconNote: 'note',
    })

    this.setState({
      listPickUp: newListPick
    })
  }

  addDropOff() {
    let newListDrop = this.state.listDropOff

    newListDrop.push({
      hintTime: '9:00',
      hintAddress: 'CT5',
      hintPick: 'Address 1',
      hintNote: 'Note',
      iconTime: 'time',
      iconAddress: 'building',
      iconPick: 'map',
      iconNote: 'note',
    })

    this.setState({
      listDropOff: newListDrop
    })
  }

  render() {
    return (
      <Container>
        <Header title='Delivery Information' iconLeft='back' onPress={() => this.props.navigation.goBack()} />
        <Content style={styles.content}>

          <View style={styles.titGeneral}>
            <Text bold>Pick Up</Text>
            <TouchableOpacity style={styles.buttonAdd}
              onPress={() => this.addPickUp()}>
              <Icon size={18} style={styles.iconAdd}
                name='add' />
            </TouchableOpacity>

          </View>
          {
            this.state.listPickUp.map((item, index) => this.renderRow(item, index))
          }

          <View style={styles.titGeneral}>
            <Text bold>Drop Off</Text>
            <TouchableOpacity style={styles.buttonAdd}
              onPress={() => this.addDropOff()}>
              <Icon size={18} style={styles.iconAdd}
                name='add' />
            </TouchableOpacity>
          </View>
          {
            this.state.listDropOff.map((item, index) => this.renderRow(item, index))
          }
        </Content>
        <Button onPress={() => this.props.navigation.navigate('tallyservice_screen')} full iconRight='arrow-right' text='TALLY SERVICE INFO' />
      </Container>
    );
  }
}
