import React, { Component } from 'react';
import {
  View,
  Alert,
  ListView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import material from '~/theme/variables/material'
import {
  Container,
  Button,
  Text,
  Content,
  List
} from 'native-base';
import styles from './styles';
const dataNoti = [
    {
        content: 'notification',
        status: 'Notification',
        time: '3 mins ago'
    },
    {
        content: 'notification',
        status: 'Notification',
        time: '3 mins ago'
    },
    {
        content: 'notification',
        status: 'Notification',
        time: '3 mins ago'
    },
    {
        content: 'notification',
        status: 'Notification',
        time: '3 mins ago'
    },
    {
        content: 'notification',
        status: 'Notification',
        time: '3 mins ago'
    }
]

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: dataNoti,
      isRefreshing: false
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
            style={{ flex: 1 }}
            dataArray={dataNoti}
            renderRow={this.renderRow.bind(this)}
        />
        </Content>
      </Container>
    );
  }
}
// this.props.navigation.navigate('createnewjob')