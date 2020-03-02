import _ from 'lodash';
import * as actionTypes from "../../constants/ActionTypes";
import api from '../../api';


export const fetchProject = () => async dispatch => {
    const response = await api.get("/project/Thanos");
    dispatch(actionGetProject(response.data));
    // dispatch(actionGetAllTeammates(response.data.teammateList));
    // dispatch(actionGetAllPairingBoards(response.data.pairingBoardList));
};

export const createPerson = (projectId, newTeammate) => async dispatch => {
    const response = await api.post(`/project/${projectId}/person`, newTeammate);
    dispatch(actionGetProject(response.data));

};
export const deletePerson = (projectId, personId) => async dispatch => {
    const response = await api.delete(`/project/${projectId}/person/${personId}`);
    dispatch(actionGetProject(response.data));
};

export const createPairingBoard = (projectId, newPairingBoard) => async dispatch => {
    const response = await api.post(`/project/${projectId}/pairingboard`, newPairingBoard);
    dispatch(actionGetProject(response.data));
};

export const deletePairingBoard = (pairingBoard) => async dispatch => {
    await api.delete(`/pairingboards/${pairingBoard.id}`);
    const teammates = _.cloneDeep(pairingBoard.teammates);
    if (teammates.length > 0) {
        teammates.forEach(teammate => teammate.pairingBoard = null);
        dispatch(actionUpdateTeammates(teammates));
    }
    dispatch(actionDeletePairingBoard(pairingBoard));
};

export const updatePairingBoardAndTeammates = (pairingBoard, teammate) => async dispatch => {
    const tempPairingBoard = {
        id: pairingBoard.id,
        title: pairingBoard.title,
        teammates: [{id: teammate.id, name: teammate.name}]
    };
    const {data: updatedPairingBoard} = await api.put(`/pairingboards/${tempPairingBoard.id}`, tempPairingBoard);
    dispatch(actionUpdatePairingBoard(updatedPairingBoard));
    if (teammate.pairingBoard === null) {
        teammate.pairingBoard = updatedPairingBoard.id;
        dispatch(actionUpdateTeammate(teammate));
    } else if (teammate.pairingBoard !== updatedPairingBoard.id) {
        const previousPairingBoardId = teammate.pairingBoard;
        teammate.pairingBoard = updatedPairingBoard.id;
        dispatch(actionUpdateTeammate(teammate));
        dispatch(actionRemoveTeammateFromPairingBoard(previousPairingBoardId, teammate.id));
    }
};

export const updatePairingBoardTitle = (pairingBoard) => async dispatch => {
    const tempPairingBoard = {
        id: pairingBoard.id,
        title: pairingBoard.title,
    };
    const {data: updatedPairingBoard} = await api.put(`/pairingboards/${tempPairingBoard.id}`, tempPairingBoard);
    dispatch(actionUpdatePairingBoard(updatedPairingBoard));
};

export const moveTeammateFromPairingBoardToFloatingParrits = (teammate) => async dispatch => {
    const pairingBoardId = teammate.pairingBoard;
    delete teammate.pairingBoard;
    teammate.pairing_board_id = null;
    const {data: updatedTeammated} = await api.put(`/teammates/${teammate.id}`, teammate);
    dispatch(actionUpdateTeammate(updatedTeammated));
    dispatch(actionRemoveTeammateFromPairingBoard(pairingBoardId, updatedTeammated.id));
};

export const removeTeammatesFromPairingBoard = () => async dispatch => {
    const response = await api.put("/projectinfo/reset");
    dispatch(actionGetAllTeammates(response.data.teammateList));
    dispatch(actionGetAllPairingBoards(response.data.pairingBoardList));
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

function actionUpdateTeammates(teammates) {
    return {
        type: actionTypes.UPDATE_TEAMMATES,
        payload: teammates
    }
}

function actionGetAllPairingBoards(pairingBoards = []) {
    return {
        type: actionTypes.LIST_OF_PAIRING_BOARDS,
        payload: pairingBoards
    }
}

function actionCreatePairingBoard(pairingBoard = {}) {
    return {
        type: actionTypes.LOAD_PROJECT,
        payload: pairingBoard
    }
}

function actionDeletePairingBoard(pairingBoard = {}) {
    return {
        type: actionTypes.DELETE_PAIRING_BOARD,
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

function actionGetProject(projectInfo){
    return {
        type: actionTypes.LOAD_PROJECT,
        payload: projectInfo
    }
}