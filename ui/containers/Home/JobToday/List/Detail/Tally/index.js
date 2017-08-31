import React, { Component } from 'react'
import { Container, Spinner, Text, View, Content } from 'native-base'
import material from '~/theme/variables/material'
import styles from './styles'
import { Modal } from 'react-native'
import Header from '~/ui/components/Header';
import TitleItem from '~/ui/components/TitleItem';
import InputRow from '~/ui/elements/InputRow';
import InfoTally from './components/InfoTally'
import Button from '~/ui/components/Button'
import Icon from '~/ui/components/Icon';
import { TouchableOpacity, Alert } from 'react-native'
import Communications from 'react-native-communications';
import { connect } from 'react-redux'
import { accessToken } from '~/store/constants/api'
import * as materialActions from '~/store/actions/material'
import * as jobSelectors from '~/store/selectors/job'
import * as jobActions from '~/store/actions/job'

@connect(
    state => ({
        listMaterial: jobSelectors.getMaterialList(state),
        listMaterialUpdated: jobSelectors.getMaterialListUpdated(state),
        MaterialCategories: jobSelectors.getMaterialCategoryList(state),
        GST: jobSelectors.getGST(state),
    }), { ...materialActions, ...jobActions })
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorStatus: 'pink',
            JobDetails: this.props.navigation.state.params.JobDetails,
            cash: 0,
            eftpos: 0,
            credit: 0,
            modalVisible: false,
            listMaterial: props.listMaterial,
            GST: 0
        }

    }

    componentDidMount() {
        this.props.getGST(accessToken, (error, data) => {
            if (data)
                this.setState({GST: data.GST})
        })
        
        if (this.props.listMaterial && this.props.listMaterial.length < 1 || (Date.now() - this.props.listMaterialUpdated) > 86400000) {
            this.props.getMaterialList(accessToken, (error, data) => {
                if (data) {
                    this.renderMaterialList(data.Material)
                }
            })
        } else {
            this.renderMaterialList(this.state.listMaterial)
        }

        // this.props.getPaymentMethods(accessToken, (error, data) => { })
        const { JobDetails } = this.state;
        const dataServiceTime = []
        const dataTravelTime = []
        const dataFuel = []
        const dataMaterial = []
        const dataJobDetailMaterial = JobDetails.JobDetailsMaterials

        for (const i = 0; i < dataJobDetailMaterial.length; i++) {
            switch (this.renderCategotyId(dataJobDetailMaterial[i].MaterialId)) {
                case 1:
                    dataServiceTime.push(dataJobDetailMaterial[i])
                    break;
                case 2:
                    dataTravelTime.push(dataJobDetailMaterial[i])
                    break;
                case 3:
                    dataFuel.push(dataJobDetailMaterial[i])
                    break;
                case 4:
                    dataMaterial.push(dataJobDetailMaterial[i])
                    break;
                default:
                    break;
            }
        }

        this.setState({
            dataServiceTime,
            dataTravelTime,
            dataFuel,
            dataMaterial
        });
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

    renderName(id) {
        const data = this.props.listMaterial
        for (const i = 0; i < data.length; i++) {
            if (id == data[i].MaterialId) {
                return data[i].Name
            }
        }
    }

    renderTitle(id) {
        const data = this.props.MaterialCategories
        for (const i = 0; i < data.length; i++) {
            if (id == data[i].MaterialCategoryId) {
                return data[i].CategoryName
            }
        }
    }
    renderCategotyId(id) {
        const data = this.props.listMaterial
        for (const i = 0; i < data.length; i++) {
            if (id == data[i].MaterialId) {
                return data[i].CategoryId
            }
        }
    }

    renderPrice(id) {
        const data = this.props.listMaterial
        for (const i = 0; i < data.length; i++) {
            if (id == data[i].MaterialId) {
                return data[i].PricePerUnit
            }
        }
    }
    renderUnit(id, number) {
        const data = this.props.listMaterial
        for (const i = 0; i < data.length; i++) {
            if (id == data[i].MaterialId) {
                if (number > 1 && data[i].UnitIndicator !== '')
                    return data[i].UnitIndicator + 's'
                else
                    return data[i].UnitIndicator
            }
        }
    }

    renderIcon(key) {
        switch (key) {
            case 1:
                return 'time';
            case 2:
                return 'truck';
            case 3:
                return 'gas';
            case 4:
                return 'material';
            default:
                break;
        }
    }


    renderMaterial(item, index) {
        return (<InfoTally
            key={index}
            NumberOfMaterial={item.NumberOfMaterial}
            Type={this.renderName(item.MaterialId)}
            Title={this.renderTitle(this.renderCategotyId(item.MaterialId))}
            PricePerUnit={this.renderPrice(item.MaterialId)}
            nameIcon={this.renderIcon(this.renderCategotyId(item.MaterialId))}
            unit={this.renderUnit(item.MaterialId, item.NumberOfMaterial)}
        />)
    }

    renderDataMaterial(item, index) {
        return (<InfoTally
            key={index}
            NumberOfMaterial={item.NumberOfMaterial}
            Type={this.renderName(item.MaterialId)}
            description={false}
            PricePerUnit={this.renderPrice(item.MaterialId)}
            nameIcon={this.renderIcon(this.renderCategotyId(item.MaterialId))}
            unit={this.renderUnit(item.MaterialId, item.NumberOfMaterial)}
        />)
    }

    setModalVisible() {
        if (this.state.modalVisible) {
            this.setState({ modalVisible: false });
        } else {
            this.setState({ modalVisible: true });
        }
    }

    showAction() {
        this.setModalVisible();
    }

    sendInvoice(type, text) {
        Alert.alert('Notify', 'Are you sure to send invoice ' + text + ' ?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'OK', onPress: () => {
                        console.log('send invoice' + type)
                        console.log(this.state.JobDetails.JobDetailsId)
                        this.props.getSendInvoice(this.state.JobDetails.JobDetailsId, type, accessToken, (error, data) => {
                            if (data.Status == 1) {
                                Alert.alert('Notify', 'Send invoice susscess!')
                            }
                            else {
                                Alert.alert('Notify', data.Message)
                            }
                        })
                        this.setModalVisible()
                    }
                },
            ],
            { cancelable: false }
        );
    }

    render() {
        const { GST } = this.state;
        return (
            <Container>
                <Header title='Tally Service' textright='EDIT' size={20} iconLeft='close' onPress={() => this.props.navigation.goBack()} />
                <Content style={{ backgroundColor: material.grayTitle }}>
                    <View style={{ ...styles.status, backgroundColor: this.state.colorStatus }}>
                        <Text>Status</Text>
                        <Text>Unpaid</Text>
                    </View>
                    {/*
                        <TitleItem title='Payment Method' />
                        <InputRow hint='Cash' nameIcon='cash' onChangeText={(val) =>{   
                            this.setState({
                                cash: parseInt(val)
                            }, () =>{
                                {
                                    this.state.cash + this.state.eftpos + this.state.credit >= this.state.JobDetails.TotalCost ?
                                    this.setState({
                                        colorStatus: 'blue'
                                    })
                                    :
                                    this.setState({
                                        colorStatus: 'pink'
                                    })
                                }
                            })                
                        }}/>
                        <InputRow hint='EFTPOS' nameIcon='pos' onChangeText={(val) =>{
                            this.setState({
                                eftpos: parseInt(val)
                            }, ()=>{
                                {
                                    this.state.cash + this.state.eftpos + this.state.credit >= this.state.JobDetails.TotalCost ?
                                    this.setState({
                                        colorStatus: 'blue'
                                    })
                                    :
                                    this.setState({
                                        colorStatus: 'pink'
                                    })
                                }
                            }) 
                        }}/>
                        <InputRow hint='Credit' nameIcon='tally' onChangeText={(val) =>{
                            this.setState({
                                credit: parseInt(val)
                            }, ()=>{
                                {
                                    this.state.cash + this.state.eftpos + this.state.credit >= this.state.JobDetails.TotalCost ?
                                    this.setState({
                                        colorStatus: 'blue'
                                    })
                                    :
                                    this.setState({
                                        colorStatus: 'pink'
                                    })
                                }
                            }) 
                        }}/>*/}
                    {/*<View style={styles.Title}>
                            <Text style={styles.txtBold}>Payment Method</Text>                      
                        </View>*/}
                    <View style={styles.Title}>
                        <Text style={styles.txtBold}>Service Time</Text>
                        {
                            this.state.dataServiceTime && this.state.dataServiceTime.length === 0  && 
                            <Text style={styles.totalCost}>$ 0 </Text>
                        }
                    </View>
                    {
                        this.state.dataServiceTime && this.state.dataServiceTime.map((item, index) => this.renderDataMaterial(item, index))
                    }

                    <View style={styles.Title}>
                        <Text style={styles.txtBold}>Travel Time</Text>
                        {
                            this.state.dataTravelTime && this.state.dataTravelTime.length === 0 && 
                            <Text style={styles.totalCost}>$ 0 </Text>
                        }
                    </View>
                    {
                        this.state.dataTravelTime && this.state.dataTravelTime.map((item, index) => this.renderDataMaterial(item, index))
                    }

                    <View style={styles.Title}>
                        <Text style={styles.txtBold}>Fuel/RUCS</Text>
                        {
                            this.state.dataFuel && this.state.dataFuel.length === 0 &&
                            <Text style={styles.totalCost}>$ 0 </Text>
                        }
                    </View>
                    {
                        this.state.dataFuel && this.state.dataFuel.map((item, index) => this.renderDataMaterial(item, index))
                    }

                    <View style={styles.Title}>
                        <Text style={styles.txtBold}>Materials</Text>
                        {
                            this.state.dataMaterial && this.state.dataMaterial.length === 0 && 
                            <Text style={styles.totalCost}>$ 0 </Text>
                        }
                    </View>
                    {
                        this.state.dataMaterial && this.state.dataMaterial.map((item, index) => this.renderDataMaterial(item, index))
                    }

                    {/*{
                            this.state.JobDetails.JobDetailsMaterials.map((item, index) => this.renderMaterial(item, index))
                        }*/}

                    <View style={{ ...styles.Title, ...styles.totalCost }}>
                        <Text style={styles.txtBold}>GST</Text>
                        <Text style={styles.txtBold}>$ {Math.round(GST * this.state.JobDetails.TotalCost)}</Text>
                    </View>

                    {/*<View style={{...styles.Title, paddingRight: 50}}>
                            <Text style={styles.txtBold}>Surcharge</Text>
                            <Text style={styles.txtBold}>$ {this.state.JobDetails.AdjustmentMatrix}</Text>
                        </View>*/}

                    <View style={{ ...styles.Title, backgroundColor: '#fff' }}>
                        <Text style={styles.total}>Total</Text>
                        <Text style={{ ...styles.total, fontWeight: 'bold', color: '#ed502b' }}>$ {this.state.JobDetails.TotalCost}</Text>
                    </View>
                    <View style={{ ...styles.Title, backgroundColor: '#e9edf0', height: 10 }} />
                </Content>
                {/*<View style={styles.bottomAction}>
                    <TouchableOpacity
                    onPress={() => Communications.text('0868867596','Removalist announces that your goods has been delivered ad here is the invoice:'+
                                   ' The total amount is $1000 including:'+
                                    '- Service time amount: $300'+
                                    '- Travel time amount: $200'+
                                    '- Fuel/RUCS: $200' +
                                    '- Material amount: $300' +
                                   ' - Surcharge: $0' +
                                    'Thank you for using our service.' +
                                    'Hope to serve you later!')}
                    >
                        <Icon name='sms' size={22} color={material.bgColor}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => Communications.email(['thunt@qsoftvietnam.com'],null,null,'Test Email','Hi Joe,'+
                                    'Removalist announces that your goods has been delivered ad here is the invoice:'+
                                   ' The total amount is $1000 including:'+
                                    '- Service time amount: $300'+
                                    '- Travel time amount: $200'+
                                    '- Fuel/RUCS: $200' +
                                    '- Material amount: $300' +
                                   ' - Surcharge: $0' +
                                    'Thank you for using our service.' +
                                    'Hope to serve you later!')}
                    >
                        <Icon name='send-email' size={22} color={material.bgColor}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name='send-invoice' size={22} color={material.bgColor}/>
                    </TouchableOpacity>
                </View>*/}

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setModalVisible()}
                >
                    <TouchableOpacity activeOpacity={1}
                        onPress={() => {
                            this.setModalVisible()
                        }}
                        style={{ backgroundColor: 'rgba(0,0,0,0.3)', flex: 1, alignItems: 'center', justifyContent: 'flex-end', }} >
                        <View
                            style={{
                                overflow: 'hidden',
                                padding: 10,
                                width: material.deviceWidth,
                                backgroundColor: 'white',
                            }}>
                            <Text style={{ fontSize: 14, color: material.grayColor }}>Select Invoice method for client</Text>
                            <Text style={styles.txtBold}>{this.state.JobDetails.Contact[0].CompanyName}</Text>
                            <View style={{ borderWidth: 0.5, borderColor: material.grayTitle, marginVertical: 10 }} />
                            <TouchableOpacity style={styles.itemAction}
                                onPress={() => this.sendInvoice(1, 'to SMS')}>
                                <TouchableOpacity style={styles.buttonAction}
                                    onPress={() => this.sendInvoice(1, 'to SMS')}>
                                    <Icon name='sms' size={22} color={material.whiteColor} />
                                </TouchableOpacity>
                                <Text style={styles.txtAction}>SMS</Text>
                            </TouchableOpacity>

                            <View style={{ borderWidth: 0.5, borderColor: material.grayTitle, marginVertical: 10 }} />
                            <TouchableOpacity style={styles.itemAction}
                                onPress={() => this.sendInvoice(2, 'to Email')}>
                                <TouchableOpacity style={styles.buttonAction}
                                    onPress={() => this.sendInvoice(2, 'to Email')}>
                                    <Icon name='send-email' size={22} color={material.whiteColor} />
                                </TouchableOpacity>
                                <Text style={styles.txtAction}>Email</Text>
                            </TouchableOpacity>

                            <View style={{ borderWidth: 0.5, borderColor: material.grayTitle, marginVertical: 10 }} />
                            <TouchableOpacity style={styles.itemAction}
                                onPress={() => this.sendInvoice(3, 'to Post Office')}>
                                <TouchableOpacity style={styles.buttonAction}
                                    onPress={() => this.sendInvoice(3, 'to Post Office')}>
                                    <Icon name='send-invoice' size={22} color={material.whiteColor} />
                                </TouchableOpacity>
                                <Text style={styles.txtAction}>Post Office</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>

                </Modal>

                <Button
                    onPress={() => this.showAction()}
                    full
                    text='SEND INVOICE TO CLIENT'
                    color={material.greenColor}
                />
            </Container>
        )
    }
}