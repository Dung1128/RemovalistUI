import React, { Component, PropTypes } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'native-base';

import styles from './styles';

export default class extends Component {
    static propTypes = {
        dataArray: PropTypes.array.isRequired, 
        selected: PropTypes.string,                  
    }

    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected || props.dataArray[0].key,
        };
    }

    render() {
        const { 
            onPress,
            dataArray,            
            ...props } = this.props; 
        return (
            <View {...props} >
                {dataArray.map(item=> {     
                    const isSelected = item.key === this.state.selected                
                    return (
                        <View key={item.key} style={styles.hdMenu}>
                            <TouchableOpacity onPress={() => { 
                                onPress(item);
                                (!isSelected) && this.setState({ selected: item.key });
                            }}
                             style={styles[isSelected ? 'itemMenuActive' : 'itemMenu']}>
                                <Text style={styles[isSelected ? 'textMenuActive' : 'textMenu']}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>  
                        </View> 
                    )                                                 
                })}                                            
            </View>
        );
    }
}
