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

            this.state.ready ?
                // <Agenda
                //     // the list of items that have to be displayed in agenda. If you want to render item as empty date
                //     // the value of date key kas to be an empty array []. If there exists no value for date key it is
                //     // considered that the date in question is not yet loaded
                //     items={this.props.dataSource}
                //     // callback that gets called on day press
                //     onDayPress={(day) => { console.log('day pressed') }}
                //     // callback that gets called when day changes while scrolling agenda list
                //     onDayChange={(day) => { console.log('day changed') }}
                //     // initially selected day
                //     selected={dayNow}
                //     // specify how each item should be rendered in agenda
                //     renderItem={(item, firstItemInDay) => { return (<Text style={{ color: 'red' }}> {firstItemInDay} </Text>); }}
                //     // specify how each date should be rendered. day can be undefined if the item is not first in that day.
                //     renderDay={(day, item) => this.renderDay(day, item)}
                //     // specify how empty date content with no items should be rendered
                //     renderEmptyDate={() => { return (<View />); }}
                //     // specify your item comparison function for increased performance
                //     rowHasChanged={(r1, r2) => { return r1.text !== r2.text }}
                //     // Hide knob button. Default = false
                //     hideKnob={false}
                //     // agenda theme
                //     theme={{
                //         agendaDayTextColor: 'yellow',
                //         agendaDayNumColor: 'green',
                //         agendaTodayColor: 'red'
                //     }}
                //     // agenda container style
                //     style={{ flex: 1, }}
                // />
                <Calendar style={{ width: '100%', marginHorizontal: 10 }} />
                :
                <Spinner color={material.redColor} style={{ marginTop: '50%' }} />
        );
    }
}