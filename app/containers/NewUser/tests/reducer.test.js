
import { fromJS } from 'immutable';
import newUserReducer from '../reducer';

describe('newUserReducer', () => {
  it('returns the initial state', () => {
    expect(newUserReducer(undefined, {})).toEqual(fromJS({}));
  });
});
