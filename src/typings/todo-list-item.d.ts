export interface ITodoListItemProps {
  label: string;
  done?: boolean;
  important?: boolean;
  veryImportant?: boolean;
  date: string;
  id: number;
  hour?: string;
  completionDate?: string;
  minutes?: string;
  onDeleted?: (id: number) => void;
  onToggleDone?: (id: number) => void;
  onToggleImportant?: (id: number) => void;
  onToggleVeryImportant?: (id: number) => void;
  onInputName?: (label: string, id: number) => void;
  onEdit?: (id: number) => void;
  onConfirmEdit?: (id: number) => void;
  onInputDescription?: (description: string, id: number) => void;
  onInputDate?: (date: string, id: number) => void;
  isEditing?: boolean;
  description: string;
  onSelectHour?: (hour: string, id: number) => void;
  onSelectMinutes?: (minutes: string, id: number) => void;
}

export interface ITodoChildProps extends ITodoListItemProps {
  classNames: string;
  onLabelChange?: (evt: React.ChangeEvent) => void;
  onKeyDownHandler?: (evt: React.KeyboardEvent) => void;
  onDescriptionChange?: (evt: React.ChangeEvent) => void;
  onDateChange?: (evt: React.ChangeEvent) => void;
  onHourChange?: (evt: React.ChangeEvent) => void;
  onMinutesChange?: (evt: React.ChangeEvent) => void;
}
