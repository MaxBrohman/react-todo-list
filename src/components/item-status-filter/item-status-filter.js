import React, { Component } from 'react';
import ItemStatusButton from '../item-status-button';

import './item-status-filter.css';


export default class ItemStatusFilter extends Component {
  
	buttons = [
		{name: 'all', label: 'All'},
		{name: 'active', label: 'Active'},
		{name: 'done', label: 'Done'}
	];

	render() {
		
		const buttons = this.buttons.map(({ name, label }) => {
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