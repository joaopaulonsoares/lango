/**
 *
 * Asynchronously loads the component for SaveProfileButton
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
