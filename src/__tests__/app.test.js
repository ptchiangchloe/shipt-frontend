import { shallow } from 'enzyme';
import React from 'react';
import App from '../components/App';

describe('<App />', () => {
    it('should render an `.main-content`', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find('.main-content')).toHaveLength(1);
    });

    it('should render children when passed in', () => {
        const wrapper = shallow((
            <App>
                <div className="app-content-container" />
            </App>
        )),
        contentContainer = <div className="app-content-container" />;
        expect(wrapper.contains(contentContainer)).toBeTruthy();
    })

    it('should render an element with value`React Github Account Lookup`', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.contains(<h1 className="text-center"> React Github Account Lookup </h1>)).toBeTruthy();
    })
})
