import React from 'react';
import { IItemStatusButtonProps } from '../../typings/item-status-button';

import './item-status-button.sass';

const ItemStatusButton = (props: IItemStatusButtonProps): JSX.Element => {

    const isActive = (props.name === props.filter);

    return (
        <button 
            type="button" 
            name={ props.name } 
            className={ isActive? 'btn btn-info' : 'btn btn-outline-secondary' }
            onClick={ () => { props.onFilterChange(props.name) } }>
            { props.label }
        </button>
    );
};

export default ItemStatusButton;