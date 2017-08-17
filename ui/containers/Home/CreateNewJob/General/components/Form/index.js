import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import {
    View,
    Button,
    Text,
    ListItem,
    Spinner
} from 'native-base';
import {
    Field,
    FieldArray,
    reduxForm,
} from 'redux-form'

import CustomerInfo from '~/ui/elements/CustomerInfo';
import InputRow from '~/ui/elements/InputRow';
import Icon from '~/ui/components/Icon';
import TitleItem from '~/ui/components/TitleItem';
import ButtonIcon from '~/ui/components/ButtonIcon';
import DateTime from '~/ui/components/DateTime';
import styles from './styles';
import Truck from '../Truck';
import Status from '../Status';
import moment from 'moment';

const InputUser = ({ input: { onChange, ...restInput }, meta: { touched, error, warning } }) => {
    return <InputRow hint='Username' error={touched && error} nameIcon='user' onChangeText={onChange} {...restInput} />
}

const InputEmail = ({ input: { onChange, ...restInput }, meta: { touched, error, warning } }) => {
    return <InputRow hint='Email' error={touched && error} nameIcon='email' onChangeText={onChange} {...restInput} />
}

const InputAdress1 = ({ input: { onChange, ...restInput }, meta: { touched, error, warning } }) => {
    return <InputRow hint='Adresss 1' error={touched && error} nameIcon='building' onChangeText={onChange} {...restInput} />
}

const InputAdress2 = ({ input: { onChange, ...restInput }, meta: { touched, error, warning } }) => {
    return <InputRow hint='Adresss 2' error={touched && error} nameIcon='map' onChangeText={onChange} {...restInput} />
}

const InputPhone = ({ input: { onChange, ...restInput }, meta: { touched, error, warning }, index, fields, ...custom }) => {
    return (
        <InputRow
            error={touched && error}
            hint={`Phone ${index + 1}`}
            nameIcon='call'
            add
            addIcon={index != 0 ? 'delete' : 'add'}
            onChangeText={onChange} {...restInput}
            onPress={() => {
                index == 0 ? fields.push({}) : fields.remove(index)
            }} />
    )
}

const InputPhoneArray = ({ fields = 1, meta: { error, submitFailed }, ...custom }) => {
    return <View>
        {fields.map((phone, index) =>
            <Field key={index} name={phone} component={InputPhone} index={index} fields={fields} />
        )}
    </View>
}

const renderCustomer = (member, index, fields) => {
    return (
        <View key={index}>
            {
                index != 0 && <TitleItem title={`Customer Info ${index + 1}`}
                    right={
                        <ButtonIcon onPress={() => fields.remove(index)} iconRemove size={18} color='#fff' />
                    }
                />
            }
            <Field name={`${member}.username`} component={InputUser} />
            <FieldArray name={`${member}.phone`} component={InputPhoneArray} />
            <Field name={`${member}.email`} component={InputEmail} />
            <Field name={`${member}.addressline1`} component={InputAdress1} />
            <Field name={`${member}.addressline2`} component={InputAdress2} />
        </View>
    )
}

export const CustomerField = ({ fields, meta: { error, submitFailed }, ...custom }) => (
    <View>
        <TitleItem title='Customer Info'
            right={
                <ButtonIcon onPress={() => fields.push({
                    username: '',
                    phone: [{

                    }],
                    email: '',
                    addressline1: '',
                    addressline2: ''
                })} icon='add' size={18} color='#fff' />
            }
        />
        {fields.map((member, index) => renderCustomer(member, index, fields))}
        {submitFailed && error && <Text>{error}</Text>}
    </View>
)


export const TruckField = ({ input, meta: { touched, error, warning }, ...custom }) => (
    <Truck
        error={touched && error}
        {...input}
        {...custom}
    />
)


export const StatusField = ({ input, meta: { touched, error, warning }, ...custom }) => (
    <Status
        error={touched && error}
        {...input}
        {...custom}
    />
)


const DateField = ({ input, label, meta: { touched, error, warning }, ...custom }) => (
    <DateTime
        error={touched && error}
        {...input}
        {...custom}
    />
)


const StartEndField = ({ input, label, meta: { touched, error, warning }, member }) => {
    let hour = moment(input.value.timeEnd).diff(input.value.timeStart, 'hour');
    let minutes = moment(input.value.timeEnd).diff(input.value.timeStart, 'minutes');
    let checkMinutes = minutes % 60;
    let duration = `${hour}h ${checkMinutes != 0 ? checkMinutes : ''}`;
    return (
        <View style={styles.itemTime}>
            <Text style={styles.txttitledate}>Time</Text>
            <View style={{ flexDirection: 'row' }}>
                <Field name={`${member}.timeStart`} component={DateField} mode='time' />
                <Text> - </Text>
                <Field name={`${member}.timeEnd`} component={DateField} mode='time' />
            </View>
            <Text style={styles.txttitledate}>Duration: {duration}</Text>
            {touched && error && <Text>{error}</Text>}
        </View>
    )
}


export const DateTimeField = ({ name }) => {
    return (
        <View collapsable={false} style={{ backgroundColor: '#fff', flexDirection: 'row' }}>
            <View style={styles.itemTime}>
                <Text style={styles.txttitledate}>Date</Text>
                <Field name={`${name}.date`} component={DateField} />
                <Text style={styles.txttitledate}>Today</Text>
            </View>
            <View style={styles.border} />
            <Field name={`${name}.time`} member={`${name}.time`} component={StartEndField} />
        </View>
    )
}


