export interface IItemStatusButtonProps {
    key: string;
    name: string;
    label: string;
    filter: string;
    onFilterChange: (prop: string) => void;
}