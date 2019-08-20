import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IItemAddFormProps, ImapDispatchToProps, ImapStateToProps } from '../../typings/item-add-form';
import { addFormInput, typingDescription, newItemCreated, 
  typingDate, selectingHour, selectingMinutes } from '../../actions';
import { IState } from '../../typings/reducer';

import './item-add-form.sass';

const ItemAddForm = (props: IItemAddFormProps): JSX.Element => {
  const { label, description, date, hour, minutes } = props;
  // update state on change event to have a controlled component
  const onLabelChange = (evt: React.ChangeEvent): void => {
    const changedLabel = (evt.target as HTMLInputElement).value;
    props.onInput(changedLabel);
  };

  const onDescriptionChange = (evt: React.ChangeEvent): void => {
    const changedLabel = (evt.target as HTMLInputElement).value;
    props.onDescription(changedLabel);
  };

  const onDateChange = (evt: React.ChangeEvent): void => {
    const changedDate = (evt.target as HTMLInputElement).value;
    props.onDate(changedDate);
  };

  const onHourChange = (evt: React.ChangeEvent): void => {
    const changedTime = (evt.target as HTMLInputElement).value;
    props.onHour(changedTime);
  };

  const onMinutesChange = (evt: React.ChangeEvent): void => {
    const changedTime = (evt.target as HTMLInputElement).value;
    props.onMinutes(changedTime);
  };

  const onFormSubmit = (evt: React.FormEvent): void => {
    evt.preventDefault();
    props.onSubmit(label, description, date, hour, minutes);
  };

  // get option elem for each option value
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
    <form
      className="item-add-form d-flex flex-column"
      onSubmit={onFormSubmit}
    >
      <div className="item-add-form-wrapper">
        <input
          className="form-control"
          onChange={onLabelChange}
          placeholder="Name your task"
          value={label}
        />
        <label className="item-add-form-label">
          <span>Expires: </span>
          <input 
            className="item-add-form-date" 
            type="date" 
            title="Until when the task must be done"
            onChange={onDateChange}
            value={date}
          />
        </label>
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
      </div>
      <div className="item-add-form-wrapper">
        <input
          className="form-control form-description"
          onChange={onDescriptionChange}
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
  label: state.newTaskLabel,
  description: state.newTaskDescription,
  date: state.newTaskDate,
  hour: state.newTaskHour,
  minutes: state.newTaskMinutes,
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
