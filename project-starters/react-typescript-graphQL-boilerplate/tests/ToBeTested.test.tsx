import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import { ToBeTested } from '../src/components/samples/ToBeTested';
import 'jest';
import {} from 'enzyme';

describe('<ToBeTested />', () => {
    it('should have 3 paragraphs', () => {
        const wrapper = shallow(<ToBeTested />);

        expect(wrapper.find('.paragraphSection p')).toHaveLength(3);
    });

    it('sanity test', () => {
        expect(3).toEqual(3);
    });
});
