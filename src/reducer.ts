import { IUpdatedAction, IState, IToDo } from './typings/reducer';

const initialState = {
    todoData: [],
    searchedTodos: [],
    dataToShow: [],
    term: '', 
    filter: 'all',
    loading: false,
    error: false,
    newTaskLabel: ''
};

// helper function to find index of needed element in array
const getIndex = (todos: IToDo[], id: number): number => {
    return todos.findIndex(item => item.id === id);
};

// helper function to unify string
const getOptimizedString = (str: string): string => str.trim().toLowerCase();

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
            return {
                ...state,
                loading: false,
                error: false,
                todoData: action.payload
            }
        case 'ITEM_ADDED':
            return {
                ...state,
                todoData: [...state.todoData, action.payload]
            }
        case 'ITEM_DELETED':
            const idx = getIndex(state.todoData, action.payload);
            return {
                ...state,
                todoData: [...state.todoData.slice(0, idx), ...state.todoData.slice(idx + 1)]
            }
        case 'SHOW_ACTIVE_TASKS':
            const activeTodos = state.searchedTodos.filter(item => !item.done);
            return {
                ...state,
                dataToShow: activeTodos
            }
        case 'SHOW_UNACTIVE_TASKS':
            const unactiveTodos = state.searchedTodos.filter(item => item.done);
            return {
                ...state,
                dataToShow: unactiveTodos
            }
        case 'SHOW_SEARCHED_TASKS':
            const searchTerm = getOptimizedString(action.payload);
            const filteredTasks = state.todoData.filter(item => getOptimizedString(item.label).indexOf(searchTerm) > -1);
            return {
                ...state,
                searchedTodos: filteredTasks
            }
        case 'SEARCH_ON_INPUT':
            return {
                ...state,
                term: action.payload
            }
        case 'TASK_STATUS_CHANGED':
            const changedTaskIdx = getIndex(state.todoData, action.payload.id);
            const oldTask: any = state.todoData[changedTaskIdx];
            const changedTask = { ...oldTask, [action.payload.prop]: !oldTask[action.payload.prop] }
            return {
                ...state,
                todoData: [...state.todoData.slice(0, changedTaskIdx), changedTask, ...state.todoData.slice(changedTaskIdx + 1)]
            }
        case 'ADD_FORM_INPUT':
            return {
                ...state,
                newTaskLabel: action.payload
            }
        default:
            return state;
    }
};