import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    WebView,
    TouchableOpacity,
    Alert,
    ListView
} from 'react-native';
import { Container } from 'native-base'
import { AppNavigator } from '~/ui/routes'

export default class AnatomyExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Container>
                <AppNavigator />
            </Container>
        );
    }
}