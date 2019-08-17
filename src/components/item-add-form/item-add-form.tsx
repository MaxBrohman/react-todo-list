import React from 'react';
import { IItemAddFormProps, ImapDispatchToProps } from '../../typings/item-add-form';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addFormInput, itemAdded } from '../../actions';
import { IState } from '../../typings/reducer';

import './item-add-form.sass';

const ItemAddForm = (props: IItemAddFormProps): JSX.Element => {

	//update state on change event to have a controlled component
	const onLabelChange = (evt: React.ChangeEvent): void => {
		const label = (evt.target as HTMLInputElement).value;
		props.onInput(label);
	};

	const onFormSubmit = (evt: React.FormEvent): void => {
		evt.preventDefault();
		props.onSubmit(props.label);
	};

	return (
		<form 
			className="item-add-form d-flex" 
			onSubmit={ onFormSubmit }>
				<input 
					className="form-control" 
					onChange={ onLabelChange } 
					placeholder="What to do" 
					value={ props.label }/>
				<button
					className="btn btn-outline-secondary">
					Add Item
				</button>
		</form>
	);
};

const mapStateToProps = (state: IState): { label: string } => {
	return {
		label: state.newTaskLabel
	}
};

const mapDispatchToProps = (dispatch: Dispatch): ImapDispatchToProps => {
	return {
		onInput: (label: string) => dispatch(addFormInput(label)),
		onSubmit: (label: string) => dispatch(itemAdded(label))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemAddForm);