import { IToDo } from '../typings/reducer';

// helper function to find index of needed element in array
const getIndex = (todos: IToDo[], id: number): number => todos.findIndex(item => item.id === id);

export default getIndex;
