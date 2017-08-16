import { takeLatest, takeEvery } from 'redux-saga/effects';

import api from '~/store/api';
import { createRequestSaga } from '~/store/sagas/common';
import { setToast, noop, forwardTo } from '~/store/actions/common';

import {
    saveListStatus,
    saveListMaterial,
    saveMaterialCategoryList,
    saveTruckList,
    saveReferenceContactList,
    getJobById,
    getMaterialList,
    getMaterialCategoryList,
    getTruckList,
    getReferenceContactList
} from '~/store/actions/job';

const requestGetStatusJobList = createRequestSaga({
    request: api.job.getStatusJobList,
    key: 'getStatusJobList',
    success: [
        data => saveListStatus(data.JobStatuses)
    ],
    failure: [(error) => setToast('Couldn\'t get job list', 'error')]
});


const requestGetJobById = createRequestSaga({
    request: api.job.getJobById,
    key: 'getJobById',
    success: [

    ],
    failure: [(error) => setToast('Couldn\'t get job', 'error')]
});

const requestGetMaterialList = createRequestSaga({
    request: api.job.getMaterialList,
    key: 'getMaterialList',
    success: [
        data => saveListMaterial(data.Material)
    ],
    failure: [(error) => setToast('Couldn\'t get job material list', 'error')]
});

const requestGetMaterialCategoryList = createRequestSaga({
    request: api.job.getMaterialCategoryList,
    key: 'getMaterialCategoryList',
    success: [
        data => saveMaterialCategoryList(data.MaterialCategories)
    ],
    failure: [(error) => setToast('Couldn\'t get job material list category', 'error')]
});

const requestGetTruckList = createRequestSaga({
    request: api.job.getTruckList,
    key: 'getTruckList',
    success: [
        data => saveTruckList(data.Trucks)
    ],
    failure: [(error) => setToast('Couldn\'t get job material list truck', 'error')]
});

const requestGetReferenceContactList = createRequestSaga({
    request: api.job.getReferenceContactList,
    key: 'getReferenceContactList',
    success: [
        data => saveReferenceContactList(data.ReferContacts)
    ],
    failure: [(error) => setToast('Couldn\'t get Refer Contacts', 'error')]
});
const requestGetJobByDate = createRequestSaga({
    request: api.job.getJobByDate,
    key: 'getJobByDate',
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
            takeLatest('job/getMaterialList', requestGetMaterialList),
            takeLatest('job/getMaterialCategoryList', requestGetMaterialCategoryList),
            takeLatest('job/getTruckList', requestGetTruckList),
            takeLatest('job/getReferenceContactList', requestGetReferenceContactList),
            takeLatest('job/getJobByDate', requestGetJobByDate),
        ];
    }
];
