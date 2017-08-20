import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    TouchableOpacity,
    Alert
} from 'react-native';
import { NavigationActions } from 'react-navigation'
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as materialActions from '~/store/actions/material'
import * as jobSelectors from '~/store/selectors/job'
import { validate, initialValues } from './utils'
import * as jobActions from '~/store/actions/job'
import moment from 'moment'

const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9EZzFPVVF4UmpZelJEZzVSakUzT0RBME5UUkZRa1pHUkRJd016ZERPRFl4TmpRd09UaEdSUSJ9.eyJpc3MiOiJodHRwczovL3R1YW5wbDEuYXUuYXV0aDAuY29tLyIsInN1YiI6InJRcXY0UTBRQXdnQkJwM0k2TlM0NTBhcFh1UWhwN3hHQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3R1YW5wbDF0ZXN0IiwiZXhwIjoxNTAzMjI5MTI4LCJpYXQiOjE1MDMxNDI3MjgsInNjb3BlIjoiIn0.lJK0SvaoViNdldy8Nx3YS1tOfb4knza41OrpNiSQB_x9fYxnk2gf7UpT8bmjIzT6VP7D-zZ0psdpwCyLaZj-5aYM5pv80C1vo756w_MO8ZHSURIp4ZCDe2ANIOzTPYCpCeab1J2JqQl6amzNoRW05FsHpuC6cjOGKw2ftbgnczaD6bU8Uc3ualofXNCgG9tsNE4yqtfaR-xiAVlh15-dMSksEC-AZOLuoGLHhq_4TEI8X1mozOlPrBXrcLq3ggYbh2LYSOG7bGuAz-76wPvm8OO_oIGSOlHubqLY4habTRmZX63ch_EGoNsKS0vMqeujzOxK-BGvxIDMPKST377mAg'

const selector = formValueSelector('TallyService')
@connect(
    state => ({
        initialValues: initialValues,
        listMaterial: jobSelectors.getMaterialList(state),
        servicetime: selector(state, 'servicetime'),
        traveltime: selector(state, 'traveltime'),
        fuel: selector(state, 'fuel'),
        material: selector(state, 'material'),
        surcharge: selector(state, 'surcharge'),

    }), { ...materialActions, ...jobActions })
@reduxForm({ form: 'TallyService', validate, destroyOnUnmount: !__DEV__ })
export default class extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            listServiceTime: '',
            listTravelTime: '',
            listFuel: '',
            listMaterial: '',
            delivery: this.props.navigation.state.params,
            loading: false
        });
        this.sumPrice = this.sumPrice.bind(this);

    }

    createJob(obj) {
        this.props.postNewJob(obj, accessToken, (error, data) => {
            if (data) {
                this.setState({
                    loading: false
                })
                if (data.Status == 1) {

                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ 
                                routeName: 'jobtoday_screen', 
                                params: {
                                    defaultRoute: 'list' 
                                }                                
                            })
                        ]
                    })
                    Alert.alert('Notify', 'Create job successfully', [
                        { text: 'OK', onPress: () => this.props.navigation.dispatch(resetAction) },
                    ], )
                    this.props.navigation.dispatch(resetAction)
                }
                if (data.Status == 2) {
                    Alert.alert('Notify', data.Message);
                }
            }
            // if (error) {
            //     Alert.alert('Notify', error);
            // }
        })
    }

    submitForm(values) {
        this.setState({
            loading: true
        })
        const { delivery } = this.state;
        const dataform = this.renderForm(values);
        const date = moment(delivery.general.datetime.date).format("YYYY-MM-DD");
        const timeStart = moment(delivery.general.datetime.timeStart).format("HH:mm");
        const timeEnd = moment(delivery.general.datetime.timeEnd).format("HH:mm");
        const obj = {
            "Notes": (values.surcharge.note || ''),
            "TimeStart": `${date} ${timeStart}`,
            "TimeEnd": `${date} ${timeEnd}`,
            "TotalCost": this.sumPrice(),
            "AssignedTruckId": (delivery.general.truck.TruckId || ''),
            "AdjustmentMatrix": (values.surcharge.price || 0),
            "StatusId": delivery.general.status.JobStatusId,
            "JobLocations": delivery.delivery,
            "Contact": delivery.general.Contact,
            "JobDetailsMaterials": this.renderForm(values)
        }
        this.createJob(obj)

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
        });
    }

    renderForm(values) {
        const { delivery } = this.state;
        const { servicetime, traveltime, fuel, material } = values;
        servicetime.MaterialId = servicetime.status.MaterialId;
        traveltime.MaterialId = traveltime.status.MaterialId;
        fuel.MaterialId = fuel.status.MaterialId;

        for (const i = 0; i < material.length; i++) {
            material[i].MaterialId = material[i].status.MaterialId;
        }
        if (servicetime.NumberOfMaterial && traveltime.NumberOfMaterial
            && fuel.NumberOfMaterial && material[0].NumberOfMaterial) {
            return [
                servicetime,
                traveltime,
                fuel,
                ...material
            ]
        } else {
            return ""
        }


    }


    sumPrice() {
        const { servicetime, traveltime, fuel, material, surcharge } = this.props;
        if (servicetime && traveltime && fuel && material && material[0] && material[0].NumberOfMaterial) {
            let materialvalue = material.map(input => (input.status && input.status.CategoryId ? (input.status.PricePerUnit * input.NumberOfMaterial) : 0))
                .reduce((a, b) => a + b);
            let price = ((servicetime.NumberOfMaterial || 0) * (servicetime.status.PricePerUnit || 0))
                + ((traveltime.NumberOfMaterial || 0) * (traveltime.status.PricePerUnit || 0))
                + ((fuel.NumberOfMaterial || 0) * (fuel.status.PricePerUnit || 0))
                + materialvalue

            return surcharge ? price : price + surcharge.price
        }
        return 0
    }

    render() {
        const { handleSubmit, submitting } = this.props
        const { listServiceTime, listTravelTime, listFuel, listMaterial, loading } = this.state;

        return (
            <Container>
                <Header title='Tally service infomation' step={3} iconLeft='back' onPress={() => this.props.navigation.goBack()} />
                <KeyboardAwareScrollView style={styles.content}>
                    <InputServiceField
                        name='servicetime'
                        nameIcon='time' measure='hr'
                        listItems={listServiceTime}
                        title='Service Time'
                    />
                    <InputServiceField
                        name='traveltime'
                        nameIcon='truck' measure='hr'
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
                                <Text style={styles.titPrice}>$0</Text>
                            </View>
                        }
                    />
                    <View style={styles.totalPrice}>
                        <Text style={styles.txtTotal}>Total</Text>
                        <Text style={styles.txtPriceTotal}>${this.sumPrice()}</Text>
                    </View>
                    <TitleItem style={{ padding: 0 }} />
                </KeyboardAwareScrollView>
                <Button
                    loading={loading}
                    onPress={!loading ? handleSubmit(this.submitForm.bind(this)) : () => { }}
                    full
                    text='DONE'
                />
            </Container>
        );
    }
}
