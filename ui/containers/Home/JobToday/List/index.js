import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    WebView,
    TouchableOpacity,
    Alert,
    ListView,
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

const data = [
    {
        address: '59 Rakauroad, Hataitai',
        name: 'Johnson',
        phone: '022-365-9900',
        status: 1
    },
    {
        address: '59 Rakauroad, Hataitai',
        name: 'Johnson',
        phone: '022-365-9900',
        status: 2
    },
    {
        address: '59 Rakauroad, Hataitai',
        name: 'Johnson',
        phone: '022-365-9900',
        status: 3
    },
    {
        address: '59 Rakauroad, Hataitai',
        name: 'Johnson',
        phone: '022-365-9900',
        status: 4
    },
    {
        address: '59 Rakauroad, Hataitai',
        name: 'Johnson',
        phone: '022-365-9900',
        status: 5
    },
    {
        address: '59 Rakauroad, Hataitai',
        name: 'Johnson',
        phone: '022-365-9900',
        status: 6
    },
];
export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
            calenderr: true,
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

    renderColorStatus(key){
        switch(key){
            case 1:
                return material.redColor; 
                break;
            case 2:
                return material.yellowColor; 
                break;
            case 3:
                return material.blueColor; 
                break;
            case 4:
                return material.greenColor; 
                break;
            case 5:
                return material.violetColor; 
                break;
            case 6:
                return material.grayColor; 
                break;
            default: 
                break;
        }
    }

    renderRow(data) {
        return (
            <View style={styles.wrapItems} >
                <StatusItem color={this.renderColorStatus(data.status)} />
                <View centerVertical style={styles.item}>
                    <Text primary >{data.address}</Text>
                    <View full style={{ flexDirection: 'row' }}>
                        <Text>{data.name}</Text>
                        <Text>{data.phone}</Text>
                    </View>
                    
                </View>
            </View>
        )
    }

    renderRightRow(data, secId, rowId, rowMap) {
        return (

            <TouchableOpacity style={{ ...styles.hiddenButton, backgroundColor: material.grayHideColor }} onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                <View style={{ position: 'absolute', right: 10 }}>
                    <Text>Archived</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderLeftRow(data, secId, rowId, rowMap) {
        return (

            <TouchableOpacity style={{ ...styles.hiddenButton, backgroundColor: material.blueColor }} onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                <View style={{ position: 'absolute', left: 10 }}>
                    <Text white >Booked</Text>
                </View>
            </TouchableOpacity>
        )
    }


    renderDay(day, item) {
        return (

            <View style={{  width: '100%' }}>           
                <TitleItem title='Today' />
                <List
                    enableEmptySections
                    contentContainerStyle={{ backgroundColor: '#fff', width: '100%', justifyContent:'space-between' }}
                    dataSource={this.state.ds.cloneWithRows(data)}
                    renderRow={data => this.renderRow(data)}
                    renderLeftHiddenRow={(data, secId, rowId, rowMap) => this.renderLeftRow(data, secId, rowId, rowMap)}
                    renderRightHiddenRow={(data, secId, rowId, rowMap) => this.renderRightRow(data, secId, rowId, rowMap)}
                    rightOpenValue={-95}
                    leftOpenValue={95}
                />
             </View>
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
                    items={
                        {
                            '2017-08-05': [{
        address: '59 Rakauroad, Hataitai',
        name: 'Johnson',
        phone: '022-365-9900',
        status: 1
    }],
                            '2017-08-08': [{
        address: '59 Rakauroad, Hataitai',
        name: 'Johnson',
        phone: '022-365-9900',
        status: 1
    }],
                            '2017-08-07': [],
                            '2017-08-08': [{
        address: '59 Rakauroad, Hataitai',
        name: 'Johnson',
        phone: '022-365-9900',
        status: 1
    }, {
        address: '59 Rakauroad, Hataitai',
        name: 'Johnson',
        phone: '022-365-9900',
        status: 1
    }],
                        }}
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
                    maxDate={'2012-05-30'}
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
                    style={{ flex: 1, height: 100 }}
                />
                :
                <Spinner color='#0C95EA' style={{ marginTop: '50%' }} />
        );
    }
}