import React from 'react';
import { ITodoListItemProps } from '../../typings/todo-list-item';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IState, IToDo } from '../../typings/reducer';
import { taskStatusChanged, itemDeleted } from '../../actions';

import './todo-list-item.scss';

const TodoListItem = (props: ITodoListItemProps): JSX.Element => {
	const { label, onDeleted, onToggleImportant, onToggleDone, done, important, id } = props;

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
				onClick={ () => onToggleDone(id) }>
				{ label }
			</span>

			<button type="button"
				className="btn btn-outline-success btn-sm float-right"
				onClick={ () => onToggleImportant(id) }>
				<i className="fa fa-exclamation" />
			</button>

			<button type="button"
				className="btn btn-outline-danger btn-sm float-right"
				onClick={ () => onDeleted(id) }>
				<i className="fa fa-trash-o" />
			</button>
		</span>
	);
}

const mapStateToProps = (state: IState): { todos: IToDo[] } => {
	return {
		todos: state.dataToShow
	}	
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		onToggleDone: (id: number) => dispatch(taskStatusChanged(id, 'done')),
		onToggleImportant: (id: number) => dispatch(taskStatusChanged(id, 'important')),
		onDeleted: (id: number) => dispatch(itemDeleted(id))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListItem);