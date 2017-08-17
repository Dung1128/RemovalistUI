import { takeLatest, takeEvery } from 'redux-saga/effects';

import api from '~/store/api';
import { createRequestSaga } from '~/store/sagas/common';
import { setToast, noop, forwardTo } from '~/store/actions/common';

import {
    getMaterialByCategory
} from '~/store/actions/job';

const requestGetMaterialByCategory = createRequestSaga({
    request: api.material.getMaterialByCategory,
    key: 'getMaterialByCategory',
    success: [
        
    ],
    failure: [(error) => setToast('Couldn\'t get job list', 'error')]
});


// root saga reducer
export default [
    // like case return, this is take => call
    // inner function we use yield*
    // from direct watcher we just yield value
    function* fetchWatcher() {
        // use takeLatest instead of take every, so double click in short time will not trigger more fork
        yield [
            takeLatest('job/getMaterialByCategory', requestGetMaterialByCategory),
        ];
    }
];
