import React from 'react';
import { ISearchPanelProps } from '../..//typings/search-panel';
import { IState } from '../../typings/reducer';
import { Dispatch } from 'redux';
import { searchOnInput } from '../../actions';
import { connect } from 'react-redux';

import './search-panel.sass';

const SearchPanel = (props: ISearchPanelProps): JSX.Element => {
	
	//changing state on input to have a controlled componenr and send data to App component	
	const onInputChange = (evt: React.ChangeEvent): void => {
		const term = (evt.target as HTMLInputElement).value;
		props.onInput(term);
	};

	return (
		<input type="text"
			className="form-control search-input"
			placeholder="type to search" 
			value={ props.term }
			onChange={ onInputChange }/>
	);
};

const mapStateToProps = (state: IState): { term: string } => {
	return {
		term: state.term
	}
};

const mapDispatchToProps = (dispatch: Dispatch): {onInput: (term: string) => void} => {
	return {
		onInput: (term: string) => dispatch(searchOnInput(term))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);