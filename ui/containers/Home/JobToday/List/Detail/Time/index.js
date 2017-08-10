import React, { Component } from 'react'
import {
    Container,
    Spinner,
    Text,
    View,
    Content
} from 'native-base'
import material from '~/theme/variables/material'
import styles from './styles'

import Header from '~/ui/components/Header';
import Icon from '~/ui/components/Icon';
import TitleItem from '~/ui/components/TitleItem';
import RowItem from '~/ui/components/RowItem';
import ButtonIcon from '~/ui/components/ButtonIcon';
import Button from '~/ui/components/Button';
import Tasks from './components/Tasks';

export default class extends Component {
    constructor(props){
        super(props);
        this.state={
            done: false,
        }
    }

    onPress(){
        this.setState({
            done: !this.state.done
        })
    }
    render() {
        const { done } = this.state;
        return (
            <Container>
                <Header title='Time tracking' size={20} iconLeft='close' onPress={() => this.props.navigation.goBack()} />
                <Content style={{ backgroundColor: material.grayBackgroundColor }}>
                    <TitleItem title='Start Time' />
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
                    <TitleItem padding={0} title='' />
                    <View collapsable={false} style={{ backgroundColor: '#fff', flexDirection: 'row' }}>
                        <View style={{ ...styles.itemTime, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.txttitledate}> Start </Text>
                            <Text style={styles.date}> --:-- </Text>
                        </View>
                        <View style={{ borderWidth: 0.5, borderColor: material.grayTitle }} />
                        <View style={{ ...styles.itemTime, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.txttitledate}> Finish </Text>
                            <Text style={styles.date}> --:-- </Text>
                        </View>
                    </View>
                    <View center row collapsable={false} style={styles.wrapDuration}>
                        <Text style={styles.txttitledate}> Duration </Text>
                        <Text style={styles.time}> 00:00:00 </Text>
                        <View style={{ width: '15%' }}></View>
                    </View>
                    <Button style={{ flexDirection: 'row', borderRadius: 5, marginTop: 10, justifyContent: 'space-around', width: 250 }}>
                        <View style={{ width: '15%' }}></View>
                        <Text white>CHAT TO ADMIN</Text>
                        <Icon name='chat' size={18} color='#fff' />
                    </Button>
                    <TitleItem title='Your tasks' />
                    <Tasks />
                    <TitleItem title='Pick Up' />
                    <RowItem icon='map' title='47 Elousie Groves Suite 29' />
                    <TitleItem title='Drop Off' />
                    <RowItem icon='map' title='47 Elousie Groves Suite 29' />
                </Content>
                <Button 
                text={!done ? 'START' : 'COMPLETE'} 
                style={{ width: '100%', height: 60, backgroundColor: !done ? material.redColor : material.greenColor }} 
                onPress={()=>this.onPress()}
                />
            </Container>
        )
    }
}