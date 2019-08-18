import { IUpdatedAction, IState, IToDo } from './typings/reducer';

const initialState = {
    todoData: [],
    dataToShow: [],
    term: '', 
    filter: 'all',
    loading: false,
    error: false,
    newTaskLabel: '',
    activeTasksCount: 0,
    unactiveTasksCount: 0
};

// helper function to find index of needed element in array
const getIndex = (todos: IToDo[], id: number): number => {
    return todos.findIndex(item => item.id === id);
};

// helper function to unify string
const getOptimizedString = (str: string): string => str.trim().toLowerCase();

// counting active tasks
const countActiveTasks = (todos: IToDo[]): number => {
    return todos.filter(item => !item.done).length;
};


// filters todos by seacrh term and active filter status
const getToShowTodos = (todos: IToDo[], term: string, filter: string): IToDo[] => {
    let tasks;
    if(filter === 'all'){
        tasks = todos;
    } else {
        tasks = todos.filter(item => (item as any)[filter] !== false);
    }
    if(!term.length) {
        return tasks;
    }
    return tasks.filter(item => getOptimizedString(item.label).indexOf(term) > -1);
};

export const reducer = (state: IState = initialState, action: IUpdatedAction): IState => {
    switch(action.type){
        case 'ERROR':
            return {
                ...state,
                loading: false,
                error: true
            }
        case 'LOADING': {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case 'LOADED':
            const loadedData = action.payload;
            return {
                ...state,
                loading: false,
                error: false,
                todoData: loadedData,
                activeTasksCount: countActiveTasks(loadedData),
                unactiveTasksCount: loadedData.length - countActiveTasks(loadedData),
                dataToShow: getToShowTodos(loadedData, state.term, state.filter)
            }
        case 'ITEM_ADDED':
            const updatedTodos = [...state.todoData, action.payload];
            return {
                ...state,
                todoData: updatedTodos,
                activeTasksCount: countActiveTasks(updatedTodos),
                unactiveTasksCount: updatedTodos.length - countActiveTasks(updatedTodos),
                dataToShow: getToShowTodos(updatedTodos, state.term, state.filter),
                newTaskLabel: ''
            }
        case 'ITEM_DELETED':
            const idx = getIndex(state.todoData, action.payload);
            const decreasedTodos = [...state.todoData.slice(0, idx), ...state.todoData.slice(idx + 1)];
            return {
                ...state,
                todoData: decreasedTodos,
                activeTasksCount: countActiveTasks(decreasedTodos),
                unactiveTasksCount: decreasedTodos.length - countActiveTasks(decreasedTodos),
                dataToShow: getToShowTodos(decreasedTodos, state.term, state.filter)
            }
        case 'SHOW_SEARCHED_TASKS':
            const searchTerm = getOptimizedString(action.payload);
            return {
                ...state,
                dataToShow: getToShowTodos(state.todoData, searchTerm, state.filter)
            }
        case 'SEARCH_ON_INPUT':
            const termToSearch = action.payload;
            return {
                ...state,
                term: termToSearch,
                dataToShow: getToShowTodos(state.todoData, termToSearch, state.filter)
            }
        case 'TASK_STATUS_CHANGED':
            const changedTaskIdx = getIndex(state.todoData, action.payload.id);
            const oldTask: any = state.todoData[changedTaskIdx];
            const changedTask = { ...oldTask, [action.payload.prop]: !oldTask[action.payload.prop] };
            const changedTodos = [...state.todoData.slice(0, changedTaskIdx), changedTask, ...state.todoData.slice(changedTaskIdx + 1)];
            return {
                ...state,
                todoData: changedTodos,
                activeTasksCount: countActiveTasks(changedTodos),
                unactiveTasksCount: changedTodos.length - countActiveTasks(changedTodos),
                dataToShow: getToShowTodos(changedTodos, state.term, state.filter)
            }
        case 'ADD_FORM_INPUT':
            return {
                ...state,
                newTaskLabel: action.payload
            }
        case 'FILTER_TASKS':
            return {
                ...state,
                filter: action.payload,
                dataToShow: getToShowTodos(state.todoData, state.term, action.payload)
            }
        default:
            return state;
    }
};