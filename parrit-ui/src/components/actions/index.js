import * as types from "../../constants/ActionTypes";
import api from '../../api';

export const fetchPeople = () => async dispatch => {
        const response = await api.get('/project');
        dispatch(listOfPeople(response.data));
};

function listOfPeople(people = []){
    return {
        type: types.LIST_OF_PEOPLE,
        payload: people
    }
}



