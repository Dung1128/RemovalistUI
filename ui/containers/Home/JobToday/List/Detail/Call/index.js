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
import { accessToken } from '~/store/constants/api'
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