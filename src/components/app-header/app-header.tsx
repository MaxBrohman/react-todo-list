import React from 'react';
import { IAppHeaderProps } from '../../typings/app-header';

import './app-header.sass';

const AppHeader = ({ toDo, done }: IAppHeaderProps): JSX.Element => {
	return (
		<div className="app-header d-flex">
			<h1>Todo List</h1>
			<h2>{toDo} more to do, {done} done</h2>
		</div>
	);
};

export default AppHeader;