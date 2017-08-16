import React, { Component } from 'react'
import { Text, Button, View } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import material from '~/theme/variables/material';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
    TouchableOpacity,
} from 'react-native';
import styles from './styles'
import moment from 'moment';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    handleSelect(date) {
        this.props.onChange && this.props.onChange(date)
        this.setState({ visible: false })
    }


    render() {
        const { text, value, mode, ...props } = this.props;
        let month = 'tháng'
        let date = 'ngày'
        let year = 'năm'
        let datetime = new Date().toDateString();
        if (value && mode == 'time') {
            if (mode == 'time') {
                datetime = moment(value).format("HH:mm");
            } else {
                datetime = value.toDateString();
            }

        } else {
            if (mode == 'time') {
                datetime = moment(new Date()).format("HH:mm");
            } else {
                datetime = new Date().toDateString();
            }
        }
        return (
            <View {...props}>
                <DateTimePicker
                    mode={mode ? mode : 'date'}
                    isVisible={this.state.visible}
                    onConfirm={this.handleSelect.bind(this)}
                    onCancel={() => this.setState({ visible: false })}
                />
                <TouchableOpacity
                    style={styles.dateTime}
                    onPress={() => this.setState({ visible: true })}
                >
                    <Text style={styles.styleTime}>
                        {datetime}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}