import _ from "lodash";
import {combineReducers} from "redux";
import * as actionTypes from '../../constants/ActionTypes'

export const listOfTeammates = (state = [], action) => {
    switch (action.type) {
        case actionTypes.LIST_OF_TEAMMATES:
            return action.payload;
        case actionTypes.ADD_TEAMMATE:
            return [...state, action.payload];
        case actionTypes.UPDATE_TEAMMATE:
            return state.map(teammate => teammate.id !== action.payload.id ? teammate : action.payload);
        case actionTypes.UPDATE_TEAMMATES:
            return state.map(teammate => {
                for (let i = 0; i < action.payload.length; i++) {
                    if (teammate.id === action.payload[i].id) {
                        teammate = action.payload[i];
                    }
                }
                return teammate
            });
        case actionTypes.DELETE_TEAMMATE:
            return state.filter(teammate => teammate.id !== action.payload.id);
        default:
            return state;
    }
};

export const project = (state = {}, action) => {
    switch(action.type){
        case actionTypes.LOAD_PROJECT:
            return action.payload;
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
        case actionTypes.DELETE_PAIRING_BOARD:
            return state.filter(pairingBoard => pairingBoard.id !== action.payload.id);
        case actionTypes.UPDATE_PAIRING_BOARD:
            return state.map(pairingBoard => pairingBoard.id !== action.payload.id ? pairingBoard : action.payload);
        case actionTypes.REMOVE_TEAMMATE_FROM_PAIRING_BOARD:
            const newState = _.cloneDeep(state);
            const teammateId = action.payload.teammateId;
            const pairingBoardId = action.payload.pairingBoardId;
            return newState.map(pairingBoard => {
                if (pairingBoard.id === pairingBoardId) {
                    pairingBoard.teammates = pairingBoard.teammates.filter(teammate => teammate.id !== teammateId);
                }
                return pairingBoard;
            });
        default:
            return state;
    }
};


export default combineReducers({
    listOfTeammates,
    listOfPairingBoards,
    project
})

