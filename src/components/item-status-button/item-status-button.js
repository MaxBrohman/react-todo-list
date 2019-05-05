import React from 'react';

import './item-status-button.css';

const ItemStatusButton = (props) => {

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