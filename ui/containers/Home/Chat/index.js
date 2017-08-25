import React, { Component } from 'react';
import {
    View,
    Alert,
    ListView,
    RefreshControl,
    TextInput,
    TouchableOpacity
} from 'react-native';

import material from '~/theme/variables/material'
import {
    Container,
    Button,
    Text,
    List,
    Item,
    Input,
    Content
} from 'native-base';
import styles from './styles';
import SearchBar from '~/ui/components/SearchBar';
import Icon from '~/ui/components/Icon';
import Header from '~/ui/components/Header';

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
            dataSource: dataNoti,
            isRefreshing: false,
        };
    }

    chatWithUser(username) {
        this.props.navigation.navigate('detail_chat_screen', { username })
    }

    renderRow(data) {
        return (
            <TouchableOpacity style={styles.itemList} onPress={e => this.chatWithUser('tupt')}>
                <Text>{data.content}</Text>
                <View style={styles.bottom}>
                    <Text style={styles.textbottom}>{data.status}</Text>
                    <Text style={styles.textbottom}>{data.time}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const { dataSource } = this.state;
        console.log(dataSource, 'data')
        return (
            <Container>
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
                <List
                    style={styles.containers}
                    refreshControl={
                        <RefreshControl
                            colors={['#039BE5']}
                            tintColor='#fff'
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
