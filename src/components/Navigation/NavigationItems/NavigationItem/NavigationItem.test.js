import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavigationItem } from './NavigationItem';
import { NavigationItems } from '../NavigationItems';

configure({ adapter: new Adapter() })

describe('<NavigationItems />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    })
    it('should render two <NavigationItems /> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('should render three <NavigationItems /> elements if authenticated', () => {
        wrapper.setProps({ isAuthenticated: true });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('should contains w<NavigationItem link="/">Logout</NavigationItem> elements if authenticated', () => {
        wrapper.setProps({ isAuthenticated: true });

        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });

})