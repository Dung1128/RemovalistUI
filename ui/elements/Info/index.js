import React, { Component } from 'react';
import {
    TouchableOpacity
} from 'react-native';
import {
    Container,
    Left,
    Right,
    Text,
    View,
    Title,
    Button,
    Content
} from 'native-base';
import material from '~/theme/variables/material'
import Icon from '~/ui/components/Icon';
import Header from '~/ui/components/Header';
import TitleItem from '~/ui/components/TitleItem';
import StatusItem from '~/ui/components/StatusItem';
import RowItem from '~/ui/components/RowItem';
import ButtonIcon from '~/ui/components/ButtonIcon';
import styles from './styles'
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const { title, onPress, time, map, note, } = this.props;
        return (
            <View>
                <TitleItem title={title} right={
                        <View row style={{ justifyContent: 'space-between', width: '35%' }}>
                            <ButtonIcon onPress={onPress} icon='direction' size={18} color='#fff' />
                            <Text style={{color: material.redColor}}>DIRECTION</Text>
                        </View>
                    } />
                    <View white style={{ paddingHorizontal: 5 }}>
                        <RowItem icon='time' title={time} />
                        <View style={{ borderWidth: 0.5, borderColor: material.grayTitle }} />
                        <RowItem icon='map' title={map} />
                        <View style={{ borderWidth: 0.5, borderColor: material.grayTitle }} />
                        <RowItem icon='note' title={note} />
                    </View>
            </View>
        )
    }
}