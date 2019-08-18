import React from 'react';
import { IItemStatusButtonProps, IMapDispatchToProps } from '../../typings/item-status-button';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IState } from '../../typings/reducer';
import { filterTasks } from '../../actions';

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

const mapStateToProps = (state: IState): { filter: string } => {
    return {
        filter: state.filter
    }
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        onFilterChange: (filter: string) => dispatch(filterTasks(filter))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemStatusButton);