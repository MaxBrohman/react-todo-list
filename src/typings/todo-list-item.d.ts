export interface ITodoListItemProps {
  label: string;
  done?: boolean;
  important?: boolean;
  id: number;
  onDeleted?: (id: number) => void;
  onToggleDone?: (id: number) => void;
  onToggleImportant?: (id: number) => void;
  onInput?: (label: string, id: number) => void;
  onEdit?: (id: number) => void;
  onConfirmEdit?: (id: number) => void;
  isEditing?: boolean;
}

export interface ITodoChildProps extends ITodoListItemProps {
  classNames: string;
  onLabelChange?: (evt: React.ChangeEvent) => void;
  onKeyDownHandler?: (evt: React.KeyboardEvent) => void;
}
