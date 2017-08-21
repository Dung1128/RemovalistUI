import React, { Component } from 'react';
import {
    Header,
    Left,
    Right,
    Text,
    View,
    Title,
    Button
} from 'native-base';
import { TouchableOpacity } from 'react-native'
import material from '~/theme/variables/material'
import Icon from '~/ui/components/Icon';
import styles from './styles'
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepArr: [1, 2, 3]
        }
    }
    render() {
        const { stepArr } = this.state;
        const { title, onPress, iconLeft, right, size = 24, textright, step, ...props } = this.props;
        return (
            <Header
                noShadow={true}
                style={{ backgroundColor: material.redColor, borderBottomColor: material.redColor, alignItems: 'center' }}>
                <Left style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                    <Button onPress={onPress} transparent>
                        <Icon name={iconLeft} color='#fff' size={size} />
                    </Button>
                    <View>
                        <Title style={{ fontSize: 18, width: '100%', textAlign: 'left', marginLeft: 10 }}>{title}</Title>
                        { step && <View row style={{ marginLeft: 10 }}>
                            {
                                stepArr.map((item, index) => {
                                    return (
                                        <View key={index} row center>
                                        <View style={{...styles.step, backgroundColor: item == step ? '#fff' : 'transparent', }}>
                                            <Text style={{...styles.textStep, color: item == step ? material.redColor : '#fff' }} >{item}</Text>
                                        </View>
                                            { item != 3 && <View style={{ width: 10, height: 2, backgroundColor: '#fff' }} /> }
                                        </View>
                                    )
                                })
                            }
                        </View>
                        }
                    </View>

                </Left>
                {
                    right &&
                    <Right>
                        {right}
                    </Right>
                }
                <TouchableOpacity>
                    <Text style={{ color: '#fff' }}>{textright}</Text>
                </TouchableOpacity>

            </Header>
        )
    }
}