export interface ITodoListItemProps {
    label: string;
    done: boolean;
    important: boolean;
    id: number;
    onDeleted: (id: number) => void;
    onToggleDone: (id: number) => void;
    onToggleImportant: (id: number) => void;
}