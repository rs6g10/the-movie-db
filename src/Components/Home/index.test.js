import '../../test/setupEnzyme';

import React from 'react';
import { shallow } from 'enzyme';

import Home from './';

describe('Home', () => {
  const props = { apiKey: 'blah' };

  const element = shallow(<Home {...props} />);

  it('should render as expected', () => {
    expect(element).toMatchSnapshot();
  });
});
