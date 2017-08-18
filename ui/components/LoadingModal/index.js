import React, { Component } from 'react'
import { Text, Button, Spinner} from 'native-base'
import { View, Modal} from 'react-native'
import styles from './styles'
export default class LoadingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: props.loading,
        }
    }
    setModalVisible(visible){
        this.setState({modalVisible: visible})
    }
    componentWillReceiveProps(props){
        this.setModalVisible(props.loading)
    }

    render() {
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
                        <Spinner color='#00a9d4' style={styles.spinner}/>
                        <Text primary>{this.props.text}</Text>
                    </View>
                </View>
            </Modal>
        )
    }
}