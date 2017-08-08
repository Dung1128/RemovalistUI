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
    isDateTimePickerVisibleFromTime: false,
    isDateTimePickerVisibleToTime: false,
    _date: 'Mon, Jun 01',
    _fromTime: '9:00',
    _toTime: '10:00',
    Duration: '0'
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

  _showDateTimePickerFromTime = () => this.setState({ isDateTimePickerVisibleFromTime: true });

  _hideDateTimePickerFromTime = () => this.setState({ isDateTimePickerVisibleFromTime: false });

  _handleDatePickedFromTime = (time) => {
        var hours = new Date(time).getHours();
        var mimutes = new Date(time).getMinutes();
       this.setState({ _fromTime: hours + ':' + mimutes })
    this._hideDateTimePickerFromTime();
  };

  _showDateTimePickerToTime = () => this.setState({ isDateTimePickerVisibleToTime: true });

  _hideDateTimePickerToTime = () => this.setState({ isDateTimePickerVisibleToTime: false });

  _handleDatePickedToTime = (time) => {
        var hours = new Date(time).getHours();
        var mimutes = new Date(time).getMinutes();
       this.setState({ _toTime: hours + ':' + mimutes })
    this._hideDateTimePickerToTime();
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
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisibleFromTime}
                    onConfirm={this._handleDatePickedFromTime}
                    onCancel={this._hideDateTimePickerFromTime}
                    mode={'time'}
                    />

                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisibleToTime}
                    onConfirm={this._handleDatePickedToTime}
                    onCancel={this._hideDateTimePickerToTime}
                    mode={'time'}
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
                <View style={{ flexDirection: 'row'}}>
                    <TouchableOpacity onPress={this._showDateTimePickerFromTime}>
                        <Text style={styles.date}>{this.state._fromTime} -</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._showDateTimePickerToTime}>
                        <Text style={styles.date}>{' '}{this.state._toTime}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.txttitledate}>Duration: {this.state.Duration} h</Text>
            </View>
        </View>
        );
    }
} 
