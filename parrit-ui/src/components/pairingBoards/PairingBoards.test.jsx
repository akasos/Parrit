import React from 'react';
import {shallow} from 'enzyme';
import {PairingBoards} from './PairingBoards';

function renderPairingBoard(args) {
    const defaultProps = {}
    const props = {...defaultProps, ...args}
    return shallow(<PairingBoards {...props}/>)
}

describe("PairingBoard", () => {

    describe("addPairingBoard()", () => {
        it("should set state property 'isPairingBoardBeingAdded` to true when the add button is clicked", () => {
            const component = renderPairingBoard();
            component.find(".add-pairing-board-button").simulate('click');
            expect(component.state("isPairingBoardBeingAdded")).toBe(true);
        });
    });


    describe("cancelAddingPairingBoard()", () => {
        it("should set state property 'isPairingBoardBeingAdded` to false", () => {
            const component = renderPairingBoard();
            component.setState({isPairingBoardBeingAdded: true})
            component.instance().cancelAddingPairingBoard();
            expect(component.state("isPairingBoardBeingAdded")).toBe(false);
        });
    });
});