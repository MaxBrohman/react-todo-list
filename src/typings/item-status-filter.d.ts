export interface IItemStatusFilterProps {
    filter: string;
    onFilterChange: (prop: string) => void;
}

export interface IItemStatusFilterButton {
    name: string;
    label: string;
}