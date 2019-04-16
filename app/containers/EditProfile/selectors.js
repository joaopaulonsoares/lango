import { createSelector } from 'reselect';

/**
 * Direct selector to the editProfile state domain
 */
const selectEditProfileDomain = (state) => state.get('editProfile');

/**
 * Other specific selectors
 */


/**
 * Default selector used by EditProfile
 */

const makeSelectEditProfile = () => createSelector(
  selectEditProfileDomain,
  (substate) => substate.toJS()
);

const makeSelectUserDataChanges = () => createSelector(
  selectEditProfileDomain,
  (substate) => substate.get('userData').toJS()
);

export default makeSelectEditProfile;
export {
  selectEditProfileDomain,
  makeSelectUserDataChanges,
};
