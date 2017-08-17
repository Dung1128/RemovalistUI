import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import styles from './styles';
import material from '~/theme/variables/material';
import { Container, Left, Body, Right, Title, Content, Footer, FooterTab, List, ListItem, Text } from 'native-base';
import InputService from '~/ui/elements/InputService';
import Icon from '~/ui/components/Icon';
import Button from '~/ui/components/Button';
import Header from '~/ui/components/Header';
import TitleItem from '~/ui/components/TitleItem';
import ButtonIcon from '~/ui/components/ButtonIcon';
import { connect } from 'react-redux'
import {
    Field,
    FieldArray,
    reduxForm,
    formValueSelector
} from 'redux-form'
import {
    InputServiceField,
    MaterialArray,
    InputSurcharge
} from './components/Form'
import * as materialActions from '~/store/actions/material'
import * as jobSelectors from '~/store/selectors/job'
import { validate, initialValues } from './utils'

const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9EZzFPVVF4UmpZelJEZzVSakUzT0RBME5UUkZRa1pHUkRJd016ZERPRFl4TmpRd09UaEdSUSJ9.eyJpc3MiOiJodHRwczovL3R1YW5wbDEuYXUuYXV0aDAuY29tLyIsInN1YiI6ImVvc29UR3FCMHZwNWlsS1dWMGcxclZmaVBFMGRaWnVGQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3R1YW5wbDF0ZXN0IiwiZXhwIjoxNTExMDg3NDQ0LCJpYXQiOjE1MDI0NDc0NDQsInNjb3BlIjoiIn0.U3xQQLeGTFuzr-37PXefhZnynHWYUx7Ow_SuBfb8FM2S3cxAQdk6WN14bPKqSKaAsbMU7Sd6VsvTFDtlSRrkDmghfNNIQ7eTD8qECZ6N94XePH-oggOM7PDUVsWzTT5t5279w-8PFc5NjByPiptu-hvAV2JAR0tJd_UDJHF-tArnYeq99v_bftkdhngd_JblRJBC6oDqaAGPaAQa4SCL0aG3WxUXVz1CeLywyKUBYVE88RWC-GWlnwozBcegqku5BRP4zzlJmY3Xw73Bdj8zEt5aQtl_rc3EaG2mwFtUMokBNxUAqzHtG3WCFgCxb2463EvyCqJQHlwAFnzGYFwqDg'

const selector = formValueSelector('TallyService')
@connect(
    state => ({
        initialValues: initialValues,
        listMaterial: jobSelectors.getMaterialList(state),
        // servicetimeValue: selector(state, 'servicetime'),
        // traveltime: selector(state, 'traveltime'),
        // fuel: selector(state, 'fuel'),
        // material: selector(state, 'material'),
        // surcharge: selector(state, 'surcharge'),
    }), { ...materialActions })
@reduxForm({ form: 'TallyService', validate })
export default class extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            listServiceTime: '',
            listTravelTime: '',
            listFuel: '',
            listMaterial: '',
        });

    }

    submitForm(values) {
        console.log(values)
    }

    componentDidMount() {
        const listServiceTime = [];
        const listTravelTime = [];
        const listFuel = [];
        const listMaterial = [];
        const data = this.props.listMaterial
        for (const i = 0; i < data.length; i++) {
            switch (data[i].CategoryId) {
                case 1:
                    listServiceTime.push(data[i])
                    break;
                case 2:
                    listTravelTime.push(data[i])
                    break;
                case 3:
                    listFuel.push(data[i])
                    break;
                case 4:
                    listMaterial.push(data[i])
                    break;
                default:
                    break;
            }
        }
        this.setState({
            listServiceTime,
            listTravelTime,
            listFuel,
            listMaterial
        })
        // this.sumPrice();
    }


    sumPrice() {
        const { servicetimeValue, traveltime, fuel, material, surcharge } = this.props;
        let price = servicetimeValue.input
    }

    render() {
        const { handleSubmit, submitting } = this.props
        const { listServiceTime, listTravelTime, listFuel, listMaterial } = this.state;
        return (
            <Container>
                <Header title='Tally service infomation' iconLeft='back' onPress={() => this.props.navigation.goBack()} />
                <Content style={styles.content}>
                    <InputServiceField
                        name='servicetime'
                        nameIcon='time' measure='hr'
                        listItems={listServiceTime}
                        title='Travel Time'
                    />
                    <InputServiceField
                        name='traveltime'
                        nameIcon='time' measure='hr'
                        listItems={listTravelTime}
                        title='Travel Time'
                    />
                    <InputServiceField
                        name='fuel'
                        nameIcon='gas' measure='km'
                        listItems={listFuel}
                        title='Fuel/RUCS'
                    />
                    <FieldArray
                        name='material'
                        component={MaterialArray}
                        nameIcon='material'
                        listItems={listMaterial}
                        title='Material'
                    />
                    <Field name='surcharge' member='surcharge' component={InputSurcharge} />
                    <TitleItem title='GST'
                        right={
                            <View row style={styles.money}>
                                <Text style={styles.titPrice}>$120</Text>
                            </View>
                        }
                    />
                    <View style={styles.totalPrice}>
                        <Text style={styles.txtTotal}>Total</Text>
                        <Text style={styles.txtPriceTotal}>$610</Text>
                    </View>
                    <TitleItem style={{ padding: 0 }} />
                </Content>
                <Button
                    //disable
                    onPress={handleSubmit(this.submitForm.bind(this))}
                    //onPress={() => this.props.navigation.navigate('jobtoday_screen')} 
                    full
                    text='DONE'
                />
            </Container>
        );
    }
}
