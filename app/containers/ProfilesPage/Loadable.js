/**
 *
 * Asynchronously loads the component for ProfilesPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
