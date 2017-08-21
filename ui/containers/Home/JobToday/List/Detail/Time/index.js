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
import { connect } from 'react-redux'

import * as jobActions from '~/store/actions/job'
import { accessToken } from '~/store/constants/api'
@connect(state => ({
}), { ...jobActions })


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
            durationStart: this.props.navigation.state.params.durationStart,
            Delivery: this.props.navigation.state.params.Delivery
        }

        this.dataDeliveryUpdate = {
            TruckId: '',
            StartTime: '',
            FinishTime: '',
            JobDetailsId: '',
            Task: [],
            DeliveryId: ''
        }

        this.dataDeliveryCreate = {
            TruckId: '',
            StartTime: '',
            JobDetailsId: '',
            Task: [],
        }

       
    }

    componentDidMount() {
        // console.log('dammmmme'+this.state.Delivery.DeliveryId)
         if(this.state.Delivery) {
            this.setState({
             done: true,
             starttime: (new Date(this.state.Delivery.StartTime).getHours() - 14) + ':' +new Date(this.state.Delivery.StartTime).getMinutes(),
             start: new Date(this.state.Delivery.StartTime),
            })
         } 

         if(this.state.Delivery && this.state.Delivery.FinishTime){
            this.setState({
             disable: true,
             finish: (new Date(this.state.Delivery.FinishTime).getHours() - 14) + ':' +new Date(this.state.Delivery.FinishTime).getMinutes(),
            })
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
        let minutesStart = (new Date(this.state.start).getHours() - 7) * 60 + new Date(this.state.start).getMinutes();
        let minutesEnd = (new Date(this.state.end).getHours()-7) * 60 + new Date(this.state.end).getMinutes();
        
        let sub = minutesEnd - minutesStart;
        let hour = Math.floor(sub/60);
        console.log(hour)

        let minutes = sub - hour * 60;

        console.log(hour+':'+minutes);

        let showHours = hour > 10 ? hour : '0' + hour;
        let showMinutes = minutes > 10 ? minutes : '0' + minutes;
        this.setState({
            duration: showHours + ':' + showMinutes
        })

        this.dataDeliveryUpdate = {
            TruckId: this.state.JobDetails.TruckId,
            StartTime: this.state.start,
            JobDetailsId: this.state.JobDetails.JobDetailsId,
            Tasks: [],
            FinishTime: this.state.end,
            DeliveryId: 8
        }
        console.log('cai dinh menh: ' + this.dataDeliveryUpdate.DeliveryId)
        this.updateStaus = {
                JobDetailsId: this.state.JobDetails.JobDetailsId,
                StatusId: 5
            }

        this.props.postDeliveryUpdate(this.dataDeliveryUpdate, accessToken, (error, data) => {
                            console.log(data)
                            this.props.updateStatusJob(this.updateStaus, accessToken, (error, data) =>{
                                this.props.navigation.navigate('jobtoday_screen')
                            })
                            
                        })


        
    }

    actionStart() {
        Alert.alert('Notify', 'Are you sure start job?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'OK', onPress: () => {
                        let starttime = moment(new Date()).format("HH:mm");
                        let start = new Date()
                        this.setState({ 
                            done: !this.state.done,
                            starttime: starttime,
                            start: start
                        })
                        console.log('Ok Pressed');
                        console.log(starttime)
                        this.dataDeliveryCreate = {
                            TruckId: this.state.JobDetails.TruckId,
                            StartTime: start,
                            JobDetailsId: this.state.JobDetails.JobDetailsId,
                            Tasks: [],
                        }
                        this.updateStaus = {
                            JobDetailsId: this.state.JobDetails.JobDetailsId,
                            StatusId: 4
                        }
                        
                        this.props.postDeliveryCreate(this.dataDeliveryCreate, accessToken, (error, data) => {
                            console.log(data)
                            this.props.updateStatusJob(this.updateStaus, accessToken, (error, data) =>{
                                this.props.navigation.navigate('jobtoday_screen')
                            })
                            
                        })
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
                        let end = new Date();
                        let finish = moment(new Date()).format("HH:mm");
                        this.setState({ 
                            done: !this.state.done,
                            finish: finish,
                            end: end,
                            Delivery:{FinishTime: finish}
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
        console.log(this.state.Delivery)
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
                {
                    this.state.JobDetails.StatusId > 2 ? 
                    <Button 
                        text={!done ? 'START' : 'COMPLETE'} 
                    style={{ width: '100%', height: 60, backgroundColor: !done ? material.redColor : material.greenColor }} 

                    onPress={()=>this.onPress()}
                    />
                    :
                    <View />
                }
                
            </Container>
        )
    }
}