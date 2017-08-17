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
const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9EZzFPVVF4UmpZelJEZzVSakUzT0RBME5UUkZRa1pHUkRJd016ZERPRFl4TmpRd09UaEdSUSJ9.eyJpc3MiOiJodHRwczovL3R1YW5wbDEuYXUuYXV0aDAuY29tLyIsInN1YiI6ImVvc29UR3FCMHZwNWlsS1dWMGcxclZmaVBFMGRaWnVGQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3R1YW5wbDF0ZXN0IiwiZXhwIjoxNTExMDg3NDQ0LCJpYXQiOjE1MDI0NDc0NDQsInNjb3BlIjoiIn0.U3xQQLeGTFuzr-37PXefhZnynHWYUx7Ow_SuBfb8FM2S3cxAQdk6WN14bPKqSKaAsbMU7Sd6VsvTFDtlSRrkDmghfNNIQ7eTD8qECZ6N94XePH-oggOM7PDUVsWzTT5t5279w-8PFc5NjByPiptu-hvAV2JAR0tJd_UDJHF-tArnYeq99v_bftkdhngd_JblRJBC6oDqaAGPaAQa4SCL0aG3WxUXVz1CeLywyKUBYVE88RWC-GWlnwozBcegqku5BRP4zzlJmY3Xw73Bdj8zEt5aQtl_rc3EaG2mwFtUMokBNxUAqzHtG3WCFgCxb2463EvyCqJQHlwAFnzGYFwqDg'
import Communications from 'react-native-communications'

@connect(state => ({
    listStatus: jobSelectors.getStatusJobList(state)
}), { ...jobActions })
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StatusName: '',
            JobStatusColor: 'fff',
            JobDetails: '',
            ready: false,
            id: this.props.navigation.state.params.id
        }
        console.log('jpbID' + this.props.navigation.state.params.id)
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

    componentDidMount() {
        this.props.getJobById(this.state.id, accessToken, (error, data) => {
            console.log(data)
            this.renderStatus(data.JobDetails.StatusId);
            this.setState({
                JobDetails: data.JobDetails,
                ready: true
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
                time={item.Time}
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
        const hourStart = new Date(start).getHours();
        const hourEnd = new Date(end).getHours();
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
            time: `${hourStart}:${minutesStart} - ${hourEnd}:${minutesEnd}`,
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
                                    <View style={{ borderWidth: 0.5, borderColor: material.grayTitle }} />
                                    {
                                        JobDetails.Contact[0].Phone.map((item, index) => this.renderPhone(item, index))
                                    }
                                    <View style={{ borderWidth: 0.5, borderColor: material.grayTitle }} />
                                    <RowItem icon='email' title={JobDetails.Contact[0].Email} />
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
                                        <Text style={styles.date}>{new Date(date).toDateString()}</Text>
                                        <Text style={styles.txttitledate}>Today</Text>
                                    </View>
                                    <View style={{ borderWidth: 0.5, borderColor: material.grayTitle }} />
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
                                    <RowItem icon='truck' title='Truck 1' />
                                </View>
                                {
                                    JobDetails.JobLocations.map((item, index) => this.renderJobLocation(item, index))
                                }
                            </Content>

                            <View full row style={{ backgroundColor: '#fff', height: 50, justifyContent: 'space-around', borderTopWidth: 0.5, borderColor: material.grayBackgroundColor }} >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('time_screen', {JobDetails: this.state.JobDetails, time: time, date: new Date(date).toDateString(), durationStart: duration} )}>
                                    <Icon name='time' size={22} color={material.grayIconColor} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('call_screen', {dataCall: JobDetails})}>
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
                        :
                        <Spinner color={material.redColor} style={{ marginTop: '50%' }} />}
            </Container>
        )
    }
}