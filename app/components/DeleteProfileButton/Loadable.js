/**
 *
 * Asynchronously loads the component for DeleteProfileButton
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
