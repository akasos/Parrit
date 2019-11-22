import { combineReducers } from "redux";
import * as types from '../../constants/ActionTypes'

export const listOfPeople = (state = [], action) => {
  if(action.type === types.LIST_OF_PEOPLE){
    return action.payload;
  }
  return state;
};

export default combineReducers({
 listOfPeople
})

