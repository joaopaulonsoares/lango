/**
 *
 * Asynchronously loads the component for EditLanguages
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
