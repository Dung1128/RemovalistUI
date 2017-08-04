import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from './app';
import configureStore from '~/store/config';
import Preload from './components/Preload';

export default class extends Component {
  constructor(props) {
    super(props);
    this.store = null;
  }

  componentDidMount() {
    configureStore(store => {
      this.store = store;
      this.forceUpdate();
    });
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    if (!this.store) return <Preload message="Đang tải dữ liệu..." />;
    //const firstRoute = this.store.getState().auth.loggedIn ? 'signup' : 'login';
    return (
      <Provider store={this.store}>
        <App />
      </Provider>
    );
  }
}
