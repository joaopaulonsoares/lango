/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const ADD_ERROR = 'LANGO_UI/App/ADD_ERROR';

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';
export const UPDATE_USER_INFO = 'LANGO_UI/App/UPDATE_USER_INFO';
export const SIGN_OUT = 'LANGO_UI/App/SIGN_OUT';

export const SET_RECOMMENDED_USERS = 'LANGO_UI/App/SET_RECOMMENDED_USERS';
export const REMOVE_RECOMENDED = 'LANGO_UI/App/REMOVE_RECOMENDED';

export const DEFAULT_LOCALE = 'en';

export const LOAD_USER = 'LANGO_UI/App/LOAD_USER';
export const LOAD_USER_SUCCESS = 'LANGO_UI/App/LOAD_USER_SUCCESS';
export const LOAD_USER_ERROR = 'LANGO_UI/App/LOAD_USER_ERROR';

export const LOAD_RECOMMANDATIONS = 'LANGO_UI/App/LOAD_RECOMMANDATIONS';
export const BROWSE_RIGHT = 'LANGO_UI/App/BROWSE_RIGHT';
export const BROWSE_LEFT = 'LANGO_UI/App/BROWSE_LEFT';

export const SAVE_USER = 'Lango_UI/App/SAVE_USER';
export const SAVE_USER_SUCCESS = 'LANGO_UI/App/SAVE_USER_SUCCESS';
export const SAVE_USER_ERROR = 'LANGO_UI/App/SAVE_USER_SUCCESS';

export const DELETE_USER = 'Lango_UI/App/DELETE_USER';

export const SET_CONNECTIONS = 'Lango_UI/App/SET_CONNECTIONS';
export const SET_CONVERSATIONS = 'Lango_UI/App/SET_CONVERSATIONS';
export const SET_USER_REQUESTS = 'Lango_UI/App/SET_USER_REQUESTS';

export const CHANGE_DISTANCE_PREFERENCE = 'Lango_UI/App/CHANGE_DISTANCE_PREFERENCE';
export const CHANGE_GENDER_PREFERENCE = 'Lango_UI/App/CHANGE_GENDER_PREFERENCE';
export const SAVE_PREFERENCES = 'Lango_UI/App/SAVE_PREFERENCES';

// HEADER MENU BAR NOTIFICATIONS
export const SHOW_NOTIFICATION = 'Lango_UI/App/SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'Lango_UI/App/HIDE_NOTIFICATION';

// CONVERSATION SPECIFIC NOTIFICATION
export const SAVE_NOTIFICATIONS = 'Lango_UI/App/SAVE_NOTIFICATIONS';
export const FLAG_CONVERSATION = 'Lango_UI/App/FLAG_CONVERSATION';

export const CLEAR_NOTIFICATION_FOR_CONVERSATION = 'Lango_UI/App/CLEAR_NOTIFICATION_FOR_CONVERSATION';
export const CLEAR_CONVERSATION = 'Lango_UI/App/CLEAR_CONVERSATION';
export const SAVE_CONVERSATIONS = 'Lango_UI/App/SAVE_CONVERSATIONS';

export const SAVE_FRIEND_REQUEST_NOTIFICATIONS = 'Lango_UI/App/SAVE_FRIEND_REQUEST_NOTIFICATIONS';
