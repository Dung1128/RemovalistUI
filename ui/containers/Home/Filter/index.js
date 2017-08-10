import React, { Component } from 'react';
import {
  View,
  Alert,
  ListView,
    RefreshControl,
    TextInput,
    TouchableOpacity,
    Icon as IconNB
} from 'react-native';

import material from '~/theme/variables/material'
import {
  Container,
  Button,
  Text,
  List,
  Item,
  Input,
  Content,
  ListItem,
  Right, Radio
} from 'native-base';
import styles from './styles';

import Icon from '~/ui/components/Icon';
import Header from '~/ui/components/Header';

const filterday = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Today' },
    { id: 3, name: '3 days' },
    { id: 4, name: 'this week' },
    { id: 5, name: 'this month' },

]

const filtertruck = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Truck 1' },
    { id: 3, name: 'Truck 2' },
    { id: 4, name: 'Truck 3' },

]

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
        check: false,
        selectedOption: props.selectedOption||{id: -1, name: ""},
        filterday: filterday,
        filtertruck: filtertruck
    }
  }

  _handlePress(item) {
    const selectedOption = item.id == this.state.selectedOption.id ? {id: 0, name: ""} : item    
    this.setState({ selectedOption}, ()=>{
      this.props.onSelect && this.props.onSelect(item);
    });
  }

   renderRow(data) {
        return (
            <TouchableOpacity style={styles.itemList}>
                <Text>{data.content}</Text>
                <View style={styles.bottom}>
                    <Text style={styles.textbottom}>{data.status}</Text>
                    <Text style={styles.textbottom}>{data.time}</Text>
                </View>
            </TouchableOpacity>
        ); 
    }

  render() {
    return (
      <Container>
        <Header
          title='Filter'
          iconLeft='close'
          textright='RESET'
          onPress={() => this.props.navigation.goBack()}
        />
        <View style={{ backgroundColor: material.redColor }}>
        </View>

        <Content>
            <View style={styles.titGeneral}>
                  <Text>By the number of days</Text>
            </View>
                {this.state.filterday.map((item, index) =>
                    <ListItem key={index} onPress={e => console.log()} style={styles.dropdownListItem}>
                              <Text style={styles.dropdownListItemText}>{item.name}</Text>
                              <Right>
                                    <Radio selected={false} style={styles.radioButton}/>
                              </Right>
                              {
                                  item.name === this.state.selectedOption.name 
                                  && 
                                  <IconNB 
                                    name='ios-checkmark'
                                    style={{ color: '#6CC5F9', fontSize: 45, height:30, marginTop: -10 }} 
                                    />
                              }
                          </ListItem>
                )}
            <View style={styles.titGeneral}>
                  <Text>By truck team</Text>
            </View>
            {this.state.filtertruck.map((item, index) =>
                    <ListItem key={index} onPress={e => console.log()} style={styles.dropdownListItem}>
                              <Text style={styles.dropdownListItemText}>{item.name}</Text>
                              <Right>
                                    <Radio selected={true} style={styles.radioButton}/>
                              </Right>
                              {
                                  item.name === this.state.selectedOption.name 
                                  && 
                                  <IconNB 
                                    name='ios-checkmark'
                                    style={{ color: '#6CC5F9', fontSize: 45, height:30, marginTop: -10 }} 
                                    />
                              }
                          </ListItem>
                )}
        </Content>

        
      </Container>
    );
  }
}
