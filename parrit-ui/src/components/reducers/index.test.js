import {listOfPeople, listOfTeammates} from './index';
import * as actionTypes from '../../constants/ActionTypes';

describe('Reducers', () => {

    describe('`listOfTeammates Reducer', () => {
        it('should return the initial state', () => {
            expect(listOfPeople(undefined, {})).toEqual([]);
        });
        it('should return an [] of teammates', () => {
            const action = {type: actionTypes.LIST_OF_TEAMMATES, payload: [{id: '1', name: 'Austin'}]};
            const expected = [{id: '1', name: 'Austin'}]
            expect(listOfTeammates([], action)).toEqual(expected);
        });

        it('should add a new teammate to to the []', () => {
            const action = {type: actionTypes.ADD_TEAMMATE, payload: {id: '2', name: 'Skyler'}};
            const expected = [{id: '1', name: 'Austin'}, {id: '2', name: "Skyler"}];
            expect(listOfTeammates([{id: '1', name: 'Austin'}], action)).toEqual(expected);
        })

    });

});