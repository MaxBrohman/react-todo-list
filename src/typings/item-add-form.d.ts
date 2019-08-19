export interface IItemAddFormProps {
  onInput: (label: string) => void;
  onSubmit: (label: string, description: string) => void;
  onDescription: (label: string) => void;
  label: string;
  description: string;
}

export interface ImapDispatchToProps {
  onInput: (label: string) => void;
  onSubmit: (label: string, description: string) => void;
  onDescription: (label: string) => void;
}
