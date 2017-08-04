import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking
} from 'react-native';
import Auth0 from 'react-native-auth0';
const auth0 = new Auth0({ domain: 'minhchien.au.auth0.com', clientId: 'cTe6Mpoq1EaALcgKbKtUREYjPzuDubqh' });
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
  onLogin() {
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
  onLogout() {
    Linking.openURL('https://minhchien.au.auth0.com/v2/logout').catch(err => console.error('An error occurred', err));
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.onLogin()} >
          <Text style={styles.welcome}>
            LOGIN
                    </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onLogout()} >
          <Text style={styles.welcome}>
            LOGOUT
                    </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});