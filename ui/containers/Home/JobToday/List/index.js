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

const data = {
    '2017-08-09': [{
        listArray: [{
            address: '59 Rakauroad, Hataitai',
            name: 'Johnson',
            phone: '022-365-9900',
            status: 3
        }, {
            address: '58 Rakauroad, Hataitai',
            name: 'Johnson',
            phone: '022-365-9900',
            status: 4
        }
        ]
    }],
    '2017-08-11': [{
        listArray: [{
            address: '59 Rakauroad, Hataitai',
            name: 'Johnson',
            phone: '022-365-9900',
            status: 5
        }, {
            address: '58 Rakauroad, Hataitai',
            name: 'Johnson',
            phone: '022-365-9900',
            status: 6
        }
        ]
    }],
}

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
            <ListView navigation={this.props.navigation} day={day} item={item} />
        )
    }
    render() {
        const dayNow = this.renderDate();
        return (

            this.state.ready ?
                <Agenda
                    // the list of items that have to be displayed in agenda. If you want to render item as empty date
                    // the value of date key kas to be an empty array []. If there exists no value for date key it is
                    // considered that the date in question is not yet loaded
                    items={data}
                    // callback that gets called when items for a certain month should be loaded (month became visible)
                    loadItemsForMonth={(month) => { console.log('trigger items loading') }}
                    // callback that gets called on day press
                    onDayPress={(day) => { console.log('day pressed') }}
                    // callback that gets called when day changes while scrolling agenda list
                    onDayChange={(day) => { console.log('day changed') }}
                    // initially selected day
                    selected={dayNow}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    minDate={'2012-05-10'}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    maxDate={'2018-05-30'}
                    // specify how each item should be rendered in agenda
                    renderItem={(item, firstItemInDay) => { return (<Text> {firstItemInDay} </Text>); }}
                    // specify how each date should be rendered. day can be undefined if the item is not first in that day.
                    renderDay={(day, item) => this.renderDay(day, item)}
                    // specify how empty date content with no items should be rendered
                    renderEmptyDate={() => { return (<View />); }}
                    // specify your item comparison function for increased performance
                    rowHasChanged={(r1, r2) => { return r1.text !== r2.text }}
                    // Hide knob button. Default = false
                    hideKnob={false}
                    // agenda theme
                    theme={{
                        agendaDayTextColor: 'yellow',
                        agendaDayNumColor: 'green',
                        agendaTodayColor: 'red'
                    }}
                    // agenda container style
                    style={{ flex: 1, }}
                />
                :
                <Spinner color={material.redColor} style={{ marginTop: '50%' }} />
        );
    }
}