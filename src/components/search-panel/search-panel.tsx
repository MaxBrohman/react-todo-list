import React from 'react';
import { ISearchPanelProps, ISearchPanelState } from '../..//typings/search-panel';

import './search-panel.sass';

export default class SearchPanel extends React.Component{
	public props: ISearchPanelProps;
	public state: ISearchPanelState;
	constructor(props: ISearchPanelProps){
		super(props);
		this.state = {
			term: ''
		};
		this.props = props;
	};
	
	//changing state on input to have a controlled componenr and send data to App component	
	onInputChange(evt: React.ChangeEvent): void {
		const term = (evt.target as HTMLInputElement).value;
		this.setState({
			term
		});
		this.props.onInputChange(term);
	}

	public render(): JSX.Element {
		return (
			<input type="text"
				className="form-control search-input"
				placeholder="type to search" 
				value={ this.state.term }
				onChange={ this.onInputChange.bind(this) }/>
		);
	};
};
