import { IToDo, ITasksFields } from '../typings/reducer';
import {getIndex, getOptimizedString} from './';

// counting active tasks
export const countActiveTasks = (todos: IToDo[]): number => todos.filter(item => !item.done).length;

// updates tasks array with new task
export const updateTodos = (todos: IToDo[], updatedTask: IToDo, idx: number): IToDo[] => {
  const beforeTodos = [...todos.slice(0, idx)];
  const afterTodos = [...todos.slice(idx + 1)];
  return [...beforeTodos, updatedTask, ...afterTodos];
};

// filter todos by status
const filterTodos = (todos: IToDo[], filter: string): IToDo[] => {
    switch (filter) {
      case 'active':
        return todos.filter(item => !item.done);
      case 'done':
        return todos.filter(item => item.done);
      case 'important':
        return todos.filter(item => item.important);
      case 'veryImportant':
        return todos.filter(item => item.veryImportant);
      default:
        return todos;
    }
  };

// filters todos by seacrh term and active filter status
export const getToShowTodos = (todos: IToDo[], term: string, filter: string): IToDo[] => {
    const tasks = filterTodos(todos, filter);
    if (!term.length) {
      return tasks;
    }
    return tasks.filter(item => getOptimizedString(item.label).indexOf(term) > -1);
  };

// updates tasks with new prop and state in general
export const updateTaskProp = (tasksFields: ITasksFields, updatedPropName: string, id: number, updatedPropValue: string | boolean): ITasksFields => {
    const todos = tasksFields.todoData;
    const idx = getIndex(todos, id);
    const oldTask: any = todos[idx];
    const changedTask = {
      ...oldTask,
      [updatedPropName]: updatedPropValue,
    };
    const updatedTodos = updateTodos(todos, changedTask, idx);
    return {
      ...tasksFields,
      todoData: updatedTodos,
      dataToShow: getToShowTodos(updatedTodos, tasksFields.term, tasksFields.filter),
    };
  };