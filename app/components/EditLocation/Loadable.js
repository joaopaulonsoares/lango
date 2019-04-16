/**
 *
 * Asynchronously loads the component for EditLocation
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
