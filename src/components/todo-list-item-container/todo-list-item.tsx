import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ITodoListItemContainerProps } from '../../typings/todo-list-item';
import { IState, IToDo } from '../../typings/reducer';
import EditableItem from './editable-item';
import TodoListItem from './todo-list-item/index';
import { onChangeHelper, onKeydownHelper, getOptions } from '../../utils';
import {
  taskStatusChanged, itemDeleted, editingTaskName, editingTaskDescription,
  editTask, confirmEditedTask, taskImportanceChanged, editingTaskDate,
  editingTaskMinutes, editingTaskHour,
} from '../../actions';

import './todo-list-item.sass';

// container component which desides whether or not render edited or editing list item
const TodoItemContainer = (props: ITodoListItemContainerProps): JSX.Element => {
  const {
    label, onDeleted, onToggleImportant, onToggleDone, date,
    onInputName, done, important, id, isEditing, onEdit,
    onConfirmEdit, veryImportant, onToggleVeryImportant, description,
    onInputDescription, onInputDate, hour, minutes,
    onSelectHour, onSelectMinutes, completionDate,
  } = props;

  let classNames = 'todo-list-item card';


  // show editing version of task if user pushed edit button
  if (isEditing) {
    classNames += ' editing';
    return (
      <EditableItem
        classNames={classNames}
        onLabelChange={onChangeHelper(onInputName, id)}
        onConfirmEdit={onConfirmEdit}
        onKeyDownHandler={onKeydownHelper(id, 'Enter', onConfirmEdit)}
        label={label}
        id={id}
        description={description}
        onDescriptionChange={onChangeHelper(onInputDescription, id)}
        date={date}
        onDateChange={onChangeHelper(onInputDate, id)}
        hour={hour}
        minutes={minutes}
        onHourChange={onChangeHelper(onSelectHour, id)}
        onMinutesChange={onChangeHelper(onSelectMinutes, id)}
        hourOptions={getOptions(24)}
        minutesOptions={getOptions(60)}
      />
    );
  }

  if (done) {
    classNames += ' done';
  }

  if (important) {
    classNames += ' important';
  }

  if (veryImportant) {
    classNames += ' veryImportant';
  }

  classNames += ' edited';

  return (
    <TodoListItem
      classNames={classNames}
      onDeleted={onDeleted}
      onToggleDone={onToggleDone}
      onToggleImportant={onToggleImportant}
      onToggleVeryImportant={onToggleVeryImportant}
      label={label}
      onKeyDownHandler={onKeydownHelper(id, 'Enter', onToggleDone)}
      id={id}
      onEdit={onEdit}
      description={description}
      date={date}
      hour={hour}
      minutes={minutes}
      done={done}
      completionDate={completionDate}
    />
  );
};

const mapStateToProps = (state: IState): { todos: IToDo[] } => ({
  todos: state.tasksFields.dataToShow,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onToggleDone: (id: number) => dispatch(taskStatusChanged(id, 'done')),
  onToggleImportant: (id: number) => dispatch(taskImportanceChanged(id, 'important')),
  onToggleVeryImportant: (id: number) => dispatch(taskImportanceChanged(id, 'veryImportant')),
  onDeleted: (id: number) => dispatch(itemDeleted(id)),
  onInputName: (label: string, id: number) => dispatch(editingTaskName(label, id)),
  onInputDescription: (description: string, id: number) => {
    dispatch(editingTaskDescription(description, id));
  },
  onEdit: (id: number) => dispatch(editTask(id)),
  onConfirmEdit: (id: number) => dispatch(confirmEditedTask(id)),
  onInputDate: (date: string, id: number) => dispatch(editingTaskDate(date, id)),
  onSelectHour: (hour: string, id: number) => dispatch(editingTaskHour(hour, id)),
  onSelectMinutes: (minutes: string, id: number) => dispatch(editingTaskMinutes(minutes, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoItemContainer);
