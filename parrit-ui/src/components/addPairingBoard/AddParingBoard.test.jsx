import React from 'react';
import {shallow} from 'enzyme'
import {AddPairingBoard} from './AddPairingBoard';

function renderAddPairingBoard(args) {
    const defaultProps = {
        addPairingBoard: jest.fn(),
        cancel: jest.fn()
    };
    const props = {...defaultProps, ...args};

    return shallow(<AddPairingBoard{...props}/>)
}

describe("AddPairingBoard", () => {

    describe("onInputChange", () => {
        it("should set state property `title` to the inputted value", () => {
            const component = renderAddPairingBoard();
            const input = component.find(".add-pairing-board-input");
            input.simulate('change', {target: {value: "The Salt Mines"}});
            expect(component.state().title).toEqual("The Salt Mines")
        });
    });

    describe('cancel()', () => {
        it('should call the `cancel` prop when the modal container is clicked', () => {
            const component = renderAddPairingBoard();
            component.find(".modal-container").simulate('click');
            expect(component.instance().props.cancel).toHaveBeenCalledTimes(1);
        });

        it('should call `cancel` prop when the cancel button is clicked', () => {
            const component = renderAddPairingBoard();
            component.find(".cancel-adding-pairing-board-button").simulate('click');
            expect(component.instance().props.cancel).toHaveBeenCalledTimes(1)

        });
    });

    describe("addPairingBoard", () => {
        it('should call `addPairingBoard()` prop when the ok button is clicked and a valid title is set', () => {
            const component = renderAddPairingBoard();
            component.setState({title: "s"});
            component.find(".add-pairing-board-button").simulate('click');
            expect(component.instance().props.addPairingBoard).toHaveBeenCalledTimes(1);
        });

        it('should not call `addPairingBoard()` prop when the ok button is clicked with and invalid title', () => {
            const component = renderAddPairingBoard();
            component.setState({title: ""});
            component.find(".add-pairing-board-button").simulate('click');
            expect(component.instance().props.addPairingBoard).toHaveBeenCalledTimes(0);
        });

        // it('should call the `onInputChange()` && `addPairingBoard()` when the Enter key is pressed', () => {
        //     jest.spyOn(AddPairingBoard.prototype, 'onInputChange');
        //     jest.spyOn(AddPairingBoard.prototype, 'addPairingBoard');
        //     const component = renderAddPairingBoard();
        //     component.find(".add-pairing-board-input").simulate('keyPress', {key: "Enter", target: {value: "Austin"}});
        //     expect(AddPairingBoard.prototype.onInputChange).toHaveBeenCalled();
        //     expect(AddPairingBoard.prototype.addPairingBoard).toHaveBeenCalled();
        //     AddPairingBoard.prototype.onInputChange.mockRestore();
        //     AddPairingBoard.prototype.addPairingBoard.mockRestore();
        // })
        it('should call `addPairingBoard()` prop when the Enter button is clicked and a valid title is set', () => {
            const component = renderAddPairingBoard();
            component.find(".add-pairing-board-input").simulate('keyPress', {key: 'Enter', target: {value: "Austin"}});
            expect(component.instance().props.addPairingBoard).toHaveBeenCalledTimes(1);
        });
        it('should not call `addPairingBoard()` prop when the Enter button is clicked with and invalid title', () => {
            const component = renderAddPairingBoard();
            component.find(".add-pairing-board-input").simulate('keyPress', {key: 'Enter', target: {value: ""}});
            expect(component.instance().props.addPairingBoard).toHaveBeenCalledTimes(0);
        });

    });

});
