import intersection from 'lodash/intersection';

function languageMatch(user, myLearningLanguages) {
  const difv = intersection(myLearningLanguages, user.spoken);
  return (difv.length > 0 && difv[0] !== null);
}

function locationMatch(user, myLocation) {
  return (user.location === myLocation);
}

function languageAndLocationMatch(user, myLearningLanguages, myLocation) {
  return (locationMatch(user, myLocation) && languageMatch(user, myLearningLanguages));
}

export { languageMatch, locationMatch, languageAndLocationMatch };
