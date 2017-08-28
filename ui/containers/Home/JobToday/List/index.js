import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    WebView,
    TouchableOpacity,
    Alert,
    InteractionManager,
    RefreshControl,
    ListView,
    SectionList
} from 'react-native';
import { connect } from 'react-redux'
import TabBar from '~/ui/components/TabBar';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import { Agenda } from 'react-native-calendars';
import StatusItem from '~/ui/components/StatusItem'
import { List, ListItem, Spinner, Button, Icon, Text, View } from 'native-base';
import styles from './styles';
import material from '~/theme/variables/material'
import TitleItem from '~/ui/components/TitleItem';
import Calendar from '~/ui/components/Calendar';
import moment from 'moment'
import * as jobActions from '~/store/actions/job'
import * as jobSelectors from '~/store/selectors/job'
import { accessToken } from '~/store/constants/api'
import Loading from '~/ui/components/Loading'

@connect(state => ({
    listJobByDate: jobSelectors.getJobByDate(state)
}), { ...jobActions })

export default class extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            ready: false,
            basic: true,
            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
            isRefreshing: false,
            loading: false,
        };
        this.date = new Date();
        this.checkday = '';
        this.keyDayFilter = '';
    }

    componentDidMount() {
        this.props.onItemRef && this.props.onItemRef(this)
    }

    componentWillReceiveProps({ listJobByDate }) {
        if (listJobByDate != this.props.listJobByDate) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(listJobByDate)
            })
        }
    }


    refreshList() {
        this.setState({ isRefreshing: true });
        this.props.getJobByDate(this.renderDate(this.date) + `/${this.keyDayFilter}`, accessToken, (error, data) => {
            if (data) {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(data.JobListItemObjects),
                    isRefreshing: false
                })
            }
        })
    }

    renderRow(data, sectionID, rowID, highlightRow) {
        const check = this.renderDate(this.checkday) != this.renderDate(data.TimeStart)
        this.checkday = data.TimeStart
        return (
            <View white style={{ flex: 1 }}>
                {
                    check || rowID == 0
                        ? (this.renderDate(data.TimeStart) == this.renderDate(new Date())
                            ? <TitleItem title='Today' />
                            : <TitleItem title={this.renderDateTit(data.TimeStart)} />)
                        : null

                }
                <TouchableOpacity style={styles.itemList} onPress={() => this.props.navigation.navigate('detail_screen', data)}>
                    <View style={{
                        width: 5,
                        backgroundColor: `#${data.StatusColor}`,
                        borderRadius: 5
                    }} />
                    <View style={styles.itemsJob}>
                        <Text bold style={styles.address}>{data.Address}</Text>
                        <View style={styles.bottom}>
                            <Text style={styles.textbottom}>{data.Name}</Text>
                            <Text style={styles.textbottom}>{data.Phone}</Text>
                        </View>
                    </View>

                </TouchableOpacity>
                <View style={{ borderWidth: 0.5, borderColor: material.grayTitle }} />
            </View>
        );

    }

    renderDate(day) {
        return moment(day).format("YYYYMMDD")
    }

    renderDateTit(day) {
        return moment(day).format("YYYY-MM-DD")
    }

    render() {
        const { dataSource } = this.state;
        return (

            <View style={{ flex: 1 }}>
                <Loading />
                {
                    dataSource.length == 0 ?
                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', paddingVertical: 50 }}>
                            <Text>Data not found</Text>
                        </View>
                        : null
                }

                <List
                    refreshControl={
                        <RefreshControl
                            colors={['#039BE5']}
                            tintColor={material.redColor}
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.refreshList.bind(this)}
                        />
                    }
                    enableEmptySections
                    removeClippedSubviews={false}
                    style={{ flex: 1 }}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderLeftHiddenRow={data =>
                        <TouchableOpacity style={{ width: '100%', height: '100%', backgroundColor: material.grayColor, justifyContent: 'center', alignItems: 'flex-start' }} onPress={() => alert(data)}>
                            <IconFontAwesome  style={{ marginLeft: 30, fontSize: 20 }}  name="remove" />
                        </TouchableOpacity>}
                    renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                        <TouchableOpacity style={{ width: '100%', height: '100%', backgroundColor: material.grayColor, justifyContent: 'center', alignItems: 'flex-end' }} onPress={() => alert(data)}>
                            <IconFontAwesome style={{ marginRight: 30, fontSize: 20 }} name="remove" />
                        </TouchableOpacity>}
                    leftOpenValue={75}
                    rightOpenValue={-75}
                />



            </View>

        );
    }
}
