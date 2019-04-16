/*
 *
 * LandingPage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOG_IN,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function refreshUser(id) {
  return {
    type: 'UPDATE_USER_DATA',
    id,
  };
}

export function logIn() {
  return {
    type: LOG_IN,
  };
}
