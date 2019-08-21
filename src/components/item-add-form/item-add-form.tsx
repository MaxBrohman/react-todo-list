import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IItemAddFormProps, ImapDispatchToProps, ImapStateToProps } from '../../typings/item-add-form';
import { addFormInput, typingDescription, newItemCreated, 
  typingDate, selectingHour, selectingMinutes } from '../../actions';
  import { getOptions, onChangeHelper } from '../../utils';
import { IState } from '../../typings/reducer';

import './item-add-form.sass';

const ItemAddForm = (props: IItemAddFormProps): JSX.Element => {
  const { label, description, date, hour, minutes, onInput, 
    onDescription, onDate, onHour, onMinutes } = props;

  const onFormSubmit = (evt: React.FormEvent): void => {
    evt.preventDefault();
    props.onSubmit(label, description, date, hour, minutes);
  };

  return (
    <form
      className="item-add-form d-flex flex-column"
      onSubmit={onFormSubmit}
    >
      <div className="item-add-form-wrapper">
        <input
          className="form-control"
          onChange={onChangeHelper(onInput)}
          placeholder="Name your task"
          value={label}
        />
        <label className="item-add-form-label">
          <span>Expires: </span>
          <input 
            className="item-add-form-date" 
            type="date" 
            title="Until when the task must be done"
            onChange={onChangeHelper(onDate)}
            value={date}
          />
        </label>
        <select 
          name="hour" 
          id="hour" 
          className="item-add-form-time-select" 
          value={hour}
          onChange={onChangeHelper(onHour)}
          title="set time"
        >
          {
            getOptions(24)
          }
        </select>
        <select 
          name="minutes" 
          id="minutes" 
          className="item-add-form-time-select" 
          value={minutes}
          onChange={onChangeHelper(onMinutes)}
          title="set time"
        >
          {
            getOptions(60)
          }
        </select>
      </div>
      <div className="item-add-form-wrapper">
        <input
          className="form-control form-description"
          onChange={onChangeHelper(onDescription)}
          placeholder="Describe your task"
          value={description}
        />
        <button
          className="btn btn-outline-secondary add-task-btn"
          type="submit"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = (state: IState): ImapStateToProps => ({
  label: state.newTaskFields.newTaskLabel,
  description: state.newTaskFields.newTaskDescription,
  date: state.newTaskFields.newTaskDate,
  hour: state.newTaskFields.newTaskHour,
  minutes: state.newTaskFields.newTaskMinutes,
});

const mapDispatchToProps = (dispatch: Dispatch): ImapDispatchToProps => ({
  onInput: (label: string) => dispatch(addFormInput(label)),
  onSubmit: (label: string, description: string, date: string, hour: string, minutes: string) => dispatch(newItemCreated(label, description, date, hour, minutes)),
  onDescription: (label: string) => dispatch(typingDescription(label)),
  onDate: (date: string) => dispatch(typingDate(date)),
  onHour: (hour: string) => dispatch(selectingHour(hour)),
  onMinutes: (minutes: string) => dispatch(selectingMinutes(minutes)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemAddForm);
