import '../../test/setupEnzyme';

import React from 'react';
import { shallow } from 'enzyme';

import Movie from './';

describe('Movie', () => {
  it('should render as expected with valid movieId', () => {
    const props = { match: { params: { movieId: 1234 } } };
    const element = shallow(<Movie {...props} />);

    expect(element).toMatchSnapshot();
  });
});
