import * as actionTypes from "../../constants/ActionTypes";
import api from '../../api';

export const fetchTeammates = () => async dispatch => {
        const response = await api.get('/teammates');
        dispatch(actionTeammates(response.data));
};

export const fetchProjectInfo = () => async dispatch => {
    const response = await api.get("/projectinfo");
    dispatch(actionTeammates(response.data.teammateList));
    dispatch(actionPairingBoards(response.data.pairingBoardList));
};

export const addTeammate = (newTeammate) => async dispatch => {
    const response = await api.post("/teammates", newTeammate);
    dispatch(actionTeammate(response.data));

};

export const addPairingBoard = (newPairingBoard) => async dispatch => {
    const response = await api.post('/pairingboards', newPairingBoard)
    dispatch(actionPairingBoard(response.data));
}

function actionTeammates(teammates = []){
    return {
        type: actionTypes.LIST_OF_TEAMMATES,
        payload: teammates
    }
}

function actionPairingBoards(pairingBoards =[]){
    return {
        type: actionTypes.LIST_OF_PAIRING_BOARDS,
        payload: pairingBoards
    }
}

function actionTeammate(teammate ={}){
    return {
        type: actionTypes.ADD_TEAMMATE,
        payload: teammate
    }
}

function actionPairingBoard(pairingBoard = {}){
    return {
        type: actionTypes.ADD_PAIRING_BOARD,
        payload: pairingBoard
    }
}
