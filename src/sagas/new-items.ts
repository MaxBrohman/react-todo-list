import { takeEvery, put } from 'redux-saga/effects';
import { IToDo, IUpdatedAction } from '../typings/reducer';
import { IcreateNewItems } from '../typings/sagas';

const createNewItem = ({
  label, description, date, hour, minutes,
}: IcreateNewItems): IToDo => ({
  label,
  description,
  important: false,
  done: false,
  id: (new Date()).getTime(),
  isEditing: false,
  veryImportant: false,
  date,
  isOutdated: false,
  hour,
  minutes,
  completionDate: '',
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
