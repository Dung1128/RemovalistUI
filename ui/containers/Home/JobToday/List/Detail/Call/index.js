import React, { Component } from 'react'
import { Container, Spinner, Text, View, Content, List, ListItem  } from 'native-base'
import material from '~/theme/variables/material'
import styles from './styles'
import { connect } from 'react-redux'
import Header from '~/ui/components/Header';
import TitleItem from '~/ui/components/TitleItem';
import RowItem from '~/ui/components/RowItem';
import ButtonIcon from '~/ui/components/ButtonIcon';
import * as jobActions from '~/store/actions/job'
import Communications from 'react-native-communications'
const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9EZzFPVVF4UmpZelJEZzVSakUzT0RBME5UUkZRa1pHUkRJd016ZERPRFl4TmpRd09UaEdSUSJ9.eyJpc3MiOiJodHRwczovL3R1YW5wbDEuYXUuYXV0aDAuY29tLyIsInN1YiI6ImVvc29UR3FCMHZwNWlsS1dWMGcxclZmaVBFMGRaWnVGQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3R1YW5wbDF0ZXN0IiwiZXhwIjoxNTExMDg3NDQ0LCJpYXQiOjE1MDI0NDc0NDQsInNjb3BlIjoiIn0.U3xQQLeGTFuzr-37PXefhZnynHWYUx7Ow_SuBfb8FM2S3cxAQdk6WN14bPKqSKaAsbMU7Sd6VsvTFDtlSRrkDmghfNNIQ7eTD8qECZ6N94XePH-oggOM7PDUVsWzTT5t5279w-8PFc5NjByPiptu-hvAV2JAR0tJd_UDJHF-tArnYeq99v_bftkdhngd_JblRJBC6oDqaAGPaAQa4SCL0aG3WxUXVz1CeLywyKUBYVE88RWC-GWlnwozBcegqku5BRP4zzlJmY3Xw73Bdj8zEt5aQtl_rc3EaG2mwFtUMokBNxUAqzHtG3WCFgCxb2463EvyCqJQHlwAFnzGYFwqDg'

@connect(
  state => ({
  }), { ...jobActions }
)

export default class extends Component {
        constructor(props) {
        super(props);
        this.state = {
            dataReference: [],
            JobDetails: this.props.navigation.state.params.dataCall
        };
    }

    componentDidMount() {
        this.props.getReferenceContactList(accessToken, (error, data) => {
            console.log(error)
            console.log(data.ReferContacts[0].Mobile)
            if(data)
            this.setState({
                dataReference: data.ReferContacts
            })
        })
    }
    renderPhone(item, index) {
        return (<RowItem key={index} title={item}
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

    render() {
        const { JobDetails } = this.state;
        console.log(this.state.dataReference)
        return (
            <Container>
                <Header title='Call' size={20} iconLeft='close' onPress={() => this.props.navigation.goBack()} />
                {/*<Text style={{ color: material.redColor }}>Building</Text>*/}
                <Content style={{ backgroundColor: material.grayBackgroundColor }}>
                    <TitleItem title='Customer Info' />
                        <View white style={{ paddingHorizontal: 5 }}>
                            <RowItem icon='user' title={JobDetails.Contact[0].CompanyName} />
                            <View style={{ borderWidth: 0.5, borderColor: material.grayTitle }} />
                            {
                                JobDetails.Contact[0].Phone.map((item, index) => this.renderPhone(item, index))
                            }
         
                        </View>
                 
                    <TitleItem title='Self Storage' />
                        {
                            this.state.dataReference.length !== 0 && this.state.dataReference[0].Phone.map((item, index) => this.renderPhone(item, index))
                        }
                            
                    <View white style={{ paddingHorizontal: 5 }}>
                        <View style={{ borderWidth: 0.5, borderColor: material.grayTitle }} />
                        <View style={{ borderWidth: 0.5, borderColor: material.grayTitle }} />
                            
                    </View>
                    <TitleItem title='Home Base' />
                    <View white style={{ paddingHorizontal: 5 }}>
                        {
                            this.state.dataReference.length === 2 && this.state.dataReference[1].Phone.map((item, index) => this.renderPhone(item, index))
                        }
                    </View>
                </Content>
            </Container>
        )
    }
}