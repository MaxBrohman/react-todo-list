import React from 'react';
import { IEditableItemProps } from '../../../typings/todo-list-item';


// ui for editing list item
export const EditableItem = (props: IEditableItemProps): JSX.Element => {
  const {
    label, id, classNames, onLabelChange, onConfirmEdit, 
    onKeyDownHandler, description, onDescriptionChange, date, 
    onDateChange, hour, minutes, onHourChange, onMinutesChange,
    hourOptions, minutesOptions,
  } = props;

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
          { hourOptions }
        </select>
        <select 
          name="minutes" 
          id="minutes" 
          className="item-add-form-time-select" 
          value={minutes}
          onChange={onMinutesChange}
          title="set time"
        >
          { minutesOptions }
        </select>
        <button
          type="button"
          className="btn btn-outline-info btn-sm float-right"
          onClick={() => onConfirmEdit(id)}
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