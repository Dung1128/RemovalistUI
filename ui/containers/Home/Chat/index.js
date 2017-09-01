import React, { Component } from 'react';
import {
    View,
    Alert,
    ListView,
    RefreshControl,
    TextInput,
    TouchableOpacity,
    Platform
} from 'react-native';

import material from '~/theme/variables/material'
import {
    Container,
    Button,
    Text,
    List,
    Item,
    Input,
    Content,
    Spinner
} from 'native-base';
import styles from './styles';
import SearchBar from '~/ui/components/SearchBar';
import Icon from '~/ui/components/Icon';
import Header from '~/ui/components/Header';
import moment from 'moment'
import {
    Client,
    Constants,
    AccessManager,
    Channel
} from 'react-native-twilio-chat';
import { connect } from 'react-redux'
import * as chatActions from '~/store/actions/chat'
import * as chatSelectors from '~/store/selectors/chat'

@connect(state => ({
    token: chatSelectors.getToken(state)
}), { ...chatActions })

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isRefreshing: false,
            loading: true,
            token: ''
        };
    }

    getChannel(token) {
        const accessManager = new AccessManager(token);
        accessManager.onTokenWillExpire = () => {
            this.props.getToken(Platform.OS, identity, 'admin@gmail.com', (error, newToken) => {
                accessManager.updateToken(newToken.token);
            })
        };

        accessManager.onTokenInvalid = () => {
            console.log('Token is invalid');
        };

        accessManager.onTokenExpired = () => {
            console.log('Token is expired');
        };

        // initiate the client with the token, not accessManager
        const client = new Client(token);
        client.onError = ({ error, userInfo }) => {
            console.log(error);
            console.log(userInfo);
        };

        client.onSynchronizationStatusChanged = (status) => {
            // console.log('status',status);
        };

        client.onClientConnectionStateChanged = (state) => {
            // console.log(state);
        };


        // channel = new Channel()
        // channel.add(identity);

        client.onClientSynchronized = () => {
            client.getUserChannels().then(res => {
                // get list user by chanel
                console.log(res)
                this.setState({
                    loading: false,
                    dataSource: res.items,
                })
            }).catch((err) => {
                console.log(err)
            })

            /// add new chanel
            // client.createChannel({
            //     friendlyName: 'Channel Minh Chien',
            //     uniqueName: 'minhchien' + Date.now(),
            //     type: Constants.TCHChannelType.Private
            // })
            //     .then((channel) => console.log(channel));

        };

        client.initialize()
            .then(() => {
                // register the client with the accessManager
                accessManager.registerClient();
            });
        this.setState({ client, accessManager });
    }

    initializeMessenging(identity) {
        this.props.getToken(Platform.OS, identity, 'admin@gmail.com', (error, data) => {
            this.getChannel(data.token)
            this.setState({
                token: data.token
            })
        })

    }

    componentDidMount() {
        this.initializeMessenging('admin');
    }

    componentWillUnmount() {
        this.state.client && this.state.client.shutdown()
    }


    chatWithUser(username, data) {
        this.props.navigation.navigate('detail_chat_screen', { username, data, token: this.state.token })
    }

    renderTime(time) {
        let diff = moment.duration(moment(new Date()).diff(moment(time)));
        let days = parseInt(diff.asDays()); //84
        let checkDays = days != 0 ? `${days} days,` : ''
        let hours = parseInt(diff.asHours()); //2039 hours, but it gives total hours in given miliseconds which is not expacted.

        hours = hours - days * 24;  // 23 hours
        let checkHours = hours != 0 ? ` ${hours} hours,` : ''
        let minutes = parseInt(diff.asMinutes()); //122360 minutes,but it gives total minutes in given miliseconds which is not expacted.

        minutes = minutes - (days * 24 * 60 + hours * 60); //20 minutes.

        return days < 2 ? checkDays + checkHours + ` ${minutes} minutes` : moment(time).format('YYYY-MM-DD HH:mm')
    }

    renderRow(data) {
        let timeDuration = this.renderTime(data.dateUpdated)
        // let index = data.createdBy.indexOf(';')
        // let name = data.createdBy.slice(0, index)
        return (
            <TouchableOpacity style={styles.itemList} onPress={e => this.chatWithUser('tupt', data)}>
                <Text>{data.friendlyName}</Text>
                <View style={styles.bottom}>
                    <Text style={styles.textbottom}>{data.createdBy}</Text>
                    <Text style={styles.textbottom}>{timeDuration}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const { dataSource, loading } = this.state;
        return (
            <Container style={{ backgroundColor: material.grayBackgroundColor }}>
                <Header
                    title='Chat'
                    iconLeft='back'
                    onPress={() => this.props.navigation.goBack()}
                />
                <SearchBar
                    dataArray={[]}
                    onChange={(value) => this.setState({ dataSource: value })}
                    searchByName='content'
                />
                {
                    loading && <Spinner color={material.redColor} />
                }
                <List
                    style={styles.containers}
                    refreshControl={
                        <RefreshControl
                            colors={['#039BE5']}
                            tintColor={material.redColor}
                            refreshing={this.state.isRefreshing}
                        />
                    }
                    enableEmptySections
                    removeClippedSubviews={false}
                    dataArray={dataSource}
                    renderRow={this.renderRow.bind(this)}
                />

            </Container>
        );
    }
}
