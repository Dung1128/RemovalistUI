import React, { Component } from 'react';
import { TextInput, TouchableOpacity, Platform } from 'react-native';
import { View, Text, Input } from 'native-base';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import styles from './styles';
import Icon from '~/ui/components/Icon';
import material from '~/theme/variables/material'
export default class extends Component {

    render() {
        const { nameIcon, NumberOfMaterial, description, Type, PricePerUnit, unit, ...props } = this.props;
        return (
            <View style={styles.contentTally}>
                
                <View
                    style={{
                        backgroundColor: material.grayTitle,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                    collapsable={false} {...props}>
                    <View style={{...styles.ItemInfo, flex: 1.5}}>
                        <View style={styles.itemType}>
                            <Icon name={nameIcon} size={20}/>
                            <Text style={styles.textType}>{Type}</Text>
                        </View>
                    </View>
                    <View style={styles.ItemInfo}>
                        <View style={styles.itemType}>
                            <Icon name='quantity' size={20}/>
                            <Text style={styles.textType}>{NumberOfMaterial}</Text>
                            <Text>{unit}</Text>
                        </View>
                    </View>
                    <View style={styles.ItemInfo}>
                        <View style={styles.itemType}>                  
                            <Text style={styles.textType}>$ {PricePerUnit * NumberOfMaterial}</Text>
                        </View>
                    </View>         
                </View>
                {
                    description && <View  style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10}}>
                    <Icon name='note' size={20} color={material.grayIconColor} />
                    <Input placeholder='Tasks description' style={{ borderRightWidth: 1, borderRightColor: material.grayTitle, flex: 2}}/>
                    <Text style={{ paddingLeft: 10}}>$</Text>
                    <Input placeholder='0' style={{ flex: 0.7 }}/>
                </View> 
                }

            </View>
               
        );
    }
} 
