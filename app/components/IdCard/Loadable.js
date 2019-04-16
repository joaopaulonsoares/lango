/**
 *
 * Asynchronously loads the component for IdCard
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
