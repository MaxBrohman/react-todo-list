import React from 'react';

import './item-add-form.css';

export default class ItemAddForm extends React.Component {

  	constructor(){
		super();
		
		this.state = {
			label: ''
		};
  	};

	//update state on change event to have a controlled component
	onLabelChange(evt){
		this.setState({
			label: evt.target.value
		});
	};

	onFormSubmit(evt){
		evt.preventDefault();
		this.props.onItemAdded(this.state.label);
		this.setState({
			label: ''
		});
	};

	render() {
		return (
			<form 
				className="item-add-form d-flex" 
				onSubmit={ this.onFormSubmit.bind(this) }>
					<input 
						className="form-control" 
						onChange={ this.onLabelChange.bind(this) } 
						placeholder="What to do" 
						value={ this.state.label }/>
					<button
						className="btn btn-outline-secondary">
						Add Item
					</button>
			</form>
		);
	};
};
