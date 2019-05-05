import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends React.Component {

	//in state we have array of todo items list data, serach bar value and value of active filter button
	constructor(){
		super();
		this.state = {
			todoData: [], 
			term: '', 
			filter: 'all'
		};
	}

	deleteItem(id){
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex((el) => el.id === id);

			const newArray = [
				...todoData.slice(0, idx),
				...todoData.slice(idx + 1)
			];

			return {
				todoData: newArray
			};
		});
	};

	//unique id generates by milliseconds count
	createItem (text) {
		return {
			label: text,
			important: false,
			done: false,
			id: (new Date).getTime()
		}
	};

	addItem (text){
		this.setState(({ todoData }) => {
			const newArr = [
				...todoData,
				this.createItem(text)
			];
			return {
				todoData: newArr
			};
		});
	};

	//changing done or important property of todo list item
	toggleProperty(prop, id){
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex((el) => el.id === id);
			const oldItem = todoData[idx];
			const newItem = { ...oldItem, [prop]: !oldItem[prop] };
			const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx+1)];
			return {
				todoData: newArr
			};
		});
	};

	//filter items by searhbar input
	searchTodos(items, term){
		if(!term.length){
			return items;
		}
		return items.filter(item =>  item.label.toLowerCase().indexOf(term.toLowerCase()) > -1);
	};

	//filter items by filter buttons input
	filterTodos(items, filter){
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
	onStatePropChange(prop, value){
		this.setState({ [prop]: value });
	};

	render() {
		const dataToShow = this.filterTodos(this.searchTodos(this.state.todoData, this.state.term), this.state.filter);

		const doneCount = this.state.todoData.filter(item => item.done).length;
		const todoCount = this.state.todoData.length - doneCount;

		return (
			<div className="todo-app">
				<AppHeader 
					toDo={ todoCount } 
					done={ doneCount } />
				<div className="top-panel d-flex">
					<SearchPanel onInputChange={ this.onStatePropChange.bind(this, 'term') }/>
					<ItemStatusFilter 
						filter={ this.state.filter }
						onFilterChange={ this.onStatePropChange.bind(this, 'filter') }/>
				</div>

				<TodoList
					todos={ dataToShow }
					onDeleted={ this.deleteItem.bind(this) }
					onToggleDone={ this.toggleProperty.bind(this, 'done') }
					onToggleImportant={ this.toggleProperty.bind(this, 'important') }/>

				<ItemAddForm onItemAdded={ this.addItem.bind(this) }/>
			</div>
		);
	}
};
