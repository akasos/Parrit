import { combineReducers } from "redux";
import * as actionTypes from '../../constants/ActionTypes'

export const listOfTeammates = (state = [], action) => {
  if(action.type === actionTypes.LIST_OF_TEAMMATES){
    return action.payload;
  }
  return state;
};

export default combineReducers({
 listOfTeammates
})

