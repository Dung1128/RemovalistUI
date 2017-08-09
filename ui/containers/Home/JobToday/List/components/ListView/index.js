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
import StatusItem from '~/ui/components/StatusItem'
import { List, ListItem, Spinner, Button, Icon, Text, View } from 'native-base';
import styles from './styles';
import material from '~/theme/variables/material'
import TitleItem from '~/ui/components/TitleItem';

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
            ready: false,
            basic: true,
        };
    }
    deleteRow(secId, rowId, rowMap) {
        // rowMap[`${secId}${rowId}`].props.closeRow();
        // const newData = [...this.state.listViewData];
        // newData.splice(rowId, 1);
        // this.setState({ listViewData: newData });

    }

    renderColorStatus(key) {
        switch (key) {
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

    showDetail() {
        this.props.navigation.navigate('detail_screen');
    }

    renderRow(data) {
        return (
            <TouchableOpacity onPress={() => this.showDetail()} activeOpacity={0.8} style={styles.wrapItems} >
                <StatusItem color={this.renderColorStatus(data.status)} />
                <View centerVertical style={styles.item}>
                    <Text primary >{data.address}</Text>
                    <View full style={{ flexDirection: 'row' }}>
                        <Text>{data.name}</Text>
                        <Text>{data.phone}</Text>
                    </View>
                </View>
            </TouchableOpacity>
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

    render() {
        const { day, item } = this.props;
        return (
            <View style={{ width: '100%' }}>
                <TitleItem title={day.dateString} />
                <List
                    enableEmptySections
                    contentContainerStyle={{ backgroundColor: '#fff', width: '100%', justifyContent: 'space-between' }}
                    dataSource={this.state.ds.cloneWithRows(item.listArray)}
                    renderRow={data => this.renderRow(data)}
                    renderLeftHiddenRow={(data, secId, rowId, rowMap) => this.renderLeftRow(data, secId, rowId, rowMap)}
                    renderRightHiddenRow={(data, secId, rowId, rowMap) => this.renderRightRow(data, secId, rowId, rowMap)}
                    rightOpenValue={-95}
                    leftOpenValue={95}
                />
            </View>
        );
    }
}