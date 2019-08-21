import { IUpdatedAction, IState, INewTaskFields } from '../typings/reducer';

// updates state prop for controlled inputs in item-add-form component
const updateTaskStringProp = (newTaskFields: INewTaskFields, updatedPropName: string,
  updatedPropValue: string): INewTaskFields => ({
  ...newTaskFields,
  [updatedPropName]: updatedPropValue,
});

const updateNewTaskFields = (state: IState, action: IUpdatedAction): INewTaskFields => {
  switch (action.type) {
    case 'ADD_FORM_INPUT': {
      return updateTaskStringProp(state.newTaskFields, 'newTaskLabel', action.payload);
    }
    case 'TYPING_DESCRIPTION': {
      return updateTaskStringProp(state.newTaskFields, 'newTaskDescription', action.payload);
    }
    case 'TYPING_DATE': {
      return updateTaskStringProp(state.newTaskFields, 'newTaskDate', action.payload);
    }
    case 'SELECTING_HOUR': {
      return updateTaskStringProp(state.newTaskFields, 'newTaskHour', action.payload);
    }
    case 'SELECTING_MINUTES': {
      return updateTaskStringProp(state.newTaskFields, 'newTaskMinutes', action.payload);
    }
    default:
      return state.newTaskFields;
  }
};

export default updateNewTaskFields;
