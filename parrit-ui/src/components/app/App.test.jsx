import React from 'react'
import { shallow } from 'enzyme';
import { App } from "./App";

function renderAppComponentMount(args){
    const defaultProps = {
        fetchProjectInfo: jest.fn()
    };
    const props = {...defaultProps, ...args};
    return shallow(<App {...props}/>)
}

describe("App", () => {

    it('should call prop `fetchProjectInfo` on mount', () => {
        const component = renderAppComponentMount();
        expect(component.instance().props.fetchProjectInfo).toHaveBeenCalledTimes(1);
    });

});