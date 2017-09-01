import { takeLatest, takeEvery, all } from 'redux-saga/effects';

import api from '~/store/api';
import { createRequestSaga } from '~/store/sagas/common';
import { setToast, noop, forwardTo } from '~/store/actions/common';

import {
    saveToken
} from '~/store/actions/chat';

const requestGetToken = createRequestSaga({
    request: api.chat.getToken,
    key: 'getToken',
    success: [
        data => saveToken(data)
    ],
    failure: [(error) => setToast('Couldn\'t get chat list', 'error')]
});


// root saga reducer
export default [
    // like case return, this is take => call
    // inner function we use yield*
    // from direct watcher we just yield value
    function* fetchWatcher() {
        // use takeLatest instead of take every, so double click in short time will not trigger more fork
        yield all([
            takeLatest('chat/getToken', requestGetToken),
        ]);
    }
];
