import { listOfPeople } from './index';
import * as actionTypes from '../../constants/ActionTypes';

describe('Reducers', () => {

    describe('`listOfPeople Reducer', () => {
        it('should return the initial state', () => {
            expect(listOfPeople(undefined, {})).toEqual([]);
        });
        it('should return an array list of people', () => {
            const action = {type: actionTypes.LIST_OF_PEOPLE, payload: [{id: '1', name: 'Austin'}]};
            const expected = [{id: '1', name: 'Austin'}]
            expect(listOfPeople([], action)).toEqual(expected);
        });

    });

});