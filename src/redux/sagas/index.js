import { all } from 'redux-saga/effects'
import unitSaga from './unitsSaga'

export default function* rootSaga() {
  yield all([
    unitSaga(),
  ])
}