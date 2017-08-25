import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    TouchableOpacity,
    Linking,
    Modal,
    Alert,
    ListView,
    ScrollView,
    Keyboard,
} from 'react-native';
import styles from './styles';
import material from '~/theme/variables/material';
import { Container, Left, Body, Right, Title, Content, Footer, FooterTab, List, ListItem, Text } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import InputRow from '~/ui/elements/InputRow';
import CustomerInfo from '~/ui/elements/CustomerInfo';
import CheckDate from '~/ui/elements/CheckDate';
import Icon from '~/ui/components/Icon';
import Button from '~/ui/components/Button';
import Header from '~/ui/components/Header';
import Preload from '~/ui/components/Preload';
import TitleItem from '~/ui/components/TitleItem';
import Truck from './components/Truck';
import moment from 'moment'
import { connect } from 'react-redux'
import {
    Field,
    FieldArray,
    reduxForm,
} from 'redux-form'
import {
    CustomerField,
    TruckField,
    StatusField,
    DateTimeField
} from './components/Form'
import { validate } from './utils'
import * as jobSelectors from '~/store/selectors/job';
import { accessToken } from '~/store/constants/api'

const pad = num =>
    num ? (num > 9 ? '' : '0') + num : ''

const formatHM = ({ hours: h, minutes: m }) =>
    h && m ? '2017-08-22 ' + (h ? pad(h) + ':' : '') + pad(m) : ''

@connect(
    state => ({
        listStatus: jobSelectors.getStatusJobList(state),
    }), null, (stateProps, dispatch, ownProps) => ({
        initialValues: {
            Contact: [{
                CompanyName: '',
                Phone: [{

                }],
                Email: '',
                AddressLine1: '',
                AddressLine2: ''
            }],
            truck: {
                TruckId: 0,
                TruckName: 'Select Truck'
            },
            status: stateProps.listStatus[0],
            datetime: {
                date: moment(new Date()).format("YYYY-MM-DD"),
                timeStart: formatHM(ownProps.navigation.state.params || moment(new Date()).format('HH:m')),
                timeEnd: ''
            }
        },
        ...ownProps
    }))
@reduxForm({ form: 'CustomerInfo', validate, destroyOnUnmount: !__DEV__ })
export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }


    submitForm(values) {
        this.props.navigation.navigate('delivery_screen', values)
    }

    render() {
        const { handleSubmit, submitting } = this.props
        return (
            <Container>
                <Header title='General Information' step={1} iconLeft='close' onPress={() => this.props.navigation.goBack()} />

                <KeyboardAwareScrollView style={styles.content}>
                    <Field name="status" component={StatusField} />
                    <FieldArray name="Contact" component={CustomerField} />
                    <View style={styles.titGeneral}>
                        <Text bold>Start time</Text>
                    </View>
                    <DateTimeField name="datetime" />
                    <Field name="truck" component={TruckField} />
                    <TitleItem style={{ padding: 0 }} />
                </KeyboardAwareScrollView>
                <Button
                    onPress={handleSubmit(this.submitForm.bind(this))}
                    full iconRight='arrow-right' text='DELIVERY INFO' />

            </Container>
        );
    }
}
