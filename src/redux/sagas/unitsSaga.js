import { call, put, takeEvery } from 'redux-saga/effects'

const apiUrl = `https://weather-app-server-ruddy.vercel.app/units`;
export function getApi() {
  return fetch(apiUrl, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',

      }
  }).then(response => response.json())
    .catch((error) => {throw error})
}

export function* fetchUnits(action) {
   try {
      const units = yield call(getApi);
      yield put({type: 'GET_UNITS_SUCCESS', units: units});
   } catch (e) {
      yield put({type: 'GET_UNITS_FAILED', message: e.message});
   }
}

function* unitSaga() {
   yield takeEvery('GET_UNITS_REQUESTED', fetchUnits);
}

export default unitSaga;