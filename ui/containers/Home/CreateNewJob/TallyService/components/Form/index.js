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

import InputService from '~/ui/elements/InputService';


export const InputServiceField = ({ input: { onChange, ...restInput }, ...custom }) => (
    <InputService
        {...restInput}
        {...custom}
    />
)


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
