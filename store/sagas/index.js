import { fork } from 'redux-saga/effects'
import auth from './auth'


// saga must be a function like generator of other functions
export default function* () {
  yield [
    ...auth.map(watcher => fork(watcher)),
  ]
}
