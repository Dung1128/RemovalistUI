import React, { Component } from 'react'
import {
    Container,
    Spinner,
    Text,
    View,
    Content
} from 'native-base'
import { Alert } from 'react-native'
import material from '~/theme/variables/material'
import styles from './styles'

import Header from '~/ui/components/Header';
import Icon from '~/ui/components/Icon';
import TitleItem from '~/ui/components/TitleItem';
import RowItem from '~/ui/components/RowItem';
import ButtonIcon from '~/ui/components/ButtonIcon';
import Button from '~/ui/components/Button';
import Tasks from './components/Tasks';
import moment from 'moment';

export default class extends Component {
    constructor(props){
        super(props);
        this.state={
            done: false,
            JobDetails: this.props.navigation.state.params.JobDetails,
            time: this.props.navigation.state.params.time,
            date: this.props.navigation.state.params.date,
            starttime: '--:--',
            finish: '--:--',
            duration: '00:00',
            durationStart: this.props.navigation.state.params.durationStart
        }
    }

    duration() {
        // let hour = moment(finish).diff(start, 'hour');
        // console.log(hour);
        // let minutes = moment(finish).diff(start, 'minutes');
        // console.log(minutes)
        // let checkMinutes = minutes % 60;
        // let duration = `${hour}: ${checkMinutes != 0 ? checkMinutes : '00'}`;
        // console.log(duration)
        // this.setState({
        //     duration: duration
        // })
        let minutesStart = new Date(this.state.start).getHours() * 60 + new Date(this.state.start).getMinutes();
        let minutesEnd = new Date(this.state.end).getHours() * 60 + new Date(this.state.end).getMinutes();
        let sub = minutesEnd - minutesStart;
        let hour = Math.floor(sub/60);
        let minutes = sub - hour * 60;

        console.log(hour+':'+minutes);

        let showHours = hour > 10 ? hour : '0' + hour;
        let showMinutes = minutes > 10 ? minutes : '0' + minutes;
        this.setState({
            duration: showHours + ':' + showMinutes
        })
    }

    actionStart() {
        Alert.alert('Notify', 'Are you sure start job?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'OK', onPress: () => {
                        const starttime = moment(new Date()).format("HH:mm");
                        const start = new Date()
                        this.setState({ 
                            done: !this.state.done,
                            starttime: starttime,
                            start: start
                        })
                        console.log('Ok Pressed');
                        console.log(starttime)
                    }
                },
            ],
            { cancelable: false }
        );
    }

    actionComplete() {
        Alert.alert('Notify', 'Are you sure complete job?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'OK', onPress: () => {
                        console.log('Cancel Pressed');
                        const end = new Date();
                        const finish = moment(new Date()).format("HH:mm");
                        this.setState({ 
                            done: !this.state.done,
                            finish: finish,
                            end: end
                        }, ()=>{this.duration()})
                        
                    }
                },
            ],
            { cancelable: false }
        );
    }

    onPress(){
        !this.state.done ? this.actionStart() : this.actionComplete()
    }
    render() {
        console.log(this.state.JobDetails)
        console.log(this.state.time)
        const { done, time, date, starttime, finish, duration, durationStart } = this.state;
        return (
            <Container>
                <Header title='Time tracking' size={20} iconLeft='close' onPress={() => this.props.navigation.goBack()} />
                <Content style={{ backgroundColor: material.grayBackgroundColor }}>
                    <TitleItem title='Start Time' />
                    <View collapsable={false} style={{ backgroundColor: '#fff', flexDirection: 'row' }}>
                        <View style={styles.itemTime}>
                            <Text style={styles.txttitledate}>Date</Text>
                            <Text style={styles.date}>{date}</Text>
                            <Text style={styles.txttitledate}>Today</Text>
                        </View>
                        <View style={{ borderWidth: 0.5, borderColor: material.grayTitle }} />
                        <View style={styles.itemTime}>
                            <Text style={styles.txttitledate}>Time</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.date}>{time}</Text>
                            </View>
                            <Text style={styles.txttitledate}>{durationStart}</Text>
                        </View>
                    </View>
                    <TitleItem padding={0} title='' />
                    <View collapsable={false} style={{ backgroundColor: '#fff', flexDirection: 'row' }}>
                        <View style={{ ...styles.itemTime, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.txttitledate}> Start </Text>
                            <Text style={styles.date}>{starttime}</Text>
                        </View>
                        <View style={{ borderWidth: 0.5, borderColor: material.grayTitle }} />
                        <View style={{ ...styles.itemTime, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.txttitledate}> Finish </Text>
                            <Text style={styles.date}>{finish}</Text>
                        </View>
                    </View>
                    <View center row collapsable={false} style={styles.wrapDuration}>
                        <Text style={styles.txttitledate}> Duration </Text>
                        <Text style={styles.time}>{duration}</Text>
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
                        <RowItem icon='map' title={this.state.JobDetails.JobLocations[0].AddressLine1} />
                    <TitleItem title='Drop Off' />
                    <RowItem icon='map' title={this.state.JobDetails.JobLocations[1].AddressLine1} />
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