import React from 'react';
import { ITodoListItemProps } from '../../../typings/todo-list-item';
import DateSpan from '../date-span';

// edited list item
const TodoListItem = (props: ITodoListItemProps): JSX.Element => {
	const {
		label, onDeleted, onToggleImportant, onToggleDone, classNames, 
		id, onEdit, onKeyDownHandler, onToggleVeryImportant, description, 
		date, hour, minutes, done, completionDate
	} = props;

	return (
		<div className={classNames}>
			<div className="card-header d-flex">
				<h5 className="todo-list-item-label card-title"
					onClick={() => onToggleDone(id)}
					onKeyDown={onKeyDownHandler}
					tabIndex={0}
					role="button"
					title="task name"
				>
					{ label }
					<DateSpan 
						done={done}
						completionDate={completionDate}
						date={date}
						hour={hour}
						minutes={minutes}
					/>
				</h5>
				<button
					type="button"
					className="btn btn-outline-warning btn-sm float-right"
					onClick={() => onToggleVeryImportant(id)}
					title="Very important!"
				>
					<i className="fa fa-star" />
				</button>

				<button
					type="button"
					className="btn btn-outline-success btn-sm float-right"
					onClick={() => onToggleImportant(id)}
					title="important"
				>
					<i className="fa fa-exclamation" />
				</button>

				<button
					type="button"
					className="btn btn-outline-info btn-sm float-right"
					onClick={() => onEdit(id)}
					title="edit task"
				>
					<i className="fa fa-edit" />
				</button>

				<button
					type="button"
					className="btn btn-outline-danger btn-sm float-right"
					onClick={() => onDeleted(id)}
					title="delete task"
				>
					<i className="fa fa-trash-o" />
				</button>
				
			</div>

			<div className="card-body">
			<p
					className="todo-list-item-description card-text"
					title="task description"
				>
					{ description }
				</p>
			</div>
		</div>
	);
};

export default TodoListItem;