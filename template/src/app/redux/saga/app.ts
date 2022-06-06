import {
  checkKeyInObject,
  STORAGE_KEY_APP_THEME,
  STORAGE_KEY_TOKEN,
} from '@common';
import { appActions } from '@redux-slice';
import { loadString } from '@storage';
import { MyAppTheme, ThemeType } from '@theme';
import { all, call, put, takeLatest } from '@typed-redux-saga';

export function* appSaga() {
  yield* takeLatest(appActions.onLoadApp.type, onLoadAppModeAndTheme);
}

function* onLoadAppModeAndTheme() {
  const { appTheme, token } = yield* all({
    appTheme: call(loadString, STORAGE_KEY_APP_THEME),
    token: call(loadString, STORAGE_KEY_TOKEN),
  });

  if (typeof token === 'string') {
    yield* put(appActions.onSetToken(token));
  }

  if (typeof appTheme === 'string' && checkKeyInObject(MyAppTheme, appTheme)) {
    yield* put(appActions.onSetAppTheme(appTheme as ThemeType));
  }
  yield* put(appActions.onLoadAppEnd());
}