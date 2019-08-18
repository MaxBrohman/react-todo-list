import React from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.sass';

const App = (): JSX.Element => {

	return (
		<div className="todo-app">
			<AppHeader />
			<div className="top-panel d-flex">
				<SearchPanel />
				<ItemStatusFilter />
			</div>

			<TodoList />

			<ItemAddForm />
		</div>
	);
};

export default App;