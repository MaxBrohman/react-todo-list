import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IItemAddFormProps, ImapDispatchToProps } from '../../typings/item-add-form';
import { addFormInput, newItemCreated } from '../../actions';
import { IState } from '../../typings/reducer';

import './item-add-form.sass';

const ItemAddForm = (props: IItemAddFormProps): JSX.Element => {
  const { label } = props;
  // update state on change event to have a controlled component
  const onLabelChange = (evt: React.ChangeEvent): void => {
    const changedLabel = (evt.target as HTMLInputElement).value;
    props.onInput(changedLabel);
  };

  const onFormSubmit = (evt: React.FormEvent): void => {
    evt.preventDefault();
    props.onSubmit(label);
  };


  return (
    <form
      className="item-add-form d-flex"
      onSubmit={onFormSubmit}
    >
      <input
        className="form-control"
        onChange={onLabelChange}
        placeholder="What to do"
        value={label}
      />
      <button
        className="btn btn-outline-secondary"
        type="submit"
      >
        Add Item
      </button>
    </form>
  );
};

const mapStateToProps = (state: IState): { label: string } => ({
  label: state.newTaskLabel,
});

const mapDispatchToProps = (dispatch: Dispatch): ImapDispatchToProps => ({
  onInput: (label: string) => dispatch(addFormInput(label)),
  onSubmit: (label: string) => dispatch(newItemCreated(label)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemAddForm);
