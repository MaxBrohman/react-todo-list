export interface ITodoListItemContainerProps {
  label: string;
  done: boolean;
  important: boolean;
  veryImportant: boolean;
  date: string;
  id: number;
  hour: string;
  completionDate: string;
  minutes: string;
  onDeleted: (id: number) => void;
  onToggleDone: (id: number) => void;
  onToggleImportant: (id: number) => void;
  onToggleVeryImportant: (id: number) => void;
  onInputName: (label: string, id: number) => void;
  onEdit: (id: number) => void;
  onConfirmEdit: (id: number) => void;
  onInputDescription: (description: string, id: number) => void;
  onInputDate: (date: string, id: number) => void;
  isEditing: boolean;
  description: string;
  onSelectHour: (hour: string, id: number) => void;
  onSelectMinutes: (minutes: string, id: number) => void;
}

export interface IEditableItemProps {
  label: string;
  id: number;
  classNames: string;
  onLabelChange: (evt: React.ChangeEvent) => void;
  onConfirmEdit: (id: number) => void;
  onKeyDownHandler: (evt: React.KeyboardEvent) => void;
  description: string;
  onDescriptionChange: (evt: React.ChangeEvent) => void;
  onDateChange: (evt: React.ChangeEvent) => void;
  onHourChange: (evt: React.ChangeEvent) => void;
  onMinutesChange: (evt: React.ChangeEvent) => void;
  date: string;
  minutes: string;
  hour: string;
  hourOptions: JSX.Element[];
  minutesOptions: JSX.Element[];
}

export interface ITodoListItemProps {
  label: string;
  done: boolean;
  id: number;
  onDeleted: (id: number) => void;
  onToggleImportant: (id: number) => void;
  onToggleDone: (id: number) => void;
  classNames: string;
  onEdit: (id: number) => void;
  onKeyDownHandler: (evt: React.KeyboardEvent) => void;
  onToggleVeryImportant: (id: number) => void;
  description: string;
  date: string;
  minutes: string;
  hour: string;
  completionDate: string;
}

export interface IDateSpan {
  date: string;
  done: boolean;
  completionDate: string;
  hour: string;
  minutes: string;
}
