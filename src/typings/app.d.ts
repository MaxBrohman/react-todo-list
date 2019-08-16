export interface IAppState {
    todoData: IToDo[];
    term: string;
    filter: string;
}

export interface IToDo {
    label: string;
    important: boolean;
    done: boolean;
    id: number;
}