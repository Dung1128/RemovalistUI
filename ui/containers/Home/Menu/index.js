import React, { Component } from 'react';
import {
    Image,
    TouchableOpacity,
    TextInput,
    Animated,
    TouchableWithoutFeedback,
    Keyboard,
    Linking,
    Alert
} from 'react-native';
import {
    Container,
    View,
    Form,
    Item,
    Input,
    Button,
    Text,
    Thumbnail,
    Label,
    ListItem
} from 'native-base';
import styles from './styles';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Field, reduxForm } from 'redux-form';
import Icon from '~/ui/components/Icon';
import * as authActions from '~/store/actions/auth';
import * as commonActions from '~/store/actions/common';
import * as authSelectors from '~/store/selectors/auth';
import Preload from '~/ui/components/Preload';
import * as accountSelectors from '~/store/selectors/account';
import StatusItem from '~/ui/components/StatusItem';
import material from '~/theme/variables/material'
import { logo } from '~/assets';

// @firebaseConnect()
@connect(
    state => ({
        profile: accountSelectors.getProfile(state),
        // chooseAddress: calendarSelectors.getPeriodicalAddress(state)
    }), { ...authActions }
)
export default class extends Component {
    onLogout() {
        Alert.alert('Notify', 'Are you sure to log out?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'OK', onPress: () => {
                        Linking.openURL('https://minhchien.au.auth0.com/v2/logout').catch(err => console.error('An error occurred', err));
                        this.props.setAuthState(false);
                    }
                },
            ],
            { cancelable: false }
        );
    }

    openWeb() {
        Linking.openURL('https://www.removalist.com').catch(err => console.error('An error occurred', err));
    }

    render() {
        const { navigation, profile, chooseAddress } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <ListItem style={{ flexDirection: 'row' }}>
                    <Image style={{ width: 30, height: 30, marginRight: 10 }} source={logo} />
                    <View style={{ flexDirection: 'column' }}>
                        <Text primary>Jeremy Baldwin</Text>
                        <TouchableOpacity onPress={() => this.onLogout()}>
                            <Text style={{ color: '#ed502b' }}>LOGOUT</Text>
                        </TouchableOpacity>
                    </View>
                </ListItem>
                <ListItem>
                    <TouchableOpacity
                        style={styles.itemList}
                        onPress={() => navigation.navigate('jobtoday')}
                    >
                        <View style={styles.iconForm}>
                            <Icon name="truck" size={30} color={material.blackColor} />
                        </View>

                        <Text style={styles.itemText}>Jobs - Today</Text>
                    </TouchableOpacity>
                </ListItem>
                <TouchableOpacity
                    style={styles.itemList}
                >
                    <StatusItem width={10} style={styles.statusItem} color={material.redColor} />
                    <Text style={styles.itemText}>Enquiry</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.itemList}
                >
                    <StatusItem width={10} style={styles.statusItem} color={material.yellowColor} />

                    <Text style={styles.itemText}>To be comfirmed</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.itemList}
                >
                    <StatusItem width={10} style={styles.statusItem} color={material.blueColor} />

                    <Text style={styles.itemText}>Booked</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.itemList}
                >
                    <StatusItem width={10} style={styles.statusItem} color={material.greenColor} />

                    <Text style={styles.itemText}>On-going</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.itemList}
                >
                    <StatusItem width={10} style={styles.statusItem} color={material.violetColor} />

                    <Text style={styles.itemText}>Completed</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.itemList}
                    onPress={() => navigation.navigate('general_screen')}
                >
                    <StatusItem width={10} style={styles.statusItem} color={material.grayColor} />

                    <Text style={styles.itemText}>Cancelled</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.website}
                    onPress={() => this.openWeb()}
                >

                    <Text style={{ ...styles.itemText, padding: 0, marginLeft: 20 }}>Visit</Text>
                    <Text style={{ ...styles.itemText, color: material.redColor, padding: 0 }} > www.removalist.com</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
