import React from 'react';
import { connect } from 'react-redux';
import { ITodoListProps } from '../../typings/todo-list';
import TodoListItemContainer from '../todo-list-item-container';
import { IState, IToDo } from '../../typings/reducer';

import './todo-list.sass';

const TodoList = (props: ITodoListProps): JSX.Element => {
  const { dataToShow } = props;
  // update items list on App todoData array change
  const elements = dataToShow.map(item => {
    const { id, ...itemProps } = item;
    return (
      <li key={id} className="list-group-item">
        <TodoListItemContainer
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
  dataToShow: state.tasksFields.dataToShow,
});

export default connect(mapStateToProps)(TodoList);
