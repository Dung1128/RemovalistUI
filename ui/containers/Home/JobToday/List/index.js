import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    WebView,
    TouchableOpacity,
    Alert,
    InteractionManager
} from 'react-native';
import TabBar from '~/ui/components/TabBar';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import { Agenda } from 'react-native-calendars';
import StatusItem from '~/ui/components/StatusItem'
import { List, ListItem, Spinner, Button, Icon, Text, View } from 'native-base';
import styles from './styles';
import material from '~/theme/variables/material'
import TitleItem from '~/ui/components/TitleItem';
import ListView from './components/ListView';
import Calendar from '~/ui/components/Calendar';

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            basic: true,
        };
    }

    componentWillMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ ready: true });
        });
    }

    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({ listViewData: newData });
    }



    renderDate() {
        const date = new Date();
        const month = (date.getMonth() + 1).toString();
        const day = date.getDate().toString();
        const year = date.getFullYear().toString();
        const dayNow = `${year}-${month < 10 ? `0${month}` : `${month}`}-${day < 10 ? `0${day}` : `${day}`}`
        return dayNow
    }

    renderDay(day, item) {
        return (
            <ListView enableEmptySections navigation={this.props.navigation} day={day} item={item} />
        )
    }
    render() {
        const dayNow = this.renderDate();
        return (
            <View style={{ flex: 1 }}>
                <Calendar style={{ width: '100%', marginHorizontal: 10 }} />
                {!this.state.ready && <Spinner color={material.redColor} style={{ marginTop: '50%' }} />}


            </View>
        );
    }
}