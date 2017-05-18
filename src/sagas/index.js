import fetch from 'isomorphic-fetch';
import {take, takeEvery, put, call} from 'redux-saga/effects';

import { ACTION_SAGA_TEST, ACTION_FETCH_URL} from '../screens/SagaScreen';

export function fetchUrl(url) {
    return fetch(url)
        .then(res => res.json())
        .then(json => {
            console.log('res json = ', json);
        })
        .catch(err => {
            console.log('err = ', err);
        });
}

function act(url) {
    return {
        type: ACTION_FETCH_URL,
        url
    }
}

export function* helloSaga() {
    console.log('sago - hello');
    // yield put(act());
}

export function* sagaTest() {
    yield take(ACTION_SAGA_TEST);
    console.log('saga - test');
    yield put(act('http://route.showapi.com/341-3'));
}

export function* sagaFetch() {
    let ret = yield take(ACTION_FETCH_URL);
    console.log('sagaFetch - ', ret);
    yield call(fetchUrl, ret.url);
    yield put(act('finished'));
}