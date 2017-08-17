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
    ScrollView
} from 'react-native';
import styles from './styles';
import material from '~/theme/variables/material';
import { Container, Left, Body, Right, Title, Content, Footer, FooterTab, List, ListItem, Text } from 'native-base';
import InputRow from '~/ui/elements/InputRow';
import CustomerInfo from '~/ui/elements/CustomerInfo';
import CheckDate from '~/ui/elements/CheckDate';
import Icon from '~/ui/components/Icon';
import Button from '~/ui/components/Button';
import Header from '~/ui/components/Header';
import Preload from '~/ui/components/Preload';
import TitleItem from '~/ui/components/TitleItem';
import Truck from './components/Truck';
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
import { validate, initialValues } from './utils'

const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9EZzFPVVF4UmpZelJEZzVSakUzT0RBME5UUkZRa1pHUkRJd016ZERPRFl4TmpRd09UaEdSUSJ9.eyJpc3MiOiJodHRwczovL3R1YW5wbDEuYXUuYXV0aDAuY29tLyIsInN1YiI6ImVvc29UR3FCMHZwNWlsS1dWMGcxclZmaVBFMGRaWnVGQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3R1YW5wbDF0ZXN0IiwiZXhwIjoxNTAyNTA2MTM1LCJpYXQiOjE1MDI0MTk3MzUsInNjb3BlIjoiIn0.ReSNkSK_qln2Ose80tBJL11Y8A_-v4tlgHE3SUgqOUAdwh_9zcnO-YvYCSGlmy7MSUp7EbbmAAec6se5Rq6hl_sdC2oTaHod9qlR_pNy4Ht6AUcYGkBj2LUYNEADlynFEfqRAaPj0QOu23fKsm-keqxG-EGkzkGuLm2_6tXk5ILUzKLLsTXeN44z_pimmrbsmi3mlkAusDHBy7PcUeAHo6dhPHpkqM7u1bIbkh0JgMqkdUeNV0D6OdM_XMhCApWhJBBa8aqVUHPlDDSich9vMq7WUFHydpC30JwtT7ajVq0490Y8TvJjWksW-9CuL32n84frMr5M-lOggA9kNNEhLw'

@connect(
    state => ({
        initialValues: initialValues
    }), )
@reduxForm({ form: 'CustomerInfo', validate })
export default class extends Component {

    constructor(props) {
        super(props);
        this.state = ({
        });
    }


    submitForm(values) {
        this.props.navigation.navigate('delivery_screen', values)
    }

    render() {
        const { handleSubmit, submitting } = this.props
        return (
            <Container>
                <Header title='General Information' iconLeft='close' onPress={() => this.props.navigation.goBack()} />
                <ScrollView style={styles.content}>
                    <Field name="status" component={StatusField} />
                    <FieldArray name="customer" component={CustomerField} />
                    <View style={styles.titGeneral}>
                        <Text bold>Start time</Text>
                    </View>
                    <DateTimeField name="datetime" />
                    <Field name="truck" component={TruckField} />
                    <TitleItem style={{ padding: 0 }} />
                </ScrollView>
                <Button
                    //onPress={() => this.props.navigation.navigate('delivery_screen', 'aaaaa')}
                    onPress={handleSubmit(this.submitForm.bind(this))}
                    full iconRight='arrow-right' text='DELIVERY INFO' />

            </Container>
        );
    }
}
