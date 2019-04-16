import { createSelector } from 'reselect';

/**
 * Direct selector to the chatPage state domain
 */
const selectChatPageDomain = (state) => state.get('chatPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ChatPage
 */

const makeSelectChatPage = () => createSelector(
  selectChatPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectChatPage;
export {
  selectChatPageDomain,
};
