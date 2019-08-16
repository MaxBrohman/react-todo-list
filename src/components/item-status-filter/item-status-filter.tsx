import React, { Component } from 'react';
import ItemStatusButton from '../item-status-button';
import { IItemStatusFilterProps, IItemStatusFilterButton } from '../../typings/item-status-filter';

import './item-status-filter.sass';


export default class ItemStatusFilter extends Component {
	public props: IItemStatusFilterProps;
	constructor(props: IItemStatusFilterProps){
		super(props);
		this.props = props;
	}

	private buttons: IItemStatusFilterButton[] = [
		{name: 'all', label: 'All'},
		{name: 'active', label: 'Active'},
		{name: 'done', label: 'Done'}
	];

	public render(): JSX.Element {
		
		const buttons = this.buttons.map(({ name, label }: IItemStatusFilterButton): JSX.Element => {
			return (
				<ItemStatusButton 
					key={ name } 
					name={ name } 
					label={ label } 
					filter={ this.props.filter } 
					onFilterChange={ this.props.onFilterChange }/>
			);
		});

		return (

			<div className="btn-group">

				{ buttons }
				
			</div>
		);
	}
};