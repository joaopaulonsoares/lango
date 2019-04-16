import { createSelector } from 'reselect';

/**
 * Direct selector to the profilesPage state domain
 */
const selectProfilesPageDomain = (state) => state.get('profilesPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProfilesPage
 */

const makeSelectProfilesPage = () => createSelector(
  selectProfilesPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectProfilesPage;
export {
  selectProfilesPageDomain,
};
