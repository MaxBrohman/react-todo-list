import { IUpdatedAction } from '../typings/reducer';

// unique id generates by milliseconds count
export const newItemCreated = (label: string, description: string, date: string,
  hour: string, minutes: string): IUpdatedAction => ({
  type: 'NEW_ITEM_CREATED',
  payload: {
    label,
    description,
    date,
    hour,
    minutes,
  },
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

export const editTask = (id: number): IUpdatedAction => ({
  type: 'EDIT_TASK',
  payload: id,
});

export const editingTaskName = (label: string, id: number): IUpdatedAction => ({
  type: 'EDITING_TASK_NAME',
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

export const editingTaskDescription = (description: string, id: number): IUpdatedAction => ({
  type: 'EDITING_TASK_DESCRIPTION',
  payload: {
    description,
    id,
  },
});

export const typingDate = (date: string): IUpdatedAction => ({
  type: 'TYPING_DATE',
  payload: date,
});

export const editingTaskDate = (date: string, id: number): IUpdatedAction => ({
  type: 'EDITING_TASK_DATE',
  payload: {
    date,
    id,
  },
});

export const selectingHour = (hour: string): IUpdatedAction => ({
  type: 'SELECTING_HOUR',
  payload: hour,
});

export const selectingMinutes = (minutes: string): IUpdatedAction => ({
  type: 'SELECTING_MINUTES',
  payload: minutes,
});

export const editingTaskMinutes = (minutes: string, id: number): IUpdatedAction => ({
  type: 'EDITING_TASK_MINUTES',
  payload: {
    minutes,
    id,
  },
});

export const editingTaskHour = (hour: string, id: number): IUpdatedAction => ({
  type: 'EDITING_TASK_HOUR',
  payload: {
    hour,
    id,
  },
});
