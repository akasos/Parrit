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

export const deleteTeammate = (teammate) => async dispatch => {
    await api.delete(`/teammates/${teammate.id}`);
    dispatch(actionDeleteTeammate(teammate));
    if(teammate.pairingBoard !== null){
        dispatch(actionRemoveTeammateFromPairingBoard(teammate.pairingBoard, teammate.id));
    }
};

export const addPairingBoard = (newPairingBoard) => async dispatch => {
    const response = await api.post('/pairingboards', newPairingBoard)
    dispatch(actionAddPairingBoard(response.data));
};

export const updatePairingBoardAndTeammates = (pairingBoardId, pairingBoard, teammate) => async dispatch => {
    const response = await api.put(`/pairingboards/${pairingBoardId}`, pairingBoard);
    dispatch(actionUpdatePairingBoard(response.data));
    if (teammate.pairingBoard === null) {
        teammate.pairingBoard = pairingBoardId;
        dispatch(actionUpdateTeammate(teammate));
    } else if (teammate.pairingBoard !== pairingBoardId) {
        const previousPairingBoardId = teammate.pairingBoard;
        teammate.pairingBoard = pairingBoardId;
        dispatch(actionUpdateTeammate(teammate));
        dispatch(actionRemoveTeammateFromPairingBoard(previousPairingBoardId, teammate.id));

    }
};


function actionGetAllTeammates(teammates = []) {
    return {
        type: actionTypes.LIST_OF_TEAMMATES,
        payload: teammates
    }
}

function actionAddTeammate(teammate = {}) {
    return {
        type: actionTypes.ADD_TEAMMATE,
        payload: teammate
    }
}

export function actionUpdateTeammate(teammate) {
    return {
        type: actionTypes.UPDATE_TEAMMATE,
        payload: teammate
    }
}

function actionGetAllPairingBoards(pairingBoards = []) {
    return {
        type: actionTypes.LIST_OF_PAIRING_BOARDS,
        payload: pairingBoards
    }
}

function actionAddPairingBoard(pairingBoard = {}) {
    return {
        type: actionTypes.ADD_PAIRING_BOARD,
        payload: pairingBoard
    }
}

function actionUpdatePairingBoard(pairingBoard = {}) {
    return {
        type: actionTypes.UPDATE_PAIRING_BOARD,
        payload: pairingBoard
    }
}

export function actionRemoveTeammateFromPairingBoard(pairingBoardId, teammateId) {
    return {
        type: actionTypes.REMOVE_TEAMMATE_FROM_PAIRING_BOARD,
        payload: {pairingBoardId, teammateId}
    }
}

function actionDeleteTeammate(teammate) {
    return {
        type: actionTypes.DELETE_TEAMMATE,
        payload: teammate
    }
}
