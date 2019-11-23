import * as actionTypes from "../../constants/ActionTypes";
import api from '../../api';

export const fetchPeople = () => async dispatch => {
        const response = await api.get('/people');
        console.log(response);
        dispatch(listOfPeople(response.data));
};

function listOfPeople(people = []){
    return {
        type: actionTypes.LIST_OF_PEOPLE,
        payload: people
    }
}



