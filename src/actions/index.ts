import { IUpdatedAction, IToDo } from '../typings/reducer';

export const tasksLoaded = (): IUpdatedAction => ({
    type: 'LOADED'
});

export const tasksLoading = (): IUpdatedAction => ({
    type: 'LOADING'
});

export const errorOccured = (): IUpdatedAction => ({
    type: 'ERROR'
});

export const itemAdded = (newItem: IToDo): IUpdatedAction => ({
    type: 'ITEM_ADDED',
    payload: newItem
});

export const itemDeleted = (id: number): IUpdatedAction => ({
    type: 'ITEM_DELETED',
    payload: id
});

export const showActiveTasks = (): IUpdatedAction => ({
    type: 'SHOW_ACTIVE_TASKS'
});

export const showUnactiveTasks = (): IUpdatedAction => ({
    type: 'SHOW_UNACTIVE_TASKS'
});

export const showSearchedTasks = (term: string): IUpdatedAction => ({
    type: 'SHOW_SEARCHED_TASKS',
    payload: term
});

export const searchOnInput = (term: string): IUpdatedAction => ({
    type: 'SEARCH_ON_INPUT',
    payload: term
});

export const taskStatusChanged = (props: {id: number, prop: string} ): IUpdatedAction => ({
    type: 'SHOW_SEARCHED_TASKS',
    payload: props
});