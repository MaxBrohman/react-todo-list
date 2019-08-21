import { Action } from 'redux';

export interface IUpdatedAction extends Action {
  payload?: any;
}

export interface ITasksFields {
  todoData: IToDo[];
  dataToShow: IToDo[];
  activeTasksCount: number;
  unactiveTasksCount: number;
  term: string;
  filter: string;
}

export interface INewTaskFields {
  newTaskDescription: string;
  newTaskDate: string;
  newTaskHour: string;
  newTaskMinutes: string;
  newTaskLabel: string;
}

export interface IState {
  tasksFields: ITasksFields;
  newTaskFields: INewTaskFields;
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
