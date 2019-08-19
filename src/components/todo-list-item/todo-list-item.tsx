import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ITodoListItemProps, ITodoChildProps } from '../../typings/todo-list-item';
import { IState, IToDo } from '../../typings/reducer';
import {
  taskStatusChanged, itemDeleted, editingTasks, 
  editTaskName, confirmEditedTask, taskImportanceChanged
} from '../../actions';

import './todo-list-item.sass';


// container component which desides whether or not render edited or editing list item
const TodoItemContainer = (props: ITodoListItemProps): JSX.Element => {
  const {
    label, onDeleted, onToggleImportant, onToggleDone, 
    onInput, done, important, id, isEditing, onEdit, 
    onConfirmEdit, veryImportant, onToggleVeryImportant, description
  } = props;
  const onLabelChange = (evt: React.ChangeEvent): void => {
    const changedLabel = (evt.target as HTMLInputElement).value;
    onInput!(changedLabel, id);
  };

  let classNames = 'todo-list-item card';

  if (done) {
    classNames += ' done';
  }

  if (important) {
    classNames += ' important';
  }

  if(veryImportant) {
    classNames += ' veryImportant';
  }

  if (isEditing) {
    const onKeyDownHandler = (evt: React.KeyboardEvent): void => {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        onConfirmEdit!(id);
      }
    };
    classNames += ' editing';
    return (
      <EditableTodo
        classNames={classNames}
        onLabelChange={onLabelChange}
        onConfirmEdit={onConfirmEdit}
        onKeyDownHandler={onKeyDownHandler}
        label={label}
        id={id}
        description={description}
      />
    );
  }
  const onKeyDownHandler = (evt: React.KeyboardEvent): void => {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      onToggleDone!(id);
    }
  };
  classNames += ' edited';
  return (
    <TodoListItem
      classNames={classNames}
      onDeleted={onDeleted}
      onToggleDone={onToggleDone}
      onToggleImportant={onToggleImportant}
      onToggleVeryImportant={onToggleVeryImportant}
      label={label}
      onKeyDownHandler={onKeyDownHandler}
      id={id}
      onEdit={onEdit}
      description={description}
    />
  );
};


// editing list item
const EditableTodo = (props: ITodoChildProps): JSX.Element => {
  const {
    label, id, classNames, onLabelChange, onConfirmEdit, onKeyDownHandler,
  } = props;

  return (
    <div className={classNames}>
      <input
        className="todo-list-item-label"
        onChange={onLabelChange}
        value={label}
        onKeyDown={onKeyDownHandler}
      />

      <button
        type="button"
        className="btn btn-outline-info btn-sm float-right"
        onClick={() => onConfirmEdit!(id)}
      >
        <i className="fa fa-check-circle" />
      </button>

    </div>
  );
};

// edited list item
const TodoListItem = (props: ITodoChildProps): JSX.Element => {
  const {
    label, onDeleted, onToggleImportant, onToggleDone, classNames, 
    id, onEdit, onKeyDownHandler, onToggleVeryImportant, description
  } = props;

  return (
    <div className={classNames}>
      <div className="card-header d-flex">
        <h5 className="todo-list-item-label card-title"
          onClick={() => onToggleDone!(id)}
          onKeyDown={onKeyDownHandler}
          tabIndex={0}
          role="button"
        >
          { label }
        </h5>
        <button
          type="button"
          className="btn btn-outline-warning btn-sm float-right"
          onClick={() => onToggleVeryImportant!(id)}
        >
          <i className="fa fa-star" />
        </button>

        <button
          type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={() => onToggleImportant!(id)}
        >
          <i className="fa fa-exclamation" />
        </button>

        <button
          type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={() => onDeleted!(id)}
        >
          <i className="fa fa-trash-o" />
        </button>

        <button
          type="button"
          className="btn btn-outline-info btn-sm float-right"
          onClick={() => onEdit!(id)}
        >
          <i className="fa fa-edit" />
        </button>
      </div>

      <div className="card-body">
      <p
          className="todo-list-item-description card-text"
        >
          { description }
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState): { todos: IToDo[] } => ({
  todos: state.dataToShow,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onToggleDone: (id: number) => dispatch(taskStatusChanged(id, 'done')),
  onToggleImportant: (id: number) => dispatch(taskImportanceChanged(id, 'important')),
  onToggleVeryImportant: (id: number) => dispatch(taskImportanceChanged(id, 'veryImportant')),
  onDeleted: (id: number) => dispatch(itemDeleted(id)),
  onInput: (label: string, id: number) => dispatch(editingTasks(label, id)),
  onEdit: (id: number) => dispatch(editTaskName(id)),
  onConfirmEdit: (id: number) => dispatch(confirmEditedTask(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoItemContainer);
