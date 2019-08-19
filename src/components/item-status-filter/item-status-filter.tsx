import React from 'react';
import ItemStatusButton from '../item-status-button';
import { IItemStatusFilterButton } from '../../typings/item-status-filter';

import './item-status-filter.sass';

const buttons: IItemStatusFilterButton[] = [
  { name: 'all', label: 'All' },
  { name: 'active', label: 'Active' },
  { name: 'done', label: 'Done' },
];

// creates ui for each button type
const ItemStatusFilter = (): JSX.Element => {
  const filteredButtons = buttons.map(({ name, label }: IItemStatusFilterButton): JSX.Element => (
    <ItemStatusButton
      key={name}
      name={name}
      label={label}
    />
  ));

  return (

    <div className="btn-group">

      { filteredButtons }

    </div>
  );
};

export default ItemStatusFilter;
