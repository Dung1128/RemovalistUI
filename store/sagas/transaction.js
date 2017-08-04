/**
 * Created by vjtc0n on 7/26/17.
 */
import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'

import { closeDrawer } from '~/store/actions/common'

const requestGetListTransaction = createRequestSaga({
  request: api.transaction.getListTransaction,
  key: 'getListTransaction',
  success: [
  
  ],
  failure: [
    (error) => {
      return setToast('Couldn\'t get transaction', 'error')
    }
  ],
})






// root saga reducer
export default [
  function* fetchWatcher() {
    // use takeLatest instead of take every, so double click in short time will not trigger more fork
    yield [
      takeLatest('app/getListTransaction', requestGetListTransaction),
    ]
  },
]