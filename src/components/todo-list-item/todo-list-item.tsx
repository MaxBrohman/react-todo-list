import React, { Component } from 'react';
import { ITodoListItemProps } from '../../typings/todo-list-item';
import { connect } from 'react-redux';
import { IState } from '../../typings/reducer';

import './todo-list-item.scss';

export default class TodoListItem extends Component {
	public props: ITodoListItemProps;
	constructor(props: ITodoListItemProps){
		super(props);
		this.props = props;
	}
	public render(): JSX.Element {
		const { label, onDeleted, onToggleImportant, onToggleDone, done, important } = this.props;

		let classNames = 'todo-list-item';

		if(done){
			classNames += ' done';
		}

		if(important){
			classNames += ' important';
		}

		return (
			<span className={ classNames }>
				<span
					className="todo-list-item-label"
					onClick={ onToggleDone }>
					{ label }
				</span>

				<button type="button"
					className="btn btn-outline-success btn-sm float-right"
					onClick={ onToggleImportant }>
					<i className="fa fa-exclamation" />
				</button>

				<button type="button"
					className="btn btn-outline-danger btn-sm float-right"
					onClick={ onDeleted }>
					<i className="fa fa-trash-o" />
				</button>
			</span>
		);
	};
}

const mapStateToProps = (state: IState): any => ({
	
});