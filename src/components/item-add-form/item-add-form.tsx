import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IItemAddFormProps, ImapDispatchToProps } from '../../typings/item-add-form';
import { addFormInput, typingDescription, newItemCreated } from '../../actions';
import { IState } from '../../typings/reducer';

import './item-add-form.sass';

const ItemAddForm = (props: IItemAddFormProps): JSX.Element => {
  const { label, description } = props;
  // update state on change event to have a controlled component
  const onLabelChange = (evt: React.ChangeEvent): void => {
    const changedLabel = (evt.target as HTMLInputElement).value;
    props.onInput(changedLabel);
  };

  const onDescriptionChange = (evt: React.ChangeEvent): void => {
    const changedLabel = (evt.target as HTMLInputElement).value;
    props.onDescription(changedLabel);
  };

  const onFormSubmit = (evt: React.FormEvent): void => {
    evt.preventDefault();
    props.onSubmit(label, description);
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
        
        <button
          className="btn btn-outline-secondary"
          type="submit"
        >
          Add Task
        </button>
      </div>
      <input
        className="form-control form-description"
        onChange={onDescriptionChange}
        placeholder="Describe your task"
        value={description}
      />
    </form>
  );
};

const mapStateToProps = (state: IState): { label: string, description: string } => ({
  label: state.newTaskLabel,
  description: state.newTaskDescription
});

const mapDispatchToProps = (dispatch: Dispatch): ImapDispatchToProps => ({
  onInput: (label: string) => dispatch(addFormInput(label)),
  onSubmit: (label: string, description: string) => dispatch(newItemCreated(label, description)),
  onDescription: (label: string) => dispatch(typingDescription(label)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemAddForm);
