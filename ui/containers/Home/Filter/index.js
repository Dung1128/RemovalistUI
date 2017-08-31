import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import material from '~/theme/variables/material'
import {
  Container,
  Content,
} from 'native-base';
import { connect } from 'react-redux'
import styles from './styles';
import Icon from '~/ui/components/Icon';
import Header from '~/ui/components/Header';
import TitleItem from '~/ui/components/TitleItem';
import ListRadio from './components/ListRadio';
import * as filterActions from '~/store/actions/filter'

@connect(
  null,
  { ...filterActions }
)
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  onDaySelected(item) {
    this.props.saveDayFilterSelected(item)
  }

  onTruckSelected(item) {
    this.props.saveTruckFilterSelected(item)
  }

  render() {

    return (
      <Container>
        <Header
          title='Filter'
          iconLeft='close'
          textright='RESET'
          onPressRight={() => this.props.resetFilter()}
          onPress={() => this.props.navigation.goBack()}
        />
        <Content>
          <TitleItem title='By date range' />
          <ListRadio onChange={(item) => this.onDaySelected(item)} />
          <TitleItem title='By truck' />
          <ListRadio onChange={(item) => this.onTruckSelected(item)} truck />
        </Content>
      </Container>
    );
  }
}
