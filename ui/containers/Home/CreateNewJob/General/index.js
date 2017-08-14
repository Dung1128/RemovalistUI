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
import Header from '~/ui/components/Header';
import {
    Field,
    FieldArray,
    reduxForm,
} from 'redux-form'
import {
    CustomerField
} from './components/Form'


const dataCustomer = [];
dataCustomer.push({
    hintuser: 'Username',
    iconUser: 'user',
    hintphone: 'Phone 1',
    iconPhone: 'call',
    hintemail: 'Email',
    iconEmail: 'email',
    hintAddress: 'Address',
    iconAddress1: 'building',
    iconAddress2: 'map',
    add: 'true',
})

const INIT_FORM = {
    customerInfo: [],
    startTime: '',
};

const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9EZzFPVVF4UmpZelJEZzVSakUzT0RBME5UUkZRa1pHUkRJd016ZERPRFl4TmpRd09UaEdSUSJ9.eyJpc3MiOiJodHRwczovL3R1YW5wbDEuYXUuYXV0aDAuY29tLyIsInN1YiI6ImVvc29UR3FCMHZwNWlsS1dWMGcxclZmaVBFMGRaWnVGQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3R1YW5wbDF0ZXN0IiwiZXhwIjoxNTAyNTA2MTM1LCJpYXQiOjE1MDI0MTk3MzUsInNjb3BlIjoiIn0.ReSNkSK_qln2Ose80tBJL11Y8A_-v4tlgHE3SUgqOUAdwh_9zcnO-YvYCSGlmy7MSUp7EbbmAAec6se5Rq6hl_sdC2oTaHod9qlR_pNy4Ht6AUcYGkBj2LUYNEADlynFEfqRAaPj0QOu23fKsm-keqxG-EGkzkGuLm2_6tXk5ILUzKLLsTXeN44z_pimmrbsmi3mlkAusDHBy7PcUeAHo6dhPHpkqM7u1bIbkh0JgMqkdUeNV0D6OdM_XMhCApWhJBBa8aqVUHPlDDSich9vMq7WUFHydpC30JwtT7ajVq0490Y8TvJjWksW-9CuL32n84frMr5M-lOggA9kNNEhLw'
@reduxForm({ form: 'CustomerInfo', enableReinitialize: true, destroyOnUnmount: !module.hot })
export default class extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = ({
            modalVisible_Truck: false,
            modalVisible_Status: false,
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


    submitForm(values) {
        console.log(values)
    }

    render() {
        var items = ['Simon Mignolet', 'Nathaniel Clyne', 'Dejan Lovren', 'Mama Sakho', 'Emre Can', 'Simon Mignolet', 'Nathaniel Clyne', 'Dejan Lovren', 'Mama Sakho', 'Emre Can'];
        var itemsStatus = ['Enquery', 'To be comfirmed', 'Booked',];
        const { handleSubmit, submitting } = this.props
        return (
            <Container>
                <Header title='General Information' iconLeft='close' onPress={() => this.props.navigation.goBack()} />
                <ScrollView style={styles.content}>
                    <View style={styles.titGeneral}>
                        <Text bold>Status</Text>
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
                    <FieldArray name="customer" component={CustomerField} />

                    <View style={styles.titGeneral}>
                        <Text bold>Start time</Text>
                    </View>
                    <CheckDate />

                    <View style={styles.titGeneral}>
                        <Text bold>Truck</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.setModalVisible_truck()}>
                        <View
                            style={{ ...styles.Items, padding: 10 }}>
                            <Icon name='truck' size={25} style={styles.iconsTruck} />
                            <Text style={styles.txtForm}>{this.state.truck}</Text>
                            <Icon name='arrown-drop' size={15} style={styles.down} />
                        </View>
                    </TouchableOpacity>

                </ScrollView>
                <Button
                    onPress={() => this.props.navigation.navigate('delivery_screen')}
                    //onPress={handleSubmit(this.submitForm.bind(this))}
                    full iconRight='arrow-right' text='DELIVERY INFO' />

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
