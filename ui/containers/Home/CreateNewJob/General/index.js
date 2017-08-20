import React, { Component } from 'react';
import {
    View,
    Alert,
    ScrollView,
    InteractionManager
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
import { validate } from './utils'
import * as jobSelectors from '~/store/selectors/job';

const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9EZzFPVVF4UmpZelJEZzVSakUzT0RBME5UUkZRa1pHUkRJd016ZERPRFl4TmpRd09UaEdSUSJ9.eyJpc3MiOiJodHRwczovL3R1YW5wbDEuYXUuYXV0aDAuY29tLyIsInN1YiI6InJRcXY0UTBRQXdnQkJwM0k2TlM0NTBhcFh1UWhwN3hHQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3R1YW5wbDF0ZXN0IiwiZXhwIjoxNTAzMTM3MDU0LCJpYXQiOjE1MDMwNTA2NTQsInNjb3BlIjoiIn0.Jtcal4vmIuZa-nisdr_6oB9HZZdOXXKA1YhlpyYqjyY3laMFVS7dDDI0L_12BRh6fR3nqb3nWhVURLIMSqAIEW6XOwPxbOvKWoCTGkMyi7K0O0bHbYRKiWx-3D6mwMi6Ny9yjWtuFQHByIcE86E9IQtlMgpxEvBGk_PhDQmb-C6d5JBdfzJ9o2Kt-WOtXMAmSQ-DuiDrcZs53F6ZjxB38-wBPk4ZxJM_CR05TIRU_ouQspXQgFHfpQtewV5XOzQfzQhxrxA10jH5QtHnMyrCxfMrrHiJTuIjV4o51PmB6ErJTSGEk1uu1edOPm6Dw2qCfaAJY1vds1zDMBIxZRtz9A'

@connect(
    state => ({
        listStatus: jobSelectors.getStatusJobList(state),
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
            status: jobSelectors.getStatusJobList(state)[0],
            datetime: {
                date: new Date(),
                timeStart: '',
                timeEnd: ''
            }
        }
    }), )
@reduxForm({ form: 'CustomerInfo', validate, destroyOnUnmount: !__DEV__  })
export default class extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            loading: false
        });
    }


    submitForm(values) {
        this.setState({
            loading: true
        })
        this.props.navigation.navigate('delivery_screen', values)
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                loading: false
            })
        })
    }

    render() {
        const { handleSubmit, submitting } = this.props
        return (
            <Container>
                <Header title='General Information' iconLeft='close' onPress={() => this.props.navigation.goBack()} />
                <ScrollView style={styles.content}>
                    <Field name="status" component={StatusField} />
                    <FieldArray name="Contact" component={CustomerField} />
                    <View style={styles.titGeneral}>
                        <Text bold>Start time</Text>
                    </View>
                    <DateTimeField name="datetime" />
                    <Field name="truck" component={TruckField} />
                    <TitleItem style={{ padding: 0 }} />
                </ScrollView>
                <Button
                    loading={this.state.loading}
                    onPress={handleSubmit(this.submitForm.bind(this))}
                    full iconRight='arrow-right' text='DELIVERY INFO' />

            </Container>
        );
    }
}
