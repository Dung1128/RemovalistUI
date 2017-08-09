import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import material from '~/theme/variables/material';
import { Container, Header, Left, Body, Right, Button, Title, Content, Footer, FooterTab, List, ListItem } from 'native-base';
import InputService from '~/ui/elements/InputService';
import Icon from '~/ui/components/Icon';

export default class extends Component {
    

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
                <Text style={styles.textHeader}>Tally service infomation</Text>
            </Left>  
          </Header>
          <Content style={styles.content}>

              <View style={styles.titGeneral}>
                  <Text style={styles.titTitBold}>Service Time</Text>
                  <Text style={styles.titPrice}>$120</Text>   
              </View>

              <InputService nameIcon='time' measure='hr'/>

              <View style={styles.titGeneral}>
                  <Text style={styles.titTitBold}>Travel Time</Text>
                  <Text style={styles.titPrice}>$120</Text>  
              </View>

              <InputService nameIcon='time' measure='hr'/>

              <View style={styles.titGeneral}>
                  <Text style={styles.titTitBold}>Fuel/RUCS</Text>
                  <Text style={styles.titPrice}>$120</Text>  
              </View>

              <InputService nameIcon='gas' measure='km'/>

              <View style={styles.titGeneral}>
                  <Text style={styles.titTitBold}>Material</Text>
                  <Text style={styles.titPrice}>$120</Text>
              </View>
              <InputService nameIcon='material'/>
              <InputService nameIcon='material'/>

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
                <Button full onPress={()=> this.props.navigation.navigate('jobtoday')}>
                    <Text style={styles.txtFooter}>SAVE</Text>
                </Button>
            </FooterTab>
        </Footer>
      </Container>
    );
  }
}
