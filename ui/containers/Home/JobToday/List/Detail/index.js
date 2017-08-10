import React, { Component } from 'react';
import {
    TouchableOpacity
} from 'react-native';
import {
    Container,
    Left,
    Right,
    Text,
    View,
    Title,
    Button,
    Content
} from 'native-base';
import material from '~/theme/variables/material'
import Icon from '~/ui/components/Icon';
import Header from '~/ui/components/Header';
import TitleItem from '~/ui/components/TitleItem';
import StatusItem from '~/ui/components/StatusItem';
import RowItem from '~/ui/components/RowItem';
import ButtonIcon from '~/ui/components/ButtonIcon';
import Info from '~/ui/elements/Info';
import styles from './styles'
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <Container>
                <Header title='Job details' iconLeft='back' onPress={() => this.props.navigation.goBack()} />
                <Content style={{ backgroundColor: material.grayBackgroundColor }}>
                    <TitleItem title='Status' />
                    <View onPress={() => this.showDetail()} activeOpacity={1} style={styles.wrapItems} >
                        <StatusItem color={material.redColor} />
                        <View centerVertical style={styles.item}>
                            <Text>Eniquiry</Text>
                        </View>
                    </View>
                    <TitleItem title='Customer Info' />
                    <View white style={{ paddingHorizontal: 5 }}>
                        <RowItem icon='user' title='Harry Tran' />
                        <View style={{ borderWidth: 0.5, borderColor: material.grayTitle }} />
                        <RowItem icon='call' title='84 1234 567 890'
                            right={
                                <View row style={{ justifyContent: 'space-between', width: '20%' }}>
                                    <ButtonIcon icon='sms' size={18} color='#fff' />
                                    <ButtonIcon icon='call' size={18} color='#fff' />
                                </View>
                            }
                        />
                        <View style={{ borderWidth: 0.5, borderColor: material.grayTitle }} />
                        <RowItem icon='email' title='minhchien@gmail.com' />
                    </View>
                    <TitleItem title='Start Time'
                        right={
                            <View row style={{ justifyContent: 'space-between', width: '25%' }}>
                                <ButtonIcon icon='direction' size={18} color='#fff' />
                                <Text style={styles.textUp}>START</Text>
                            </View>
                        }
                    />
                    <View collapsable={false} style={{ backgroundColor: '#fff', flexDirection: 'row' }}>
                        <View style={styles.itemTime}>
                            <Text style={styles.txttitledate}>Date</Text>
                            <Text style={styles.date}>Mon, Jun 01</Text>
                            <Text style={styles.txttitledate}>Today</Text>
                        </View>
                        <View style={{ borderWidth: 0.5, borderColor: material.grayTitle }} />
                        <View style={styles.itemTime}>
                            <Text style={styles.txttitledate}>Time</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.date}>9:00 -</Text>
                                <Text style={styles.date}>{' '}10:00</Text>
                            </View>
                            <Text style={styles.txttitledate}>Duration: 6 h</Text>
                        </View>
                    </View>
                    <TitleItem title='Truck' />
                    <View white style={{ paddingHorizontal: 5 }}>
                        <RowItem icon='truck' title='Truck 1' />
                    </View>
                    <Info
                    title='Pick Up'
                    time='9:00'
                    map='47 Elousie Groves Suite 29'
                    note='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
                    />
                    <Info
                    title='Drop Off'
                    time='9:00'
                    map='47 Elousie Groves Suite 29'
                    note='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
                    />
                </Content>

                <View full row style={{ backgroundColor: '#fff', height: 50, justifyContent: 'space-around', borderTopWidth: 0.5, borderColor: material.grayBackgroundColor }} >
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('time_screen')}>
                        <Icon name='time' size={22} color={material.grayIconColor} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('call_screen')}>
                        <Icon name='call' size={22} color={material.grayIconColor} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('chat_screen')}>
                        <Icon name='chat' size={22} color={material.grayIconColor} />
                        <View style={{ backgroundColor: 'red', width: 4, height: 4, borderRadius: 4 / 2, position: 'absolute', top: -5, right: -8 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('tally_screen')}>
                        <Icon name='tally' size={22} color={material.grayIconColor} />
                    </TouchableOpacity>
                </View>
            </Container>
        )
    }
}