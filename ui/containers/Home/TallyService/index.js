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
import IconIonicons from 'react-native-vector-icons/Ionicons';
import InputService from '~/ui/elements/InputService';

export default class extends Component {
    

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
                <Text style={styles.textHeader}>Tally service infomation</Text>
            </Left>  
          </Header>
          <Content style={styles.content}>

              <View style={styles.titGeneral}>
                  <Text style={styles.titTitBold}>Service Time</Text>
                  <Text style={styles.titPrice}>$120</Text>   
              </View>

              <InputService />

              <View style={styles.titGeneral}>
                  <Text style={styles.titTitBold}>Travel Time</Text>
                  <Text style={styles.titPrice}>$120</Text>  
              </View>

              <InputService />

              <View style={styles.titGeneral}>
                  <Text style={styles.titTitBold}>Fuel/RUCS</Text>
                  <Text style={styles.titPrice}>$120</Text>  
              </View>

              <InputService />

              <View style={styles.titGeneral}>
                  <Text style={styles.titTitBold}>Material</Text>
                  <Text style={styles.titPrice}>$120</Text>
              </View>
              <InputService />
              <InputService />

              <View style={styles.titGeneral}>
                  <Text style={styles.titTitBold}>GST</Text>
                  <Text style={styles.titPrice}>$120</Text>  
              </View>

              <View style={styles.totalPrice}>
                  <Text style={styles.txtTotal}>Total</Text>
                  <Text style={styles.txtPriceTotal}>$610</Text>  
              </View>

          </Content>
          <Footer style={styles.footer}>
            <FooterTab>
                <Button full>
                    <Text style={styles.txtFooter}>DONE</Text>
                </Button>
            </FooterTab>
        </Footer>
      </Container>
    );
  }
}
