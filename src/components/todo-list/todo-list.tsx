import React from 'react';
import { ITodoListProps } from '../../typings/todo-list';
import TodoListItem from '../todo-list-item';
import './todo-list.sass';

const TodoList = (props: ITodoListProps): JSX.Element => {
	const { todos, onDeleted, onToggleDone, onToggleImportant } = props;
	//update items list on App todoData array change
	const elements = todos.map(item => {
		const { id, ...itemProps } = item;
		return (
			<li key={ id } className="list-group-item">
				<TodoListItem
					{ ...itemProps }
					onDeleted={ () => onDeleted(id) }
					onToggleDone={ () => onToggleDone(id) }
					onToggleImportant={ () => onToggleImportant(id) }/>
			</li>
		);
	});

	return (
		<ul className="list-group todo-list">
			{ elements }
		</ul>
	);
};

export default TodoList;