import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import styles from './styles';
import material from '~/theme/variables/material';
import { Container, Left, Body, Right, Title, Content, Footer, FooterTab, List, ListItem, Text } from 'native-base';
import InputService from '~/ui/elements/InputService';
import Icon from '~/ui/components/Icon';
import Button from '~/ui/components/Button';
import Header from '~/ui/components/Header';

export default class extends Component {


    render() {
        return (
            <Container>
                <Header title='Tally service infomation' iconLeft='close' onPress={() => this.props.navigation.goBack()} />
                <Content style={styles.content}>

                    <View style={styles.titGeneral}>
                        <Text bold>Service Time</Text>
                        <Text style={styles.titPrice}>$120</Text>
                    </View>

                    <InputService nameIcon='time' measure='hr' />

                    <View style={styles.titGeneral}>
                        <Text bold>Travel Time</Text>
                        <Text style={styles.titPrice}>$120</Text>
                    </View>

                    <InputService nameIcon='time' measure='hr' />

                    <View style={styles.titGeneral}>
                        <Text bold>Fuel/RUCS</Text>
                        <Text style={styles.titPrice}>$120</Text>
                    </View>

                    <InputService nameIcon='gas' measure='km' />

                    <View style={styles.titGeneral}>
                        <Text bold>Material</Text>
                        <Text style={styles.titPrice}>$120</Text>
                        <TouchableOpacity style={styles.buttonAdd}
                            onPress={() => console.log('ok')}>
                            <Icon size={18} style={styles.iconAdd}
                                name='add' />
                        </TouchableOpacity>
                    </View>
                    <InputService nameIcon='material' />
                    <InputService nameIcon='material' />

                    <View style={styles.titGeneral}>
                        <Text bold>GST</Text>
                        <Text style={styles.titPrice}>$120</Text>
                    </View>

                    <View style={styles.totalPrice}>
                        <Text style={styles.txtTotal}>Total</Text>
                        <Text style={styles.txtPriceTotal}>$610</Text>
                    </View>

                </Content>
                <Button onPress={() => this.props.navigation.navigate('jobtoday')} full text='SAVE' />
            </Container>
        );
    }
}
