import { all } from 'redux-saga/effects';
import { orientationLogger } from './OrientationLogger';
import { watchRotation } from './HSLtoRGBSaga'

export function* rootSaga() {
  yield all([
    watchRotation(),
    orientationLogger(),
  ]);
}
