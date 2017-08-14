import React, { Component } from 'react';
import {
  ScrollView
} from 'react-native';
import styles from './styles';
import material from '~/theme/variables/material';
import { Container, Left, Body, Right, Title, Content, Footer, FooterTab, List, ListItem, Text } from 'native-base';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import InputRow from '~/ui/elements/InputRow';
import DeliverInfo from '~/ui/elements/DeliverInfo';
import CheckDate from '~/ui/elements/CheckDate';
import Icon from '~/ui/components/Icon';
import Button from '~/ui/components/Button';
import Header from '~/ui/components/Header';

import {
  Field,
  FieldArray,
  reduxForm,
} from 'redux-form'
import {
  PickUpField,
  DropOffField,
} from './components/Form'

@reduxForm({ form: 'DeliveryInfo', enableReinitialize: true, destroyOnUnmount: !module.hot })
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
        <Header title='Delivery Information' iconLeft='back' onPress={() => this.props.navigation.goBack()} />
        <ScrollView style={styles.content}>
          <FieldArray name="pickup" component={PickUpField} />
          <FieldArray name="dropoff" component={DropOffField} />
        </ScrollView>
        <Button
          onPress={() => this.props.navigation.navigate('tallyservice_screen')}
          //onPress={handleSubmit(this.submitForm.bind(this))}
          full
          iconRight='arrow-right'
          text='TALLY SERVICE INFO'
        />
      </Container>
    );
  }
}
