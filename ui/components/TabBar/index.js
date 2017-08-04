import React, { Component, PropTypes } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'native-base';

import styles from './styles';

export default class extends Component {
    static propTypes = {
        titleActive: PropTypes.string.isRequired, 
        titleNonActive: PropTypes.string.isRequired,
        onPressActive: PropTypes.func.isRequired,
        onPressNonActive: PropTypes.func.isRequired,                  
    }

    constructor(props) {
        super(props);
        this.state = {
            info: true,
            policy: false
        };
    }

    render() {
        const { 
            onPressActive, 
            onPressNonActive, 
            titleActive, 
            titleNonActive, 
            ...props } = this.props; 
        return (
            <View {...props} >
                {
                        this.state.info ?
                        <View style={styles.hdMenu}>
                            <TouchableOpacity style={styles.itemMenuActive}>
                                <Text style={styles.textMenuActive}>{titleActive}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                            style={styles.itemMenu} 
                            onPress={() => { 
                                onPressActive();
                                this.setState({ info: !this.state.info });
                            }}
                            >
                                <Text style={styles.textMenu}>{titleNonActive}</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.hdMenu}>
                            <TouchableOpacity 
                            style={styles.itemMenu} 
                            onPress={() => { 
                                onPressNonActive(); 
                                this.setState({ info: !this.state.info });
                            }}
                            >
                                <Text style={styles.textMenu}>{titleActive}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.itemMenuActive} >
                                <Text style={styles.textMenuActive}>{titleNonActive}</Text>
                            </TouchableOpacity>
                        </View>
                    }
            </View>
        );
    }
}
