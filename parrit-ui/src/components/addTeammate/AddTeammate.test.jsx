import React from 'react';
import {shallow} from 'enzyme';
import {AddTeammate} from "./AddTeammate";

function renderAddTeammateComponentShallow(args) {
    const defaultProps = {
        cancel: jest.fn(),
        addTeammate: jest.fn()
    };
    const props = {...defaultProps, ...args};
    return shallow(<AddTeammate {...props} />)
}

describe("Add Teammate", () => {
    describe(`onInputChange()`, () => {
        it('should set state property `name` to the inputted value', () => {
            const component = renderAddTeammateComponentShallow();
            const input = component.find(".add-teammate-input");
            input.simulate('change', {target: {value: "Austin"}});
            expect(component.state().name).toEqual("Austin");
        })
    });

    describe('cancel()', () => {
        it('should call the `cancel` prop when the modal container is clicked', () => {
            const mock = {cancel: jest.fn()};
            const component = renderAddTeammateComponentShallow(mock);
            component.find(".modal-container").simulate('click');
            expect(mock.cancel).toHaveBeenCalled();
        });

        it('should call `cancel` prop when the cancel button is clicked', () => {
            const mock = {cancel: jest.fn()};
            const component = renderAddTeammateComponentShallow(mock);
            component.find(".cancel-adding-teammate-button").simulate('click');
            expect(mock.cancel).toHaveBeenCalled();

        });
    });

    describe("addTeammate()", () => {
        it('should call `addTeammate()` prop when the ok button is clicked and a valid name is set', () => {
            const component = renderAddTeammateComponentShallow();
            component.setState({name: "s"});
            component.find(".add-teammate-button").simulate('click');
            expect(component.instance().props.addTeammate).toHaveBeenCalledTimes(1);
        });

        it('should not call `addTeammate()` prop when the ok button is clicked with and invalid name', () => {
            const component = renderAddTeammateComponentShallow();
            component.setState({name: ""});
            component.find(".add-teammate-button").simulate('click');
            expect(component.instance().props.addTeammate).toHaveBeenCalledTimes(0);
        });

        // it('should call the `onInputChange()` && `addTeammate()` when the Enter key is pressed', () => {
        //     jest.spyOn(AddPairingBoard.prototype, 'onInputChange');
        //     jest.spyOn(AddPairingBoard.prototype, 'addTeammate');
        //     const component = renderAddTeammateComponentShallow();
        //     component.find(".add-pairing-board-input").simulate('keyPress', {key: "Enter", target: {value: "Austin"}});
        //     expect(AddPairingBoard.prototype.onInputChange).toHaveBeenCalled();
        //     expect(AddPairingBoard.prototype.addTeammate).toHaveBeenCalled();
        //     AddPairingBoard.prototype.onInputChange.mockRestore();
        //     AddPairingBoard.prototype.addTeammate.mockRestore();
        // })
        it('should call `addTeammate()` prop when the Enter button is clicked and a valid name is set', () => {
            const component = renderAddTeammateComponentShallow();
            component.find(".add-teammate-input").simulate('keyPress', {key: 'Enter', target: {value: "Austin"}});
            expect(component.instance().props.addTeammate).toHaveBeenCalledTimes(1);
        });
        it('should not call `addTeammate()` prop when the Enter button is clicked with and invalid name', () => {
            const component = renderAddTeammateComponentShallow();
            component.find(".add-teammate-input").simulate('keyPress', {key: 'Enter', target: {value: ""}});
            expect(component.instance().props.addTeammate).toHaveBeenCalledTimes(0);
        });

    });


});