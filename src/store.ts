import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware  from 'redux-saga';
import { reducer } from './reducer';
import { watchNewItems} from './sagas';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: hardSet
};
const persistedReducer = persistReducer(persistConfig, reducer);

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
export const persistor = persistStore(store);
sagaMiddleware.run(watchNewItems);