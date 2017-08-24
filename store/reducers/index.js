import { combineReducers } from 'redux';
// import { firebaseStateReducer as firebase } from 'react-redux-firebase'
import { reducer as form } from 'redux-form';
import { requests, toast, drawer } from './common';
import { auth } from './auth';
// import { nav, navBook } from './nav'
import { account } from './account';
import { job } from './job';
import { filter } from './filter';

// a rootReducer is like a single state, key is function return a sub state value
const rootReducer = combineReducers({
  form,
  ui: combineReducers({
    // ui reducer should be placed here
    toast,
    drawer
  }),
  requests,
  auth,
  account,
  job,
  filter,
  // nav,
  // navBook
});

export default rootReducer;
