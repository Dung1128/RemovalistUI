import { fork } from 'redux-saga/effects'
import auth from './auth'
import job from './job'


// saga must be a function like generator of other functions
export default function* () {
  yield [
    ...auth.map(watcher => fork(watcher)),
    ...job.map(watcher => fork(watcher)),
  ]
}
