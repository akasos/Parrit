import {combineReducers} from "redux";
import * as actionTypes from '../../constants/ActionTypes'

export const listOfTeammates = (state = [], action) => {
    switch (action.type) {
        case actionTypes.LIST_OF_TEAMMATES:
            return action.payload;
        case actionTypes.ADD_TEAMMATE:
            return [...state, action.payload];
        default:
            return state;
    }
};

export default combineReducers({
    listOfTeammates
})

