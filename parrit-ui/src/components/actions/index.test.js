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
                response: [{"id": 2, "name": "Skyler"}]
            });
        });

        const newTeammate = {name: "Skyler"};
        const expectedActions = [
            {type: actionTypes.ADD_TEAMMATE, payload: [{"id": 2, "name": "Skyler"}]}
        ];
        const store = mockStore({listOfTeammates: []});
        return store.dispatch(actions.addTeammmate(newTeammate)).then(() => {
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
            {type: actionTypes.LIST_OF_TEAMMATES, payload: [{"id": 1, "name": "Auseetin"}]}
        ];
        const store = mockStore({listOfPeople: []});

        return store.dispatch(actions.fetchTeammates()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });

    });

});