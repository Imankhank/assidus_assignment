import { call, takeLatest } from "redux-saga/effects";
import { loginApi } from "../apis/login-api";
import { LOGIN_ACTION } from "../types";

export function* loginWorker(action) {
  try {
    console.log(action.data);
    const res = yield call(loginApi, action.data);
    console.log(res);
    if (res.data?.status === 200) {
      yield action.onSuccess(res?.data);
      localStorage.setItem("token", res?.data?.data?.token);
    } else {
      yield action.onError(res?.data);
    }
  } catch (error) {
    console.log(error);
    yield action.onError(error?.response?.data);
  }
}

export function* loginWatcher() {
  yield takeLatest(LOGIN_ACTION, loginWorker);
}
