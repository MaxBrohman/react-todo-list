import React from 'react';

import './search-panel.css';

export default class SearchPanel extends React.Component{
	constructor(){
		super();
		this.state = {
			term: ''
		};
	};
	
	//changing state on input to have a controlled componenr and send data to App component	
	onInputChange(evt){
		const term = evt.target.value;
		this.setState({
			term
		});
		this.props.onInputChange(term);
	}

	render(){
		return (
			<input type="text"
				className="form-control search-input"
				placeholder="type to search" 
				value={ this.state.term }
				onChange={ this.onInputChange.bind(this) }/>
		);
	};
};
