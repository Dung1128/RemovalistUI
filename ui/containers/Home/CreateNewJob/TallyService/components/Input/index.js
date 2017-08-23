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
        const { text, nameIcon, add, keyboardType = 'numeric', placeholder = '0', icon = true, measure, onChange, value, ...props } = this.props;
        return (
            <View
                style={styles.Item}
                collapsable={false} {...props}>
                {icon && <Icon name='quantity' size={20} style={styles.colorIcon} />}
                <TextInput
                    keyboardType={keyboardType}
                    value={value}
                    onChangeText={onChange}
                    placeholder={placeholder}
                    underlineColorAndroid="transparent"
                    style={{ width: '60%', lineHeight: 25 }}
                />
                <Text>{measure}</Text>
            </View>
        );
    }
} 
