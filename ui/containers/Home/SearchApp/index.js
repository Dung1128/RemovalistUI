import React, { Component } from 'react';
import { TextInput, TouchableOpacity, Platform } from 'react-native';
import { View, Text, Input, Container, Content } from 'native-base';
import Header from '~/ui/components/Header';

export default class extends Component {

    render() {
         return (
      <Container>
        <Header
          title='Search'
          iconLeft='close'
          textright='RESET'
          onPressRight={() => this.props.resetFilter()}
          onPress={() => this.props.navigation.goBack()}
        />
        <Content>
          <Text>Search</Text>
        </Content>
      </Container>
    );
    }
} 
