import React, { Component } from 'react'
import { Container, Spinner, Text, View, Content } from 'native-base'
import material from '~/theme/variables/material'
import styles from './styles'

import Header from '~/ui/components/Header';
import TitleItem from '~/ui/components/TitleItem';
import InputRow from '~/ui/elements/InputRow';
import InfoTally from './components/InfoTally'
import Icon from '~/ui/components/Icon';
import { TouchableOpacity } from 'react-native'
import Communications from 'react-native-communications';
import { connect } from 'react-redux'

import * as materialActions from '~/store/actions/material'
import * as jobSelectors from '~/store/selectors/job'
import * as jobActions from '~/store/actions/job'

@connect(
    state => ({
        listMaterial: jobSelectors.getMaterialList(state),
        MaterialCategories: jobSelectors.getMaterialCategoryList(state)
    }), { ...materialActions, ...jobActions })
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
           colorStatus: 'pink',
           JobDetails: this.props.navigation.state.params.JobDetails,
           cash: 0,
           eftpos: 0,
           credit: 0
        }
    
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

    renderName(id) {
        const data = this.props.listMaterial
        for (const i = 0; i < data.length; i++) {
            if(id == data[i].MaterialId) {
                return data[i].Name
            }
        }
    }

    renderTitle(id) {
        const data= this.props.MaterialCategories
        for (const i = 0; i < data.length; i++) {
            if(id == data[i].MaterialCategoryId) {
                return data[i].CategoryName
            }
        }
    }
    renderCategotyId(id) {
        const data = this.props.listMaterial
        for (const i = 0; i < data.length; i++) {
            if(id == data[i].MaterialId) {
                return data[i].CategoryId
            }
        }
    }

    renderPrice(id) {
        const data = this.props.listMaterial
        for (const i = 0; i < data.length; i++) {
            if(id == data[i].MaterialId) {
                return data[i].PricePerUnit
            }
        }
    }
    renderUnit(id, number) {
        const data = this.props.listMaterial
        for (const i = 0; i < data.length; i++) {
            if(id == data[i].MaterialId) {
                if(number > 1 && data[i].UnitIndicator !== '')
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


    render() {
        console.log(this.state.JobDetails.JobDetailsMaterials)
        console.log(this.props.MaterialCategories)
        console.log('tong tien: ' + this.state.totalPaid)
        return (
            <Container>
                <Header title='Tally' textright='EDIT' size={20} iconLeft='close' onPress={() => this.props.navigation.goBack()} />
                    <Content>
                        <View style={{...styles.status, backgroundColor: this.state.colorStatus }}>
                            <Text>Status</Text>
                            <Text>Unpaid</Text>
                        </View>
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
                        }}/>
                        
                        {
                            this.state.JobDetails.JobDetailsMaterials.map((item, index) => this.renderMaterial(item, index))
                        }

                        <View style={styles.Title}>
                            <Text style={styles.textBold}>GST</Text>
                            <Text style={styles.textBold}>$ {this.state.JobDetails.AdjustmentMatrix}</Text>
                        </View>

                        <View style={styles.Title}>
                            <Text style={styles.textBold}>Surcharge</Text>
                            <Text style={styles.textBold}>$ {this.state.JobDetails.AdjustmentMatrix}</Text>
                        </View>
                      
                        <View style={{...styles.Title, backgroundColor: '#fff'}}>
                            <Text style={styles.total}>Total</Text>
                            <Text style={{...styles.total, fontWeight: 'bold', color:'#ed502b' }}>$ {this.state.JobDetails.TotalCost}</Text>
                        </View>
                        <View style={{...styles.Title, backgroundColor: '#e9edf0', height: 10}} />
                </Content>
                <View style={styles.bottomAction}>
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
                </View>
            </Container>
        )
    }
}