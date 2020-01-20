import React from 'react';
import {shallow} from 'enzyme';
import {SubHeader} from "./SubHeader";

describe("SubHeader", () => {

    const removeTeammatesFromPairingBoard = jest.fn();

    function renderSubHeader(args) {
        const defaultProps = {
            projectName: "Test",
            removeTeammatesFromPairingBoard
        };
        const props = {...defaultProps, ...args};
        return shallow(<SubHeader {...props} />)
    }

    describe("resetPairs()", () => {
        it('should call `removeTeammatesFromPairingBoard()` prop func with the reset button is clicked', () => {
            const functionalComponent = renderSubHeader();
            functionalComponent.find(".reset-button").simulate('click');
            expect(removeTeammatesFromPairingBoard).toHaveBeenCalledTimes(1);
        });
    });
});