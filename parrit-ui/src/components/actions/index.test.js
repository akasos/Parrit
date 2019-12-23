import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import api from '../../api'
import * as actions from './index';
import * as actionTypes from '../../constants/ActionTypes'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
    beforeEach(function () {
        moxios.install(api);
    });

    afterEach(function () {
        moxios.uninstall(api);
    });

    it('dispatch `ADD_TEAMMATE` when adding teammate is done', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {"id": 2, "name": "Skyler", "pairing_board_fk": null}
            });
        });

        const newTeammate = {name: "Skyler"};
        const expectedActions = [
            {type: actionTypes.ADD_TEAMMATE, payload: {"id": 2, "name": "Skyler", "pairing_board_fk": null}}
        ];
        const store = mockStore({listOfTeammates: []});
        return store.dispatch(actions.addTeammate(newTeammate)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });
    });


    it('dispatch `ADD_PAIRING_BOARD` when addPairingBoard is done', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {"id": 1, "title": "The Moon Base", "teammates": []}
            });
        });

        const newPairingBoard = {"title": "The Moon Base"}
        const expectedActions = [{type: actionTypes.ADD_PAIRING_BOARD, payload: {"id": 1, "title": "The Moon Base", "teammates": []}}]

        const store = mockStore({listOfPairingBoards: []});
        return store.dispatch(actions.addPairingBoard(newPairingBoard)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });

    });

    it('dispatch `LIST_OF_TEAMMATES` when fetching teammates is done', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: [{"id": 1, "name": "Austin"}]

            });
        });
        const expectedActions = [
            {type: actionTypes.LIST_OF_TEAMMATES, payload: [{"id": 1, "name": "Austin"}]}
        ];
        const store = mockStore({listOfPeople: []});

        return store.dispatch(actions.fetchTeammates()).then(() => {
            // return of async action
            expect(store.getActions()).toEqual(expectedActions)
        });

    });

    it('dispatch `LIST_OF_TEAMS` && `LIST_OF_PAIRING_BOARDS` when fetching projectInfo is done', () => {
        moxios.wait(() => {
           const request = moxios.requests.mostRecent();
           request.respondWith({
              status: 200,
              response: {"pairingBoardList": [{"id": 1, "title": "Moon Base", "teammates":[{"id": 1, "name": "Austin", "pairing_board_fk": 1}]}],
              "teammateList":[{"id": 1, "name": "Austin", "pairing_board_fk": 1}]}
           });
        });

        const expectedActions = [
            {type: actionTypes.LIST_OF_TEAMMATES, payload: [{"id": 1, "name": "Austin", "pairing_board_fk": 1}]},
            {type: actionTypes.LIST_OF_PAIRING_BOARDS, payload: [{"id": 1, "title": "Moon Base",
                            "teammates": [{"id": 1, "name": "Austin", "pairing_board_fk": 1}]}]}
        ];

        const store = mockStore({listOfTeammates: [], listOfPairingBoards: []});


        return store.dispatch(actions.fetchProjectInfo()).then(() => {
            // return of async actions
            console.log(store.getActions());
            expect(store.getActions()).toEqual(expectedActions)
        });

    });

});