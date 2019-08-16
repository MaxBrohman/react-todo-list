export interface ISearchPanelProps {
    onInputChange: (prop: string) => void;
}
export interface ISearchPanelState {
    term: string;
}