/**
 *
 * Asynchronously loads the component for ProfilesFooter
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
