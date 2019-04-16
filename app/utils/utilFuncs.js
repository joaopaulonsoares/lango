/*eslint-disable */
import { Auth } from "aws-amplify";
/* Used to extract user's COGNITO IDENTITY ID from amplify's Auth object. Please note that this is async-operation. Will return undefined if user is not logged in. */
export const extractId = () =>
  Auth.currentCredentials()
    .then(data => data._identityId)
    .catch(undefined);

export function strMapToObj(strMap) {
  const obj = Object.create(null);
  for (const [k, v] of strMap) {
          // We don’t escape the key '__proto__'
          // which can cause problems on older engines
    obj[k] = v;
  }
  return obj;
}

export function objToStrMap(obj) {
  const strMap = new Map();
  for (const k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}
/*eslint-enable */
