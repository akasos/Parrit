import * as actionTypes from "../../constants/ActionTypes";
import api from '../../api';

export const fetchPeople = () => async dispatch => {
        const response = await api.get('/people');
        dispatch(listOfTeammates(response.data));
};

function listOfTeammates(people = []){
    return {
        type: actionTypes.LIST_OF_TEAMMATES,
        payload: people
    }
}



