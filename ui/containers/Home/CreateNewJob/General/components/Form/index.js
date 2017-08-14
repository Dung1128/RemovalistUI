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

const InputUser = ({ input: { onChange, ...restInput } }) => {
    return <InputRow hint='Username' nameIcon='user' onChangeText={onChange} {...restInput} />
}

const InputEmail = ({ input: { onChange, ...restInput } }) => {
    return <InputRow hint='Email' nameIcon='email' onChangeText={onChange} {...restInput} />
}

const InputAdress1 = ({ input: { onChange, ...restInput } }) => {
    return <InputRow hint='Adresss 1' nameIcon='building' onChangeText={onChange} {...restInput} />
}

const InputAdress2 = ({ input: { onChange, ...restInput } }) => {
    return <InputRow hint='Adresss 2' nameIcon='map' onChangeText={onChange} {...restInput} />
}

const InputPhone = ({ input: { onChange, ...restInput }, index, fields, ...custom }) => {
    return <InputRow
        hint={`Phone ${index + 1}`}
        nameIcon='call'
        add
        addIcon={index != 0 ? 'delete' : 'add'}
        onChangeText={onChange} {...restInput}
        onPress={() => {
            index == 0 ? fields.push({}) : fields.remove(index)
        }}
    />
}

const InputPhoneArray = ({ fields = 1, meta: { error, submitFailed }, ...custom }) => {
    return <View>
        <ButtonIcon onPress={() => fields.push({})} icon='add' size={18} color='#fff' />
        {fields.map((phone, index) =>
            <Field key={index} name={phone} component={InputPhone} index={index} fields={fields} />
        )}
    </View>
}

const renderCustomer = (member, index, fields) => {
    return (
        <View key={index}>
            {
                index != 0 && <TitleItem title='Status'
                    right={
                        <ButtonIcon onPress={() => fields.remove(index)} icon='delete' size={18} color='#fff' />
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
        <TitleItem title='Status'
            right={
                <ButtonIcon onPress={() => fields.push({})} icon='add' size={18} color='#fff' />
            }
        />
        {fields.map((member, index) => renderCustomer(member, index, fields))}
    </View>
)
