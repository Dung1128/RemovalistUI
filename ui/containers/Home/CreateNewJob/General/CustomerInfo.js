import React from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, Button} from 'react-native';


const renderPhone = (data) => {
    return data.phone.map((phone, index) => {
        return (
            <TextInput key={index} placeholder="phone" value={phone.number} />
        );
    });
}
/**
 * stateless component
 */
const CustomerInfo = ({ data, updateData, index, addMoreCustomerInfo, addMorePhone}) =>  {
    const {name, address, phone} = data;
    return (
        <View style={{flex: 1, backgroundColor: 'green'}}>
            <TextInput placeholder="name" value={name} onChangeText={name => updateData({index, name, address})} />
            <TextInput placeholder="addrees" value={address} onChangeText={address => updateData({index, address, name})}  />
            {renderPhone(data)}
            <Button title="Add more customer Info" onPress={() => addMoreCustomerInfo()} />
            <Button title="Add more phone" onPress={() => addMorePhone(index)} />
        </View>
    );
}

CustomerInfo.propTypes = {
    data: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    updateData: PropTypes.func.isRequired,
    addMoreCustomerInfo: PropTypes.func.isRequired,
    addMorePhone: PropTypes.func.isRequired,
    abc: PropTypes.string
};

CustomerInfo.defaultProps = {
    abc: 'Ke tao'
};

export default CustomerInfo;
