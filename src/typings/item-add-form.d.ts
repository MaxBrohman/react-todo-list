export interface IItemAddFormState {
    label: string;
}

export interface IItemAddFormProps {
    onItemAdded: (text: string) => void;
}