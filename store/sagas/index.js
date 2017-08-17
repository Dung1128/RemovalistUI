import { fork } from 'redux-saga/effects'
import auth from './auth'
import job from './job'
import material from './material';

// saga must be a function like generator of other functions
export default function* () {
  yield [
    ...auth.map(watcher => fork(watcher)),
    ...job.map(watcher => fork(watcher)),
    ...material.map(watcher => fork(watcher)),
  ]
}
