import React, { Component } from 'react';
import { Text } from 'react-native';
import { View, Input } from 'native-base';

import InputRow from '../InputRow';
export default class extends Component {


    render() {
        const { hintuser, hintphone, hintemail, iconUser, iconPhone, iconEmail, add, ...props } = this.props;
        return (
            <View collapsable={false} {...props}>
                <InputRow hint={hintuser} nameIcon={iconUser} />
                <InputRow hint={hintphone} nameIcon={iconPhone} add={add}/>
                <InputRow hint={hintemail} nameIcon={iconEmail}/>
            </View>
        );
    }
} 
