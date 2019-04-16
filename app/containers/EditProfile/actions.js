/*
 *
 * EditProfile actions
 *
 */


import {
  SAVE_USER,
  DELETE_USER,
} from 'containers/App/constants';

import {
  CHANGE_FIRST_NAME,
  CHANGE_SECOND_NAME,
  CHANGE_EMAIL,
  CHANGE_AUDIO,
  CHANGE_LANGUAGES,
  CHANGE_LOCATION,
  CHANGE_DESCRIPTION,
  CHANGE_MESSAGING,
  CHANGE_GENDER,
  CHANGE_CONTACT_METHODS,
} from './constants';

export function saveUser() {
  return {
    type: SAVE_USER,
  };
}

export function deleteUser() {
  return {
    type: DELETE_USER,
  };
}

export function changeFirstName(firstName) {
  return {
    type: CHANGE_FIRST_NAME,
    firstName,
  };
}

export function changeSecondName(secondName) {
  return {
    type: CHANGE_SECOND_NAME,
    secondName,
  };
}

export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email,
  };
}

export function changeGender(gender) {
  return {
    type: CHANGE_GENDER,
    gender,
  };
}

export function changeAudio() {
  return {
    type: CHANGE_AUDIO,
  };
}

export function changeLanguages(languages) {
  return {
    type: CHANGE_LANGUAGES,
    languages,
  };
}

export function changeLocation(location) {
  return {
    type: CHANGE_LOCATION,
    location,
  };
}

export function changeDescription(description) {
  return {
    type: CHANGE_DESCRIPTION,
    description,
  };
}

export function changeMessaging() {
  return {
    type: CHANGE_MESSAGING,
  };
}

export function changeContactMethods(contactMethods) {
  return {
    type: CHANGE_CONTACT_METHODS,
    contactMethods,
  };
}
