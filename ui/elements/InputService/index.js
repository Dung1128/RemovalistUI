import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { View, Input, List, ListItem } from 'native-base';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'

import IconEvilIcons from 'react-native-vector-icons/EvilIcons'
import styles from './styles';
import material from '~/theme/variables/material';
import Icon from '~/ui/components/Icon';

var items = ['Type1', 'Type2', 'Type3',];
export default class extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            modalVisible: false,
            item: 'Type1'
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
        const { text, nameIcon, add, measure, ...props } = this.props;
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    borderBottomWidth: 1,
                    borderBottomColor: material.grayTitle,
                }}
                collapsable={false} {...props}>
                <TouchableOpacity onPress={() => this.setModalVisible()}>
                    <View style={styles.Item}>
                        <Icon name={nameIcon} size={20} style={styles.colorIcon} />
                        <Text style={styles.content}>{this.state.item}</Text>
                        <Icon name='arrown-drop' size={12} />
                    </View>
                </TouchableOpacity>
                <View style={styles.Item}>
                    <Icon name='quantity' size={20} style={styles.colorIcon} />
                    <TextInput
                        placeholder='0'
                        underlineColorAndroid="transparent"
                        style={{ width: '60%', padding: 0 }}
                    />
                    <Text>{measure}</Text>
                </View>

                <View style={styles.Item}>
                    <Text style={styles.content}> $50</Text>
                </View>

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
                            backgroundColor: 'white',
                        }}>

                            <List dataArray={items}
                                renderRow={(item) =>
                                    <ListItem>
                                        <TouchableOpacity onPress={() => { this.setState({ item: item }); this.setModalVisible() }}>
                                            <Text>{item}</Text>
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
