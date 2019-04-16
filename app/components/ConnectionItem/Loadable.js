/**
 *
 * Asynchronously loads the component for ConnectionItem
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
