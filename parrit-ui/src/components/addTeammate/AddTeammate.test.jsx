import React from 'react';
import {shallow} from 'enzyme';
import { AddTeammate } from "./AddTeammate";

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
    describe('addTeammate()', () => {
        it('should call the the add func when the add button is clicked', () => {
            jest.spyOn(AddTeammate.prototype, 'addTeammate');
            const component = renderAddTeammateComponentShallow();
            component.find(".add-teammate-button").simulate('click');
            expect(AddTeammate.prototype.addTeammate).toHaveBeenCalled();
            AddTeammate.prototype.addTeammate.mockRestore();
        });
    });

});