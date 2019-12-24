import * as actionTypes from "../../constants/ActionTypes";
import api from '../../api';

export const fetchTeammates = () => async dispatch => {
        const response = await api.get('/teammates');
        dispatch(actionGetAllTeammates(response.data));
};

export const fetchProjectInfo = () => async dispatch => {
    const response = await api.get("/projectinfo");
    dispatch(actionGetAllTeammates(response.data.teammateList));
    dispatch(actionGetAllPairingBoards(response.data.pairingBoardList));
};

export const addTeammate = (newTeammate) => async dispatch => {
    const response = await api.post("/teammates", newTeammate);
    dispatch(actionAddTeammate(response.data));

};

export const addPairingBoard = (newPairingBoard) => async dispatch => {
    const response = await api.post('/pairingboards', newPairingBoard)
    dispatch(actionAddPairingBoard(response.data));
};

export const upDatePairingBoard = (pairingBoardId, pairingBoard) => async dispatch => {
    const response = await api.put(`/pairingboards/${pairingBoardId}`, pairingBoard);
    dispatch(actionUpdatePairingBoard(response.data));

};

function actionGetAllTeammates(teammates = []){
    return {
        type: actionTypes.LIST_OF_TEAMMATES,
        payload: teammates
    }
}

function actionAddTeammate(teammate ={}){
    return {
        type: actionTypes.ADD_TEAMMATE,
        payload: teammate
    }
}

export function actionRemoveTeammate (id){
    console.log(id);
    return {
        type: actionTypes.REMOVE_TEAMMATE,
        payload: id
    }
}

function actionGetAllPairingBoards(pairingBoards = []){
    return {
        type: actionTypes.LIST_OF_PAIRING_BOARDS,
        payload: pairingBoards
    }
}

function actionAddPairingBoard(pairingBoard = {}){
    return {
        type: actionTypes.ADD_PAIRING_BOARD,
        payload: pairingBoard
    }
}

function actionUpdatePairingBoard(pairingBoard = {}){
    return {
        type: actionTypes.UPDATE_PAIRING_BOARD,
        payload: pairingBoard
    }
}
