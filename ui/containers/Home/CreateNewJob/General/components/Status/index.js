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
import StatusItem from '~/ui/components/StatusItem';

import { connect } from 'react-redux'
import * as jobSelectors from '~/store/selectors/job';


@connect(
    state => ({
        listStatus: jobSelectors.getStatusJobList(state)
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
        const { listStatus, onChange, value } = this.props;
        return (
            <View>
                <TitleItem title='Status' />
                <TouchableOpacity onPress={() => this.setModalVisible()}>
                    <View style={{ flexDirection: 'row' }}>
                        <StatusItem color={`#${value.JobStatusColor}`} />
                        <View style={{ ...styles.Items }}>
                            <Text style={styles.txtForm}>{value.StatusName}</Text>
                            <Icon name='arrown-drop' size={15} style={styles.down} />
                        </View>
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
                            height: 300,
                            backgroundColor: 'white',
                        }}>

                            <List dataArray={listStatus.slice(0, 3)}
                                renderRow={(item) =>
                                    <ListItem onPress={() => { onChange(item); this.setModalVisible() }}>
                                        <Text>{item.StatusName}</Text>
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
