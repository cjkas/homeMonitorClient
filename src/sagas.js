import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

// watcher saga: watches for actions dispatched to the store, starts worker saga
function* weatherSaga() {
    yield takeLatest("FETCH_WEATHER", workerSaga);
}

// function that makes the api request and returns a Promise for response
function fetchProbe() {
    return axios({
        method: "get",
        url: "https://hmb.sczaja.synology.me/weather/last"
    });
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
    try {
        yield put({ type: "FETCH_WEATHER_START"})
        const response = yield call(fetchProbe);
        const data = response.data;

        // dispatch a success action to the store with the new dog
        yield put({ type: "FETCH_WEATHER_SUCCESS", payload: data });

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: "FETCH_WEATHER_ERROR", payload: error });
    }
}

export default [
    weatherSaga
];