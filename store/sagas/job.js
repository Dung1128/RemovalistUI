import { takeLatest, takeEvery } from 'redux-saga/effects';

import api from '~/store/api';
import { createRequestSaga } from '~/store/sagas/common';
import { setToast, noop, forwardTo } from '~/store/actions/common';

import { saveListStatus, getJobById } from '~/store/actions/job';

const requestGetStatusJobList = createRequestSaga({
    request: api.job.getStatusJobList,
    key: 'getStatusJobList',
    success: [
        data => saveListStatus(data.JobStatuses)
    ],
    failure: [(error) => setToast('Couldn\'t get job', 'error')]
});


const requestGetJobById = createRequestSaga({
    request: api.job.getJobById,
    key: 'getJobById',
    success: [

    ],
    failure: [(error) => setToast('Couldn\'t get job', 'error')]
});

// root saga reducer
export default [
    // like case return, this is take => call
    // inner function we use yield*
    // from direct watcher we just yield value
    function* fetchWatcher() {
        // use takeLatest instead of take every, so double click in short time will not trigger more fork
        yield [
            takeLatest('job/getStatusJobList', requestGetStatusJobList),
            takeLatest('job/getJobById', requestGetJobById),
        ];
    }
];
