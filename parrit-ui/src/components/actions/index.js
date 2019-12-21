import * as actionTypes from "../../constants/ActionTypes";
import api from '../../api';

export const fetchTeammates = () => async dispatch => {
        const response = await api.get('/teammates');
        dispatch(listOfTeammates(response.data));
};

export const addTeammate = (newTeammate) => async dispatch => {
      const response = await api.post("/add", newTeammate);
      dispatch(processTeammate(response.data));

};

function listOfTeammates(teammates = []){
    return {
        type: actionTypes.LIST_OF_TEAMMATES,
        payload: teammates
    }
}

function processTeammate(teammate ={}){
    return {
        type: actionTypes.ADD_TEAMMATE,
        payload: teammate
    }
}
