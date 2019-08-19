import { takeEvery, put } from 'redux-saga/effects';
import { IToDo, IUpdatedAction } from '../typings/reducer';


const createNewItem = (label: string): IToDo => ({
  label,
  important: false,
  done: false,
  id: (new Date()).getTime(),
  isEditing: false,
});

function* addNewItem({ payload }: IUpdatedAction): IterableIterator<any> {
  const newItem = yield createNewItem(payload);
  yield put({
    type: 'ITEM_ADDED',
    payload: newItem,
  });
}

export default function* watchNewItems(): IterableIterator<any> {
  yield takeEvery('NEW_ITEM_CREATED', addNewItem);
}
