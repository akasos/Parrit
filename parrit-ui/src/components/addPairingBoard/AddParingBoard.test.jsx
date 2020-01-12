import React from 'react';
import { shallow } from 'enzyme'
import { AddPairingBoard } from './AddPairingBoard';

function renderAddPairingBoard(args){
    const defaultProps = {
        addPairingBoard: jest.fn(),
        cancel: jest.fn()
    };
    const props = {...defaultProps, ...args}

    return shallow(<AddPairingBoard{...props}/>)
}

describe("AddPairingBoard", () => {

    describe("onInputChange", () => {
        it("should set state property `title` to the inputted value", () => {
            const component = renderAddPairingBoard();
            const input = component.find(".add-pairing-board-input");
            input.simulate('change', {target: {value: "The Salt Mines"}});
            expect(component.state().title).toEqual("The Salt Mines");
        });
    });

    describe("addPairingBoard", () => {
       it('should call the add func when the add button is clicked', () => {
           jest.spyOn(AddPairingBoard.prototype, 'addPairingBoard');
           const component = renderAddPairingBoard();
           component.find(".add-pairing-board-button").simulate('click');
           expect(AddPairingBoard.prototype.addPairingBoard).toHaveBeenCalled();
           AddPairingBoard.prototype.addPairingBoard.mockRestore();

       }) ;
    });
});
