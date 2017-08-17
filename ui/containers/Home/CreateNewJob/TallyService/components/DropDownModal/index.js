import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { View, Input, List, ListItem } from 'native-base';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'

import IconEvilIcons from 'react-native-vector-icons/EvilIcons'
import styles from './styles';
import material from '~/theme/variables/material';
import Icon from '~/ui/components/Icon';

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
        const { text, listItems = [], nameIcon, onChange, value, ...props } = this.props;
        return (
            <View
                style={styles.container}
                collapsable={false} {...props}>
                <TouchableOpacity onPress={() => this.setModalVisible()}>
                    <View style={styles.Item}>
                        <Icon name={nameIcon} size={20} style={styles.colorIcon} />
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.content}>{value.Name}</Text>
                        <Icon name='arrown-drop' size={12} />
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
                            backgroundColor: 'white',
                        }}>

                            <List dataArray={listItems}
                                renderRow={(item) =>
                                    <ListItem>
                                        <TouchableOpacity onPress={() => { this.setModalVisible(), onChange(item) }}>
                                            <Text>{item ? item.Name : 'Empty'}</Text>
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
