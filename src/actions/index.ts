import { IUpdatedAction } from '../typings/reducer';

export const tasksLoaded = (): IUpdatedAction => ({
  type: 'LOADED',
});

export const tasksLoading = (): IUpdatedAction => ({
  type: 'LOADING',
});

export const errorOccured = (): IUpdatedAction => ({
  type: 'ERROR',
});

// unique id generates by milliseconds count
export const newItemCreated = (label: string, description: string): IUpdatedAction => ({
  type: 'NEW_ITEM_CREATED',
  payload: {
    label,
    description
  }
});

export const itemDeleted = (id: number): IUpdatedAction => ({
  type: 'ITEM_DELETED',
  payload: id,
});

export const filterTasks = (name: string): IUpdatedAction => ({
  type: 'FILTER_TASKS',
  payload: name,
});

export const showSearchedTasks = (term: string): IUpdatedAction => ({
  type: 'SHOW_SEARCHED_TASKS',
  payload: term,
});

export const searchOnInput = (term: string): IUpdatedAction => ({
  type: 'SEARCH_ON_INPUT',
  payload: term,
});

export const taskStatusChanged = (id: number, prop: string): IUpdatedAction => ({
  type: 'TASK_STATUS_CHANGED',
  payload: { id, prop },
});

export const addFormInput = (term: string): IUpdatedAction => ({
  type: 'ADD_FORM_INPUT',
  payload: term,
});

export const editTaskName = (id: number): IUpdatedAction => ({
  type: 'EDIT_TASK_NAME',
  payload: id,
});

export const editingTasks = (label: string, id: number): IUpdatedAction => ({
  type: 'EDITING_TASK',
  payload: {
    label,
    id,
  },
});

export const confirmEditedTask = (id: number): IUpdatedAction => ({
  type: 'CONFIRM_EDITED_TASK',
  payload: id,
});

export const taskImportanceChanged = (id: number, prop: string): IUpdatedAction => ({
  type: 'TASK_IMPORTANCE_CHANGED',
  payload: {
    prop,
    id,
  },
});

export const typingDescription = (description: string): IUpdatedAction => ({
  type: 'TYPING_DESCRIPTION',
  payload: description,
});