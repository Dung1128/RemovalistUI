import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    TouchableOpacity,
    Linking,
    Modal,
    Alert,
    ListView
} from 'react-native';
import CustomerInfo from './CustomerInfo';

const INIT_FORM = {
    customerInfo: [
        {
            address: '',
            phone: [
                {
                    number: ''
                }
            ],
            name: ''
        }
    ],
    startTime: '',
};

const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9EZzFPVVF4UmpZelJEZzVSakUzT0RBME5UUkZRa1pHUkRJd016ZERPRFl4TmpRd09UaEdSUSJ9.eyJpc3MiOiJodHRwczovL3R1YW5wbDEuYXUuYXV0aDAuY29tLyIsInN1YiI6ImVvc29UR3FCMHZwNWlsS1dWMGcxclZmaVBFMGRaWnVGQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3R1YW5wbDF0ZXN0IiwiZXhwIjoxNTAyNTA2MTM1LCJpYXQiOjE1MDI0MTk3MzUsInNjb3BlIjoiIn0.ReSNkSK_qln2Ose80tBJL11Y8A_-v4tlgHE3SUgqOUAdwh_9zcnO-YvYCSGlmy7MSUp7EbbmAAec6se5Rq6hl_sdC2oTaHod9qlR_pNy4Ht6AUcYGkBj2LUYNEADlynFEfqRAaPj0QOu23fKsm-keqxG-EGkzkGuLm2_6tXk5ILUzKLLsTXeN44z_pimmrbsmi3mlkAusDHBy7PcUeAHo6dhPHpkqM7u1bIbkh0JgMqkdUeNV0D6OdM_XMhCApWhJBBa8aqVUHPlDDSich9vMq7WUFHydpC30JwtT7ajVq0490Y8TvJjWksW-9CuL32n84frMr5M-lOggA9kNNEhLw'

export default class extends Component {

    constructor(props) {
        super(props);

        this.state = ({
            formData: INIT_FORM
        });

        this.updateCustomerInfo = this.updateCustomerInfo.bind(this);
        this.addMoreCustomerInfo = this.addMoreCustomerInfo.bind(this);
        this.addMorePhone = this.addMorePhone.bind(this);
    }

    updateCustomerInfo = ({ index, name, address}) => {
        this.state.formData.customerInfo[index] = {
            name,
            address
        };
        console.log('updateCustomerInfo', this.state.formData.customerInfo[index]);
    }

    addMoreCustomerInfo = () => {
        const newFormData = {...this.state.formData};
        newFormData.customerInfo.push({
            name: '',
            phone: [
                {
                    number: ''
                }
            ],
            address: ''
        });
        this.setState({
            formData: newFormData
        }, () => console.log('AddMoreCustomerInfo OK', this.state.formData));
        // this.state.formData.customerInfo.push({
        //     name: '',
        //     phone: [
        //         {number: ''}
        //     ],
        //     address: ''
        // });
        // console.log('addMoreCustomerInfo', this.state.formData)
    }

    addMorePhone = (index) => {
        const newFormData = {...this.state.formData};
        newFormData.customerInfo[index].phone.push({
            number: ''
        });
        this.setState({
            formData: newFormData
        }, () => console.log('addMorePhone OK', this.state.formData));
        // this.state.formData.customerInfo[index].phone.push({
        //     number: ''
        // });
        // console.log('addMorePhone', this.state.formData)
    }

    render() {

        return (
            <View style={{flex: 1, backgroundColor: 'grey'}}>
                {this.state.formData.customerInfo.map((data, index) => <CustomerInfo 
                    data={data} 
                    index={index} 
                    key={index} 
                    updateData={this.updateCustomerInfo}
                    addMoreCustomerInfo={this.addMoreCustomerInfo}
                    addMorePhone={this.addMorePhone}
                />)}
            </View>
        );
    }
}
