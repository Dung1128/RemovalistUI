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

const InputTime = ({ input: { onChange, ...restInput } }) => {
    return <InputRow hint='Time' nameIcon='time' onChangeText={onChange} {...restInput} />
}

const InputAdress1 = ({ input: { onChange, ...restInput } }) => {
    return <InputRow hint='Adresss 1' nameIcon='building' onChangeText={onChange} {...restInput} />
}

const InputAdress2 = ({ input: { onChange, ...restInput } }) => {
    return <InputRow hint='Adresss 2' nameIcon='map' onChangeText={onChange} {...restInput} />
}

const InputNote = ({ input: { onChange, ...restInput } }) => {
    return <InputRow hint='Note' nameIcon='note' onChangeText={onChange} {...restInput} />
}

const renderPickUp = (member, index, fields) => {
    return (
        <View key={index}>
            {
                index != 0 && <TitleItem title='Pick Up'
                    right={
                        <ButtonIcon onPress={() => fields.remove(index)} iconRemove size={18} color='#fff' />
                    }
                />
            }
            <Field name={`${member}.time`} component={InputTime} />
            <Field name={`${member}.addressline1`} component={InputAdress1} />
            <Field name={`${member}.addressline2`} component={InputAdress2} />
            <Field name={`${member}.note`} component={InputNote} />
        </View>
    )
}

export const PickUpField = ({ fields, meta: { error, submitFailed }, ...custom }) => console.log(fields)||(
    <View>
        <TitleItem title='Pick Up'
            right={
                <ButtonIcon onPress={() => fields.push({})} icon='add' size={18} color='#fff' />
            }
        />
        {fields.map((member, index) => renderPickUp(member, index, fields))}
    </View>
)

const renderDropOff = (member, index, fields) => {
    return (
        <View key={index}>
            {
                index != 0 && <TitleItem title='Drop Off'
                    right={
                        <ButtonIcon onPress={() => fields.remove(index)} iconRemove size={18} color='#fff' />
                    }
                />
            }
            <Field name={`${member}.time`} component={InputTime} />
            <Field name={`${member}.addressline1`} component={InputAdress1} />
            <Field name={`${member}.addressline2`} component={InputAdress2} />
            <Field name={`${member}.note`} component={InputNote} />
        </View>
    )
}

export const DropOffField = ({ fields, meta: { error, submitFailed }, ...custom }) => (
    <View>
        <TitleItem title='Drop Off'
            right={
                <ButtonIcon onPress={() => fields.push({})} icon='add' size={18} color='#fff' />
            }
        />
        {fields.map((member, index) => renderDropOff(member, index, fields))}
    </View>
)
