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


    it('create `LIST_OF_PEOPLE` when fetching people is done', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: [{"id": 1, "name": "Austin"}]

            });
        });
        const expectedActions = [
            {type: actionTypes.LIST_OF_PEOPLE, payload: [{"id": 1, "name": "Austin"}]}
        ];
        const store = mockStore({listOfPeople: []});

        return store.dispatch(actions.fetchPeople()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });

    });
});
