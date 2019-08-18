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
}

export interface IToDo {
    label: string;
    important: boolean;
    done: boolean;
    id: number;
}