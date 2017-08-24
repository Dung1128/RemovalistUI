import React, { Component } from 'react';
import {
    TouchableOpacity,
} from 'react-native';
import styles from './styles';
import material from '~/theme/variables/material';
import { List, ListItem, Text, View } from 'native-base';
import Icon from '~/ui/components/Icon';
import IconIonicons from 'react-native-vector-icons/dist/Ionicons';
import { connect } from 'react-redux'
import * as jobSelectors from '~/store/selectors/job';
import * as filterSelectors from '~/store/selectors/filter';

@connect(
    state => ({
        listTruck: jobSelectors.getTruckList(state),
        dayFilterSelected: filterSelectors.getDayFilterSelected(state),
        truckFilterSelected: filterSelectors.getTruckFilterSelected(state)
    }), )
export default class extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            daySelected: this.props.dayFilterSelected,
            truckSelected: this.props.truckFilterSelected,
        });
        this.arrNumber = [
            {
                id: 0,
                name: 'Today',
                key: 1,
            },
            {
                id: 1,
                name: '3 days',
                key: 3
            },
            {
                id: 2,
                name: 'This week',
                key: 7
            },
            {
                id: 3,
                name: 'This month',
                key: 30
            },
        ]
    }

    componentWillReceiveProps({ dayFilterSelected, truckFilterSelected }) {
        this.setState({
            daySelected: dayFilterSelected,
            truckSelected: truckFilterSelected
        })
    }

    handleValueChange(item) {
        const { onChange } = this.props;
        this.setState({ selected: item })
        onChange && onChange(item);
    }

    renderRow(item, index) {
        const { daySelected, truckSelected } = this.state;
        const { truck = false } = this.props;
        return (
            <ListItem key={index} style={styles.wrapItem}>
                <TouchableOpacity style={styles.item} onPress={() => this.handleValueChange(item)}>
                    <Text>{item[truck ? 'TruckName' : 'name']}</Text>
                    {
                        truck ?
                            item.TruckId == truckSelected.TruckId
                                ? <IconIonicons name="ios-radio-button-on" size={30} color={material.redColor} />
                                : <IconIonicons name="ios-radio-button-off" size={30} color={material.redColor} />
                            :
                            item.id == daySelected.id
                                ? <IconIonicons name="ios-radio-button-on" size={30} color={material.redColor} />
                                : <IconIonicons name="ios-radio-button-off" size={30} color={material.redColor} />
                    }
                </TouchableOpacity>
            </ListItem>
        )
    }

    render() {
        const { truck = false, listTruck } = this.props;
        const arrTruck = [{ TruckId: 0, TruckName: 'All trucks' }, ...listTruck]
        return (
            <View>
                {!truck && this.arrNumber.map((item, index) => this.renderRow(item, index))}
                {truck && arrTruck.map((item, index) => this.renderRow(item, index))}
            </View>
        )

    }
}
