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
import ToastModal from '~/ui/components/ToastModal';
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
import { accessToken } from '~/store/constants/api'
const selector = formValueSelector('TallyService')
@connect(
    state => ({
        initialValues: initialValues,
        listMaterial: jobSelectors.getMaterialList(state),
        listMaterialUpdated: jobSelectors.getMaterialListUpdated(state),
        servicetime: selector(state, 'servicetime'),
        traveltime: selector(state, 'traveltime'),
        fuel: selector(state, 'fuel'),
        material: selector(state, 'material'),

    }), { ...materialActions, ...jobActions })
@reduxForm({ form: 'TallyService', validate, destroyOnUnmount: !__DEV__ })
export default class extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            listServiceTime: '',
            listTravelTime: '',
            listFuel: '',
            listMaterial: props.listMaterial,
            delivery: this.props.navigation.state.params,
            loading: false,
            showToast: false
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
                    this.props.navigation.dispatch(resetAction)
                    this.setState({
                        showToast: true
                    })
                    setTimeout(() => {
                        this.setState({
                            showToast: false
                        })
                    }, 2000)
                }
                if (data.Status == 2) {
                    this.setState({
                        loading: false
                    })
                    Alert.alert('Notify', data.Message);
                }
            }
            if (error) {
                this.setState({
                    loading: false
                })
                Alert.alert('Notify', 'Error, please check your network.!');
            }
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
            "TimeStart": `${date} ${timeStart}`,
            "TimeEnd": `${date} ${timeEnd}`,
            "TotalCost": this.sumPrice(),
            "TruckId": (delivery.general.truck.TruckId || null),
            "StatusId": delivery.general.status.JobStatusId,
            "JobLocations": delivery.delivery,
            "Contact": delivery.general.Contact,
            "JobDetailsMaterials": this.renderForm(values)
        }
        this.createJob(obj)

    }

    componentDidMount() {
        if (this.props.listMaterial && this.props.listMaterial.length < 1 || (Date.now() - this.props.listMaterialUpdated) > 86400000) {
            this.props.getMaterialList(accessToken, (error, data) => {
                if (data) {
                    this.renderMaterialList(data.Material)
                }
            })
        } else {
            this.renderMaterialList(this.state.listMaterial)
        }
    }

    renderMaterialList(data) {
        const listServiceTime = [];
        const listTravelTime = [];
        const listFuel = [];
        const listMaterial = [];
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
        let arr = [];
        const { delivery } = this.state;
        const { servicetime, traveltime, fuel, material } = values;
        servicetime.MaterialId = servicetime.status.MaterialId;
        traveltime.MaterialId = traveltime.status.MaterialId;
        fuel.MaterialId = fuel.status.MaterialId;

        for (const i = 0; i < material.length; i++) {
            material[i].MaterialId = material[i].status.MaterialId;
        }


        if (servicetime.NumberOfMaterial) {
            arr.push(servicetime)
        }
        if (traveltime.NumberOfMaterial) {
            arr.push(traveltime)
        }
        if (fuel.NumberOfMaterial) {
            arr.push(fuel)
        }

        return material && material[0].NumberOfMaterial ? [...arr, ...material] : arr

    }


    sumPrice() {
        const { servicetime, traveltime, fuel, material } = this.props;
        if (servicetime) {
            let materialvalue = material.map(input => (input.status && input.status.CategoryId ? (input.status.PricePerUnit * input.NumberOfMaterial) : 0))
                .reduce((a, b) => a + b);
            let price = ((servicetime.NumberOfMaterial || 0) * (servicetime.status.PricePerUnit || 0))
                + ((traveltime.NumberOfMaterial || 0) * (traveltime.status.PricePerUnit || 0))
                + ((fuel.NumberOfMaterial || 0) * (fuel.status.PricePerUnit || 0))
                + materialvalue

            return price
        }
        return 0
    }

    render() {
        const { handleSubmit, submitting } = this.props
        const { listServiceTime, listTravelTime, listFuel, listMaterial, loading, showToast } = this.state;

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
                <ToastModal message='Create job successfully' show={showToast} />
            </Container>
        );
    }
}
