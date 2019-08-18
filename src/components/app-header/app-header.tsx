import React from 'react';
import { IAppHeaderProps } from '../../typings/app-header';
import { connect } from 'react-redux';
import { IState } from '../../typings/reducer';

import './app-header.sass';

const AppHeader = ({ activeCount, unactiveCount }: IAppHeaderProps): JSX.Element => {
	return (
		<div className="app-header d-flex">
			<h1>Todo List</h1>
			<h2>{ activeCount } more to do, { unactiveCount } done</h2>
		</div>
	);
};

const mapStateToProps = (state: IState): IAppHeaderProps => {
	return {
		activeCount: state.activeTasksCount,
		unactiveCount: state.unactiveTasksCount
	}
};

export default connect(mapStateToProps)(AppHeader);