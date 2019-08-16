export interface ITodoListItemProps {
    label: string;
    done: boolean;
    important: boolean;
    onDeleted: () => void;
    onToggleDone: () => void;
    onToggleImportant: () => void;
}