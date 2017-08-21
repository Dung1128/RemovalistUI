import React, { Component } from 'react'
import { Container, Spinner, Text, View } from 'native-base'
import material from '~/theme/variables/material'
import styles from './styles'

import Header from '~/ui/components/Header';
import TitleItem from '~/ui/components/TitleItem';
import InputRow from '~/ui/elements/InputRow';
import InfoTally from './components/InfoTally'

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
           colorStatus: 'pink'
        }
    
    }

    render() {
        return (
            <Container>
                <Header title='Tally' textright='EDIT' size={20} iconLeft='close' onPress={() => this.props.navigation.goBack()} />
                <View style={{...styles.status, backgroundColor: this.state.colorStatus }}>
                    <Text>Status</Text>
                    <Text>Unpaid</Text>
                </View>
                <TitleItem title='Payment Method' />
                <InputRow hint='Cash' nameIcon='cash'/>
                <InputRow hint='EFTPOS' nameIcon='pos'/>
                <InputRow hint='Credit' nameIcon='tally'/>
                <View style={styles.contentTally}>
                    <InfoTally />
                </View>
            </Container>
        )
    }
}