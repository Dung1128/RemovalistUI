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


export const InputServiceField = ({ name, nameIcon, measure, listItems, nameItem }) => {
    return (
        <View collapsable={false} style={{ backgroundColor: '#fff', flexDirection: 'row', height: 50 }}>
            <Field name={`${name}.status`} component={DropDownField} nameIcon={nameIcon} listItems={listItems} nameItem={nameItem} />
            <View style={styles.border} />
            <Field name={`${name}.input`} component={InputField} measure={measure} />
            <View style={styles.border} />
            <View style={styles.Item}>
                <Text style={styles.content}> $50</Text>
            </View>
        </View>
    )
}


const renderMaterial = (name, index, fields, listItems, nameItem, measure, nameIcon) => {
    return (
        <View key={index} collapsable={false} style={{ backgroundColor: '#fff', flexDirection: 'row', height: 50 }}>
            <Field name={`${name}.status`} component={DropDownField} nameIcon={nameIcon} listItems={listItems} nameItem={nameItem} />
            <View style={styles.border} />
            <Field name={`${name}.input`} component={InputField} measure={measure} />
            <View style={styles.border} />
            <View style={styles.Item}>
                <Text style={styles.content}> $50</Text>
                {
                    index == 0
                        ? <ButtonIcon style={styles.button} onPress={() => fields.push({
                            status: 'Type 1',
                            input: '',
                        })} icon='add' size={16} color='#fff' />
                        : <ButtonIcon style={styles.button} onPress={() => fields.remove(index)} iconRemove size={18} color='#fff' />
                }
            </View>
        </View>
    )
}


export const MaterialArray = ({ fields, meta: { error, submitFailed }, listItems, nameItem, measure, nameIcon }) => (
    <View>
        {fields.map((name, index) => renderMaterial(name, index, fields, listItems, nameItem, measure, nameIcon))}
    </View>
)
