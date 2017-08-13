import React, { Component } from 'react';
import Auth0 from 'react-native-auth0';
import { Container, Spinner } from 'native-base';
import material from '~/theme/variables/material';
const auth0 = new Auth0({ domain: 'minhchien.au.auth0.com', clientId: 'CF9eq4bl0cocLgT2BrMrJTjUpXt4cX38' });
import { connect } from 'react-redux';
import * as authActions from '~/store/actions/auth';
import * as commonActions from '~/store/actions/common';
import * as authSelectors from '~/store/selectors/auth';

@connect(
  state => ({
    isLogged: authSelectors.isLogged(state),
    closed: authSelectors.closed(state)
  }),
  { ...commonActions, ...authActions })
export default class Removalist extends Component {
  componentWillMount() {
    auth0
      .webAuth
      .authorize({ scope: 'openid email', audience: 'https://minhchien.au.auth0.com/userinfo' })
      .then(credentials => {
        console.log(credentials);
        this.props.setAuthState(true);
      }
      // Successfully authenticated
      // Store the accessToken
      )
      .catch(error => console.log(error));
  }
  render() {
    return (
      <Container>
        <Spinner color={material.redColor} style={{ marginTop: '50%' }} />
      </Container>
    );
  }
}