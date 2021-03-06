import React, { Component } from 'react'
import { Container, Spinner, Text } from 'native-base'
import material from '~/theme/variables/material'
import styles from './styles'

export default class extends Component {
  
  render(){
    const {message='Please waiting...'} = this.props
    return (
      <Container style={styles.container}>
        <Spinner color={material.tabBarActiveTextColor} />
        <Text style={{color: material.tabBarActiveTextColor}}>{message}</Text>
      </Container>
    )
  }
}