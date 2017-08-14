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
import {
    Field,
    FieldArray,
    reduxForm,
} from 'redux-form'
import {
    InputServiceField
} from './components/Form'

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
                            <View row style={{ justifyContent: 'space-between', width: '25%' }}>
                                <Text style={styles.titPrice}>$120</Text>
                            </View>
                        }
                    />
                    <Field name='time' component={InputServiceField} nameIcon='time' measure='hr' />
                    <TitleItem
                        title='Travel Time'
                        right={
                            <View row style={{ justifyContent: 'space-between', width: '25%' }}>
                                <Text style={styles.titPrice}>$120</Text>
                            </View>
                        }
                    />
                    <InputService nameIcon='time' measure='hr' />
                    <TitleItem
                        title='Fuel/RUCS'
                        right={
                            <View row style={{ justifyContent: 'space-between', width: '25%' }}>
                                <Text style={styles.titPrice}>$120</Text>
                            </View>
                        }
                    />
                    <InputService nameIcon='gas' measure='km' />
                    <TitleItem
                        title='Material'
                        right={
                            <View row style={{ justifyContent: 'space-between', width: '25%' }}>
                                <Text style={styles.titPrice}>$120</Text>
                            </View>
                        }
                    />
                    <TitleItem title='GST'
                        right={
                            <View row style={{ justifyContent: 'space-between', width: '25%' }}>
                                <Text style={styles.titPrice}>$120</Text>
                            </View>
                        } />
                    <View style={styles.totalPrice}>
                        <Text style={styles.txtTotal}>Total</Text>
                        <Text style={styles.txtPriceTotal}>$610</Text>
                    </View>

                </Content>
                <Button
                    onPress={handleSubmit(this.submitForm.bind(this))}
                    //onPress={() => this.props.navigation.navigate('jobtoday_screen')} 
                    full
                    text='SAVE'
                />
            </Container>
        );
    }
}
