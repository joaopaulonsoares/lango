import { createSelector } from 'reselect';

/**
 * Direct selector to the headers state domain
 */
const selectHeadersDomain = (state) => state.get('headers');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Headers
 */

const makeSelectHeaders = () => createSelector(
  selectHeadersDomain,
  (substate) => substate.toJS()
);

export default makeSelectHeaders;
export {
  selectHeadersDomain,
};
