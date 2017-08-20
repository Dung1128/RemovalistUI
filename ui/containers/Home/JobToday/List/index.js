import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    WebView,
    TouchableOpacity,
    Alert,
    InteractionManager,
    RefreshControl
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
import ListView from './components/ListView';
import Calendar from '~/ui/components/Calendar';
import moment from 'moment'
import * as jobActions from '~/store/actions/job'
import * as jobSelectors from '~/store/selectors/job'
const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9EZzFPVVF4UmpZelJEZzVSakUzT0RBME5UUkZRa1pHUkRJd016ZERPRFl4TmpRd09UaEdSUSJ9.eyJpc3MiOiJodHRwczovL3R1YW5wbDEuYXUuYXV0aDAuY29tLyIsInN1YiI6InJRcXY0UTBRQXdnQkJwM0k2TlM0NTBhcFh1UWhwN3hHQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3R1YW5wbDF0ZXN0IiwiZXhwIjoxNTAzMjI5MTI4LCJpYXQiOjE1MDMxNDI3MjgsInNjb3BlIjoiIn0.lJK0SvaoViNdldy8Nx3YS1tOfb4knza41OrpNiSQB_x9fYxnk2gf7UpT8bmjIzT6VP7D-zZ0psdpwCyLaZj-5aYM5pv80C1vo756w_MO8ZHSURIp4ZCDe2ANIOzTPYCpCeab1J2JqQl6amzNoRW05FsHpuC6cjOGKw2ftbgnczaD6bU8Uc3ualofXNCgG9tsNE4yqtfaR-xiAVlh15-dMSksEC-AZOLuoGLHhq_4TEI8X1mozOlPrBXrcLq3ggYbh2LYSOG7bGuAz-76wPvm8OO_oIGSOlHubqLY4habTRmZX63ch_EGoNsKS0vMqeujzOxK-BGvxIDMPKST377mAg'

@connect(state => ({
    listStatus: jobSelectors.getStatusJobList(state)
}), { ...jobActions })

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            basic: true,
            dataSource: [],
            listByDate: 'init',
            isRefreshing: false,
        };
        this.date = new Date(),
            this.navigated = false
    }

    renderStatus(id) {
        const arr = this.props.listStatus
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].JobStatusId == id) {
                this.setState({
                    StatusName: arr[i].StatusName,
                    JobStatusColor: arr[i].JobStatusColor
                })
            }
        }
    }

    componentWillMount() {
        this.setState({
            listByDate: this.renderDate(this.date)
        })
        InteractionManager.runAfterInteractions(() => {
            this.setState({ ready: true });
        });
    }
    componentDidMount() {
        this.props.getJobByDate(this.renderDate(new Date()), accessToken, (error, data) => {
            if (data) {
                this.setState({
                    dataSource: data.JobListItemObjects,

                })
            }
        })

    }


    updateList(date, dateTit) {

        this.props.getJobByDate(date, accessToken, (error, data) => {
            if (data) {
                this.setState({
                    listByDate: this.renderDate(dateTit),
                    dateTitle: this.renderDateTit(dateTit),
                    dataSource: data.JobListItemObjects,
                })
            }
        })
    }

    refreshList() {
        this.setState({ isRefreshing: true });
        this.props.getJobByDate(this.renderDate(this.date), accessToken, (error, data) => {
            if (data) {
                this.setState({
                    dataSource: data.JobListItemObjects,
                    isRefreshing: false

                })
            }
        })
    }

    renderColorStatus(key) {
        switch (key) {
            case 1:
                return '#EB4E34';
            case 2:
                return '#FEDB31';
            case 3:
                return '#4E91DF';
            case 4:
                return '#00D74A';
            case 5:
                return '#BB0DDD';
            case 6:
                return '#BDC4CB';
            default:
                break;
        }
    }

    navigate(data) {
        if (!this.navigated) {
            this.props.navigation.navigate('detail_screen', { id: data.JobDetailsId })
            this.navigated = true
            setTimeout(() => {
                this.navigated = false
            }, 2000)
        }

    }

    renderRow(data) {
        return (
            <View>
                <TouchableOpacity style={styles.itemList} onPress={() => this.navigate(data)}>
                    <View style={{
                        width: 5,
                        backgroundColor: this.renderColorStatus(data.StatusId),
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

    renderDate(d) {
        const date = new Date(d);
        const month = (date.getMonth() + 1).toString();
        const day = date.getDate().toString();
        const year = date.getFullYear().toString();
        const dayNow = `${year}${month < 10 ? `0${month}` : `${month}`}${day < 10 ? `0${day}` : `${day}`}`
        return dayNow
    }

    renderDateTit(d) {
        const date = new Date(d);
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

    onDateSelect(date) {
        if (this.date && date.toString() === this.date.toString())
            return
        this.date = date
        this.updateList(this.renderDate(date), date);
    }

    render() {
        this.navigated = false
        return (
            <View style={{ flex: 1 }}>
                <Calendar style={{ width: '100%', marginHorizontal: 10 }}
                    currentMonth={this.date}
                    scrollEnabled={true}
                    onDateSelect={date => this.onDateSelect(date)} />
                {
                    this.state.listByDate == this.renderDate(new Date()) ? <TitleItem title='Today' /> : <TitleItem title={this.state.dateTitle} />
                }
                {
                    this.state.dataSource.length == 0 ?
                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', paddingVertical: 50 }}>
                            <Text>Data not found</Text>
                        </View>
                        : null
                }
                <List
                    refreshControl={
                        <RefreshControl
                            colors={['#039BE5']}
                            tintColor='#fff'
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.refreshList.bind(this)}
                        />
                    }
                    enableEmptySections
                    removeClippedSubviews={false}
                    style={{ flex: 1 }}
                    dataArray={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                />

            </View>
        );
    }
}