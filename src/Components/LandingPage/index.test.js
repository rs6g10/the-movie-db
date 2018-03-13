import '../../test/setupEnzyme';

import React from 'react';
import { shallow } from 'enzyme';

import LandingPage from './';

describe('LandingPage', () => {
  it('should render as expected with correct state', () => {
    const props = { apiKey: 'blah' };
    const element = shallow(<LandingPage {...props} />);

    expect(element).toMatchSnapshot();
  });
});
