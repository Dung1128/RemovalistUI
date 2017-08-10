import React, { Component } from 'react'
import { Container, Spinner, Text, View, Content, List, ListItem  } from 'native-base'
import material from '~/theme/variables/material'
import styles from './styles'

import Header from '~/ui/components/Header';
import TitleItem from '~/ui/components/TitleItem';
import RowItem from '~/ui/components/RowItem';
import ButtonIcon from '~/ui/components/ButtonIcon';
export default class extends Component {

    render() {
        return (
            <Container>
                <Header title='Call' size={20} iconLeft='close' onPress={() => this.props.navigation.goBack()} />
                {/*<Text style={{ color: material.redColor }}>Building</Text>*/}
                <Content style={{ backgroundColor: material.grayBackgroundColor }}>
                    <TitleItem title='Customer Phone' />
                    <View white style={{ paddingHorizontal: 5 }}>
                        <RowItem icon='user' title='Harry Tran' />
                        <View style={{ borderWidth: 0.5, borderColor: material.grayTitle }} />
                        <RowItem title='84 1675 305 878'
                                 right={
                                     <View row style={{ justifyContent: 'space-between', width: '20%' }}>
                                         <ButtonIcon icon='sms' size={18} color='#fff' />
                                         <ButtonIcon icon='call' size={18} color='#fff' />
                                     </View>
                                 }
                        />
                        <View style={{ borderWidth: 0.5, borderColor: material.grayTitle }} />
                        <RowItem title='84 123 456 78'
                                 right={
                                     <View row style={{ justifyContent: 'space-between', width: '20%' }}>
                                         <ButtonIcon icon='sms' size={18} color='#fff' />
                                         <ButtonIcon icon='call' size={18} color='#fff' />
                                     </View>
                                 }
                        />
                    </View>
                    <TitleItem title='Self Storage' />
                    <View white style={{ paddingHorizontal: 5 }}>
                        <View style={{ borderWidth: 0.5, borderColor: material.grayTitle }} />
                        <RowItem title='84 1675 305 878'
                                 right={
                                     <View row style={{ justifyContent: 'space-between', width: '20%' }}>
                                         <ButtonIcon icon='sms' size={18} color='#fff' />
                                         <ButtonIcon icon='call' size={18} color='#fff' />
                                     </View>
                                 }
                        />
                    </View>
                    <TitleItem title='Home Base' />
                    <View white style={{ paddingHorizontal: 5 }}>
                        <RowItem title='84 1675 305 878'
                                 right={
                                     <View row style={{ justifyContent: 'space-between', width: '20%' }}>
                                         <ButtonIcon icon='sms' size={18} color='#fff' />
                                         <ButtonIcon icon='call' size={18} color='#fff' />
                                     </View>
                                 }
                        />
                        <View style={{ borderWidth: 0.5, borderColor: material.grayTitle }} />
                        <RowItem title='84 1675 305 878'
                                 right={
                                     <View row style={{ justifyContent: 'space-between', width: '20%' }}>
                                         <ButtonIcon icon='sms' size={18} color='#fff' />
                                         <ButtonIcon icon='call' size={18} color='#fff' />
                                     </View>
                                 }
                        />
                    </View>
                </Content>
            </Container>
        )
    }
}