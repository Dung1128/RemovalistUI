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
        this.state = {
            ready: false,
            basic: true,
            dataSource: [],
            isRefreshing: false,
            loading: false,
            dataSourceSection: []
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
                dataSource: listJobByDate
            })
            this.setDataSourceSection(listJobByDate)
        }
    }

    setDataSourceSection(data) {
        // for (const i = 0; i < data.length; i++) {
        //         data[i].TimeStart = moment(data[i].TimeStart).format("YYYY-MM-DD");
        // }
        const data_ = data.map((item, index) => {
            return {...item, title: moment(item.TimeStart).format('YYYY-MM-DD')};
        });

        let result = _.chain(data_).groupBy("title").toPairs().map((currentItem, index) => {
                return {..._.zipObject(["title", "data"], currentItem), key: index};
            }).value();

            this.setState({
                dataSourceSection: result
            })

            console.log(result)

    }


    refreshList() {
        // this.setState({ isRefreshing: true });
        this.props.getJobByDate(this.renderDate(this.date) + `/${this.keyDayFilter}`, accessToken, (error, data) => {
            if (data) {
                this.setDataSourceSection(data.JobListItemObjects)
                this.setState({
                    dataSource: data.JobListItemObjects,
                    isRefreshing: false
                })
            }
            this.setState({
                isRefreshing: false
            })
        })
    }

    renderDate(day) {
        return moment(day).format("YYYYMMDD")
    }

    renderDateTit(day) {
        return moment(day).format("YYYY-MM-DD")
    }

    renderItem = ({item, index}) => {
        console.log('renderItem', item);
        return(
            <View key={index} white style={{ flex: 1 }}>
                <TouchableOpacity style={styles.itemList} onPress={() => this.props.navigation.navigate('detail_screen', item)}>
                    <View style={{
                        width: 5,
                        backgroundColor: `#${item.StatusColor}`,
                        borderRadius: 5
                    }} />
                    <View style={styles.itemsJob}>
                        <Text bold style={styles.address}>{item.Address}</Text>
                        <View style={styles.bottom}>
                            <Text style={styles.textbottom}>{item.Name}</Text>
                            <Text style={styles.textbottom}>{item.Phone}</Text>
                        </View>
                    </View>

                </TouchableOpacity>
                <View style={{ borderWidth: 0.5, borderColor: material.grayTitle }} />
            </View>
        );
    }
    renderHeader = ({section}) => {
        const check = section.title !== this.renderDateTit(new Date())
        return(
            <TitleItem title={ check ? section.title : 'Today'} />
        );
    }


    render() {
        const { dataSource, dataSourceSection  } = this.state;
        console.log(this.state.dataSourceSection)
        return (

            <View style={{ flex: 1 }}>
                <Loading />
                {
                    dataSourceSection.length === 0 ?
                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', paddingVertical: 50 }}>
                            <Text>Data not found</Text>
                        </View>
                        : null
                }
                <SectionList 
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
                    renderItem={this.renderItem}
                    renderSectionHeader={this.renderHeader}
                    sections={dataSourceSection}
                    keyExtractor={(item ,index) => index}
                    renderLeftHiddenRow={data =>
                    <Button full onPress={() => alert(data)}>
                        <Icon active name="information-circle" />
                    </Button>}
                    renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                    <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                        <Icon active name="trash" />
                    </Button>}
                    leftOpenValue={75}
                    rightOpenValue={-75}
                />
            </View>

        );
    }
}

/*renderLeftHiddenRow={data =>
                        <TouchableOpacity style={{ width: '100%', height: '100%', backgroundColor: material.grayColor, justifyContent: 'center', alignItems: 'flex-start' }} onPress={() => alert(data)}>
                            <IconFontAwesome  style={{ marginLeft: 30, fontSize: 20 }}  name="remove" />
                        </TouchableOpacity>}
                    renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                        <TouchableOpacity style={{ width: '100%', height: '100%', backgroundColor: material.grayColor, justifyContent: 'center', alignItems: 'flex-end' }} onPress={() => alert(data)}>
                            <IconFontAwesome style={{ marginRight: 30, fontSize: 20 }} name="remove" />
                        </TouchableOpacity>}
                    leftOpenValue={75}
                    rightOpenValue={-75}*/
