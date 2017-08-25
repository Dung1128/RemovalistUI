import React, { Component } from 'react';
import {
    ScrollView
} from 'react-native';
import styles from './styles';
import material from '~/theme/variables/material';
import { View, Input } from 'native-base';
import IconIonicons from 'react-native-vector-icons/dist/Ionicons';
import { levenSearch } from '~/ui/utils'

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = ({
        });

    }

    search(value) {
        const { onChange, dataArray, searchByName } = this.props;
        console.log(this.props.dataArray)
        const arrSearch = levenSearch(value.trim(), dataArray, item => item[`${searchByName}`])
        const data = value != '' ? arrSearch : dataArray

        onChange && onChange(data)
    }

    // NOTE: use search bar you must push dataArray = defaultData and onChange(data) setState({ arrSearch: data })
    render() {
        return (
            <View full style={styles.wrapBar}>
                <View row white style={{ borderRadius: 5 }}>
                    <IconIonicons
                        name='ios-search' size={24}
                        color={material.grayIconColor}
                        style={{ paddingHorizontal: 10 }}
                    />
                    <Input
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onChangeText={(value) => this.search(value)}
                        placeholder='Search'
                        placeholderTextColor={material.grayColor}
                        style={styles.input} />
                </View>

            </View>
        );
    }
}
