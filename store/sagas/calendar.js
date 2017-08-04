/**
 * Created by vjtc0n on 7/21/17.
 */
import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'

import { closeDrawer } from '~/store/actions/common'

const requestGetTopMaid = createRequestSaga({
  request: api.calendar.getTopMaid,
  key: 'getTopMaid',
  success: [
    
  ],
  failure: [
    (error) => {
      return setToast('Couldn\'t get maid', 'error')
    }
  ],
})

const requestPushPeriodicalOrder = createRequestSaga({
  request: api.calendar.pushPeriodicalOrder,
  key: 'pushPeriodicalOrder',
  success: [
  
  ],
  failure: [
    (error) => {
      return setToast('Couldn\'t create order', 'error')
    }
  ],
})

const requestPushPersonalOrder = createRequestSaga({
  request: api.calendar.pushPersonalOrder,
  key: 'pushPersonalOrder',
  success: [
  
  ],
  failure: [
    (error) => {
      return setToast('Couldn\'t create order', 'error')
    }
  ],
})

const requestGetTotalPrice = createRequestSaga({
  request: api.calendar.getTotalPrice,
  key: 'getTotalPrice',
  success: [
  
  ],
  failure: [
    (error) => {
      return setToast('Couldn\'t get price', 'error')
    }
  ],
})




// root saga reducer
export default [
  function* fetchWatcher() {
    // use takeLatest instead of take every, so double click in short time will not trigger more fork
    yield [
      takeLatest('app/getTopMaid', requestGetTopMaid),
      takeLatest('app/pushPeriodicalOrder', requestPushPeriodicalOrder),
      takeLatest('app/pushPersonalOrder', requestPushPersonalOrder),
      takeLatest('app/getTotalPrice', requestGetTotalPrice),
    ]
  },
]


