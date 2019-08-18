import { IUpdatedAction } from '../typings/reducer';

export const tasksLoaded = (): IUpdatedAction => ({
    type: 'LOADED'
});

export const tasksLoading = (): IUpdatedAction => ({
    type: 'LOADING'
});

export const errorOccured = (): IUpdatedAction => ({
    type: 'ERROR'
});

//unique id generates by milliseconds count
export const newItemCreated = (label: string): IUpdatedAction => {
    return {
        type: 'NEW_ITEM_CREATED',
        payload: label
    }
};

export const itemDeleted = (id: number): IUpdatedAction => ({
    type: 'ITEM_DELETED',
    payload: id
});

export const filterTasks = (name: string): IUpdatedAction => ({
    type: 'FILTER_TASKS',
    payload: name
});

export const showSearchedTasks = (term: string): IUpdatedAction => ({
    type: 'SHOW_SEARCHED_TASKS',
    payload: term
});

export const searchOnInput = (term: string): IUpdatedAction => ({
    type: 'SEARCH_ON_INPUT',
    payload: term
});

export const taskStatusChanged = (id: number, prop: string): IUpdatedAction => ({
    type: 'TASK_STATUS_CHANGED',
    payload: { id, prop }
});

export const addFormInput = (term: string): IUpdatedAction => ({
    type: 'ADD_FORM_INPUT',
    payload: term
});