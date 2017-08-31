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


const dataNoti = [
    {
        content: 'New Plymouth',
        status: 'content',
        time: '3 mins ago'
    },
    {
        content: 'Wellington',
        status: 'content',
        time: '3 mins ago'
    },
    {
        content: 'North Shore, Auckland',
        status: 'content',
        time: '3 mins ago'
    },
    {
        content: 'Nelson',
        status: 'content',
        time: '3 mins ago'
    },
    {
        content: 'Queenstown Lakes',
        status: 'content',
        time: '3 mins ago'
    },
    {
        content: 'Selwyn, Canterbury',
        status: 'content',
        time: '3 mins ago'
    },
    {
        content: 'Hamilton',
        status: 'content',
        time: '3 mins ago'
    },
    {
        content: 'Dunedin',
        status: 'content',
        time: '3 mins ago'
    },
    {
        content: 'Invercargill',
        status: 'content',
        time: '3 mins ago'
    }
]

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isRefreshing: false,
            loading: false
        };
    }

    getToken(identity) {
        return fetch('http://192.168.0.111:3000/token?device=' + Platform.OS + '&identity=' + identity, {
            method: 'get',
        })
            .then(res => res.json());
    }

    initializeMessenging(identity) {
        this.setState({
            loading: true
        })
        console.log('starting init');
        this.getToken(identity)
            .then(({ token }) => {
                // initaite new Access Manager
                const accessManager = new AccessManager(token);
                console.log(token)
                accessManager.onTokenWillExpire = () => {
                    this.getToken(identity)
                        .then(newToken => accessManager.updateToken(newToken.token));
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
                    console.log(status);
                };

                client.onClientConnectionStateChanged = (state) => {
                    // console.log(state);
                };


                // channel = new Channel()
                // channel.add(identity);

                client.onClientSynchronized = () => {
                    client.getUserChannels().then(res => {
                        // get list user by chanel
                        this.setState({
                            dataSource: res.items,
                            loading: false
                        })
                    })
                    console.log('client synced', client);

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
                        console.log('client initilized');
                        // register the client with the accessManager
                        accessManager.registerClient();
                    });
                this.setState({ client, accessManager });
            });

    }

    componentDidMount() {
        this.initializeMessenging('tupt');
    }

    componentWillUnmount() {
        this.state.client && this.state.client.shutdown()
    }


    chatWithUser(username, sid) {
        this.props.navigation.navigate('detail_chat_screen', { username, sid })
    }

    renderTime(time) {
        let diff = moment.duration(moment(new Date()).diff(moment(time)));
        let days = parseInt(diff.asDays()); //84

        let hours = parseInt(diff.asHours()); //2039 hours, but it gives total hours in given miliseconds which is not expacted.

        hours = hours - days * 24;  // 23 hours

        let minutes = parseInt(diff.asMinutes()); //122360 minutes,but it gives total minutes in given miliseconds which is not expacted.

        minutes = minutes - (days * 24 * 60 + hours * 60); //20 minutes.

        return days < 2 ? `${days} days, ${hours} hours, ${minutes} minutes,` : moment(time).format('YYYY-MM-DD HH:mm')
    }

    renderRow(data) {
        let timeDuration = this.renderTime(data.dateUpdated)
        return (
            <TouchableOpacity style={styles.itemList} onPress={e => this.chatWithUser('tupt', data.sid)}>
                <Text>{data.createdBy}</Text>
                <View style={styles.bottom}>
                    <Text style={styles.textbottom}>{data.friendlyName}</Text>
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
                    dataArray={dataNoti}
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
