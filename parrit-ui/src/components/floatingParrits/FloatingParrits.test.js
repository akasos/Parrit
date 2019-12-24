import React from 'react';
import { shallow, mount } from 'enzyme';
import { FloatingParrits } from "./FloatingParrits";

function renderFloatingParritsComponentShallow(args){
    const defaultProps = {
        listOfTeammatesREDUX: []
    };
    return shallow(<FloatingParrits {...{...defaultProps, ...args}}/>)
}

function renderFloatingParritsComponentMount(args){
    const defaultProps = {
        listOfTeammatesREDUX: []
    };
    return mount(<FloatingParrits {...{...defaultProps, ...args}}/>)
}

describe('FloatingParrits', () => {

    describe('addTeammate()', () => {
        it('should set state property `isTeammateBeingAdded` to true when the add button is clicked', ()=> {
            const component = renderFloatingParritsComponentShallow();
            component.find(".add-teammate-button").simulate('click');
            expect(component.state('isTeammateBeingAdded')).toBe(true);

        });

    });

    describe('cancelAddingTeammate()', () => {
        it("should set state property `isTeammateBeingAdded` to false", ()=> {
            const component = renderFloatingParritsComponentShallow();
            component.setState({isTeammateBeingAdded: true});
            component.instance().cancelAddingTeammate();
            expect(component.state('isTeammateBeingAdded')).toBe(false);
        })
    });

    describe('removeTeammate()', () => {

    });

});