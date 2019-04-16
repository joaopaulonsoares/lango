import { createSelector } from 'reselect';

/**
 * Direct selector to the preferencesPage state domain
 */
const selectPreferencesPageDomain = (state) => state.get('preferencesPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PreferencesPage
 */

const makeSelectPreferences = () => createSelector(
  selectPreferencesPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectPreferences;
export {
  selectPreferencesPageDomain,
};
