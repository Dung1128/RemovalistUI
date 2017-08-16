import React, { Component } from 'react';
import { Text, TextInput, } from 'react-native';
import { View, } from 'native-base';

import styles from './styles';
import material from '~/theme/variables/material';
import Icon from '~/ui/components/Icon';

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            modalVisible: false,
        });

    }

    render() {
        const { text, nameIcon, add, measure, onChange, value, ...props } = this.props;
        return (
            <View
                style={styles.Item}
                collapsable={false} {...props}>
                <Icon name='quantity' size={20} style={styles.colorIcon} />
                <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder='0'
                    underlineColorAndroid="transparent"
                    style={{ width: '60%' }}
                />
                <Text>{measure}</Text>
            </View>
        );
    }
} 
