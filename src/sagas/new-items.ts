import { takeEvery, put } from 'redux-saga/effects';
import {  IToDo } from '../typings/reducer';
import { IUpdatedAction } from '../typings/reducer';

const createNewItem = (label: string): IToDo => {
    return {
        label,
        important: false,
        done: false,
        id: (new Date()).getTime()
    }
};

function* addNewItem({ payload }: IUpdatedAction): IterableIterator<any> {
    const newItem = yield createNewItem(payload);
    yield put({
        type: 'ITEM_ADDED',
        payload: newItem
    })
};

export function* watchNewItems(): IterableIterator<any> {
    yield takeEvery('NEW_ITEM_CREATED', addNewItem);
};