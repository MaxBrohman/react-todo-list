import React from 'react';
import ItemStatusButton from '../item-status-button';
import { IItemStatusFilterProps, IItemStatusFilterButton } from '../../typings/item-status-filter';

import './item-status-filter.sass';

const buttons: IItemStatusFilterButton[] = [
	{name: 'all', label: 'All'},
	{name: 'active', label: 'Active'},
	{name: 'done', label: 'Done'}
];

// creates ui for each button type
const ItemStatusFilter = (props: IItemStatusFilterProps): JSX.Element => {

	const filteredButtons = buttons.map(({ name, label }: IItemStatusFilterButton): JSX.Element => {
		return (
			<ItemStatusButton 
				key={ name } 
				name={ name } 
				label={ label } 
				filter={props.filter } 
				onFilterChange={ props.onFilterChange }/>
		);
	});

	return (

		<div className="btn-group">

			{ filteredButtons }
			
		</div>
	);
};

export default ItemStatusFilter;