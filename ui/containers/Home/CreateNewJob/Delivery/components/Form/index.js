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
import material from '~/theme/variables/material';

const InputTime = ({ input, meta: { touched, error, warning }, ...custom }) => {
    return (
        <View white>
            <View style={{
                ...styles.wrapContent,
                borderBottomColor: touched && error ? material.redColor : '#e9edf0',
                paddingRight: 20,
            }}
                collapsable={false}>
                <View row>
                    <Icon name='time' size={20} style={{ color: material.grayIconColor, paddingRight: 10 }} />
                    <DateTime
                        {...input}
                        {...custom}
                        mode='time'
                    />
                </View>
                {touched && error && <Icon size={16} color={material.grayIconColor} name='info' />}
            </View>
            {touched && error && <Text style={{ marginLeft: 20 }} wraning>{error}</Text>}
        </View>
    )
}

const InputAdress1 = ({ input: { onChange, ...restInput }, meta: { touched, error, warning } }) => {
    return <InputRow hint='Building/Unit' error={touched && error} nameIcon='building' onChangeText={onChange} {...restInput} />
}

const InputAdress2 = ({ input: { onChange, ...restInput }, meta: { touched, error, warning } }) => {
    return <InputRow hint='Address' error={touched && error} nameIcon='map' onChangeText={onChange} {...restInput} />
}

const InputNote = ({ input: { onChange, ...restInput }, meta: { touched, error, warning } }) => {
    return <InputRow hint='Note' error={touched && error} nameIcon='note' onChangeText={onChange} {...restInput} />
}

const renderPickUp = (member, index, fields) => {
    return (
        <View key={index}>
            {
                index != 0 && <TitleItem title={`Pick Up ${index}`}
                    right={
                        <ButtonIcon onPress={() => fields.remove(index)} iconRemove size={18} color='#fff' />
                    }
                />
            }
            <Field name={`${member}.Time`} component={InputTime} />
            <Field name={`${member}.AddressLine1`} component={InputAdress1} />
            <Field name={`${member}.AddressLine2`} component={InputAdress2} />
            <Field name={`${member}.Notes`} component={InputNote} />
        </View>
    )
}

export const PickUpField = ({ fields, meta: { error, submitFailed }, ...custom }) => (
    <View>
        <TitleItem title='Pick Up'
            right={
                <ButtonIcon onPress={() => fields.push({
                    Time: new Date(),
                    AddressLine1: '',
                    AddressLine2: '',
                    Notes: ''
                })} icon='add' size={18} color='#fff' />
            }
        />
        {fields.map((member, index) => renderPickUp(member, index, fields))}
    </View>
)

const renderDropOff = (member, index, fields) => {
    return (
        <View key={index}>
            {
                index != 0 && <TitleItem title={`Drop Off ${index}`}
                    right={
                        <ButtonIcon onPress={() => fields.remove(index)} iconRemove size={18} color='#fff' />
                    }
                />
            }
            <Field name={`${member}.Time`} component={InputTime} />
            <Field name={`${member}.AddressLine1`} component={InputAdress1} />
            <Field name={`${member}.AddressLine2`} component={InputAdress2} />
            <Field name={`${member}.Notes`} component={InputNote} />
        </View>
    )
}

export const DropOffField = ({ fields, meta: { error, submitFailed }, ...custom }) => (
    <View>
        <TitleItem title='Drop Off'
            right={
                <ButtonIcon onPress={() => fields.push({
                    Time: new Date(),
                    AddressLine1: '',
                    AddressLine2: '',
                    Notes: ''
                })} icon='add' size={18} color='#fff' />
            }
        />
        {fields.map((member, index) => renderDropOff(member, index, fields))}
    </View>
)
