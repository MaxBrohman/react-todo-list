import { IUpdatedAction, IState, IToDo, ITasksFields } from '../typings/reducer';
import { getIndex, getOptimizedString, countActiveTasks, getToShowTodos, updateTodos, updateTaskProp } from '../utils';

const updateTasksFields = (state: IState, action: IUpdatedAction): ITasksFields => {
    switch(action.type){
      case 'ITEM_DELETED': {
        const idx = getIndex(state.tasksFields.todoData, action.payload);
        const { todoData, term, filter } = state.tasksFields;
        const updatedTodos = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
        return {
          ...state.tasksFields,
          todoData: updatedTodos,
          activeTasksCount: countActiveTasks(updatedTodos),
          unactiveTasksCount: updatedTodos.length - countActiveTasks(updatedTodos),
          dataToShow: getToShowTodos(updatedTodos, term, filter),
        };
      }
      case 'SHOW_SEARCHED_TASKS': {
        const searchTerm = getOptimizedString(action.payload);
        const { todoData, filter } = state.tasksFields;
        return {
          ...state.tasksFields,
          dataToShow: getToShowTodos(todoData, searchTerm, filter),
        };
      }
      case 'SEARCH_ON_INPUT': {
        const searchTerm = action.payload;
        const { todoData, filter } = state.tasksFields;
        return {
          ...state.tasksFields,
          term: searchTerm,
          dataToShow: getToShowTodos(todoData, searchTerm, filter),
        };
      }
      case 'TASK_STATUS_CHANGED': {
        const { todoData, term, filter } = state.tasksFields;
        const idx = getIndex(todoData, action.payload.id);
        const oldTask: any = todoData[idx];
        let changedTask: any;
        if(!oldTask.done && action.payload.prop === 'done'){
          let formattedDate = new Date().toLocaleString();
          formattedDate = formattedDate.slice(0, formattedDate.length - 3);
          changedTask = { 
            ...oldTask, 
            [action.payload.prop]: !oldTask[action.payload.prop],
            completionDate: formattedDate,
          };
        } else {
          changedTask = { ...oldTask, [action.payload.prop]: !oldTask[action.payload.prop] };
        } 
        const updatedTodos = updateTodos(todoData, changedTask, idx);
        return {
          ...state.tasksFields,
          todoData: updatedTodos,
          activeTasksCount: countActiveTasks(updatedTodos),
          unactiveTasksCount: updatedTodos.length - countActiveTasks(updatedTodos),
          dataToShow: getToShowTodos(updatedTodos, term, filter),
        };
      }
      case 'TASK_IMPORTANCE_CHANGED': {
        const { todoData, term, filter } = state.tasksFields;
        const idx = getIndex(todoData, action.payload.id);
        const oldTask: any = todoData[idx];
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
        const updatedTodos = updateTodos(todoData, changedTask!, idx);
        return {
          ...state.tasksFields,
          todoData: updatedTodos,
          activeTasksCount: countActiveTasks(updatedTodos),
          unactiveTasksCount: updatedTodos.length - countActiveTasks(updatedTodos),
          dataToShow: getToShowTodos(updatedTodos, term, filter),
        };
      }
      case 'FILTER_TASKS': {
        const { todoData, term } = state.tasksFields;
        return {
          ...state.tasksFields,
          filter: action.payload,
          dataToShow: getToShowTodos(todoData, term, action.payload),
        };
      }
      case 'EDIT_TASK': {
        return updateTaskProp(state.tasksFields, 'isEditing', action.payload, true);
      }
      case 'CONFIRM_EDITED_TASK': {
        return updateTaskProp(state.tasksFields, 'isEditing', action.payload, false);
      }
      case 'EDITING_TASK_NAME': {
        const { id, label } = action.payload;
        return updateTaskProp(state.tasksFields, 'label', id, label);
      }
      case 'EDITING_TASK_DESCRIPTION': {
        const { id, description } = action.payload;
        return updateTaskProp(state.tasksFields, 'description', id, description);
      }
      case 'EDITING_TASK_DATE': {
        const { id, date } = action.payload;
        return updateTaskProp(state.tasksFields, 'date', id, date);
      }
      case 'EDITING_TASK_HOUR': {
        const { id, hour } = action.payload;
        return updateTaskProp(state.tasksFields, 'hour', id, hour);
      }
      case 'EDITING_TASK_MINUTES': {
        const { id, minutes } = action.payload;
        return updateTaskProp(state.tasksFields, 'minutes', id, minutes);
      }
      default: 
        return state.tasksFields;
    }
  };

  export default updateTasksFields;