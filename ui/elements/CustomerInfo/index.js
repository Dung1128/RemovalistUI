import React, { Component } from 'react';
import { Text } from 'react-native';
import { View, Input } from 'native-base';

import InputRow from '../InputRow';

const rowPhone = [];
rowPhone.push({
    hint:'Phone 1',
    nameIcon:'call',
    add:'true',
})

export default class extends Component {
    constructor(props){
    super(props);
    this.state = ({
      listPhone: rowPhone
    });

  }

  addPhone() {

    let newList = this.state.listPhone
    newList.push({
        hint:'Phone 1',
        nameIcon:'call',
    })

    console.log(newList)

    this.setState({
        listPhone: newList
    })
  }

  renderRow(data, index) {
    return(
      <View key={index}>
        <InputRow  
            hint={data.hint}
            nameIcon={data.nameIcon}
            add={data.add}
            onPress={() => this.addPhone()} 
          />
      </View>
    )
  }


    render() {
        console.log('add phone')
        const { hintuser, hintphone, hintemail, iconUser, iconPhone, iconEmail, 
            add,onChangeTextUser, onChangeTextEmail, onChangeTextAddress,
            hintAddress, iconAddress1, iconAddress2, onChangeTextAddress1, 
            onChangeTextAddress2,
             ...props 
        } = this.props;
        return (
            <View collapsable={false} {...props}>
                <InputRow hint={hintuser} nameIcon={iconUser} onChangeText={onChangeTextUser}/>
                {
                    this.state.listPhone.map((item, index) => this.renderRow(item, index))
                }
                <InputRow hint={hintemail} nameIcon={iconEmail} onChangeTextEmail={onChangeTextEmail}/>
                <InputRow hint={hintAddress} nameIcon={iconAddress1} onChangeTextEmail={onChangeTextAddress}/>
                <InputRow hint={hintAddress} nameIcon={iconAddress2} onChangeTextEmail={onChangeTextAddress}/>
            </View>
        );
    }
} 
