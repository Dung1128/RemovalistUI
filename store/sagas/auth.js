import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'

import {
    setAuthState,
    saveLoggedUser,
    removeLoggedUser
} from '~/store/actions/auth'

import {
  getProfile,
  replaceProfile
} from '~/store/actions/account'

import { closeDrawer } from '~/store/actions/common'

const requestLogin = createRequestSaga({
    request: api.auth.login,
    key: 'login',
    cancel: 'app/logout',
    success: [
        ({data}) => replaceProfile(data),
        ({access_token}) => saveLoggedUser(access_token),
        //() => setAuthState(true),
    ],
    failure: [
        () => setToast('Couldn\'t login', 'error')
    ],
})

const requestRegister = createRequestSaga({
  request: api.auth.register,
  key: 'register',
  success: [
    
  ],
  failure: [
    () => setToast('Couldn\'t register', 'error')
  ],
})


const requestLogout = createRequestSaga({
    request: api.auth.logout,
    key: 'logout',
    success: [
        () => removeLoggedUser(),
        () => setAuthState(false),           
        () => closeDrawer(),        
        () => setToast('Logout successfully!!!'),    
    ],
    failure: [
        () => setToast('Couldn\'t logout', 'error')
    ],
})



// root saga reducer
export default [
    // like case return, this is take => call
    // inner function we use yield*
    // from direct watcher we just yield value
    // other watcher may be background workers
    function* fetchWatcher() {
        // use takeLatest instead of take every, so double click in short time will not trigger more fork
        yield [            
          takeLatest('app/login', requestLogin),
          takeLatest('app/logout', requestLogout),
          takeLatest('app/register', requestRegister),
        ]
    },
]


