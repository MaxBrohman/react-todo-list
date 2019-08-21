import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ISearchPanelProps } from '../../typings/search-panel';
import { IState } from '../../typings/reducer';
import { searchOnInput } from '../../actions';
import { onChangeHelper } from '../../utils';

import './search-panel.sass';

const SearchPanel = (props: ISearchPanelProps): JSX.Element => {

  const { term, onInput } = props;

  return (
    <input
      type="text"
      className="form-control search-input"
      placeholder="type to search"
      value={term}
      onChange={onChangeHelper(onInput)}
    />
  );
};

const mapStateToProps = (state: IState): { term: string } => ({
  term: state.tasksFields.term,
});

const mapDispatchToProps = (dispatch: Dispatch): {onInput: (term: string) => void} => ({
  onInput: (term: string) => dispatch(searchOnInput(term)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
