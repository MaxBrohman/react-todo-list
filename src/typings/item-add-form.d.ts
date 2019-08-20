export interface ImapDispatchToProps {
  onInput: (label: string) => void;
  onSubmit: (label: string, description: string, date: string, hour: string, minutes: string) => void;
  onDescription: (label: string) => void;
  onDate: (date: string) => void;
  onHour: (hour: string) => void;
  onMinutes: (minutes: string) => void;
}

export interface ImapStateToProps {
  label: string;
  description: string;
  date: string;
  hour: string;
  minutes: string;
}

export interface IItemAddFormProps extends ImapDispatchToProps {
  label: string;
  description: string;
  date: string;
  hour: string;
  minutes: string;
}