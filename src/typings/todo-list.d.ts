import { IToDo } from './app.d';

export interface ITodoListProps {
    todos: IToDo[];
    onDeleted: (id: number) => void;
    onToggleDone: (id: number) => void;
    onToggleImportant: (id: number) => void;
}