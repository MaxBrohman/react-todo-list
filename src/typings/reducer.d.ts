import { Action } from 'redux';

export interface IUpdatedAction extends Action {
  payload?: any;
}

export interface IState {
  todoData: IToDo[];
  term: string;
  filter: string;
  loading: boolean;
  error: boolean;
  dataToShow: IToDo[];
  newTaskLabel: string;
  activeTasksCount: number;
  unactiveTasksCount: number;
  newTaskDescription: string;
  newTaskDate: string;
  newTaskHour: string;
  newTaskMinutes: string;
}

export interface IToDo {
  label: string;
  important: boolean;
  veryImportant: boolean;
  done: boolean;
  id: number;
  isEditing: boolean;
  description: string;
  date: string;
  hour: string;
  minutes: string;
  isOutdated: boolean;
  completionDate: string;
}
