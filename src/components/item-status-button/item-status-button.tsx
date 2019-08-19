import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IItemStatusButtonProps, IMapDispatchToProps } from '../../typings/item-status-button';
import { IState } from '../../typings/reducer';
import { filterTasks } from '../../actions';

import './item-status-button.sass';

const ItemStatusButton = (props: IItemStatusButtonProps): JSX.Element => {
  const {
    name, filter, onFilterChange, label,
  } = props;
  const isActive = (name === filter);

  return (
    <button
      type="button"
      name={name}
      className={isActive ? 'btn btn-info' : 'btn btn-outline-secondary'}
      onClick={() => { onFilterChange(name); }}
    >
      { label }
    </button>
  );
};

const mapStateToProps = (state: IState): { filter: string } => ({
  filter: state.filter,
});

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
  onFilterChange: (filter: string) => dispatch(filterTasks(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemStatusButton);
