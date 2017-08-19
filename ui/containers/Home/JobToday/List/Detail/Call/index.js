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
const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9EZzFPVVF4UmpZelJEZzVSakUzT0RBME5UUkZRa1pHUkRJd016ZERPRFl4TmpRd09UaEdSUSJ9.eyJpc3MiOiJodHRwczovL3R1YW5wbDEuYXUuYXV0aDAuY29tLyIsInN1YiI6InJRcXY0UTBRQXdnQkJwM0k2TlM0NTBhcFh1UWhwN3hHQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3R1YW5wbDF0ZXN0IiwiZXhwIjoxNTAzMjI5MTI4LCJpYXQiOjE1MDMxNDI3MjgsInNjb3BlIjoiIn0.lJK0SvaoViNdldy8Nx3YS1tOfb4knza41OrpNiSQB_x9fYxnk2gf7UpT8bmjIzT6VP7D-zZ0psdpwCyLaZj-5aYM5pv80C1vo756w_MO8ZHSURIp4ZCDe2ANIOzTPYCpCeab1J2JqQl6amzNoRW05FsHpuC6cjOGKw2ftbgnczaD6bU8Uc3ualofXNCgG9tsNE4yqtfaR-xiAVlh15-dMSksEC-AZOLuoGLHhq_4TEI8X1mozOlPrBXrcLq3ggYbh2LYSOG7bGuAz-76wPvm8OO_oIGSOlHubqLY4habTRmZX63ch_EGoNsKS0vMqeujzOxK-BGvxIDMPKST377mAg'

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