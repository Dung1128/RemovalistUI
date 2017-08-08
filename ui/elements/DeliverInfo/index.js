import React, { Component } from 'react';
import { Text } from 'react-native';
import { View, Input } from 'native-base';

import InputRow from '../InputRow';
export default class extends Component {


    render() {
        const { hintTime, hintAddress, hintPick, hintNote, iconTime, iconAddress, iconPick, iconNote, ...props } = this.props;
        return (
            <View collapsable={false} {...props}>
                <InputRow hint={hintTime} nameIcon={iconTime} />
                <InputRow hint={hintAddress} nameIcon={iconAddress}/>
                <InputRow hint={hintPick} nameIcon={iconPick}/>
                <InputRow hint={hintNote} nameIcon={iconNote}/>
            </View>
        );
    }
} 
