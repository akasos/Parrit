import * as actionTypes from "../../constants/ActionTypes";
import api from '../../api';

export const fetchTeammates = () => async dispatch => {
        const response = await api.get('/teammates');
        dispatch(listOfTeammates(response.data));
};

export const addTeammmate = (newTeammate) => async dispatch => {
      const response = await api.post("/add", newTeammate);
      dispatch(addTeammate(response.data));

};

function listOfTeammates(teammates = []){
    return {
        type: actionTypes.LIST_OF_TEAMMATES,
        payload: teammates
    }
}

function addTeammate(teammate ={}){
    return {
        type: actionTypes.ADD_TEAMMATE,
        payload: teammate
    }
}
