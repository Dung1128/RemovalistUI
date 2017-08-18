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
import Icon from '~/ui/components/Icon';
import ButtonIcon from '~/ui/components/ButtonIcon';
import InputRow from '~/ui/elements/InputRow';
import material from '~/theme/variables/material';
import TitleItem from '~/ui/components/TitleItem';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux'

const DropDownField = ({ input, meta: { touched, error, warning }, ...custom }) => (
    <View collapsable={false} style={{ borderBottomWidth: 0.5, borderBottomColor: touched && error ? material.redColor : '#e9edf0', }}>
        <DropDownModal
            {...input}
            {...custom}
        />
    </View>
)

const InputField = ({ input, meta: { touched, error, warning }, ...custom }) => (
    <View collapsable={false} style={{ ...styles.Item, borderBottomWidth: 0.5, borderBottomColor: touched && error ? material.redColor : '#e9edf0', }}>
        <Input
            {...input}
            {...custom}
        />
    </View>
)

// const InputNote = ({ input: { onChange, ...restInput } }, { ...custom }) => {
//     return <InputRow hint='Note' nameIcon='note' onChangeText={onChange} {...restInput} />
// }

const InputSurchargeField = ({ input, ...custom }) => {
    return <Input
        icon={false}
        {...input}
        {...custom} />
}

export const InputSurcharge = ({ input, meta: { touched, error, warning }, member }) => {
    let price = parseFloat(input.value && input.value.price != '' ? input.value.price : 0).toFixed(2);
    return (
        <View>
            <TitleItem title='Surcharge'
                right={
                    <View row style={styles.money}>
                        <Text style={styles.titPrice}>${price}</Text>
                    </View>
                }
            />
            <View style={styles.wrapContent}>
                <Icon size={22} color={material.grayIconColor} name='note' />
                <Field name={`${member}.note`} component={InputSurchargeField} placeholder='Note' keyboardType='default' on />
                <View style={styles.borderLeft}>
                    <Text style={{ paddingLeft: 10 }}>  $ </Text>
                    <Field name={`${member}.price`} component={InputSurchargeField} />
                </View>
            </View>
        </View>
    )
}

const StatusInputField = ({ input, meta: { touched, error, warning }, member, nameIcon, measure, listItems, title }) => {

    const price = (input.value && input.value.status.CategoryId ? (input.value.status.PricePerUnit * input.value.input) : 0).toFixed(2);
    const hrs = input.value.input > 1 ? 'hrs' : 'hr'
    return (
        <View>
            {
                title != 'Material' && <TitleItem
                    title={title}
                    right={
                        <View row style={styles.money}>
                            <Text style={styles.titPrice}>${price}</Text>
                        </View>
                    }
                />
            }

            <View collapsable={false} style={styles.wrapItem}>
                <Field name={`${member}.status`} component={DropDownField} nameIcon={nameIcon} listItems={listItems} />
                <View style={styles.border} />
                <Field name={`${member}.input`} component={InputField} measure={measure == 'hr' ? hrs : measure} />
                <View style={styles.border} />
                <View style={styles.Item}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.content}> ${price}</Text>
                </View>
            </View>
        </View>
    )
}

export const InputServiceField = ({ name, nameIcon, measure, listItems, title }) => {
    return <Field name={name} member={name} component={StatusInputField} nameIcon={nameIcon} measure={measure} listItems={listItems} title={title} />
}


const renderMaterial = (name, index, fields, listItems, measure, nameIcon, title) => {
    return (
        <View key={index}>
            <Field name={name} member={name} component={StatusInputField} nameIcon={nameIcon} measure={measure} listItems={listItems} title={title} />
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


const selector = formValueSelector('TallyService')

export const MaterialArray = connect((state) => ({
    material: selector(state, 'material'),
}))(({ fields, meta: { error, submitFailed }, listItems, measure, nameIcon, title, material }) => {
    const price = material && material.map(input => (input.status && input.status.CategoryId ? (input.status.PricePerUnit * input.input) : 0))
        .reduce((a, b) => a + b).toFixed(2);
    return (
        <View>
            <TitleItem
                title={title}
                right={
                    <View row style={styles.money}>
                        <Text style={styles.titPrice}>${price}</Text>
                    </View>
                }
            />
            {fields.map((name, index) => renderMaterial(name, index, fields, listItems, measure, nameIcon, title))}
        </View>
    )
})
