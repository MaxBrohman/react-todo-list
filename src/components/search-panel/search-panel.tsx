import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ISearchPanelProps } from '../../typings/search-panel';
import { IState } from '../../typings/reducer';
import { searchOnInput } from '../../actions';

import './search-panel.sass';

const SearchPanel = (props: ISearchPanelProps): JSX.Element => {
  // changing state on input to have a controlled componenr and send data to App component
  const onInputChange = (evt: React.ChangeEvent): void => {
    const term = (evt.target as HTMLInputElement).value;
    props.onInput(term);
  };

  const { term } = props;

  return (
    <input
      type="text"
      className="form-control search-input"
      placeholder="type to search"
      value={term}
      onChange={onInputChange}
    />
  );
};

const mapStateToProps = (state: IState): { term: string } => ({
  term: state.term,
});

const mapDispatchToProps = (dispatch: Dispatch): {onInput: (term: string) => void} => ({
  onInput: (term: string) => dispatch(searchOnInput(term)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
