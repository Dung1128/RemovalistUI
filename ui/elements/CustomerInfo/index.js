import React, { Component } from 'react';
import { Text } from 'react-native';
import { View, Input } from 'native-base';

import InputRow from '../InputRow';

const rowPhone = [];
rowPhone.push({
    hint: 'Phone 1',
    nameIcon: 'call',
    add: 'true',
})

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            listPhone: rowPhone,
            username: '',
            email: '',
            address1: '',
            address2: '',
        });

    }

    addPhone() {

        let newList = this.state.listPhone
        newList.push({
            hint: 'Phone 1',
            nameIcon: 'call',
        })

        console.log(newList)

        this.setState({
            listPhone: newList
        })
    }

    renderRow(data, index) {
        return (
            <View key={index}>
                <InputRow
                    hint={data.hint}
                    nameIcon={data.nameIcon}
                    add={data.add}
                    onPress={() => this.addPhone()}
                />
            </View>
        )
    }


    render() {
        return (
            <View collapsable={false}>
                {
                    this.state.listPhone.map((item, index) => this.renderRow(item, index))
                }
                <InputRow hint='Email' nameIcon='email' onChangeText={(val) => this.setState({ email: val })} />
                <InputRow hint='Adresss 1' nameIcon='building' onChangeText={(val) => this.setState({ address1: val })} />
                <InputRow hint='Adresss 2' nameIcon='map' onChangeText={(val) => this.setState({ address2: val })} />
            </View>
        );
    }
} 
