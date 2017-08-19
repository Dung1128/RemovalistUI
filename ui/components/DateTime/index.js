import React, { Component } from 'react'
import { Text, Button, View } from 'native-base'
import material from '~/theme/variables/material';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from '~/ui/components/Icon';
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
        const time = moment(date).format("YYYY-MM-DD HH:mm")
        this.props.onChange && this.props.onChange(time)
        this.setState({ visible: false })
    }


    render() {
        const { text, value, mode, error, ...props } = this.props;
        let month = 'tháng'
        let date = 'ngày'
        let year = 'năm'
        let datetime = new Date().toDateString();
        if (value) {
            if (mode == 'time') {
                datetime = moment(value).format("HH:mm");
            } else {
                datetime = moment(value).format("ddd, MMM DD")
            }

        } else {
            if (mode == 'time') {
                datetime = moment(new Date()).format("HH:mm");
            } else {
                datetime = moment(new Date()).format("ddd, MMM DD");
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
                        {mode != 'time' && "   "}
                    </Text>
                    {error && <Icon size={16} color={material.redColor} name='info' />}
                </TouchableOpacity>

            </View>
        )
    }
}