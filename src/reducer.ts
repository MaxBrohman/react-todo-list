import { IUpdatedAction, IState, IToDo } from './typings/reducer';

const initialState = {
  todoData: [],
  dataToShow: [],
  term: '',
  filter: 'all',
  loading: false,
  error: false,
  newTaskLabel: '',
  newTaskDescription: '',
  activeTasksCount: 0,
  unactiveTasksCount: 0,
};

// helper function to find index of needed element in array
const getIndex = (todos: IToDo[], id: number): number => todos.findIndex(item => item.id === id);

// helper function to unify string
const getOptimizedString = (str: string): string => str.trim().toLowerCase();

// counting active tasks
const countActiveTasks = (todos: IToDo[]): number => todos.filter(item => !item.done).length;

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
const getToShowTodos = (todos: IToDo[], term: string, filter: string): IToDo[] => {
  const tasks = filterTodos(todos, filter);
  if (!term.length) {
    return tasks;
  }
  return tasks.filter(item => getOptimizedString(item.label).indexOf(term) > -1);
};

const reducer = (state: IState = initialState, action: IUpdatedAction): IState => {
  switch (action.type) {
    case 'ERROR': {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case 'LOADING': {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case 'LOADED': {
      const loadedData = action.payload;
      return {
        ...state,
        loading: false,
        error: false,
        todoData: loadedData,
        activeTasksCount: countActiveTasks(loadedData),
        unactiveTasksCount: loadedData.length - countActiveTasks(loadedData),
        dataToShow: getToShowTodos(loadedData, state.term, state.filter),
      };
    }
    case 'ITEM_ADDED': {
      const updatedTodos = [action.payload, ...state.todoData];
      return {
        ...state,
        todoData: updatedTodos,
        activeTasksCount: countActiveTasks(updatedTodos),
        unactiveTasksCount: updatedTodos.length - countActiveTasks(updatedTodos),
        dataToShow: getToShowTodos(updatedTodos, state.term, state.filter),
        newTaskLabel: '',
        newTaskDescription: '',
      };
    }
    case 'ITEM_DELETED': {
      const idx = getIndex(state.todoData, action.payload);
      const updatedTodos = [...state.todoData.slice(0, idx), ...state.todoData.slice(idx + 1)];
      return {
        ...state,
        todoData: updatedTodos,
        activeTasksCount: countActiveTasks(updatedTodos),
        unactiveTasksCount: updatedTodos.length - countActiveTasks(updatedTodos),
        dataToShow: getToShowTodos(updatedTodos, state.term, state.filter),
      };
    }
    case 'SHOW_SEARCHED_TASKS': {
      const searchTerm = getOptimizedString(action.payload);
      return {
        ...state,
        dataToShow: getToShowTodos(state.todoData, searchTerm, state.filter),
      };
    }
    case 'SEARCH_ON_INPUT': {
      const searchTerm = action.payload;
      return {
        ...state,
        term: searchTerm,
        dataToShow: getToShowTodos(state.todoData, searchTerm, state.filter),
      };
    }
    case 'TASK_STATUS_CHANGED': {
      const idx = getIndex(state.todoData, action.payload.id);
      const oldTask: any = state.todoData[idx];
      const changedTask = { ...oldTask, [action.payload.prop]: !oldTask[action.payload.prop] };
      const beforeTodos = [...state.todoData.slice(0, idx)];
      const afterTodos = [...state.todoData.slice(idx + 1)];
      const updatedTodos = [...beforeTodos, changedTask, ...afterTodos];
      return {
        ...state,
        todoData: updatedTodos,
        activeTasksCount: countActiveTasks(updatedTodos),
        unactiveTasksCount: updatedTodos.length - countActiveTasks(updatedTodos),
        dataToShow: getToShowTodos(updatedTodos, state.term, state.filter),
      };
    }
    case 'TASK_IMPORTANCE_CHANGED': {
      const idx = getIndex(state.todoData, action.payload.id);
      const oldTask: any = state.todoData[idx];
      const { prop } = action.payload;
      let changedTask: IToDo;
      if(prop === 'important'){
        changedTask = {
          ...oldTask,
          important: !oldTask.important,
          veryImportant: false
        };
      } else if (prop === 'veryImportant'){
        changedTask = {
          ...oldTask,
          veryImportant: !oldTask.veryImportant,
          important: false,
        };
      }
      const beforeTodos = [...state.todoData.slice(0, idx)];
      const afterTodos = [...state.todoData.slice(idx + 1)];
      const updatedTodos = [...beforeTodos, changedTask!, ...afterTodos];
      return {
        ...state,
        todoData: updatedTodos,
        activeTasksCount: countActiveTasks(updatedTodos),
        unactiveTasksCount: updatedTodos.length - countActiveTasks(updatedTodos),
        dataToShow: getToShowTodos(updatedTodos, state.term, state.filter),
      };
    }
    case 'ADD_FORM_INPUT': {
      return {
        ...state,
        newTaskLabel: action.payload,
      };
    }
    case 'TYPING_DESCRIPTION': {
      return {
        ...state,
        newTaskDescription: action.payload
      }
    }
    case 'FILTER_TASKS': {
      return {
        ...state,
        filter: action.payload,
        dataToShow: getToShowTodos(state.todoData, state.term, action.payload),
      };
    }
    case 'EDIT_TASK_NAME': {
      const idx = getIndex(state.todoData, action.payload);
      const oldTask: any = state.todoData[idx];
      const changedTask = {
        ...oldTask,
        isEditing: true,
      };
      const beforeTodos = [...state.todoData.slice(0, idx)];
      const afterTodos = [...state.todoData.slice(idx + 1)];
      const updatedTodos = [...beforeTodos, changedTask, ...afterTodos];
      return {
        ...state,
        todoData: updatedTodos,
        dataToShow: getToShowTodos(updatedTodos, state.term, state.filter),
      };
    }
    case 'CONFIRM_EDITED_TASK': {
      const idx = getIndex(state.todoData, action.payload);
      const oldTask: any = state.todoData[idx];
      const changedTask = {
        ...oldTask,
        isEditing: false,
      };
      const beforeTodos = [...state.todoData.slice(0, idx)];
      const afterTodos = [...state.todoData.slice(idx + 1)];
      const updatedTodos = [...beforeTodos, changedTask, ...afterTodos];
      return {
        ...state,
        todoData: updatedTodos,
        dataToShow: getToShowTodos(updatedTodos, state.term, state.filter),
      };
    }
    case 'EDITING_TASK': {
      const { id, label } = action.payload;
      const idx = getIndex(state.todoData, id);
      const oldTask: any = state.todoData[idx];
      const changedTask = {
        ...oldTask,
        label,
      };
      const beforeTodos = [...state.todoData.slice(0, idx)];
      const afterTodos = [...state.todoData.slice(idx + 1)];
      const updatedTodos = [...beforeTodos, changedTask, ...afterTodos];
      return {
        ...state,
        todoData: updatedTodos,
        dataToShow: getToShowTodos(updatedTodos, state.term, state.filter),
      };
    }
    default:
      return state;
  }
};

export default reducer;
