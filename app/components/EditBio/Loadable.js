/**
 *
 * Asynchronously loads the component for EditBio
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
