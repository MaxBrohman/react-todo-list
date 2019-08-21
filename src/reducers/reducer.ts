import { IUpdatedAction, IState } from '../typings/reducer';
import updateNewTaskFields from './new-task-fileds';
import updateTasksFields from './tasks-fileds';
import { countActiveTasks, getToShowTodos } from '../utils';

const initialState = {
  tasksFields: {
    todoData: [],
    dataToShow: [],
    term: '',
    filter: 'all',
    activeTasksCount: 0,
    unactiveTasksCount: 0,
  },
  newTaskFields: {
    newTaskLabel: '',
    newTaskDescription: '',
    newTaskDate: '',
    newTaskHour: '',
    newTaskMinutes: '',
  },
};

const reducer = (state: IState = initialState, action: IUpdatedAction): IState => {
  switch (action.type) {
    // only case reducer deals with by himself
    case 'ITEM_ADDED': {
      const updatedTodos = [action.payload, ...state.tasksFields.todoData];
      return {
        tasksFields: {
          ...state.tasksFields,
          todoData: updatedTodos,
          activeTasksCount: countActiveTasks(updatedTodos),
          unactiveTasksCount: updatedTodos.length - countActiveTasks(updatedTodos),
          dataToShow: getToShowTodos(updatedTodos,
            state.tasksFields.term, state.tasksFields.filter),
        },
        newTaskFields: {
          newTaskLabel: '',
          newTaskDescription: '',
          newTaskDate: '',
          newTaskHour: '',
          newTaskMinutes: '',
        },
      };
    }

    default:
      return {
        // all actions connected with todos array changes comes to updateTasksFields
        tasksFields: updateTasksFields(state, action),
        // all actions connected with new task input fields comes to updateNewTaskFields
        newTaskFields: updateNewTaskFields(state, action),
      };
  }
};

export default reducer;
