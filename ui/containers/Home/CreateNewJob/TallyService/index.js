import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import styles from './styles';
import material from '~/theme/variables/material';
import { Container, Left, Body, Right, Title, Content, Footer, FooterTab, List, ListItem, Text } from 'native-base';
import InputService from '~/ui/elements/InputService';
import Icon from '~/ui/components/Icon';
import Button from '~/ui/components/Button';
import Header from '~/ui/components/Header';
import TitleItem from '~/ui/components/TitleItem';
import ButtonIcon from '~/ui/components/ButtonIcon';
import { connect } from 'react-redux'
import {
    Field,
    FieldArray,
    reduxForm,
} from 'redux-form'
import {
    InputServiceField,
    MaterialArray
} from './components/Form'

@connect(
    state => ({
        initialValues: {
            servicetime: {
                status: '00:00',
                input: '',
            },
            traveltime: {
                status: '00:00',
                input: '',
            },
            fuel: {
                status: 'Type 1',
                input: '',
            },
            material: [{
                status: 'Type 1',
                input: '',
            }]
        }
    }), )
@reduxForm({ form: 'TallyService', enableReinitialize: true, destroyOnUnmount: !module.hot })
export default class extends Component {

    constructor(props) {
        super(props);
        this.state = ({
        });

    }

    submitForm(values) {
        console.log(values)
    }

    render() {
        const { handleSubmit, submitting } = this.props
        return (
            <Container>
                <Header title='Tally service infomation' iconLeft='back' onPress={() => this.props.navigation.goBack()} />
                <Content style={styles.content}>
                    <TitleItem
                        title='Service Time'
                        right={
                            <View row style={styles.money}>
                                <Text style={styles.titPrice}>$120</Text>
                            </View>
                        }
                    />
                    <InputServiceField name='servicetime' nameIcon='time' measure='hr' />
                    <TitleItem
                        title='Travel Time'
                        right={
                            <View row style={styles.money}>
                                <Text style={styles.titPrice}>$120</Text>
                            </View>
                        }
                    />
                    <InputServiceField name='traveltime' nameIcon='time' measure='hr' />
                    <TitleItem
                        title='Fuel/RUCS'
                        right={
                            <View row style={styles.money}>
                                <Text style={styles.titPrice}>$120</Text>
                            </View>
                        }
                    />
                    <InputServiceField name='fuel' nameIcon='gas' measure='hr' />
                    <TitleItem
                        title='Material'
                        right={
                            <View row style={styles.money}>
                                <Text style={styles.titPrice}>$120</Text>
                            </View>
                        }
                    />
                    <FieldArray name='material' component={MaterialArray} nameIcon='time' measure='hr' />
                    <TitleItem title='GST'
                        right={
                            <View row style={styles.money}>
                                <Text style={styles.titPrice}>$120</Text>
                            </View>
                        } />
                    <View style={styles.totalPrice}>
                        <Text style={styles.txtTotal}>Total</Text>
                        <Text style={styles.txtPriceTotal}>$610</Text>
                    </View>

                </Content>
                <Button
                    //disable
                    onPress={handleSubmit(this.submitForm.bind(this))}
                    //onPress={() => this.props.navigation.navigate('jobtoday_screen')} 
                    full
                    text='SAVE'
                />
            </Container>
        );
    }
}
