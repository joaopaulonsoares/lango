import { createSelector } from 'reselect';

/**
 * Direct selector to the newUser state domain
 */
const selectNewUserDomain = (state) => state.get('newUser');

/**
 * Other specific selectors
 */


/**
 * Default selector used by NewUser
 */

const makeSelectNewUser = () => createSelector(
  selectNewUserDomain,
  (substate) => substate.toJS()
);

export default makeSelectNewUser;
export {
  selectNewUserDomain,
};
