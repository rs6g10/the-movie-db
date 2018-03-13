import '../../test/setupEnzyme';

import React from 'react';
import { shallow } from 'enzyme';

import MovieInfo from './';

describe('MovieInfo', () => {
  it('should render as expected with valid movieDetails', () => {
    const props = {
      data: {
        backdrop: 'blah',
        cast: [],
        director: [],
        error: null,
        poster: 'poster',
        revenue: 287382987,
      },
    };
    const element = shallow(<MovieInfo {...props} />);

    expect(element).toMatchSnapshot();
  });
});
