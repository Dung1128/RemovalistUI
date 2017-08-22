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
import { accessToken } from '~/store/constants/api'
import Loading from '~/ui/components/Loading'

@connect(state => ({
    listStatus: jobSelectors.getStatusJobList(state),
    listJobByDate: jobSelectors.getJobByDate(state)
}), { ...jobActions })

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            basic: true,
            dataSource: [],
            isRefreshing: false,
            loading: false,
        };
        this.date = ''
    }

    componentDidMount() {
        this.props.onItemRef && this.props.onItemRef(this)
    }

    componentWillReceiveProps({ listJobByDate }) {
        if (listJobByDate != this.props.listJobByDate) {
            this.setState({
                dataSource: listJobByDate
            })
        }
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

    refreshList() {
        // this.setState({ isRefreshing: true });
        this.props.getJobByDate(this.renderDate(this.date), accessToken, (error, data) => {
            if (data) {
                this.setState({
                    dataSource: data.JobListItemObjects,
                    // isRefreshing: false

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
                return '#52D549';
            case 5:
                return '#BB0DDD';
            case 6:
                return '#BDC4CB';
            default:
                break;
        }
    }

    renderRow(data) {
        return (
            <View>
                <TouchableOpacity style={styles.itemList} onPress={() => this.props.navigation.navigate('detail_screen', { id: data.JobDetailsId })}>
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

    renderDate(day) {
        return moment(day).format("YYYYMMDD")
    }

    renderDateTit(day) {
        return moment(day).format("YYYY-MM-DD")
    }

    render() {
        const { dataSource } = this.state;
        const checkdate = dataSource.length > 0 && dataSource[0].TimeStart ? dataSource[0].TimeStart : this.date
        return (

            <View style={{ flex: 1 }}>
                {
                    this.renderDate(checkdate) == this.renderDate(new Date())
                        ? <TitleItem title='Today' />
                        : <TitleItem title={this.renderDateTit(checkdate)} />
                }
                <Loading />
                {
                    dataSource.length == 0 ?
                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', paddingVertical: 50 }}>
                            <Text>Data not found</Text>
                        </View>
                        : null
                }
                {
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
                        dataArray={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                    />

                }
                
            </View>

        );
    }
}