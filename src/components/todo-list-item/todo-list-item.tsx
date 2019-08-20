import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ITodoListItemProps, ITodoChildProps } from '../../typings/todo-list-item';
import { IState, IToDo } from '../../typings/reducer';
import {
  taskStatusChanged, itemDeleted, editingTaskName, editingTaskDescription,
  editTask, confirmEditedTask, taskImportanceChanged, editingTaskDate,
  editingTaskMinutes, editingTaskHour,
} from '../../actions';

import './todo-list-item.sass';


// container component which desides whether or not render edited or editing list item
const TodoItemContainer = (props: ITodoListItemProps): JSX.Element => {
  const {
    label, onDeleted, onToggleImportant, onToggleDone, date, 
    onInputName, done, important, id, isEditing, onEdit, 
    onConfirmEdit, veryImportant, onToggleVeryImportant, description,
    onInputDescription, onInputDate, hour, minutes,
    onSelectHour, onSelectMinutes, completionDate
  } = props;

  const onLabelChange = (evt: React.ChangeEvent): void => {
    const changedLabel = (evt.target as HTMLInputElement).value;
    onInputName!(changedLabel, id);
  };

  const onDescriptionChange = (evt: React.ChangeEvent): void => {
    const changedDescription = (evt.target as HTMLInputElement).value;
    onInputDescription!(changedDescription, id);
  };

  const onDateChange = (evt: React.ChangeEvent): void => {
    const changedDate = (evt.target as HTMLInputElement).value;
    onInputDate!(changedDate, id);
  };

  const onHourChange = (evt: React.ChangeEvent): void => {
    const changedHour = (evt.target as HTMLInputElement).value;
    onSelectHour!(changedHour, id);
  };

  const onMinutesChange = (evt: React.ChangeEvent): void => {
    const changedMinutes = (evt.target as HTMLInputElement).value;
    onSelectMinutes!(changedMinutes, id);
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
        onDescriptionChange={onDescriptionChange}
        date={date}
        onDateChange={onDateChange}
        hour={hour}
        minutes={minutes}
        onHourChange={onHourChange}
        onMinutesChange={onMinutesChange}
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
      date={date}
      hour={hour}
      minutes={minutes}
      done={done}
      completionDate={completionDate}
    />
  );
};


// editing list item
const EditableTodo = (props: ITodoChildProps): JSX.Element => {
  const {
    label, id, classNames, onLabelChange, onConfirmEdit, 
    onKeyDownHandler, description, onDescriptionChange, date, 
    onDateChange, hour, minutes, onHourChange, onMinutesChange
  } = props;

  const getHourOptions = (option: number): JSX.Element => {
    const value = option < 10 ? `0${option}` : `${option}`;
    return (<option value={value} key={+value}>{value}</option>);
  }; 

  const getAllOptions = (num: number): JSX.Element[] => {
    const res = [];
    for(let i = 0; i < num; i++){
      res.push(getHourOptions(i));
    }
    return res;
  };

  return (
    <div className={classNames}>
      <div className="card-header d-flex">
        <input
          className="form-control"
          onChange={onLabelChange}
          value={label}
          onKeyDown={onKeyDownHandler}
          type="text"
        />
        <input 
          className="todo-list-item-date" 
          type="date" 
          title="Until when the task must be done"
          onChange={onDateChange}
          value={date}
          onKeyDown={onKeyDownHandler}
        />
        <select 
          name="hour" 
          id="hour" 
          className="item-add-form-time-select" 
          value={hour}
          onChange={onHourChange}
          title="set time"
        >
          {
            getAllOptions(24)
          }
        </select>
        <select 
          name="minutes" 
          id="minutes" 
          className="item-add-form-time-select" 
          value={minutes}
          onChange={onMinutesChange}
          title="set time"
        >
          {
            getAllOptions(60)
          }
        </select>
        <button
          type="button"
          className="btn btn-outline-info btn-sm float-right"
          onClick={() => onConfirmEdit!(id)}
        >
          <i className="fa fa-check-circle" />
        </button>
      </div>

      <div className="card-body">
        <input type="text"
          className="todo-list-item-description card-text"
          onChange={onDescriptionChange}
          onKeyDown={onKeyDownHandler}
          value={description}
        />
      </div>

    </div>
  );
};

// edited list item
const TodoListItem = (props: ITodoChildProps): JSX.Element => {
  const {
    label, onDeleted, onToggleImportant, onToggleDone, classNames, 
    id, onEdit, onKeyDownHandler, onToggleVeryImportant, description, 
    date, hour, minutes, done, completionDate
  } = props;

  const dateSpan = (date: string): JSX.Element | null => {
    let dateClasses = 'date-badge badge badge-pill float-right';
    let title: string;
    if(done){
      dateClasses += ' badge-success';
      title = 'task completion time';
      return (<span className={dateClasses} title={title}>{completionDate}</span>);
    }
    const dateStr = `${date}, ${hour}:${minutes}`;
    let expireDate = new Date(dateStr).toLocaleString();
    
    if(expireDate === 'Invalid Date') {
      return null;
    } else {
      // taking only a part of string with date, hours and minutes
      expireDate = expireDate.slice(0, expireDate.length - 3);
      if(new Date() > new Date(dateStr)) {
        dateClasses += ' badge-danger';
        title = 'expired!';
      } else {
        dateClasses += ' badge-warning';
        title = 'expires';
      }
      return (<span className={dateClasses} title={title}>{expireDate}</span>);
    }
  };

  return (
    <div className={classNames}>
      <div className="card-header d-flex">
        <h5 className="todo-list-item-label card-title"
          onClick={() => onToggleDone!(id)}
          onKeyDown={onKeyDownHandler}
          tabIndex={0}
          role="button"
          title="task name"
        >
          { label }
          { dateSpan(date) }
        </h5>
        <button
          type="button"
          className="btn btn-outline-warning btn-sm float-right"
          onClick={() => onToggleVeryImportant!(id)}
          title="Very important!"
        >
          <i className="fa fa-star" />
        </button>

        <button
          type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={() => onToggleImportant!(id)}
          title="important"
        >
          <i className="fa fa-exclamation" />
        </button>

        <button
          type="button"
          className="btn btn-outline-info btn-sm float-right"
          onClick={() => onEdit!(id)}
          title="edit task"
        >
          <i className="fa fa-edit" />
        </button>

        <button
          type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={() => onDeleted!(id)}
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

const mapStateToProps = (state: IState): { todos: IToDo[] } => ({
  todos: state.dataToShow,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onToggleDone: (id: number) => dispatch(taskStatusChanged(id, 'done')),
  onToggleImportant: (id: number) => dispatch(taskImportanceChanged(id, 'important')),
  onToggleVeryImportant: (id: number) => dispatch(taskImportanceChanged(id, 'veryImportant')),
  onDeleted: (id: number) => dispatch(itemDeleted(id)),
  onInputName: (label: string, id: number) => dispatch(editingTaskName(label, id)),
  onInputDescription: (description: string, id: number) => dispatch(editingTaskDescription(description, id)),
  onEdit: (id: number) => dispatch(editTask(id)),
  onConfirmEdit: (id: number) => dispatch(confirmEditedTask(id)),
  onInputDate: (date: string, id: number) => dispatch(editingTaskDate(date, id)),
  onSelectHour: (hour: string, id: number) => dispatch(editingTaskHour(hour, id)),
  onSelectMinutes: (minutes: string, id: number) => dispatch(editingTaskMinutes(minutes, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoItemContainer);
