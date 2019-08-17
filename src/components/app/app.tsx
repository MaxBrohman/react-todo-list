import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';
import { IAppState, IToDo } from '../../typings/app';

import './app.sass';

export default class App extends React.Component {
	public state: IAppState;
	//in state we have array of todo items list data, serach bar value and value of active filter button
	constructor(props: {}){
		super(props);
		this.state = {
			todoData: [], 
			term: '', 
			filter: 'all'
		};
	}

	private deleteItem(id: number): void {
		this.setState((state: IAppState): IAppState => {
			const { todoData } = state;
			const idx = todoData.findIndex((el) => el.id === id);

			const newArray = [
				...todoData.slice(0, idx),
				...todoData.slice(idx + 1)
			];

			return {
				...state,
				todoData: newArray
			};
		});
	};

	//changing done or important property of todo list item
	private toggleProperty(prop: string, id: number): void {
		this.setState((state: IAppState): IAppState => {
			const { todoData } = state;
			const idx = todoData.findIndex((el) => el.id === id);
			const oldItem: any = todoData[idx];
			const newItem = { ...oldItem, [prop]: !oldItem[prop] };
			const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx+1)];
			return {
				...state,
				todoData: newArr
			};
		});
	};

	//filter items by searhbar input
	private searchTodos(items: IToDo[], term: string): IToDo[]{
		if(!term.length){
			return items;
		}
		return items.filter(item => item.label.toLowerCase().indexOf(term.toLowerCase()) > -1);
	};

	//filter items by filter buttons input
	private filterTodos(items: IToDo[], filter: string): IToDo[] {
		switch(filter){
			case 'active':
				return items.filter(item => !item.done);
			case 'done':
				return items.filter(item => item.done);
			default: 
				return items;
		}
	}

	//changing filter or term state property on child components input
	private onStatePropChange(prop: string, value: string): void {
		this.setState({ [prop]: value });
	};

	public render(): JSX.Element {
		const dataToShow = this.filterTodos(this.searchTodos(this.state.todoData, this.state.term), this.state.filter);

		const doneCount = this.state.todoData.filter(item => item.done).length;
		const todoCount = this.state.todoData.length - doneCount;

		return (
			<div className="todo-app">
				<AppHeader 
					toDo={ todoCount } 
					done={ doneCount } />
				<div className="top-panel d-flex">
					<SearchPanel />
					<ItemStatusFilter 
						filter={ this.state.filter }
						onFilterChange={ this.onStatePropChange.bind(this, 'filter') }/>
				</div>

				<TodoList
					todos={ dataToShow }
					onDeleted={ this.deleteItem.bind(this) }
					onToggleDone={ this.toggleProperty.bind(this, 'done') }
					onToggleImportant={ this.toggleProperty.bind(this, 'important') }/>

				<ItemAddForm />
			</div>
		);
	}
};