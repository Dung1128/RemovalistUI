import React, { Component } from 'react';
import { Text } from 'react-native';
import { View, Input } from 'native-base';

import InputRow from '~/ui/elements/InputRow';

const rowTask = [];
rowTask.push({
    hint: 'Task desciption',
    nameIcon: 'note',
    add: 'true',
    addIcon:'add'
})

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            listTask: rowTask,
        });

    }

    addTask() {

        let newList = this.state.listTask
        newList.push({
            hint: 'Task desciption',
            nameIcon: 'note',
            add: 'true',
            addIcon:'delete'
        })

        console.log(newList)

        this.setState({
            listTask: newList
        })
    }

    deleteTask() {
        let newList = this.state.listTask
        newList.pop({
            hint: 'Task desciption',
            nameIcon: 'note',
            add: 'true',
            addIcon:'delete'
        })

        console.log(newList)

        this.setState({
            listTask: newList
        })
    }

    renderRow(item,index) {
        return (
            <View key={index}>
                <InputRow
                    hint='Task desciption'
                    nameIcon='note'
                    add='true'
                    addIcon={index == 0 ? 'add' : 'delete'}
                    onPress={() => index == 0 ? this.addTask() : this.deleteTask()}
                />
            </View>
        )
    }


    render() {
        return (
            <View collapsable={false}>
                {
                    this.state.listTask.map((item, index) => this.renderRow(item, index))
                }
            </View>
        );
    }
} 
