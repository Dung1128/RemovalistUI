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
import InputRow from '~/ui/elements/InputRow';
import CustomerInfo from '~/ui/elements/CustomerInfo';
import CheckDate from '~/ui/elements/CheckDate';
import Icon from '~/ui/components/Icon';

const datas = [
    'Simon Mignolet',
    'Nathaniel Clyne',
    'Dejan Lovren',
    'Mama Sakho',
    'Alberto Moreno',
    'Emre Can',
    'Joe Allen',
    'Phil Coutinho',
];

const dataCustomer = [];
dataCustomer.push({
    hintuser: 'Username',
    iconUser: 'user',
    hintphone: 'Phone 1',
    iconPhone: 'call',
    hintemail: 'Email',
    iconEmail: 'email',
    add: 'true',
})

export default class extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = ({
            modalVisible_Truck: false,
            modalVisible_Status: false,
            listViewData: datas,
            truck: 'Truck 1',
            status: 'Enquery',
            listCustomer: dataCustomer
        });

    }

    setModalVisible_truck() {
        if (this.state.modalVisible_Truck) {
            this.setState({ modalVisible_Truck: false });
        } else {
            this.setState({ modalVisible_Truck: true });
        }
    }
    setModalVisible_status() {
        if (this.state.modalVisible_Status) {
            this.setState({ modalVisible_Status: false });
        } else {
            this.setState({ modalVisible_Status: true });
        }
    }

    addCustomer() {
        let newList = this.state.listCustomer
        newList.push({
            hintuser: 'Username',
            iconUser: 'user',
            hintphone: 'Phone 1',
            iconPhone: 'call',
            hintemail: 'Email',
            iconEmail: 'email',
            add: 'true',
        })

        this.setState({
            listCustomer: newList
        })
    }

    renderRow(data, index) {
        return (
            <View key={index} style={{ marginBottom: 10 }}>
                <CustomerInfo
                    hintuser={data.hintuser}
                    iconUser={data.iconUser}
                    hintphone={data.hintphone}
                    iconPhone={data.iconPhone}
                    hintemail={data.hintemail}
                    iconEmail={data.iconEmail}
                    add={data.add}
                />
            </View>
        )
    }

    render() {
        var items = ['Simon Mignolet', 'Nathaniel Clyne', 'Dejan Lovren', 'Mama Sakho', 'Emre Can', 'Simon Mignolet', 'Nathaniel Clyne', 'Dejan Lovren', 'Mama Sakho', 'Emre Can'];
        var itemsStatus = ['Enquery', 'To be comfirmed', 'Booked',];
        return (
            <Container>
                <Header
                    noShadow={true}
                    style={styles.container}>
                    <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button onPress={() => this.props.navigation.goBack()} transparent>
                            <Icon name='close' size={20} style={{ color: '#fff' }} />
                        </Button>
                        <Text style={styles.textHeader}>General Information</Text>
                    </Left>
                </Header>
                <Content style={styles.content}>
                    <View style={styles.titGeneral}>
                        <Text style={styles.titBold}>Status</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.setModalVisible_status()}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.statusColor} />
                            <View style={{ ...styles.Items }}>
                                <Text style={styles.txtForm}>{this.state.status}</Text>
                                <Icon name='arrown-drop' size={15} style={styles.down} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.titGeneral}>
                        <Text style={styles.titBold}>Customer Info</Text>
                        <TouchableOpacity style={styles.buttonAdd}
                            onPress={() => this.addCustomer()}>
                            <Icon size={18} style={styles.iconAdd}
                                name='add' />
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.listCustomer.map((item, index) => this.renderRow(item, index))
                    }

                    <View style={styles.titGeneral}>
                        <Text style={styles.titBold}>Start time</Text>
                    </View>
                    <CheckDate />

                    <View style={styles.titGeneral}>
                        <Text style={styles.titBold}>Truck</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.setModalVisible_truck()}>
                        <View
                            style={{ ...styles.Items, padding: 10 }}>
                            <Icon name='truck' size={25} style={styles.iconsTruck} />
                            <Text style={styles.txtForm}>{this.state.truck}</Text>
                            <Icon name='arrown-drop' size={15} style={styles.down} />
                        </View>
                    </TouchableOpacity>

                </Content>
                <Footer style={styles.footer}>
                    <FooterTab style={{ alignItems: 'center' }}>
                        <Button full onPress={() => this.props.navigation.navigate('delivery_screen')}>
                            <Text style={styles.txtFooter}>DELIVERY INFO</Text>
                        </Button>
                        <Icon name='arrow-right' size={20} style={styles.iconFooter} />
                    </FooterTab>
                </Footer>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible_Truck}
                    onRequestClose={() => this.setModalVisible_truck()}>
                    <TouchableOpacity activeOpacity={1}
                        onPress={() => {
                            this.setModalVisible_truck()
                        }}
                        style={{ backgroundColor: 'rgba(0,0,0,.8)', flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <TouchableOpacity activeOpacity={1} style={{
                            width: 300,
                            height: 300,
                            backgroundColor: 'white',
                        }}>

                            <List dataArray={items}
                                renderRow={(item) =>
                                    <ListItem>
                                        <TouchableOpacity onPress={() => { this.setState({ truck: item }); this.setModalVisible_truck() }}>
                                            <Text>{item}</Text>
                                        </TouchableOpacity>
                                    </ListItem>
                                }>
                            </List>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible_Status}
                    onRequestClose={() => this.setModalVisible_status()}>
                    <TouchableOpacity activeOpacity={1}
                        onPress={() => {
                            this.setModalVisible_status()
                        }}
                        style={{ backgroundColor: 'rgba(0,0,0,.8)', flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <TouchableOpacity activeOpacity={1} style={{
                            width: 300,
                            backgroundColor: 'white',
                        }}>

                            <List dataArray={itemsStatus}
                                renderRow={(item) =>
                                    <ListItem>
                                        <TouchableOpacity onPress={() => { this.setState({ status: item }); this.setModalVisible_status() }}>
                                            <Text>{item}</Text>
                                        </TouchableOpacity>
                                    </ListItem>
                                }>
                            </List>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Modal>

            </Container>
        );
    }
}
