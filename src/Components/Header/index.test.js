import '../../test/setupEnzyme';

import React from 'react';
import { shallow } from 'enzyme';

import Header from './';

describe('Header', () => {
  const props = { apiKey: 'blah' };

  const element = shallow(<Header {...props} />);

  it('should render as expected', () => {
    expect(element).toMatchSnapshot();
  });
});
