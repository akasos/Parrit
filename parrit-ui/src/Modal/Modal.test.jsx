import React from 'react';
import Modal from "./modal";
import {mount} from 'enzyme';
import {AddPairingBoard} from "../components/addPairingBoard/AddPairingBoard";
import {AddTeammate} from "../components/addTeammate/AddTeammate";


function renderModal(args) {
    const props = {domElement: document.createElement('div')};
    return mount(<Modal {...props}>{args}</Modal>);
}

describe("Modal", () => {
    it('should render the `AddTeammate` component', () => {
        const component1 = renderModal(<AddTeammate cancel={jest.fn()} addTeammmate={jest.fn()}/>);
        expect(component1.debug()).toMatchSnapshot();
    });
    it('should render the `AddPairingBoard` component', () => {
        const component2 = renderModal(<AddPairingBoard cancel={jest.fn()} addTeammmate={jest.fn()}/>);
        expect(component2.debug()).toMatchSnapshot();

    });

});


