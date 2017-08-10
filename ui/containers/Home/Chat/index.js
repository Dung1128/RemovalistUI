import React, { Component } from 'react';
import {
  View,
  Alert,
  ListView,
    RefreshControl,
    TextInput,
    TouchableOpacity
} from 'react-native';

import material from '~/theme/variables/material'
import {
  Container,
  Button,
  Text,
  List,
  Item,
  Input,
  Content
} from 'native-base';
import styles from './styles';

import Icon from '~/ui/components/Icon';
import Header from '~/ui/components/Header';

const dataNoti = [
    {
        content: 'Dịch Vọng, Cầu Giấy, Hà Nội',
        status: 'content',
        time: '3 mins ago'
    },
    {
        content: 'Dịch Vọng, Cầu Giấy, Hà Nội',
        status: 'content',
        time: '3 mins ago'
    },
    {
        content: 'Dịch Vọng, Cầu Giấy, Hà Nội',
        status: 'content',
        time: '3 mins ago'
    },
    {
        content: 'Dịch Vọng, Cầu Giấy, Hà Nội',
        status: 'content',
        time: '3 mins ago'
    },
    {
        content: 'Dịch Vọng, Cầu Giấy, Hà Nội',
        status: 'content',
        time: '3 mins ago'
    },
    {
        content: 'Dịch Vọng, Cầu Giấy, Hà Nội',
        status: 'content',
        time: '3 mins ago'
    },
    {
        content: 'Dịch Vọng, Cầu Giấy, Hà Nội',
        status: 'content',
        time: '3 mins ago'
    },
    {
        content: 'Dịch Vọng, Cầu Giấy, Hà Nội',
        status: 'content',
        time: '3 mins ago'
    },
    {
        content: 'Dịch Vọng, Cầu Giấy, Hà Nội',
        status: 'content',
        time: '3 mins ago'
    }
]

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dataSource: dataNoti,
    };
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
          title='Chat'
          iconLeft='back'
          onPress={() => this.props.navigation.goBack()}
        />
        <View style={{ backgroundColor: material.redColor }}>
          <View style={{ backgroundColor: '#fff', marginHorizontal: 10, marginVertical: 5, borderRadius: 5}}>
              <Item style={{ paddingHorizontal: 10, justifyContent: 'center'}}>
                <Icon name="search" size={18} style={{paddingLeft: 10}}/>
                <TextInput 
                underlineColorAndroid="transparent"
                placeholder="Search" 
                style={{ height: 30, width: '100%'}}/>
            </Item>
          </View>
        </View>

        <Content style={styles.containers}>
            <List
            refreshControl={
                <RefreshControl
                    colors={['#039BE5']}
                    tintColor='#fff'
                    refreshing={this.state.isRefreshing}
                />
            }
            enableEmptySections
            removeClippedSubviews={false}
            dataArray={dataNoti}
            renderRow={this.renderRow.bind(this)}
        />
        </Content>

        
      </Container>
    );
  }
}
