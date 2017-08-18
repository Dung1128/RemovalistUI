import { takeLatest, takeEvery, all } from 'redux-saga/effects';

import api from '~/store/api';
import { createRequestSaga } from '~/store/sagas/common';
import { setToast, noop, forwardTo } from '~/store/actions/common';

import { replaceProfile } from '~/store/actions/account';

const requestGetProfile = createRequestSaga({
  request: api.account.getProfile,
  key: 'getProfile',
  success: [data => replaceProfile(data)],
  failure: [() => setToast('Couldn\'t get profile', 'error')]
});

const requestGetPersonalProfile = createRequestSaga({
  request: api.account.getPersonalProfile,
  key: 'getPersonalProfile',
  success: [],
  failure: [() => setToast('Couldn\'t get profile', 'error')]
});

// root saga reducer
export default [
  // like case return, this is take => call
  // inner function we use yield*
  // from direct watcher we just yield value
  function* fetchWatcher() {
    // use takeLatest instead of take every, so double click in short time will not trigger more fork
    yield all([
      takeLatest('app/getProfile', requestGetProfile),
      takeLatest('app/getPersonalProfile', requestGetPersonalProfile)
    ]);
  }
];
