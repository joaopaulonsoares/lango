/*eslint-disable */
const userIsLoggedIn = (authState) => typeof authState === 'string'
                                      && authState === 'signedIn';

const gotUserData = (userData) => (userData !== null && userData !== undefined)
                                  && userData.id !== undefined
                                  && !((Object.keys(userData).length === 0
                                  && userData.constructor === Object));

export {
  userIsLoggedIn,
  gotUserData,
};
/*eslint-enable */
