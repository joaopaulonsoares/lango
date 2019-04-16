/**
 *
 * Asynchronously loads the component for NewUser
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
