import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    TouchableOpacity,
    Linking,
    Modal,
    Alert,
    ListView,
    ScrollView
} from 'react-native';
import styles from './styles';
import material from '~/theme/variables/material';
import { Container, Left, Body, Right, Title, Content, Footer, FooterTab, List, ListItem, Text } from 'native-base';
import InputRow from '~/ui/elements/InputRow';
import CustomerInfo from '~/ui/elements/CustomerInfo';
import CheckDate from '~/ui/elements/CheckDate';
import Icon from '~/ui/components/Icon';
import Button from '~/ui/components/Button';
import TitleItem from '~/ui/components/TitleItem';
import { connect } from 'react-redux'
import * as jobSelectors from '~/store/selectors/job';


@connect(
    state => ({
        listTruck: jobSelectors.getTruckList(state)
    }), )
export default class extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            modalVisible: false,
        });

    }

    setModalVisible() {
        if (this.state.modalVisible) {
            this.setState({ modalVisible: false });
        } else {
            this.setState({ modalVisible: true });
        }
    }
    render() {
        const { listTruck, onChange, value, error } = this.props;
        return (
            <View style={{
                borderBottomColor: error ? material.redColor : '#fff',
                borderBottomWidth: 1
            }}>
                <TitleItem title='Truck' />
                <TouchableOpacity onPress={() => this.setModalVisible()}>
                    <View
                        style={{ ...styles.Items, padding: 10 }}>
                        <Icon name='truck' size={25} />
                        <Text style={styles.txtForm}>{value.TruckName}</Text>
                        <Icon name='arrown-drop' size={15} style={styles.down} />
                    </View>
                </TouchableOpacity>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setModalVisible()}>
                    <TouchableOpacity activeOpacity={1}
                        onPress={() => {
                            this.setModalVisible()
                        }}
                        style={{ backgroundColor: 'rgba(0,0,0,.8)', flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <TouchableOpacity activeOpacity={1} style={{
                            width: 300,
                            maxHeight: 300,
                            backgroundColor: 'white',
                        }}>

                            <List dataArray={listTruck}
                                renderRow={(item) =>
                                    <ListItem>
                                        <TouchableOpacity onPress={() => { onChange(item); this.setModalVisible() }}>
                                            <Text>{item.TruckName}</Text>
                                        </TouchableOpacity>
                                    </ListItem>
                                }>
                            </List>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }
}
