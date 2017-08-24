import React, { Component } from 'react';
import {
    TouchableOpacity,
    Linking
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
import Loading from '~/ui/components/Loading';
import * as jobActions from '~/store/actions/job'
import * as jobSelectors from '~/store/selectors/job'
import { accessToken } from '~/store/constants/api'
import Communications from 'react-native-communications'
import moment from 'moment';
@connect(state => ({}), { ...jobActions })
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            JobDetails: '',
            Delivery: '',
            ready: false,
            data: this.props.navigation.state.params
        }
        this.navigated = false
    }


    componentDidMount() {
        const obj = this.state.data
        this.renderTime(obj.TimeStart, obj.TimeEnd);
        this.props.getJobById(this.state.data.JobDetailsId, accessToken, (error, data) => {
            if (data) {
                this.setState({
                    JobDetails: data.JobDetails,
                    ready: true
                })
                this.props.getDeliveryJob(this.state.id, accessToken, (error, data) => {
                    this.setState({
                        Delivery: data.Delivery
                    })
                })

            }
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
    getLocation(lat, lon) {
        const url = `https://www.google.com/maps/place/` + lat + `,` + lon
        return Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                return Promise.reject(new Error(`Could not open the url: ${url}`))
            } else {
                return Linking.openURL(url)
            }
        })
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
                onPress={() => this.getLocation(-33.1604285, 151.6230669)}
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
        let hour = Math.floor(sub / 60);
        let minutes = sub - hour * 60;

        let showHours = hour > 10 ? hour : '0' + hour;
        let showMinutes = minutes > 10 ? minutes : '0' + minutes;

        this.setState({
            date: day,
            time: `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`,
            duration: 'Duration: ' + showHours + ':' + showMinutes + ' h'
        })
    }

    render() {
        const { JobDetails, date, time, duration, data, Delivery } = this.state;
        const { CompanyName, Phone, Email } = JobDetails && JobDetails.Contact[0] ? JobDetails.Contact[0] : {};


        return (

            <Container>
                <Header title='Job details' textright='EDIT' iconLeft='back' onPress={() => this.props.navigation.goBack()} />

                <Content style={{ backgroundColor: material.grayBackgroundColor }}>

                    <TitleItem title='Status' />
                    <View onPress={() => this.showDetail()} activeOpacity={1} style={styles.wrapItems} >
                        <StatusItem color={`#${data.StatusColor}`} />
                        <View centerVertical style={styles.item}>
                            <Text>{data.StatusName}</Text>
                        </View>
                    </View>
                    <TitleItem title='Customer Info' />
                    <View white style={{ paddingHorizontal: 5 }}>
                        <RowItem icon='user' title={CompanyName} />

                        {
                            Phone && Phone.map((item, index) => this.renderPhone(item, index))
                        }

                        <RowItem icon='email' title={Email} />
                    </View>
                    {
                        JobDetails.StatusId == 3 ? <TitleItem title='Start Time'
                            right={
                                <View row style={{ justifyContent: 'space-between', width: '25%' }}>
                                    <ButtonIcon icon='direction' size={18} color='#fff'
                                        onPress={() => this.props.navigation.navigate('time_screen', { JobDetails, time, date: new Date(date).toDateString(), durationStart: duration, Delivery })} />
                                    <Text style={styles.textUp}>START</Text>
                                </View>
                            }
                        />
                            :
                            <TitleItem title='Start Time' />
                    }

                    <View collapsable={false} style={{ backgroundColor: '#fff', flexDirection: 'row' }}>
                        <View style={styles.itemTime}>
                            <Text style={styles.txttitledate}>Date</Text>
                            <Text style={styles.date}>{moment(date).format("ddd, MMM DD")}</Text>
                        </View>

                        <View style={styles.itemTime}>
                            <Text style={styles.txttitledate}>Time</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.date}>{time}</Text>
                            </View>
                            <Text style={styles.txttitledate}>{duration}</Text>
                        </View>
                    </View>
                    <TitleItem title='Truck' />
                    <View white style={{ paddingHorizontal: 5 }}>
                        <RowItem icon='truck' title={data.TruckName} />
                    </View>
                    {
                        JobDetails ? JobDetails.JobLocations.map((item, index) => this.renderJobLocation(item, index)) : null
                    }
                </Content>

                <View full row style={{ backgroundColor: '#fff', height: 50, justifyContent: 'space-around', borderTopWidth: 0.5, borderColor: material.grayBackgroundColor }} >
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('time_screen',
                        { JobDetails, time, date: new Date(date).toDateString(), durationStart: duration, Delivery: this.state.Delivery })}
                    >
                        <Icon name='time' size={22} color={material.grayIconColor} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('call_screen', { dataCall: JobDetails })}>
                        <Icon name='call' size={22} color={material.grayIconColor} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('chat_screen')}>
                        <Icon name='chat' size={22} color={material.grayIconColor} />
                        <View style={{ backgroundColor: 'red', width: 4, height: 4, borderRadius: 4 / 2, position: 'absolute', top: -5, right: -8 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('tally_screen', { JobDetails: this.state.JobDetails })}>
                        <Icon name='tally' size={22} color={material.grayIconColor} />
                    </TouchableOpacity>
                </View>
                <Loading />
            </Container>
        )
    }
}