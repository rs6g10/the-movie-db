import '../../test/setupEnzyme';

import React from 'react';
import { shallow } from 'enzyme';

import Searchbox from './';

describe('Header', () => {
  const props = {
    apiKey: 'secret',
    placeHolder: 'Search',
    showResults: true,
  };

  const props2 = {
    apiKey: 'secret',
    placeHolder: 'Search',
    showResults: false,
  };

  it('should render as expected when showResults is set to true', () => {
    const element = shallow(<Searchbox {...props} />);
    expect(element).toMatchSnapshot();
  });

  it('should render as expected when showResults is set to false', () => {
    const element = shallow(<Searchbox {...props2} />);
    expect(element).toMatchSnapshot();
  });
});
