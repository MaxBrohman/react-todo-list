import React from 'react';
import { IItemAddFormProps, IItemAddFormState } from '../../typings/item-add-form';

import './item-add-form.sass';

export default class ItemAddForm extends React.Component {
	public state: IItemAddFormState;
	public props: IItemAddFormProps;
  	constructor(props: IItemAddFormProps){
		super(props);
		this.props = props;
		this.state = {
			label: ''
		};
  	};

	//update state on change event to have a controlled component
	private onLabelChange(evt: React.ChangeEvent): void{
		this.setState({
			label: (evt.target as HTMLInputElement).value
		});
	};

	private onFormSubmit(evt: React.FormEvent): void{
		evt.preventDefault();
		this.props.onItemAdded(this.state.label);
		this.setState({
			label: ''
		});
	};

	public render(): JSX.Element {
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
