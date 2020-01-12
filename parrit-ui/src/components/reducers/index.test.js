import {listOfPairingBoards, listOfTeammates} from './index';
import * as actionTypes from '../../constants/ActionTypes';

describe('Reducers', () => {

    describe('listOfTeammates Reducer', () => {
        it('should return the initial state', () => {
            expect(listOfTeammates(undefined, {})).toEqual([]);
        });
        it('should return an [] of teammates', () => {
            const action = {type: actionTypes.LIST_OF_TEAMMATES, payload: [{id: '1', name: 'Austin', pairingBoard: null}]};
            const expected = [{id: '1', name: 'Austin', pairingBoard: null}];
            expect(listOfTeammates([], action)).toEqual(expected);
        });

        it('should add a new teammate to  the []', () => {
            const action = {type: actionTypes.ADD_TEAMMATE, payload: {id: '2', name: 'Skyler', pairingBoard: null}};
            const expected = [{id: '1', name: 'Austin', pairingBoard: null}, {id: '2', name: "Skyler", pairingBoard: null}];
            expect(listOfTeammates([{id: '1', name: 'Austin', pairingBoard: null}], action)).toEqual(expected);
        })

        it('should update a teammate when assigned to a new pairing board', () => {
            const action = {type: actionTypes.UPDATE_TEAMMATE, payload: {id: '1', name: "Austin", pairingBoard: 1}};
            const actual = [{id: '1', name: 'Austin', pairingBoard: null}];
            const expected = [{id: '1', name: 'Austin', pairingBoard: 1}];
            expect(listOfTeammates(actual, action)).toEqual(expected);
        });

        it('should update a teammate when assigned to a different pairing board', () => {
            const action = {type: actionTypes.UPDATE_TEAMMATE, payload: {id: '1', name: "Austin", pairingBoard: 2}};
            const actual = [{id: '1', name: 'Austin', pairingBoard: 1}];
            const expected = [{id: '1', name: 'Austin', pairingBoard: 2}];
            expect(listOfTeammates(actual, action)).toEqual(expected);
        });

        it('should delete a teammate from the []', () => {
            const action = {type: actionTypes.DELETE_TEAMMATE, payload: {id: '2', name: "Skyler"}};
            const actual = [{id: '1', name: 'Austin'}, {id: '2', name: "Skyler"}];
            const expected = [{id: '1', name: 'Austin'}];
            expect(listOfTeammates(actual, action)).toEqual(expected);
        });

    });

    describe('listOfPairingBoards Reducer', () => {
        it('should return the initial state', () => {
            expect(listOfPairingBoards(undefined, {})).toEqual([]);
        });
        it('should return an [] of pairingBoards', () => {
            const action = {
                type: actionTypes.LIST_OF_PAIRING_BOARDS,
                payload: [{id: 1, title: "Moon Base", teammates: [{id: 1, name: "Austin", paringBoard: 1}]}]
            };
            const expected = [{id: 1, title: "Moon Base", teammates: [{id: 1, name: "Austin", paringBoard: 1}]}];
            expect(listOfPairingBoards([], action)).toEqual(expected);
        });

        it('should add a pairingBoard to the []', () => {
            const action = {type: actionTypes.ADD_PAIRING_BOARD, payload: {id: 2, title: "Area 51", teammates: []}};
            const actual = [{id: 1, title: "Moon Base", teammates: [{id: 1, name: "Austin", paringBoard: 1}]}]
            const expected = [{
                id: 1,
                title: "Moon Base",
                teammates: [{id: 1, name: "Austin", paringBoard: 1}]
            }, {id: 2, title: "Area 51", teammates: []}];
            expect(listOfPairingBoards(actual, action)).toEqual(expected);
        });

        it('should update an already existing pairingBoard', () => {
            const action = {
                type: actionTypes.UPDATE_PAIRING_BOARD,
                payload: {id: 2, title: "Area 51", teammates: [{id: 3, name: "Zach", paringBoard: 2}]}
            };
            const actual = [{id: 2, title: "Area 51", teammates: []}];
            const expected = [{id: 2, title: "Area 51", teammates: [{id: 3, name: "Zach", paringBoard: 2}]}];
            expect(listOfPairingBoards(actual, action)).toEqual(expected);
        });
    });

});