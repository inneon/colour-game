import { takeEvery } from 'redux-saga/effects';

export function* recordOrientation(action) {
  let { alpha, beta, gamma } = action;
  console.log('sending orientation');

  fetch('https://oqjlug8gfd.execute-api.eu-west-2.amazonaws.com/test/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      alpha,
      beta,
      gamma,
      timestamp: 'monday'
    })
  })
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err.message);
    });
}

export function* orientationLogger() {

  yield takeEvery('RECIEVE_ORIENTATION', recordOrientation);
}
