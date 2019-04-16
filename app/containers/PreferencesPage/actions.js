/*
 *
 * PreferencesPage actions
 *
 */


import {
  CHANGE_DISTANCE_PREFERENCE,
  CHANGE_GENDER_PREFERENCE,
  SAVE_USER,
  SAVE_PREFERENCES,
} from 'containers/App/constants';

import {
  DEFAULT_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeDistancePreference(distance) {
  return {
    type: CHANGE_DISTANCE_PREFERENCE,
    distance,
  };
}

export function changeGenderPreference(gender) {
  return {
    type: CHANGE_GENDER_PREFERENCE,
    gender,
  };
}

export function saveUser() {
  return {
    type: SAVE_USER,
  };
}

export function savePreferences(preferences) {
  return {
    type: SAVE_PREFERENCES,
    preferences,
  };
}
