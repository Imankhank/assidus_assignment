import { call, takeLatest } from "redux-saga/effects";
import { DASH_ACTION, LOGIN_ACTION } from "../types";
import { dashApi } from "../apis/dashboard-api";

export function* dashWorker(action) {
  try {
    console.log(action.data);
    const res = yield call(dashApi, action.id);
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

export function* dashWatcher() {
  yield takeLatest(DASH_ACTION, dashWorker);
}
