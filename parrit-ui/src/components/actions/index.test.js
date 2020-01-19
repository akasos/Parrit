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
        const store = mockStore();

        return store.dispatch(actions.fetchTeammates()).then(() => {
            // return of async action
            ``
            expect(store.getActions()).toEqual(expectedActions)
        });

    });

    it('dispatch `LIST_OF_TEAMS` && `LIST_OF_PAIRING_BOARDS` when fetching projectInfo is done', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    "pairingBoardList": [{
                        "id": 1,
                        "title": "Moon Base",
                        "teammates": [{"id": 1, "name": "Austin", "pairingBoard": 1}]
                    }],
                    "teammateList": [{"id": 1, "name": "Austin", "pairingBoard": 1}]
                }
            });
        });

        const expectedActions = [
            {type: actionTypes.LIST_OF_TEAMMATES, payload: [{"id": 1, "name": "Austin", "pairingBoard": 1}]},
            {
                type: actionTypes.LIST_OF_PAIRING_BOARDS, payload: [{
                    "id": 1, "title": "Moon Base",
                    "teammates": [{"id": 1, "name": "Austin", "pairingBoard": 1}]
                }]
            }
        ];

        const store = mockStore();


        return store.dispatch(actions.fetchProjectInfo()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });

    });

    it('dispatch `ADD_TEAMMATE` when adding teammate is done', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {"id": 2, "name": "Skyler", "pairingBoard": null}
            });
        });

        const newTeammate = {name: "Skyler"};
        const expectedActions = [
            {type: actionTypes.ADD_TEAMMATE, payload: {"id": 2, "name": "Skyler", "pairingBoard": null}}
        ];
        const store = mockStore();
        return store.dispatch(actions.addTeammate(newTeammate)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('dispatch `DELETE_TEAMMATE` when deleting teammate is done', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200
            })
        });

        const deletedTeammate = {id: 1, name: "Austin", pairingBoard: 1};
        const expectedActions = [
            {type: actionTypes.DELETE_TEAMMATE, payload: {id: 1, name: "Austin", pairingBoard: 1}},
            {type: actionTypes.REMOVE_TEAMMATE_FROM_PAIRING_BOARD, payload: {pairingBoardId: 1, teammateId: 1}}
        ];
        const store = mockStore();
        return store.dispatch(actions.deleteTeammate(deletedTeammate)).then(() => {
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
        const expectedActions = [{
            type: actionTypes.ADD_PAIRING_BOARD,
            payload: {"id": 1, "title": "The Moon Base", "teammates": []}
        }];

        const store = mockStore();
        return store.dispatch(actions.addPairingBoard(newPairingBoard)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });

    });

    it('dispatch `DELETE_PAIRING_BOARD` when deleting board is done', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200
            })
        });
        const deletedPairingBoard = {id: 1, title: "The Moon Base", teammates: []}
        const expectedActions = [{
            type: actionTypes.DELETE_PAIRING_BOARD,
            payload: {id: 1, title: "The Moon Base", teammates: []}
        }];

        const store = mockStore();
        return store.dispatch(actions.deletePairingBoard(deletedPairingBoard)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            }
        );
    });

    it('dispatch `UPDATE_PAIRING_BOARD` && `UPDATE_TEAMMATE` && `REMOVE_TEAMMATE_FROM_PAIRING_BOARD` `updatePairingBoardAndTeammates` is done', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {"id": 6, "title": "Area 51", "teammates": [{"id": 1, "name": "Austin", "pairingBoard": 7}]}
            });
        });

        const pairingBoard = {id: 6, title: "Area 51", teammates: {id: 1, name: "Austin", pairingBoard: 6}};
        const teammate = {id: 1, name: "Austin", pairingBoard: 5};

        const expectedActions = [{
            type: actionTypes.UPDATE_PAIRING_BOARD,
            payload: {"id": 6, "title": "Area 51", "teammates": [{"id": 1, "name": "Austin", "pairingBoard": 7}]}
        },
            {type: actionTypes.UPDATE_TEAMMATE, payload: {"id": 1, "name": "Austin", "pairingBoard": 6}},

            {type: actionTypes.REMOVE_TEAMMATE_FROM_PAIRING_BOARD, payload: {pairingBoardId: 5, teammateId: 1}}
        ];

        const store = mockStore();
        return store.dispatch(actions.updatePairingBoardAndTeammates(pairingBoard, teammate)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });

    });

    it('dispatch `UPDATE_PAIRING_BOARD` && UPDATE_TEAMMATE when `upDatePairingBoardAndTeammates` is done', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {"id": 6, "title": "Area 51", "teammates": [{"id": 1, "name": "Austin", "pairingBoard": 6}]}
            });
        });

        const pairingBoard = {id: 6, title: "Area 51", teammates: [{id: 1, name: "Austin", pairingBoard: 6}]};
        const teammate = {id: 1, name: "Austin", pairingBoard: null};

        const expectedActions = [{
            type: actionTypes.UPDATE_PAIRING_BOARD,
            payload: {"id": 6, "title": "Area 51", "teammates": [{"id": 1, "name": "Austin", "pairingBoard": 6}]}
        },
            {type: actionTypes.UPDATE_TEAMMATE, payload: {"id": 1, "name": "Austin", "pairingBoard": 6}}];

        const store = mockStore();

        return store.dispatch(actions.updatePairingBoardAndTeammates(pairingBoard, teammate)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });

    });


    it('dispatch `UPDATE_TEAMMATE` && `REMOVE_TEAMMATE_FROM_PAIRING_BOARD` when moveTeammateFromPairingBoardToFloatingParrits is done', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {"id": 1, "name": "Austin", "pairingBoard": null}
            });
        });

        const teammate = {id: 1, name: "Austin", pairingBoard: 1}
        const expectedActions = [{
            type: actionTypes.UPDATE_TEAMMATE,
            payload: {"id": 1, "name": "Austin", "pairingBoard": null}
        },
            {
                type: actionTypes.REMOVE_TEAMMATE_FROM_PAIRING_BOARD,
                payload: {"pairingBoardId": 1, "teammateId": 1}
            }];

        const store = mockStore();

        return store.dispatch(actions.moveTeammateFromPairingBoardToFloatingParrits(teammate)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });

    });
});