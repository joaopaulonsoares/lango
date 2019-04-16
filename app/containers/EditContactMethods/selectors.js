import { createSelector } from 'reselect';

/**
 * Direct selector to the editContactMethods state domain
 */
const selectEditContactMethodsDomain = (state) => state.get('editContactMethods');

/**
 * Other specific selectors
 */


/**
 * Default selector used by EditContactMethods
 */

const makeSelectEditContactMethods = () => createSelector(
  selectEditContactMethodsDomain,
  (substate) => substate.toJS()
);

export default makeSelectEditContactMethods;
export {
  selectEditContactMethodsDomain,
};
