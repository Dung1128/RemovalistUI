import React, { Component } from 'react';
import {
  ScrollView,
  InteractionManager
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
import { connect } from 'react-redux'
import {
  Field,
  FieldArray,
  reduxForm,
  formValueSelector,
} from 'redux-form'
import {
  PickUpField,
  DropOffField,
} from './components/Form'
import { validate, initialValues } from './utils'

const selector = formValueSelector('CustomerInfo')

@connect(
  state => ({
    initialValues: {
      pickup: [{
        Time: selector(state, 'datetime').timeStart,
        AddressLine1: '',
        AddressLine2: '',
        Notes: ''
      }],
      dropoff: [{
        Time: selector(state, 'datetime').timeEnd,
        AddressLine1: '',
        AddressLine2: '',
        Notes: ''
      }],
    },
    status: selector(state, 'status')
  }), )
@reduxForm({ form: 'DeliveryInfo', validate, destroyOnUnmount: !__DEV__  })

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      general: this.props.navigation.state.params,
      loading: false,
    });

  }

  renderJobLocations(pickup, dropoff) {
    for (const i = 0; i < pickup.length; i++) {
      if (i == 0) {
        pickup[0].IsFirst = true;
      } else {
        pickup[0].IsFirst = false;
      }
      pickup[i].IsPickUp = true;
    }

    for (const i = 0; i < dropoff.length; i++) {
      if (i == 0) {
        dropoff[0].IsFirst = true;
      } else {
        dropoff[0].IsFirst = false;
      }
      dropoff[i].IsPickUp = false;
    }

    return pickup.concat(dropoff)
  }

  submitForm(values) {
    this.setState({
      loading: true
    })
    const data = this.renderJobLocations(values.pickup, values.dropoff)
    // console.log(data)
    let obj = {}
    obj.general = this.state.general
    obj.delivery = data
    this.props.navigation.navigate('tallyservice_screen', obj)
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        loading: false
      })
    })

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
          loading={this.state.loading}
          onPress={handleSubmit(this.submitForm.bind(this))}
          full
          iconRight='arrow-right'
          text='TALLY SERVICE INFO'
        />
      </Container>
    );
  }
}
