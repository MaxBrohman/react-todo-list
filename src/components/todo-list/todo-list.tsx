import React from 'react';
import { connect } from 'react-redux';
import { ITodoListProps } from '../../typings/todo-list';
import TodoListItem from '../todo-list-item';
import { IState, IToDo } from '../../typings/reducer';

import './todo-list.sass';

const TodoList = (props: ITodoListProps): JSX.Element => {
  const { dataToShow } = props;
  // update items list on App todoData array change
  const elements = dataToShow.map(item => {
    const { id, ...itemProps } = item;
    return (
      <li key={id} className="list-group-item">
        <TodoListItem
          {...itemProps}
          id={id}
        />
      </li>
    );
  });
  return (
    <ul className="list-group todo-list">
      { elements }
    </ul>
  );
};

const mapStateToProps = (state: IState): { dataToShow: IToDo[] } => ({
  dataToShow: state.dataToShow,
});

export default connect(mapStateToProps)(TodoList);
