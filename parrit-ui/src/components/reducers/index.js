import {combineReducers} from "redux";
import * as actionTypes from '../../constants/ActionTypes'

export const listOfTeammates = (state = [], action) => {
    switch (action.type) {
        case actionTypes.LIST_OF_TEAMMATES:
            return action.payload;
        case actionTypes.ADD_TEAMMATE:
            return [...state, action.payload];
        case actionTypes.REMOVE_TEAMMATE:
            return state.filter(teammate => teammate.id !== action.payload);
        default:
            return state;
    }
};

export const listOfPairingBoards = (state = [], action) => {
    switch (action.type) {
        case actionTypes.LIST_OF_PAIRING_BOARDS:
            return action.payload;
        case actionTypes.ADD_PAIRING_BOARD:
            return [...state, action.payload];
        case actionTypes.UPDATE_PAIRING_BOARD:
            return state.map(pairingBoard => pairingBoard.id !== action.payload.id ? pairingBoard : action.payload);
        default:
            return state;
    }
};



export default combineReducers({
    listOfTeammates,
    listOfPairingBoards
})

