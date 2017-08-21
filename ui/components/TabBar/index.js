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
                {dataArray.map((item, index)=> {     
                    const isSelected = item.key === this.state.selected                
                    return (
                            <TouchableOpacity key={item.key} onPress={() => { 
                                onPress(item);
                                (!isSelected) && this.setState({ selected: item.key });
                            }}
                             style={{...styles[isSelected ? 'itemMenuActive' : 'itemMenu'], 
                                    ...styles.border,
                                    ...styles[index == 0 ? 'borderRight' :  'borderLeft' ]  }}>
                                <Text style={styles[isSelected ? 'textMenuActive' : 'textMenu']}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity> 
                    )                                                 
                })}                                            
            </View>
        );
    }
}
