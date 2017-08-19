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
    Content,
    Spinner
} from 'native-base';
import { connect } from 'react-redux'

import material from '~/theme/variables/material'
import Icon from '~/ui/components/Icon';
import Header from '~/ui/components/Header';
import TitleItem from '~/ui/components/TitleItem';
import StatusItem from '~/ui/components/StatusItem';
import RowItem from '~/ui/components/RowItem';
import ButtonIcon from '~/ui/components/ButtonIcon';
import Info from '~/ui/elements/Info';
import styles from './styles'

import * as jobActions from '~/store/actions/job'
import * as jobSelectors from '~/store/selectors/job'
const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9EZzFPVVF4UmpZelJEZzVSakUzT0RBME5UUkZRa1pHUkRJd016ZERPRFl4TmpRd09UaEdSUSJ9.eyJpc3MiOiJodHRwczovL3R1YW5wbDEuYXUuYXV0aDAuY29tLyIsInN1YiI6InJRcXY0UTBRQXdnQkJwM0k2TlM0NTBhcFh1UWhwN3hHQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3R1YW5wbDF0ZXN0IiwiZXhwIjoxNTAzMjI5MTI4LCJpYXQiOjE1MDMxNDI3MjgsInNjb3BlIjoiIn0.lJK0SvaoViNdldy8Nx3YS1tOfb4knza41OrpNiSQB_x9fYxnk2gf7UpT8bmjIzT6VP7D-zZ0psdpwCyLaZj-5aYM5pv80C1vo756w_MO8ZHSURIp4ZCDe2ANIOzTPYCpCeab1J2JqQl6amzNoRW05FsHpuC6cjOGKw2ftbgnczaD6bU8Uc3ualofXNCgG9tsNE4yqtfaR-xiAVlh15-dMSksEC-AZOLuoGLHhq_4TEI8X1mozOlPrBXrcLq3ggYbh2LYSOG7bGuAz-76wPvm8OO_oIGSOlHubqLY4habTRmZX63ch_EGoNsKS0vMqeujzOxK-BGvxIDMPKST377mAg'

import Communications from 'react-native-communications'
import moment from 'moment';
@connect(state => ({
    listStatus: jobSelectors.getStatusJobList(state),
    listTruck: jobSelectors.getTruckList(state),
}), { ...jobActions })
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StatusName: '',
            JobStatusColor: 'fff',
            JobDetails: '',
            Delivery: '',
            ready: false,
            id: this.props.navigation.state.params.id
        }
        console.log('jpbID' + this.props.navigation.state.params.id)
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

    renderTruck(id) {
        const arr = this.props.listTruck
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].TruckId == id) {
                this.setState({
                    TruckName: arr[i].TruckName,
                })
            }
        }
    }

    componentDidMount() {
        this.props.getJobById(this.state.id, accessToken, (error, data) => {
            console.log(data)
            this.renderStatus(data.JobDetails.StatusId);
            this.renderTruck(data.JobDetails.TruckId)
            this.setState({
                JobDetails: data.JobDetails,
                ready: true
            })
            this.props.getDeliveryJob(this.state.id, accessToken, (error, data) => {
                console.log('Delivery:' + data)
                this.setState({
                    Delivery: data.Delivery
                })
            })
        
            console.log(data.JobDetails.TimeStart, data.JobDetails.TimeEnd)
            this.renderTime(data.JobDetails.TimeStart, data.JobDetails.TimeEnd);
        })
    }

    renderPhone(item, index) {
        return (<RowItem key={index} icon='call' title={item}
            right={
                <View row style={{ justifyContent: 'space-between', width: '20%' }}>
                    <ButtonIcon icon='sms' size={18} color='#fff' 
                        onPress={() => Communications.text(item, 'hello, im dung')}
                    />
                    <ButtonIcon icon='call' size={18} color='#fff' 
                    onPress={() => Communications.phonecall(item, true)}
                        />
                </View>
                
            }
        />)
    }
    renderJobLocation(item, index) {
        return (
            <Info
                key={index}
                title={item.IsPickUp ? 'Pick Up' : 'Drop Off'}
                time={moment(item.Time).format("HH:mm")}
                address1={item.AddressLine1}
                address2={item.AddressLine2}
                note={item.Notes}
            />

        )
    }

    renderTime(start, end) {
        const day = new Date(start).toLocaleDateString()
        // const month = new Date(start).getMonth() + 1;
        // const day = new Date(start).getDate();
        const hourStart = (new Date(start).getHours());
        const hourEnd = (new Date(end).getHours());
        const minutesStart = new Date(start).getMinutes();
        const minutesEnd = new Date(end).getMinutes();
        var diff = Math.abs(start - end);

        let minutesStartValue = new Date(start).getHours() * 60 + new Date(start).getMinutes();
        let minutesEndValue = new Date(end).getHours() * 60 + new Date(end).getMinutes();
        let sub = minutesEndValue - minutesStartValue;
        let hour = Math.floor(sub/60);
        let minutes = sub - hour * 60;

        console.log(hour+':'+minutes);

        let showHours = hour > 10 ? hour : '0' + hour;
        let showMinutes = minutes > 10 ? minutes : '0' + minutes;

        this.setState({
            date: day,
            time: `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`,
            duration: 'Duration: ' + showHours + ':' + showMinutes + ' h'
        }, ()=> console.log(this.state.time))
    }

    render() {
        const { StatusName, JobStatusColor, JobDetails, date, time, duration } = this.state;
        return (

            <Container>
                <Header title='Job details' iconLeft='back' onPress={() => this.props.navigation.goBack()} />
                {
                    this.state.ready ?
                        <Container>
                            <Content style={{ backgroundColor: material.grayBackgroundColor }}>
                                <TitleItem title='Status' />
                                <View onPress={() => this.showDetail()} activeOpacity={1} style={styles.wrapItems} >
                                    <StatusItem color={`#${JobStatusColor}`} />
                                    <View centerVertical style={styles.item}>
                                        <Text>{StatusName}</Text>
                                    </View>
                                </View>
                                <TitleItem title='Customer Info' />
                                <View white style={{ paddingHorizontal: 5 }}>
                                    <RowItem icon='user' title={JobDetails.Contact[0].CompanyName} />
                                    
                                    {
                                        JobDetails.Contact[0].Phone.map((item, index) => this.renderPhone(item, index))
                                    }
                                    
                                    <RowItem icon='email' title={JobDetails.Contact[0].Email} />
                                </View>
                                {
                                    this.state.JobDetails.StatusId == 3 ? <TitleItem title='Start Time'
                                    right={
                                        <View row style={{ justifyContent: 'space-between', width: '25%' }}>
                                            <ButtonIcon icon='direction' size={18} color='#fff' onPress={()=> this.props.navigation.navigate('time_screen', {JobDetails: this.state.JobDetails, time: time, date: new Date(date).toDateString(), durationStart: duration, Delivery: this.state.Delivery} )}/>
                                            <Text style={styles.textUp}>START</Text>
                                        </View>
                                    }
                                />
                                :
                                    <TitleItem title='Start Time'/>
                                }
                                
                                <View collapsable={false} style={{ backgroundColor: '#fff', flexDirection: 'row' }}>
                                    <View style={styles.itemTime}>
                                        <Text style={styles.txttitledate}>Date</Text>
                                        <Text style={styles.date}>{new Date(date).toDateString()}</Text>
                                        <Text style={styles.txttitledate}>Today</Text>
                                    </View>
                                    
                                    <View style={styles.itemTime}>
                                        <Text style={styles.txttitledate}>Time</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.date}>{time}</Text>
                                        </View>
                                        <Text style={styles.txttitledate}>{this.state.duration}</Text>
                                    </View>
                                </View>
                                <TitleItem title='Truck' />
                                <View white style={{ paddingHorizontal: 5 }}>
                                    <RowItem icon='truck' title={this.state.TruckName} />
                                </View>
                                {
                                    JobDetails.JobLocations.map((item, index) => this.renderJobLocation(item, index))
                                }
                            </Content>

                            <View full row style={{ backgroundColor: '#fff', height: 50, justifyContent: 'space-around', borderTopWidth: 0.5, borderColor: material.grayBackgroundColor }} >
                                <TouchableOpacity onPress={() => {
                                        if(!this.navigated) {
                                             this.props.navigation.navigate('time_screen', {JobDetails: this.state.JobDetails, time: time, date: new Date(date).toDateString(), durationStart: duration, Delivery: this.state.Delivery} )}
                                             this.navigated = true
                                             setTimeout(() => {
                                                this.navigated = false
                                             }, 2000)
                                        }
                                    }
                                    >
                                   
                                    <Icon name='time' size={22} color={material.grayIconColor} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                        if(!this.navigated) {
                                            this.props.navigation.navigate('call_screen', {dataCall: JobDetails})}
                                            this.navigated = true
                                            setTimeout(() => {
                                                this.navigated = false
                                            }, 2000)
                                        }
                                    }>
                                    <Icon name='call' size={22} color={material.grayIconColor} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    if(!this.navigated) {
                                        this.props.navigation.navigate('chat_screen')}
                                        this.navigated = true
                                        setTimeout(() => {
                                            this.navigated = false
                                        }, 2000)
                                    }
                                }>
                                    <Icon name='chat' size={22} color={material.grayIconColor} />
                                    <View style={{ backgroundColor: 'red', width: 4, height: 4, borderRadius: 4 / 2, position: 'absolute', top: -5, right: -8 }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                        if(!this.navigated) {
                                            this.props.navigation.navigate('tally_screen')}
                                            this.navigated = true
                                            setTimeout(() => {
                                                this.navigated = false
                                            }, 2000)
                                        }
                                    }>
                                    <Icon name='tally' size={22} color={material.grayIconColor} />
                                </TouchableOpacity>
                            </View>
                        </Container>
                        :
                        <Spinner color={material.bgColor} />}
            </Container>
        )
    }
}