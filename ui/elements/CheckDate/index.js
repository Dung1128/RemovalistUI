import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { View } from 'native-base';

import InputRow from '../InputRow';
import styles from './styles';
import material from '~/theme/variables/material';

import DateTimePicker from 'react-native-modal-datetime-picker';

export default class extends Component {
    state = {
    isDateTimePickerVisible: false,
    _date: 'Mon, Jun 01'
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
        var year = new Date(date).getFullYear();
        var month = new Date(date).getMonth() + 1;
        var datee = new Date(date).getDate();
       this.setState({ _date: datee  + '-' + month + '-' + year})
    this._hideDateTimePicker();
  };


    render() {
        const { ...props } = this.props;
        return (
        <View collapsable={false} {...props} style={{backgroundColor: '#fff', flexDirection: 'row'}}>
            <View style={styles.itemTime}>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    />
                <Text style={styles.txttitledate}>Date</Text>
                <TouchableOpacity onPress={this._showDateTimePicker}>
                    <Text style={styles.date}>{this.state._date}</Text>
                </TouchableOpacity>
                <Text style={styles.txttitledate}>Today</Text>
            </View>
            <View style={{ borderWidth: 0.5, borderColor: material.grayTitle}}/>
            <View style={styles.itemTime}>
                <Text style={styles.txttitledate}>Time</Text>
                <Text style={styles.date}>9:00 - 10:00</Text>
                <Text style={styles.txttitledate}>Duration: 3 hours</Text>
            </View>
        </View>
        );
    }
} 
