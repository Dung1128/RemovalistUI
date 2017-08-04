import { fork } from 'redux-saga/effects'
import auth from './auth'
// import calendar from './calendar'
import transaction from './transaction'


// saga must be a function like generator of other functions
export default function* () {
  yield [
    ...auth.map(watcher => fork(watcher)),
    // ...calendar.map(watcher => fork(watcher)),
    ...transaction.map(watcher => fork(watcher)),
  ]
}
