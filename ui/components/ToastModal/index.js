import React, { Component } from 'react'
import { Text, Button, Spinner } from 'native-base'
import { View, Modal } from 'react-native'
import styles from './styles'
export default class LoadingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: props.show,
        }
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible })
    }
    componentWillReceiveProps(props) {
        this.setModalVisible(props.show)
    }

    render() {
        const { message } = this.props
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.setModalVisible(!this.state.modalVisible)
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text primary>Notify</Text>
                        <Text style={{ marginTop: 10 }}>{message}</Text>
                    </View>
                </View>
            </Modal>
        )
    }
}