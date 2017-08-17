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

import DropDownModal from '../DropDownModal';
import Input from '../Input';
import styles from './styles';
import ButtonIcon from '~/ui/components/ButtonIcon';
import InputRow from '~/ui/elements/InputRow';

const DropDownField = ({ input, ...custom }) => (
    <DropDownModal
        {...input}
        {...custom}
    />
)

const InputField = ({ input, ...custom }) => (
    <Input
        {...input}
        {...custom}
    />
)

export const InputNote = ({ input: { onChange, ...restInput } }) => {
    return <InputRow hint='Note' nameIcon='note' onChangeText={onChange} {...restInput} right={
        <View style={styles.borderLeft}>
            <Text style={styles.content}> $50</Text>
        </View>
    } />
}

const StatusInputField = ({ input, member, nameIcon, measure, listItems }) => {
    const price = input.value.status.CategoryId != '' ? (input.value.status.PricePerUnit * input.value.input) : '0.00';
    const hrs = input.value.input > 1 ? 'hrs' : 'hr'
    return (
        <View collapsable={false} style={styles.wrapItem}>
            <Field name={`${member}.status`} component={DropDownField} nameIcon={nameIcon} listItems={listItems} />
            <View style={styles.border} />
            <Field name={`${member}.input`} component={InputField} measure={measure == 'hr' ? hrs : measure} />
            <View style={styles.border} />
            <View style={styles.Item}>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.content}> ${price}</Text>
            </View>
        </View>
    )
}

export const InputServiceField = ({ name, nameIcon, measure, listItems }) => {
    return <Field name={name} member={name} component={StatusInputField} nameIcon={nameIcon} measure={measure} listItems={listItems} />
}


const renderMaterial = (name, index, fields, listItems, measure, nameIcon) => {
    return (
        <View key={index}>
            <Field name={name} member={name} component={StatusInputField} nameIcon={nameIcon} measure={measure} listItems={listItems} />
            {
                index == 0
                    ? <ButtonIcon style={styles.button} onPress={() => fields.push({
                        status: {
                            Name: 'Select Type',
                            CategoryId: ''
                        },
                        input: '',
                    })} icon='add' size={16} color='#fff' />
                    : <ButtonIcon style={styles.button} onPress={() => fields.remove(index)} iconRemove size={18} color='#fff' />
            }
        </View>
    )
}


export const MaterialArray = ({ fields, meta: { error, submitFailed }, listItems, measure, nameIcon }) => (
    <View>
        {fields.map((name, index) => renderMaterial(name, index, fields, listItems, measure, nameIcon))}
    </View>
)
