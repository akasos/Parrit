import React from 'react';
import {shallow} from 'enzyme';
import AddTeammate from "./AddTeammate";

function renderAddTeammateComponentShallow(args) {
    const defaultProps = {
        cancel: jest.fn()
    };
    return shallow(<AddTeammate {...{...defaultProps, ...args}} />)
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

    describe('cancel()', ()=> {
        it('should call the `cancel` prop when the modal container is clicked',() => {
            const mock = {cancel: jest.fn()};
            const component = renderAddTeammateComponentShallow(mock);
            component.find(".modal-container").simulate('click');
            expect(mock.cancel).toHaveBeenCalled();
        });
    })

});