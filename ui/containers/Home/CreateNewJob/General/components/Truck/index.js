import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    Linking,
    Modal,
    Alert,
    ListView,
    ScrollView
} from 'react-native';
import styles from './styles';
import material from '~/theme/variables/material';
import { Container, Left, Body, Right, Title, Input, Content, Footer, FooterTab, List, ListItem, Text, View } from 'native-base';
import InputRow from '~/ui/elements/InputRow';
import CustomerInfo from '~/ui/elements/CustomerInfo';
import CheckDate from '~/ui/elements/CheckDate';
import Icon from '~/ui/components/Icon';
import Button from '~/ui/components/Button';
import Header from '~/ui/components/Header';
import TitleItem from '~/ui/components/TitleItem';
import SearchBar from '~/ui/components/SearchBar';
import IconIonicons from 'react-native-vector-icons/dist/Ionicons';
import { accessToken } from '~/store/constants/api'
import { connect } from 'react-redux'
import * as jobSelectors from '~/store/selectors/job';
import * as jobActions from '~/store/actions/job'

@connect(
    state => ({
        listTruck: jobSelectors.getTruckList(state),
        listTruckUpdated: jobSelectors.getTruckListUpdated(state),
    }), jobActions)
export default class extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            modalVisible: false,
            selected: {
                TruckId: 0,
                TruckName: 'Select Truck'
            },
            arrSearch: [{ TruckId: 0, TruckName: 'Select Truck' }, ...props.listTruck]
        });

    }

    componentWillMount() {
        if (this.props.listTruck && this.props.listTruck.length < 1 || (Date.now() - this.props.listTruckUpdated) > 86400000) {
            this.props.getTruckList(accessToken, (error, data) => {
                if (data)
                    this.setState({
                        arrSearch: [{ TruckId: 0, TruckName: 'Select Truck' }, ...data.Trucks]
                    })
            })
        }
    }

    setModalVisible() {
        if (this.state.modalVisible) {
            this.setState({ modalVisible: false });
        } else {
            this.setState({ modalVisible: true });
        }
    }
    handleValueChange(item) {
        const { onChange } = this.props;
        this.setState({ selected: item })
        onChange && onChange(item);
        this.setModalVisible();
    }

    search(value, myArray) {
        const { listTruck } = this.props;
        const arrSearch = levenSearch(value.trim(), myArray, item => item.TruckName)
        this.setState({
            arrSearch: value != 0 ? arrSearch : [{ TruckId: 0, TruckName: 'Select Truck' }, ...listTruck]
        })
    }


    renderRow(item) {
        const { selected } = this.state;
        return (

            <ListItem style={styles.wrapItem}>
                <TouchableOpacity style={styles.item} onPress={() => this.handleValueChange(item)}>
                    <Text>{item.TruckName}</Text>
                    {item.TruckId == selected.TruckId
                        ? <IconIonicons name="ios-radio-button-on" size={30} color={material.redColor} />
                        : <IconIonicons name="ios-radio-button-off" size={30} color={material.redColor} />
                    }
                </TouchableOpacity>
            </ListItem>

        )
    }

    render() {
        const { onChange, listTruck, value, error } = this.props;
        const { arrSearch } = this.state;
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
                    <View container white>
                        <Header title='Select item' iconLeft='close' onPress={() => this.setModalVisible()} />

                        <SearchBar
                            dataArray={[{ TruckId: 0, TruckName: 'Select Truck' }, ...listTruck]}
                            onChange={(value) => this.setState({ arrSearch: value })}
                            searchByName='TruckName'
                        />
                        <TitleItem style={{ padding: 0, backgroundColor: material.grayBackgroundColor }} />

                        <List dataArray={arrSearch}
                            renderRow={(item) => this.renderRow(item)}>
                        </List>
                    </View>
                </Modal>
            </View>
        );
    }
}
